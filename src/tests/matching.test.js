#!/usr/bin/env node

/**
 * Matching Engine Test Suite
 *
 * Tests:
 * - Determinism (100 identical runs)
 * - All 5 personas
 * - Critical benefit exclusion
 * - Unknown/UNLIMITED/UNDISCLOSED handling
 * - Budget soft tolerance
 * - Diversity cap
 * - Score ceiling (95)
 */

import { loadDataset } from '../data/loader.js';
import { matchPlans } from '../engine/matching.js';
import { computePriorityVector } from '../engine/priority.js';
import { getHmoCompleteness, determineHmoMatchability } from '../data/utils.js';
import {
  Persona1Chidi,
  Persona2Adaeze,
  Persona3Tunde,
  Persona4MrsOkafor,
  Persona5Emeka
} from './personas.js';

const personas = [
  { name: 'Persona 1: Chidi (first-time buyer)', data: Persona1Chidi },
  { name: 'Persona 2: Adaeze (expecting)', data: Persona2Adaeze },
  { name: 'Persona 3: Tunde (family, surgery critical)', data: Persona3Tunde },
  { name: 'Persona 4: Mrs Okafor (senior, chronic)', data: Persona4MrsOkafor },
  { name: 'Persona 5: Emeka (SME, 14 staff)', data: Persona5Emeka }
];

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`  ❌ ${message}`);
    testsFailed++;
  } else {
    testsPassed++;
  }
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    console.error(`  ❌ ${message} (expected ${expected}, got ${actual})`);
    testsFailed++;
  } else {
    testsPassed++;
  }
}

/**
 * Test 1: Determinism
 * Same input → same output, 100 runs
 */
async function testDeterminism(plans, assessment, hmoCompleteness) {
  console.log('\n🔄 TEST: Determinism (100 identical runs)');

  const results = [];
  let fullResult = null;

  for (let i = 0; i < 100; i++) {
    const result = matchPlans(plans, assessment, hmoCompleteness);
    if (i === 0) fullResult = result; // Keep first result
    results.push(result.top_3.map((r) => r.plan.plan_id).join('|'));
  }

  const firstResult = results[0];
  let allIdentical = true;

  for (let i = 1; i < results.length; i++) {
    if (results[i] !== firstResult) {
      allIdentical = false;
      break;
    }
  }

  assert(
    allIdentical,
    `All 100 runs produced identical top-3 ordering: ${firstResult.split('|').slice(0, 2).join(', ')}`
  );

  return fullResult; // Return the full result object, not just the string
}

/**
 * Test 2: Score Ceiling
 * No match score above 95
 */
function testScoreCeiling(result) {
  console.log('\n📊 TEST: Score Ceiling (max 95)');

  let maxScore = 0;
  for (const item of result.all_ranked) {
    if (item.match_score > 95) {
      console.error(`  ❌ Score exceeded 95: ${item.plan.plan_id} (${item.match_score})`);
      testsFailed++;
      return;
    }
    maxScore = Math.max(maxScore, item.match_score);
  }

  assert(maxScore <= 95, `Highest score is ${maxScore} (≤ 95)`);
}

/**
 * Test 3: Diversity Cap
 * Maximum 1 plan per HMO in top 3
 */
function testDiversityCap(result) {
  console.log('\n🎯 TEST: Diversity Cap (max 1 per HMO in top 3)');

  const hmoIds = new Set();
  let duplicates = 0;

  for (const item of result.top_3) {
    if (hmoIds.has(item.hmo_id)) {
      duplicates++;
      console.error(`  ❌ Duplicate HMO in top 3: ${item.hmo_id}`);
    }
    hmoIds.add(item.hmo_id);
  }

  assertEqual(duplicates, 0, `No duplicate HMOs in top 3`);
}

/**
 * Test 4: Critical Benefit Exclusion
 * If user marks surgery critical, AIICO Standard & Executive excluded
 * (they have surgery as NOT_COVERED)
 */
function testCriticalBenefitExclusion(result, assessment) {
  console.log('\n🚫 TEST: Critical Benefit Exclusion');

  if (assessment.surgery !== 10) {
    console.log('  ⏭️  Skipped (surgery not critical in this persona)');
    return;
  }

  const excludedPlans = ['NG-HMO-006-standard-retail_individual', 'NG-HMO-006-executive-retail_individual'];
  let excluded = 0;

  for (const item of result.all_ranked) {
    if (excludedPlans.includes(item.plan.plan_id)) {
      excluded++;
    }
  }

  assertEqual(
    excluded,
    0,
    `AIICO Standard & Executive excluded when surgery is critical`
  );
}

/**
 * Test 5: Budget Soft Tolerance
 * Plans 100–115% over budget should appear (with flag)
 */
function testBudgetSoftTolerance(result, assessment) {
  console.log('\n💰 TEST: Budget Soft Tolerance (100–115% over keeps plan)');

  if (!assessment.budget_per_person_kobo) {
    console.log('  ⏭️  Skipped ("not sure" budget)');
    return;
  }

  const maxBudget = assessment.budget_per_person_kobo * 1.15;
  let flaggedPlans = 0;

  for (const item of result.all_ranked) {
    if (
      item.plan.premium.amount_kobo > assessment.budget_per_person_kobo &&
      item.plan.premium.amount_kobo <= maxBudget
    ) {
      flaggedPlans++;
      assert(item.over_budget_flag, `Plan flagged as over-budget: ${item.plan.plan_id}`);
    }
  }

  console.log(`  ✅ Found ${flaggedPlans} flagged plans in 100–115% band`);
}

