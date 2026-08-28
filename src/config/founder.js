/**
 * Founder Identity & Authority Configuration
 * Central configuration for founder branding, social presence, and resources
 *
 * Design principle: Authority through intelligence, not advertisement.
 * The founder should be visible but never intrusive.
 */

export const FOUNDER_CONFIG = {
  // Core Identity
  name: 'Azuka Orumgbe',
  displayTitle: 'Health Insurance Intelligence | HMO Research | Data & AI',

  // Professional Summary
  shortBio: 'Building health insurance intelligence tools for Nigerian individuals and organizations.',
  longBio: 'Azuka Orumgbe is a health insurance researcher and data analyst focused on making HMO plans transparent and comparable. HMO Blueprint Nigeria is a deterministic analysis of 86 plans from 16 HMOs based on publicly available data.',

  // Visual Identity
  profileImage: null, // Can be set to URL when available
  secondaryImages: [],

  // Social & Web Presence (distribution channels)
  social: {
    whatsapp: 'https://wa.me/234XXXXXXXXX', // To be configured
    facebook: null,
    linkedin: 'https://linkedin.com/in/azuka-orumgbe', // To be configured
    instagram: null,
    x: null,
    youtube: null,
  },

  // Primary Resource
  primaryResource: {
    name: 'Workplace Wellness Operating System',
    description: 'Complete wellness and benefits administration system for Nigerian organizations',
    url: 'https://wellnessos.com.ng',
    cta: 'Explore WellnessOS'
  },

  // Secondary Resources (can be shown in results/footer)
  resources: [
    {
      title: 'HMO Research & Data',
      description: 'Deterministic analysis of Nigerian health insurance plans',
      icon: '📊'
    },
    {
      title: 'Workplace Wellness',
      description: 'Complete benefits administration and employee wellness',
      icon: '🏢'
    },
    {
      title: 'Health Insurance Intelligence',
      description: 'Data-driven insights and comparison tools',
      icon: '🧠'
    }
  ],

  // Attribution (shown on landing page and results)
  attribution: {
    enabled: true,
    landingText: 'Created by Azuka Orumgbe',
    resultsText: 'This analysis was created by Azuka Orumgbe, a health insurance researcher.',
    shortCredit: 'Created by Azuka Orumgbe'
  },

  // Founder Authority Indicators
  authority: {
    // Facts about the platform (all verifiable from code/data)
    plansAnalyzed: 86,
    hmosAnalyzed: 16,
    hmosWithData: 6,
    questionsAsked: 22,

    // Methodology (verifiable from matching engine)
    usesAI: false, // Explicitly deterministic, no AI in scoring
    isDeterministic: true,
    numberOfRankingStages: 8,

    // Trust indicators
    showsGaps: true, // Honest about data limitations
    showsPreference: true, // Transparent about Clearline founder connection
    noBareNumbers: true, // Every claim is contextualized
  },

  // Conversion Touchpoints
  // Where should founder presence be strongest?
  touchpoints: {
    // Landing page: light, trust-building
    landing: {
      showFounderCredit: true,
      showMotivation: true,
      credibilityLevel: 'light'
    },

    // Assessment: minimal, focus on questions
    assessment: {
      showFounderCredit: false,
      showMotivation: false,
      credibilityLevel: 'none'
    },

    // Results: moderate, after user has invested time
    results: {
      showFounderCredit: true,
      showMotivation: false,
      showPrimaryResource: true,
      credibilityLevel: 'moderate',
      showSocialLinks: true
    },

    // Footer: always visible
    footer: {
      showFounderCredit: true,
      showSocialLinks: true,
      showPrimaryResource: false,
      credibilityLevel: 'light'
    }
  },

  // Messages that reinforce founder authority through data/methodology
  authorityMessages: {
    // These appear in context, not as ads
    determinism: 'All rankings are fully deterministic — same input, identical output. No randomness. No machine learning bias.',
    transparency: 'Every decision is auditable. All data is dated and sourced.',
    honesty: 'We show you what we couldn\'t check. Gaps are not hidden.',
    coverage: 'Analysis of 86 plans from 16 HMOs based on public data.',
  }
};

/**
 * Helper function: Get founder's social link
 */
export function getFounderSocialLink(platform) {
  return FOUNDER_CONFIG.social[platform] || null;
}

/**
 * Helper function: Check if founder presence should be shown at a touchpoint
 */
export function shouldShowFounder(touchpoint, element) {
  const config = FOUNDER_CONFIG.touchpoints[touchpoint];
  if (!config) return false;

  const showMap = {
    credit: config.showFounderCredit,
    motivation: config.showMotivation,
    resource: config.showPrimaryResource,
    social: config.showSocialLinks
  };

  return showMap[element] || false;
}

/**
 * Helper function: Get founder's authority summary
 */
export function getFounderAuthoritySummary() {
  const { authority } = FOUNDER_CONFIG;
  return `
    Analysis of ${authority.plansAnalyzed} plans from ${authority.hmosAnalyzed} HMOs.
    ${authority.isDeterministic ? 'Fully deterministic ranking.' : ''}
    ${authority.showsGaps ? 'Honest about data limitations.' : ''}
  `.trim();
}

export default FOUNDER_CONFIG;
