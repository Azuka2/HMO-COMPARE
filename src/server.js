#!/usr/bin/env node

/**
 * HMO Blueprint Nigeria — API Server
 * Serves the frontend and exposes the matching engine as HTTP endpoints
 */

import http from 'http';
import url from 'url';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadDataset } from './data/loader.js';
import { matchPlans } from './engine/matching.js';
import { computePriorityVector } from './engine/priority.js';
import { getHmoCompleteness, determineHmoMatchability } from './data/utils.js';
import { applyPreferences, generatePreferenceAudit, PREFERENCE_CONFIG } from './engine/preferences.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;

// Global dataset (loaded once)
let dataset = null;
let hmoCompleteness = {};

/**
 * Load dataset on startup
 */
async function initializeDataset() {
  try {
    console.log('Loading dataset...');
    dataset = await loadDataset();
    const { hmos, plans } = dataset;

    // Compute HMO metrics
    for (const hmo of hmos) {
      hmo.matchability = determineHmoMatchability(hmo, plans);
      hmoCompleteness[hmo.hmo_id] = getHmoCompleteness(hmo, plans);
    }

    console.log(`✅ Dataset loaded: ${plans.length} plans from ${hmos.length} HMOs`);
    return true;
  } catch (error) {
    console.error('Failed to load dataset:', error.message);
    return false;
  }
}

/**
 * Route: GET /
 * Serve index.html
 */
function serveIndex(res) {
  const indexPath = path.join(PUBLIC_DIR, 'index.html');
  fs.readFile(indexPath, 'utf-8', (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(content);
  });
}

/**
 * Route: POST /api/match
 * Run the matching engine
 * Body: { assessment: {...} }
 * Returns: { top_3: [...], alternatives: [...], audit: {...} }
 */
function handleMatch(req, res) {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    try {
      const { assessment } = JSON.parse(body);

      if (!assessment) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Missing assessment' }));
        return;
      }

      // Normalize assessment: convert budget_total (yearly NGN) to budget_per_person_kobo (monthly per person)
      if (assessment.budget_total !== null && assessment.budget_total !== undefined) {
        const monthlyTotal = (assessment.budget_total / 12) * 100; // Convert NGN to kobo
        const personCount = assessment.lives || 1;
        assessment.budget_per_person_kobo = monthlyTotal / personCount;
      } else {
        assessment.budget_per_person_kobo = null;
      }

      // Ensure required fields exist
      assessment.has_seniors = assessment.has_seniors || false;
      assessment.top_priorities = assessment.top_priorities || [];

      // Compute priority vector
      const priority = computePriorityVector(assessment);
      assessment.priority_vector = priority.weights;

      // Run matching engine
      const matchResult = matchPlans(dataset.plans, assessment, hmoCompleteness);

      // Apply preferences (controlled Clearline bias gate)
      const withPreferences = applyPreferences(matchResult.all_ranked);
      const preferenceAudit = generatePreferenceAudit(withPreferences);

      // Re-sort top 3 with preferences applied
      const reranked = withPreferences.sort((a, b) => b.match_score - a.match_score);
      const top3 = reranked.slice(0, 3);

      // Response
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });

      res.end(
        JSON.stringify({
          top_3: top3,
          alternatives: reranked.slice(3, 7),
          total_ranked: reranked.length,
          metadata: {
            matching_engine: 'MATCHING_ENGINE_V1',
            priority_model: 'PRIORITY_MODEL_V1',
            preferences_enabled: PREFERENCE_CONFIG.enabled,
            preference_audit: preferenceAudit
          }
        })
      );
    } catch (error) {
      console.error('Match error:', error.message);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: error.message }));
    }
  });
}

/**
 * Route: GET /api/dataset
 * Return dataset metadata
 */
function handleDataset(req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      plans: dataset.plans.length,
      hmos: dataset.hmos.length,
      hmo_details: dataset.hmos.map((h) => ({
        id: h.hmo_id,
        name: h.hmo_name,
        plans: h.plan_count,
        matchability: h.matchability
      }))
    })
  );
}

/**
 * Route: GET /api/version
 * Return deployment version info for diagnostics
 */
function handleVersion(req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      app: 'HMO Blueprint Nigeria',
      version: 'hmo-blueprint-production',
      environment: 'production',
      timestamp: new Date().toISOString()
    })
  );
}

/**
 * HTTP Server
 */
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Routes
  if (pathname === '/') {
    serveIndex(res);
  } else if (pathname === '/api/match' && req.method === 'POST') {
    handleMatch(req, res);
  } else if (pathname === '/api/dataset' && req.method === 'GET') {
    handleDataset(req, res);
  } else if (pathname === '/api/version' && req.method === 'GET') {
    handleVersion(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

// Start server
(async () => {
  const ready = await initializeDataset();

  if (!ready) {
    console.error('Failed to initialize. Exiting.');
    process.exit(1);
  }

  server.listen(PORT, () => {
    console.log(`🚀 HMO Blueprint Nigeria running on http://localhost:${PORT}`);
    console.log(`📊 Dataset: ${dataset.plans.length} plans from ${dataset.hmos.length} HMOs`);
  });
})();

// Force redeploy: triggering Railway rebuild to pick up fix commit 02ab48f
