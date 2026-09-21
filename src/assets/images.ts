/**
 * Centralized Image Configuration for Mutape Painters Zim
 * Uses authentic supplied company logo, official Before & After assets,
 * and the 6 newly supplied authentic completed projects.
 * 
 * Distinct, professional portfolio titles:
 * 01: "Fresh Interior Refresh"
 * 02: "Modern Living Space Finish"
 * 03: "Clean Walls & Ceiling Finish"
 * 04: "Contemporary Exterior Transformation"
 * 05: "Residential Colour Refresh"
 * 06: "Complete Home Makeover"
 */

export const BRAND_ASSETS = {
  // Official Mutape Painters Zim Logo
  LOGO_URL: 'https://res.cloudinary.com/qkyicdqy/image/upload/v1790016927/1000030211.png',

  // Newly Supplied Authentic Before & After Assets
  BEFORE_IMAGE: 'https://res.cloudinary.com/qkyicdqy/image/upload/v1790018586/1000030241.jpg',
  AFTER_IMAGE: 'https://res.cloudinary.com/qkyicdqy/image/upload/v1790018586/1000030243.jpg',

  // Featured Project Images
  PROJECT_HERO: 'https://res.cloudinary.com/qkyicdqy/image/upload/v1790018584/1000030217.jpg',
  PROJECT_HERO_ALT: 'https://res.cloudinary.com/qkyicdqy/image/upload/v1790018584/1000030219.jpg',

  // Helper
  getSafeImage: (src?: string, fallback = 'https://res.cloudinary.com/qkyicdqy/image/upload/v1790018584/1000030217.jpg') => {
    return src || fallback;
  }
};

export interface PortfolioProject {
  id: string;
  projectNumber: string; // '01', '02', '03', etc.
  title: string;
  category: 'interior' | 'exterior' | 'walls_ceilings' | 'residential' | 'commercial';
  primaryImage: string;
  additionalImages?: string[];
  scope: string;
  scopeSn: string;
  description: string;
  descriptionSn: string;
  features: string[];
}

/**
 * The 6 Real Completed Projects of Mutape Painters Zim.
 * Distinct professional case-study titles without fake client names or unverifiable claims.
 */
