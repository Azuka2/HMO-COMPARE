#!/usr/bin/env node

/**
 * Development & Inspection Script
 * Load dataset, validate, and print comprehensive statistics
 */

import { loadDataset } from './data/loader.js';
import {
  printDatasetStats,
  printExclusionAnalysis,
  determineHmoMatchability,
  getPlanCompleteness
} from './data/utils.js';

async function main() {
  try {
    console.log('🚀 HMO Blueprint Nigeria — Data Foundation\n');

    const dataset = await loadDataset();
    const { hmos, plans } = dataset;

    // Update HMO matchability based on actual data
    for (const hmo of hmos) {
      hmo.matchability = determineHmoMatchability(hmo, plans);
      hmo.data_completeness = plans
        .filter((p) => p.hmo_id === hmo.hmo_id)
        .reduce((sum, p) => sum + getPlanCompleteness(p), 0) /
        (plans.filter((p) => p.hmo_id === hmo.hmo_id).length || 1);
    }

    // Print statistics
    printDatasetStats({ hmos, plans });

    // Print exclusion analysis
    printExclusionAnalysis(plans);

    // Detailed HMO breakdown
    console.log('\n🏥 HMO DETAILED BREAKDOWN\n');
    const byMatchability = {
      FULL: [],
      PRICE_ONLY: [],
      EXCLUDE: []
    };

    for (const hmo of hmos) {
      byMatchability[hmo.matchability].push(hmo);
    }

    if (byMatchability.FULL.length > 0) {
      console.log('✅ FULLY MATCHABLE HMOs (6 expected):');
      byMatchability.FULL.forEach((hmo) => {
        const hmoPlans = plans.filter((p) => p.hmo_id === hmo.hmo_id);
        const completeness = Math.round(hmo.data_completeness * 100);
        console.log(`  ${hmo.hmo_name.padEnd(25)} | ${hmoPlans.length} plans | ${completeness}% complete`);
      });
    }

    if (byMatchability.PRICE_ONLY.length > 0) {
      console.log('\n🟡 PRICE-ONLY HMOs (4 expected):');
      byMatchability.PRICE_ONLY.forEach((hmo) => {
        const hmoPlans = plans.filter((p) => p.hmo_id === hmo.hmo_id);
        console.log(`  ${hmo.hmo_name.padEnd(25)} | ${hmoPlans.length} plans`);
      });
    }

    if (byMatchability.EXCLUDE.length > 0) {
      console.log('\n❌ EXCLUDABLE HMOs (no usable pricing):');
      byMatchability.EXCLUDE.forEach((hmo) => {
        console.log(`  ${hmo.hmo_name}`);
      });
    }

    // Sample plan
    console.log('\n📋 SAMPLE PLAN (first retail individual):\n');
    const samplePlan = plans.find((p) => p.customer_type === 'retail_individual');
    if (samplePlan) {
      console.log(`ID: ${samplePlan.plan_id}`);
      console.log(`HMO: ${samplePlan.hmo_name} (${samplePlan.hmo_id})`);
      console.log(`Plan: ${samplePlan.plan_name}`);
      console.log(`Premium: ₦${samplePlan.premium.amount_kobo / 100} (${samplePlan.premium.status})`);
      console.log(`Overall limit: ${
        samplePlan.overall_limit.status === 'KNOWN'
          ? `₦${samplePlan.overall_limit.amount_kobo}`
          : samplePlan.overall_limit.status
      }`);
      console.log(`Surgery: ${
        samplePlan.surgery_major.status === 'KNOWN'
          ? `₦${samplePlan.surgery_major.amount_kobo}`
          : samplePlan.surgery_major.status
      }`);
      console.log(`Maternity: ${
        samplePlan.maternity.status === 'KNOWN'
          ? `₦${samplePlan.maternity.amount_kobo}`
          : samplePlan.maternity.status
      }`);
    }

    // Status
    console.log('\n✅ DATA FOUNDATION READY FOR NEXT PHASE\n');
    console.log('Next: Build assessment engine → matching engine → results page');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
