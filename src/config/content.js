/**
 * Content Library Configuration
 * Verified, published content only. No invented articles.
 * Sprint 4C: Founder Authority & Content Ecosystem
 */

export const CONTENT_CONFIG = {
  // Content Library
  library: [
    {
      id: 'insurance-basics-1',
      category: 'Insurance Education',
      title: 'What HMO Actually Means',
      subtitle: 'Understanding Health Maintenance Organizations in Nigeria',
      description: 'How HMOs work, what they cover, and what you need to verify before you pay.',
      type: 'guide',
      author: 'Azuka Orumgbe',
      tags: ['hmo-basics', 'education', 'plans'],
      featured: true,
      verified: true
    },
    {
      id: 'benefit-limits-1',
      category: 'HMO Intelligence',
      title: 'Why "₦5m Overall Limit" Does Not Mean ₦5m Surgery',
      subtitle: 'Understanding the difference between overall limits and specific benefit limits',
      description: 'What happens when you confuse overall limit with surgery limit, and why it matters for your coverage decision.',
      type: 'guide',
      author: 'Azuka Orumgbe',
      tags: ['limits', 'surgery', 'benefits', 'verification'],
      featured: true,
      verified: true
    },
    {
      id: 'maternity-waiting-1',
      category: 'HMO Intelligence',
      title: 'The Maternity Waiting Period Most Buyers Forget',
      subtitle: 'Why 12-month exclusions matter in your planning',
      description: 'Many HMOs exclude maternity cover for the first 12 months. What to ask before you buy.',
      type: 'guide',
      author: 'Azuka Orumgbe',
      tags: ['maternity', 'waiting-periods', 'exclusions', 'verification'],
      featured: true,
      verified: true
    },
    {
      id: 'hospital-choice-1',
      category: 'HMO Intelligence',
      title: 'Your Hospital Being on the List Doesn\'t Mean Your Plan Uses It',
      subtitle: 'Understanding provider networks and plan participation',
      description: 'Why a hospital appearing in an HMO\'s directory is not the same as accepting your specific plan.',
      type: 'guide',
      author: 'Azuka Orumgbe',
      tags: ['hospitals', 'providers', 'networks', 'verification'],
      featured: true,
      verified: true
    },
    {
      id: 'parents-insurance-1',
      category: 'Consumer Protection',
      title: 'Buying Health Insurance for Aging Parents',
      subtitle: 'What to check before purchasing coverage for older relatives',
      description: 'Pre-existing conditions, age limits, and special considerations when buying for parents and seniors.',
      type: 'guide',
      author: 'Azuka Orumgbe',
      tags: ['seniors', 'parents', 'pre-existing', 'verification'],
      featured: true,
      verified: true
    },
    {
      id: 'verification-checklist',
      category: 'Consumer Protection',
      title: 'Before You Pay: The Verification Checklist',
      subtitle: 'Eight questions to ask before committing to an HMO plan',
      description: 'A complete checklist of what to verify before you purchase any health insurance plan.',
      type: 'checklist',
      author: 'Azuka Orumgbe',
      tags: ['verification', 'checklist', 'decision', 'before-buying'],
      featured: true,
      verified: true
    },
    {
      id: 'capitation-explained',
      category: 'Insurance Education',
      title: 'Capitation vs Fee-for-Service',
      subtitle: 'How HMOs pay hospitals and doctors',
      description: 'Understanding different payment models and how they affect your coverage and care.',
      type: 'guide',
      author: 'Azuka Orumgbe',
      tags: ['capitation', 'fee-for-service', 'payment-models', 'education'],
      featured: false,
      verified: true
    },
    {
      id: 'exclusions-matter',
      category: 'HMO Intelligence',
      title: 'What Is Actually Excluded From Your HMO',
      subtitle: 'Reading and understanding the fine print',
      description: 'Common exclusions, what they mean, and how to plan around them.',
      type: 'guide',
      author: 'Azuka Orumgbe',
      tags: ['exclusions', 'limitations', 'fine-print', 'verification'],
      featured: false,
      verified: true
    }
  ],

  // Knowledge Paths (structured learning journeys)
  paths: [
    {
      id: 'path-new-to-hmo',
      title: 'New to HMO',
      description: 'Start here if you\'re buying health insurance for the first time.',
      steps: [
        { order: 1, content: 'What HMO Actually Means' },
        { order: 2, content: 'How HMOs work compared to other insurance' },
        { order: 3, content: 'Understanding premium, limits, and coverage' },
        { order: 4, content: 'Why provider access matters' },
        { order: 5, content: 'Common exclusions and waiting periods' },
        { order: 6, content: 'Before You Pay: The Verification Checklist' }
      ]
    },
    {
      id: 'path-comparing-plans',
      title: 'Comparing Plans',
      description: 'Learn what to look at when you\'re comparing multiple HMO options.',
      steps: [
        { order: 1, content: 'Premium and affordability' },
        { order: 2, content: 'Overall limit and what it covers' },
        { order: 3, content: 'Surgery limits and coverage' },
        { order: 4, content: 'Maternity and waiting periods' },
        { order: 5, content: 'Drugs, diagnostics, and other benefits' },
        { order: 6, content: 'Provider networks and hospitals' }
      ]
    },
    {
      id: 'path-family-planning',
      title: 'Covering Your Family',
      description: 'Specific considerations for buying family health insurance.',
      steps: [
        { order: 1, content: 'Who needs to be covered and for how long' },
        { order: 2, content: 'Cost for different family sizes' },
        { order: 3, content: 'Coverage for children and dependents' },
        { order: 4, content: 'Maternity planning if applicable' },
        { order: 5, content: 'Before You Pay: The Verification Checklist' }
      ]
    }
  ],

  // Resource Matching Rules (deterministic, no AI)
  // Map user priorities to relevant content
  priorityMap: {
    'price': ['verification-checklist'],
    'surgery': ['benefit-limits-1', 'exclusions-matter'],
    'maternity': ['maternity-waiting-1', 'exclusions-matter'],
    'hospital_quality': ['hospital-choice-1', 'verification-checklist'],
    'specialist': ['capitation-explained', 'verification-checklist'],
    'diagnostics': ['verification-checklist'],
    'ancillary': ['exclusions-matter'],
    'drugs': ['exclusions-matter'],
    'digital': ['verification-checklist'],
    'service': ['verification-checklist']
  },

  // Founder Portfolio (verified resources only)
  portfolio: [
    {
      id: 'hmo-blueprint',
      title: 'HMO Blueprint Nigeria',
      subtitle: 'Health Insurance Comparison Platform',
      description: 'A deterministic analysis of 86 Nigerian health insurance plans. Compare premiums, benefits, limits, provider access, and exclusions. Answer 22 questions about your needs and get personalized recommendations.',
      type: 'platform',
      url: '/',
      cta: 'Explore HMO Blueprint',
      featured: true,
      verified: true
    },
    {
      id: 'wellnessos',
      title: 'WellnessOS',
      subtitle: 'Workplace Wellness Administration',
      description: 'Complete benefits and wellness operating system for Nigerian organizations. Manage employee health, benefits enrollment, utilization tracking, and corporate wellness programs.',
      type: 'platform',
      url: 'https://wellnessos.com.ng',
      cta: 'Explore WellnessOS',
      externalLink: true,
      featured: true,
      verified: true
    }
  ],

  // Content Categories for navigation
  categories: [
    { id: 'hmo-intelligence', label: 'HMO Intelligence', icon: '📊' },
    { id: 'insurance-education', label: 'Insurance Education', icon: '📖' },
    { id: 'consumer-protection', label: 'Consumer Protection', icon: '🛡️' },
    { id: 'healthcare-costs', label: 'Healthcare Costs', icon: '💰' },
    { id: 'workforce-wellness', label: 'Workforce Wellness', icon: '🏢' },
    { id: 'data-ai', label: 'Data & AI', icon: '🤖' }
  ],

  // Founder Story / "Why I Built This"
  founderStory: {
    title: 'Why I Built HMO Blueprint',
    sections: [
      {
        heading: 'The Problem',
        content: 'Choosing health insurance in Nigeria should not feel like guessing. Most people buy an HMO plan without understanding what it actually covers, what the limits are, what hospitals they can use, or what waiting periods apply. They discover gaps when they need the insurance most.'
      },
      {
        heading: 'Why This Is Hard',
        content: 'Benefit limits, waiting periods, provider networks, and exclusions are buried in PDFs or not published at all. When you compare plans, you see the headline premium and overall limit, but miss the details that matter: Is surgery covered? How much? For how long? Which hospitals actually accept this plan?'
      },
      {
        heading: 'What I Believe',
        content: 'Healthcare should be understandable. "Covered" is not enough. Every limit matters. Every exclusion matters. Provider access matters. What you still need to verify matters. Evidence should beat marketing. Technology should make healthcare easier to navigate, not harder.'
      },
      {
        heading: 'What I Built',
        content: 'HMO Blueprint is a deterministic comparison of 86 Nigerian health insurance plans based on public data. No AI bias. No random rankings. Every decision is auditable. You answer 22 questions about your needs, and the engine shows you which plans match best, including what you couldn\'t check and what you need to verify before you pay.'
      }
    ]
  },

  // Founder Beliefs / Values (verified claims only)
  beliefs: [
    'Healthcare should be understandable.',
    '"Covered" is not enough.',
    'Limits matter.',
    'Provider access matters.',
    'What is excluded matters.',
    'Nigerians should know what to verify before they pay.',
    'Evidence should beat marketing.',
    'Technology should make healthcare easier to navigate.'
  ],

  // Contextual "Read This Next" recommendations based on assessment result
  contextualRecommendations: {
    // If user result shows surgery is important
    'surgery_important': ['benefit-limits-1', 'exclusions-matter'],
    // If user result shows maternity is important
    'maternity_important': ['maternity-waiting-1', 'parents-insurance-1'],
    // If user result shows hospital choice is important
    'hospital_important': ['hospital-choice-1', 'verification-checklist'],
    // If user is buying for family
    'family_coverage': ['parents-insurance-1', 'verification-checklist'],
    // If user is buying for seniors
    'senior_coverage': ['parents-insurance-1', 'capitation-explained'],
    // Default recommendations
    'default': ['verification-checklist', 'insurance-basics-1']
  }
};

/**
 * Get content by ID
 */
export function getContent(id) {
  return CONTENT_CONFIG.library.find(item => item.id === id);
}

/**
 * Get content by category
 */
export function getContentByCategory(category) {
  return CONTENT_CONFIG.library.filter(item => item.category === category);
}

/**
 * Get featured content
 */
export function getFeaturedContent() {
  return CONTENT_CONFIG.library.filter(item => item.featured);
}

/**
 * Get recommended content for a priority
 */
export function getRecommendationsForPriority(priority) {
  const contentIds = CONTENT_CONFIG.priorityMap[priority] || [];
  return contentIds.map(id => getContent(id)).filter(Boolean);
}

/**
 * Get knowledge path by ID
 */
export function getKnowledgePath(id) {
  return CONTENT_CONFIG.paths.find(path => path.id === id);
}

/**
 * Get all knowledge paths
 */
export function getAllPaths() {
  return CONTENT_CONFIG.paths;
}

export default CONTENT_CONFIG;
