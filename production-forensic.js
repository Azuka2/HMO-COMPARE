#!/usr/bin/env node

/**
 * PRODUCTION SINGLE-CANDIDATE FORENSIC
 * Reproduces exact live assessment with detailed stage-by-stage tracing
 */

import { loadDataset } from './src/data/loader.js';
import {
  matchPlans,
  stage1DataEligibility,
  stage2CustomerTypeAndLives,
  stage3Budget,
  stage4CriticalBenefitExclusion
} from './src/engine/matching.js';
import { computePriorityVector } from './src/engine/priority.js';

async function forensic() {
  console.log('\n' + '='.repeat(100));
  console.log('PRODUCTION SINGLE-CANDIDATE FORENSIC ANALYSIS');
  console.log('='.repeat(100));

  // Load dataset
  let dataset;
  try {
    dataset = await loadDataset();
  } catch (error) {
    console.error('Failed to load dataset:', error.message);
    process.exit(1);
  }

  console.log(`\n📊 Dataset: ${dataset.plans.length} plans from ${dataset.hmos.length} HMOs\n`);

  // EXACT PAYLOAD FROM LIVE REQUEST
  const liveAssessment = {
    // What the user selected
    biggest_fear: 'hospital_gap',
    budget_total: 300000,
    chronic: 'managed',
    customer_type: 'couple', // ← NON-STANDARD TYPE
    diagnostics: 6,
    digital: 8,
    drugs: 8,
    geographic_need: 'few',
    has_children: true,
    hospital_access: 5,
    lives: 9, // ← 9 people in a couple?
    maternity: 'maybe',
    restriction_tolerance: 0,
    service: 8,
    specialist: 8,
    state: 'Anambra',
    surgery: 6,
    // Normalize
    budget_per_person_kobo: (300000 / 9) * 100, // 300k annual / 9 people = per-person
    has_seniors: false,
    top_priorities: ['price', 'hospital_quality', 'surgery']
  };

  console.log('📋 EXACT LIVE PAYLOAD:');
  console.log('─'.repeat(100));
  Object.entries(liveAssessment).forEach(([k, v]) => {
    if (k !== 'top_priorities' && !k.includes('kobo')) {
      console.log(`  ${k}: ${v}`);
    }
  });
  console.log(`  top_priorities: ${liveAssessment.top_priorities?.join(', ')}`);
  console.log(`  budget_per_person_kobo: ${liveAssessment.budget_per_person_kobo.toLocaleString()}`);
  console.log('─'.repeat(100));

  // CRITICAL: Budget forensic
  console.log('\n💰 BUDGET FORENSIC:');
  console.log('─'.repeat(100));
  console.log(`  Raw budget_total: ₦${liveAssessment.budget_total.toLocaleString()}`);
  console.log(`  Lives/household: ${liveAssessment.lives}`);
  console.log(`  Derived per-person annual: ₦${(liveAssessment.budget_total / liveAssessment.lives).toLocaleString()}`);
  console.log(`  Derived per-person monthly: ₦${(liveAssessment.budget_total / liveAssessment.lives / 12).toLocaleString()}`);
  console.log(`  Derived per-person kobo: ${liveAssessment.budget_per_person_kobo.toLocaleString()}`);

  // Check what plans fall within this budget
  const budgetFilteredPlans = dataset.plans.filter(p =>
    p.premium && p.premium.amount_kobo <= liveAssessment.budget_per_person_kobo * 1.15
  );
  console.log(`  Plans within ₦${(liveAssessment.budget_per_person_kobo / 100).toLocaleString()}/year (±15%): ${budgetFilteredPlans.length}`);
  console.log('─'.repeat(100));

  // CRITICAL: Customer type forensic
  console.log('\n👥 CUSTOMER TYPE FORENSIC:');
  console.log('─'.repeat(100));
  console.log(`  User selected: "${liveAssessment.customer_type}"`);
  console.log(`  Is this a standard type? NO - "couple" is not in [retail_individual, retail_family, corporate, sme, diaspora, retail_senior]`);

  const validCustomerTypes = new Set();
  dataset.plans.forEach(p => {
    if (p.customer_type) validCustomerTypes.add(p.customer_type);
  });
  console.log(`  Valid customer types in dataset: ${Array.from(validCustomerTypes).sort().join(', ')}`);

  // What plans match this customer type?
  const matchingCustomerType = dataset.plans.filter(p =>
    !p.customer_type || p.customer_type === liveAssessment.customer_type || p.customer_type === 'retail_individual'
  );
  console.log(`  Plans accepting "${liveAssessment.customer_type}": ${matchingCustomerType.length}`);
  console.log('─'.repeat(100));

  // CRITICAL: Lives forensic
  console.log('\n👨‍👩‍👧‍👦 LIVES FORENSIC:');
  console.log('─'.repeat(100));
  console.log(`  User specified: ${liveAssessment.lives} people`);
  console.log(`  But customer_type is: "${liveAssessment.customer_type}" (couple = 2 people)`);
  console.log(`  Question: Is "lives: 9" valid for a couple customer_type?`);

  // Check min_lives constraints
  const plansWithMinLives = dataset.plans.filter(p => p.min_lives);
  console.log(`  Plans with min_lives constraint: ${plansWithMinLives.length}`);
  const minLivesRequiredPlans = dataset.plans.filter(p => p.min_lives && p.min_lives > 9);
  console.log(`  Plans requiring MORE than 9 lives: ${minLivesRequiredPlans.length}`);
  console.log('─'.repeat(100));

  // CRITICAL: State forensic
  console.log('\n🗺️  STATE FORENSIC:');
  console.log('─'.repeat(100));
  console.log(`  User selected: Anambra`);

  // Check if state is used in eligibility
  const anyStateFiltering = dataset.plans.some(p => p.states || p.geographic_region);
  console.log(`  Do plans in dataset have geographic restrictions? ${anyStateFiltering ? 'YES' : 'NO'}`);
  console.log('─'.repeat(100));

  // Now run through the actual matching pipeline with logging
  console.log('\n🔍 MATCHING PIPELINE TRACE:');
  console.log('─'.repeat(100));

  // Compute priority vector
  const priority = computePriorityVector(liveAssessment);
  liveAssessment.priority_vector = priority.weights;

  console.log('\n📊 Priority Vector:');
  Object.entries(priority.weights).forEach(([k, v]) => {
    if (v > 0) console.log(`  ${k}: ${(v * 100).toFixed(1)}%`);
  });

  // Stage 1: Eligibility
  console.log(`\n📍 STAGE 1 - Data Eligibility:`);
  const stage1Result = stage1DataEligibility(dataset.plans, liveAssessment.customer_type);
  console.log(`  Input: ${dataset.plans.length} plans`);
  console.log(`  Filtering by customer_type="${liveAssessment.customer_type}"`);
  console.log(`  Output: ${stage1Result.length} plans`);
  console.log(`  Lost: ${dataset.plans.length - stage1Result.length}`);

  // Stage 2: Customer type and lives
  console.log(`\n📍 STAGE 2 - Customer Type & Lives:`);
  const stage2Result = stage2CustomerTypeAndLives(
    stage1Result,
    liveAssessment.customer_type,
    liveAssessment.lives,
    liveAssessment.has_seniors
  );
  console.log(`  Input: ${stage1Result.length} plans`);
  console.log(`  Filtering by customer_type="${liveAssessment.customer_type}", lives=${liveAssessment.lives}, has_seniors=${liveAssessment.has_seniors}`);
  console.log(`  Output: ${stage2Result.length} plans`);
  console.log(`  Lost: ${stage1Result.length - stage2Result.length}`);

  // Stage 3: Budget
  console.log(`\n📍 STAGE 3 - Budget:`);
  const stage3Result = stage3Budget(stage2Result, liveAssessment.budget_per_person_kobo);
  const stage3Plans = stage3Result.map(x => x.plan);
  console.log(`  Input: ${stage2Result.length} plans`);
  console.log(`  Budget threshold: ₦${(liveAssessment.budget_per_person_kobo / 100).toLocaleString()}/person/year (±15%)`);
  console.log(`  Output: ${stage3Plans.length} plans`);
  console.log(`  Lost: ${stage2Result.length - stage3Plans.length}`);

  // Show rejected plans from budget stage
  if (stage2Result.length - stage3Plans.length > 0) {
    const rejectedByBudget = stage2Result.filter(p =>
      !stage3Plans.includes(p) && p.premium
    );
    console.log(`\n  ⚠️  Rejected by budget (top 10):`);
    rejectedByBudget.slice(0, 10).forEach(p => {
      const premium = (p.premium.amount_kobo / 100).toLocaleString('en-NG');
      console.log(`    • ${p.hmo_name} - ${p.plan_name}: ₦${premium}/year`);
    });
  }

  // Stage 4: Critical benefits
  console.log(`\n📍 STAGE 4 - Critical Benefits:`);
  const stage4Result = stage4CriticalBenefitExclusion(stage3Result, []);
  console.log(`  Input: ${stage3Plans.length} plans`);
  console.log(`  Critical benefits required: none (empty array)`);
  console.log(`  Output: ${stage4Result.length} plans`);
  console.log(`  Lost: ${stage3Plans.length - stage4Result.length}`);

  // Stage 5+: Run full matching
  console.log(`\n📍 STAGES 5-8 - Full Matching Engine:`);
  const matchResult = matchPlans(dataset.plans, liveAssessment, {});

  console.log(`  All ranked (scored): ${matchResult.all_ranked.length}`);
  console.log(`  Top 3 (diversity capped): ${matchResult.top_3.length}`);

  // FINAL RESULT
  console.log('\n' + '='.repeat(100));
  console.log('FINAL RESULT');
  console.log('='.repeat(100));
  console.log(`\nProduction returned: 1 candidate`);
  console.log(`Local reproduction: ${matchResult.top_3.length} candidate(s)`);

  if (matchResult.top_3.length === 0) {
    console.log('\n🚨 CRITICAL: Local backend also returns ZERO candidates!');
  } else if (matchResult.top_3.length === 1) {
    console.log('\n✓ CONFIRMED: Local backend reproduces the single-candidate result');
  } else {
    console.log('\n⚠️  MISMATCH: Local returns more candidates than production');
  }

  if (matchResult.top_3.length > 0) {
    console.log(`\nTop result:`);
    const top = matchResult.top_3[0];
    console.log(`  HMO: ${top.hmo_name}`);
    console.log(`  Plan: ${top.plan.plan_name}`);
    console.log(`  Score: ${top.match_score}%`);
    console.log(`  Scored dimensions: ${top.scored_dimensions}`);
  }

  // Root cause determination
  console.log('\n' + '='.repeat(100));
  console.log('ROOT CAUSE ANALYSIS');
  console.log('='.repeat(100));

  if (matchResult.after_stage_2 === 0) {
    console.log('\n🔴 Stage 2 (Customer Type & Lives) eliminated ALL candidates');
    console.log('   Issue: customer_type="couple" OR lives=9 OR both are incompatible');
  } else if (matchResult.after_stage_3 === 0) {
    console.log('\n🔴 Stage 3 (Budget) eliminated ALL candidates');
    console.log(`   Issue: Budget per-person ₦${(liveAssessment.budget_per_person_kobo / 100).toLocaleString()} is too restrictive`);
    console.log(`   Note: With 9 lives, per-person budget is ₦${(300000 / 9).toLocaleString()} = ₦${(liveAssessment.budget_per_person_kobo / 100).toLocaleString()} per year`);
  } else if (matchResult.after_stage_4 === 0) {
    console.log('\n🔴 Stage 4 (Critical Benefits) eliminated ALL candidates');
  } else if (matchResult.all_ranked.length <= 1) {
    console.log('\n🟡 Low candidate pool - only 1 plan survived all filters');
    console.log(`   Stage 1→2: ${matchResult.after_stage_1} → ${matchResult.after_stage_2}`);
    console.log(`   Stage 2→3: ${matchResult.after_stage_2} → ${matchResult.after_stage_3}`);
    console.log(`   Stage 3→4: ${matchResult.after_stage_3} → ${matchResult.after_stage_4}`);
  }

  console.log('\n' + '='.repeat(100) + '\n');
}

forensic().catch(console.error);
