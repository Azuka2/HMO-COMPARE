#!/usr/bin/env node

/**
 * PHASE 2 ROOT CAUSE DIAGNOSTIC
 * Traces matching engine through all stages to identify why top_3 has only 1 plan
 */

import { loadDataset } from './src/data/loader.js';
import { matchPlans } from './src/engine/matching.js';
import { computePriorityVector } from './src/engine/priority.js';
import { applyPreferences } from './src/engine/preferences.js';
import {
  Persona1Chidi,
  Persona2Adaeze,
  Persona3Tunde,
  Persona4MrsOkafor,
  Persona5Emeka
} from './src/tests/personas.js';

const personas = {
  'Persona 1 (Chidi)': Persona1Chidi,
  'Persona 2 (Adaeze)': Persona2Adaeze,
  'Persona 3 (Tunde)': Persona3Tunde,
  'Persona 4 (Mrs Okafor)': Persona4MrsOkafor,
  'Persona 5 (Emeka)': Persona5Emeka
};

async function diagnose() {
  console.log('\n' + '='.repeat(80));
  console.log('PHASE 2 TOP_3 ROOT CAUSE DIAGNOSTIC');
  console.log('='.repeat(80));

  // Load dataset
  let dataset;
  try {
    dataset = await loadDataset();
  } catch (error) {
    console.error('Failed to load dataset:', error.message);
    process.exit(1);
  }

  console.log(`\n📊 Dataset loaded: ${dataset.plans.length} plans from ${dataset.hmos.length} HMOs\n`);

  // Run diagnostic for each persona
  for (const [personaName, assessment] of Object.entries(personas)) {
    console.log('\n' + '-'.repeat(80));
    console.log(`🧑 ${personaName}`);
    console.log('-'.repeat(80));

    // Normalize assessment
    const normalizedAssessment = {
      ...assessment,
      budget_per_person_kobo:
        assessment.budget_total_kobo && assessment.lives
          ? assessment.budget_total_kobo / assessment.lives
          : assessment.budget_per_person_kobo,
      has_seniors: assessment.has_seniors || false,
      top_priorities: assessment.top_priorities || []
    };

    console.log('\n📋 Assessment Input:');
    console.log(`   - Customer type: ${assessment.customer_type}`);
    console.log(`   - State: ${assessment.state}`);
    console.log(`   - Lives: ${assessment.lives}`);
    console.log(`   - Budget: ₦${(normalizedAssessment.budget_per_person_kobo / 100).toLocaleString()} per person/year`);
    console.log(`   - Top priorities: ${assessment.top_priorities?.join(', ') || 'none'}`);

    // Compute priority vector
    const priority = computePriorityVector(normalizedAssessment);
    normalizedAssessment.priority_vector = priority.weights;

    console.log('\n📊 Priority Vector:');
    Object.entries(priority.weights).forEach(([k, v]) => {
      if (v > 0) console.log(`   - ${k}: ${v}`);
    });

    // Run matching engine (no modifications)
    const matchResult = matchPlans(dataset.plans, normalizedAssessment, {});

    console.log('\n🔍 Matching Pipeline Results:');
    console.log(`   - Total plans in dataset: ${dataset.plans.length}`);
    console.log(`   - After stage 1 (eligibility): ${matchResult.after_stage_1}`);
    console.log(`   - After stage 2 (customer type): ${matchResult.after_stage_2}`);
    console.log(`   - After stage 3 (budget): ${matchResult.after_stage_3}`);
    console.log(`   - After stage 4 (critical benefits): ${matchResult.after_stage_4}`);
    console.log(`   - All ranked (scored): ${matchResult.all_ranked.length}`);

    const top3 = matchResult.top_3;
    const alternatives = matchResult.alternatives;

    console.log(`\n🏆 Top 3 (Diversity Capped):`);
    console.log(`   Count: ${top3.length}`);

    if (top3.length === 0) {
      console.log(`   ⚠️  WARNING: NO PLANS IN TOP 3!`);
    } else {
      top3.forEach((plan, idx) => {
        console.log(`   ${idx + 1}. ${plan.hmo_name} - ${plan.plan.plan_name}`);
        console.log(`      Score: ${plan.match_score}%`);
        console.log(`      Premium: ₦${(plan.plan.premium?.amount_kobo / 100).toLocaleString()}/year`);
        console.log(`      Confidence: ${plan.confidence}`);
        console.log(`      Scored dimensions: ${plan.scored_dimensions}`);
      });
    }

    console.log(`\n📍 Alternatives (Next 4):`);
    console.log(`   Count: ${alternatives.length}`);
    if (alternatives.length === 0) {
      console.log(`   ⚠️  WARNING: NO ALTERNATIVES!`);
    } else {
      alternatives.forEach((plan, idx) => {
        console.log(`   ${idx + 4}. ${plan.hmo_name} - ${plan.plan.plan_name}`);
        console.log(`      Score: ${plan.match_score}%`);
      });
    }

    // Check what frontend would render
    const extractedAlternatives = top3.slice(1);
    console.log(`\n🖥️  Frontend Extraction (top_3.slice(1)):`);
    console.log(`   Alternatives array length: ${extractedAlternatives.length}`);
    console.log(`   Would render "STRONG ALTERNATIVE": ${extractedAlternatives.length >= 1 ? 'YES ✓' : 'NO ✗'}`);
    console.log(`   Would render "ANOTHER GOOD OPTION": ${extractedAlternatives.length >= 2 ? 'YES ✓' : 'NO ✗'}`);

    // Analysis: Where did candidates collapse?
    const stage1to4 = matchResult.after_stage_4;
    const scored = matchResult.all_ranked.length;
    const inTop3 = top3.length;

    console.log(`\n🔴 Candidate Pool Collapse:`);
    console.log(`   Stage 1→2: ${matchResult.after_stage_1} → ${matchResult.after_stage_2} (lost ${matchResult.after_stage_1 - matchResult.after_stage_2})`);
    console.log(`   Stage 2→3: ${matchResult.after_stage_2} → ${matchResult.after_stage_3} (lost ${matchResult.after_stage_2 - matchResult.after_stage_3})`);
    console.log(`   Stage 3→4: ${matchResult.after_stage_3} → ${matchResult.after_stage_4} (lost ${matchResult.after_stage_3 - matchResult.after_stage_4})`);
    console.log(`   Stage 4→Score: ${stage1to4} → ${scored} (filtered ${stage1to4 - scored})`);
    console.log(`   Scoring→Top3: ${scored} → ${inTop3} (diversity capped ${scored - inTop3})`);

    const criticalLoss = matchResult.after_stage_3 - matchResult.after_stage_4;
    const scoringLoss = scored;

    if (criticalLoss > matchResult.after_stage_3 * 0.5) {
      console.log(`   ⚠️  ALERT: Stage 4 (critical benefits) eliminated >50% of plans!`);
    }
    if (inTop3 === 1 && scored > 1) {
      console.log(`   ⚠️  ALERT: Only 1 plan made top_3, but ${scored} plans scored!`);
      console.log(`   This suggests diversity cap OR the other plans have identical/lower scores.`);
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('DIAGNOSTIC COMPLETE');
  console.log('='.repeat(80) + '\n');
}

diagnose().catch(console.error);