export const COMPLETED_PROJECTS: PortfolioProject[] = [
  {
    id: 'project-1',
    projectNumber: '01',
    title: 'Fresh Interior Refresh',
    category: 'residential',
    primaryImage: 'https://res.cloudinary.com/qkyicdqy/image/upload/v1790018584/1000030217.jpg',
    additionalImages: [
      'https://res.cloudinary.com/qkyicdqy/image/upload/v1790018584/1000030219.jpg'
    ],
    scope: 'Interior living space and boundary preparation with smooth multi-coat application.',
    scopeSn: 'Kupenda mukati memba nekutsetseka kwakakwana uye makoti maviri akatsvinda.',
    description: 'Professional painting work showcasing a refreshed, clean interior finish with razor-sharp edging and seamless coat distribution.',
    descriptionSn: 'Basa rehunyanzvi rinoratidza kupendwa kwemukati kwakachena, kwakatsetseka, uye kwakarongeka.',
    features: ['2 Full Quality Coats', 'Walls & Ceilings', 'Clean Edging & Trim']
  },
  {
    id: 'project-2',
    projectNumber: '02',
    title: 'Modern Living Space Finish',
    category: 'interior',
    primaryImage: 'https://res.cloudinary.com/qkyicdqy/image/upload/v1790018585/1000030227.jpg',
    scope: 'Interior wall restoration with plaster smoothing and uniform coverage.',
    scopeSn: 'Kugadzirisa madziro nekupenda kwakadzama mukati memba.',
    description: 'Comprehensive interior wall treatment highlighting smooth application, plaster blemish coverage, and zero paint splatter.',
    descriptionSn: 'Kupenda kwemukati kwakadzama pasina donhwe reki pafuro, kuchiunza kupenya kutsva.',
    features: ['Smooth Interior Finish', 'Crisp Trim Cut-Ins', 'Zero Paint Splatter']
  },
  {
    id: 'project-3',
    projectNumber: '03',
    title: 'Clean Walls & Ceiling Finish',
    category: 'walls_ceilings',
    primaryImage: 'https://res.cloudinary.com/qkyicdqy/image/upload/v1790018585/1000030229.jpg',
    scope: 'High-contrast wall and ceiling finish executed with precision.',
    scopeSn: 'Kupenda madziro nesiringi zvinofambirana zvine runako chairwo.',
    description: 'Even coat distribution across ceiling joints and adjoining walls, maximizing natural room lighting and durability.',
    descriptionSn: 'Kuparadzira pendi zvakaenzana pamadziro nesiringi zvinobatsira chiedza mumba.',
    features: ['Even Coat Distribution', 'Plaster Surface Prep', 'Durable Protective Finish']
  },
  {
    id: 'project-4',
    projectNumber: '04',
    title: 'Contemporary Exterior Transformation',
    category: 'exterior',
    primaryImage: 'https://res.cloudinary.com/qkyicdqy/image/upload/v1790018585/1000030221.jpg',
    additionalImages: [
      'https://res.cloudinary.com/qkyicdqy/image/upload/v1790018585/1000030235.jpg',
      'https://res.cloudinary.com/qkyicdqy/image/upload/v1790018585/1000030231.jpg'
    ],
    scope: 'Multi-angle exterior protection engineered against Zimbabwean sun and rain.',
    scopeSn: 'Kudzivirira madziro ekunze nependi inodzivirira zuva nemvura yemuZimbabwe.',
    description: 'Exterior property finishing providing high UV reflection, moisture sealing, and architectural line enhancement.',
    descriptionSn: 'Kupendwa kwepanoperera madziro ekunze kune simba rekurwisa zuva remunzvimbo yedu.',
    features: ['Multi-Angle Exterior Coverage', 'Weather-Resistant Coating', 'Architectural Detail Work']
  },
  {
    id: 'project-5',
    projectNumber: '05',
    title: 'Residential Colour Refresh',
    category: 'residential',
    primaryImage: 'https://res.cloudinary.com/qkyicdqy/image/upload/v1790018585/1000030233.jpg',
    scope: 'Complete room tone refresh with careful skirting and floor border shielding.',
    scopeSn: 'Kuvandudzwa kweruvara rwemba nekuchengetedzwa kwepasi neskatingi.',
    description: 'Vibrant, solid tone application paired with thorough masking tape protection over tiles, switches, and woodwork.',
    descriptionSn: 'Pendi yemhando yepamusoro inopa ruvara rwakajeka pamwe nekuchengetedza magetsi nezvigaro.',
    features: ['High-Precision Finish', 'Vibrant Colour Saturation', 'Floor & Trim Protection']
  },
  {
    id: 'project-6',
    projectNumber: '06',
    title: 'Complete Home Makeover',
    category: 'walls_ceilings',
    primaryImage: 'https://res.cloudinary.com/qkyicdqy/image/upload/v1790018586/1000030237.jpg',
    additionalImages: [
      'https://res.cloudinary.com/qkyicdqy/image/upload/v1790018586/1000030239.jpg'
    ],
    scope: 'Full residential makeover from initial wall preparation to final walk-through inspection.',
    scopeSn: 'Basa rakazara rekupenda imba yose kubva pakugadzirisa kusvika pakutariswa kwekupedzisira.',
    description: 'Thorough two-coat overhaul renewing worn surfaces into modern, bright living spaces built to endure daily wear.',
    descriptionSn: 'Kupenda patsva imba yose zvichisiya madziro akasimba uye akajeka kwemakore akawanda.',
    features: ['Complete Wall & Ceiling Revamp', 'Flawless 2-Coat System', 'Professional Hand Over']
  }
];

/**
 * Backward compatibility alias for any existing imports
 */
export const GALLERY_ITEMS = COMPLETED_PROJECTS.map((proj) => ({
  id: proj.id,
  imageUrl: proj.primaryImage,
  titleEn: proj.title,
  titleSn: proj.title,
  category: proj.category,
  location: 'Mutape Painters Zim Project',
  descriptionEn: proj.description,
  descriptionSn: proj.descriptionSn
}));