/**
 * Test 6: Unknown Data Excluded from Scoring
 * Plans with UNKNOWN benefits still appear, but dimension excluded
 */
function testUnknownDataHandling(result) {
  console.log('\n❓ TEST: UNKNOWN Data Excluded (not zero)');

  let plansWithUnknownBenefits = 0;

  for (const item of result.all_ranked) {
    const unknownDims = Object.entries(item.scores)
      .filter(([d, s]) => s === null)
      .map(([d]) => d);

    if (unknownDims.length > 0) {
      plansWithUnknownBenefits++;
    }
  }

  assert(
    plansWithUnknownBenefits > 0,
    `${plansWithUnknownBenefits} plans with unknown benefits still ranked`
  );
}

/**
 * Test 7: Confidence Drivers
 * Confidence = 0.40×premium_status + 0.35×dimension_ratio + 0.25×completeness
 */
function testConfidenceCalculation(result) {
  console.log('\n🎓 TEST: Confidence Calculation');

  let confidenceVariation = 0;
  const confidences = result.all_ranked.map((r) => r.confidence.score);
  const minConf = Math.min(...confidences);
  const maxConf = Math.max(...confidences);
  confidenceVariation = maxConf - minConf;

  assert(confidenceVariation > 0, `Confidence varies across plans (range: ${minConf}–${maxConf})`);

  for (const item of result.top_3) {
    assert(
      item.confidence.level in { HIGH: 1, MEDIUM: 1, LOW: 1 },
      `Confidence level valid: ${item.confidence.level}`
    );
  }
}

/**
 * Test 8: No Match Score Above 95
 */
function testMaxScore(result) {
  console.log('\n⬆️  TEST: Match Score Ceiling at 95');

  const maxMatch = Math.max(...result.all_ranked.map((r) => r.match_score || 0));
  assert(maxMatch <= 95, `Max match score: ${maxMatch} (≤ 95)`);
}

/**
 * Run all tests for one persona
 */
async function runPersonaTests(personaName, assessment, plans, hmoCompleteness) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`TESTING: ${personaName}`);
  console.log('='.repeat(60));

  // Compute priority vector
  const priority = computePriorityVector(assessment);
  // priority.weights is already {price: 0.2, surgery: 0.3, ...}
  assessment.priority_vector = priority.weights;

  console.log(`  Priority Vector: ${JSON.stringify(assessment.priority_vector)}`);
  console.log(`  Budget/person: ₦${(assessment.budget_per_person_kobo || 0) / 100}`);

  // Run matching
  const result = await testDeterminism(plans, assessment, hmoCompleteness);

  // Run tests
  testScoreCeiling(result);
  testDiversityCap(result);
  testCriticalBenefitExclusion(result, assessment);
  testBudgetSoftTolerance(result, assessment);
  testUnknownDataHandling(result);
  testConfidenceCalculation(result);
  testMaxScore(result);

  // Report top 3
  console.log('\n📋 Top 3 Results:');
  for (let i = 0; i < Math.min(3, result.top_3.length); i++) {
    const item = result.top_3[i];
    console.log(
      `  ${i + 1}. ${item.plan.hmo_name} — ${item.plan.plan_name} (${item.match_score}%, ${item.confidence.level})`
    );
  }

  console.log(`\n📊 Filtering Summary:`);
  console.log(`  Start: ${result.total_candidate_pool} plans`);
  console.log(`  After Stage 1 (eligibility): ${result.after_stage_1}`);
  console.log(`  After Stage 2 (customer type): ${result.after_stage_2}`);
  console.log(`  After Stage 3 (budget): ${result.after_stage_3}`);
  console.log(`  After Stage 4 (critical benefits): ${result.after_stage_4}`);
  console.log(`  Ranked: ${result.all_ranked.length}`);
}

/**
 * Main test runner
 */
async function main() {
  try {
    console.log('\n🧪 MATCHING ENGINE TEST SUITE\n');

    const dataset = await loadDataset();
    const { plans, hmos } = dataset;

    // Compute HMO completeness
    const hmoCompleteness = {};
    for (const hmo of hmos) {
      hmo.matchability = determineHmoMatchability(hmo, plans);
      hmoCompleteness[hmo.hmo_id] = getHmoCompleteness(hmo, plans);
    }

    // Run tests for each persona
    for (const { name, data } of personas) {
      await runPersonaTests(name, { ...data }, plans, hmoCompleteness);
    }

    // Summary
    console.log(`\n${'='.repeat(60)}`);
    console.log('TEST SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Passed: ${testsPassed}`);
    console.log(`❌ Failed: ${testsFailed}`);
    console.log(`📊 Total: ${testsPassed + testsFailed}`);

    if (testsFailed === 0) {
      console.log('\n✅ ALL TESTS PASSED');
      process.exit(0);
    } else {
      console.log('\n❌ SOME TESTS FAILED');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Test error:', error.message);
    process.exit(1);
  }
}

main();
