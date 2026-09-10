export type ScienceClaimTag =
  | 'atmosphere-basics'
  | 'weather-climate'
  | 'glacier-basics'
  | 'sea-level'
  | 'land-ice-melt'
  | 'thermal-expansion'
  | 'local-sea-level'
  | 'drought-basics'
  | 'drought-fire'
  | 'wildfire-risk'
  | 'wildfire-multifactor'
  | 'ecosystems'
  | 'ocean-acidification'
  | 'co2-level'
  | 'global-temperature'
  | 'ice-sheet-loss'
  | 'materials-circularity'
  | 'marine-pollution'
  | 'forest-resources'
  | 'water-efficiency'
  | 'biodiversity'
  | 'renewables'
  | 'sustainable-consumption';

export type ScienceSource = {
  id: string;
  institution: string;
  title: string;
  url: string;
  lastChecked: string;
  claimTags: ScienceClaimTag[];
};

export const scienceSources: ScienceSource[] = [

  {
    id: 'nasa-co2-indicator',
    institution: 'NASA',
    title: 'Carbon Dioxide - Earth Indicator',
    url: 'https://science.nasa.gov/earth/explore/earth-indicators/carbon-dioxide/',
    lastChecked: '2026-09-10',
    claimTags: ['co2-level'],
  },
  {
    id: 'nasa-global-temperature-indicator',
    institution: 'NASA',
    title: 'Global Temperature - Earth Indicator',
    url: 'https://science.nasa.gov/earth/explore/earth-indicators/global-temperature/',
    lastChecked: '2026-09-10',
    claimTags: ['global-temperature'],
  },
  {
    id: 'nasa-ice-sheets-indicator',
    institution: 'NASA',
    title: 'Ice Sheets - Earth Indicator',
    url: 'https://science.nasa.gov/earth/explore/earth-indicators/ice-sheets/',
    lastChecked: '2026-09-10',
    claimTags: ['land-ice-melt', 'ice-sheet-loss'],
  },
  {
    id: 'nasa-sea-level-indicator',
    institution: 'NASA',
    title: 'Sea Level - Earth Indicator',
    url: 'https://science.nasa.gov/earth/explore/earth-indicators/sea-leve/',
    lastChecked: '2026-09-10',
    claimTags: ['sea-level', 'land-ice-melt', 'thermal-expansion'],
  },
  {
    id: 'nasa-atmosphere',
    institution: 'NASA',
    title: "Earth's Atmosphere",
    url: 'https://spaceplace.nasa.gov/atmosphere/en/',
    lastChecked: '2026-09-10',
    claimTags: ['atmosphere-basics'],
  },
  {
    id: 'nasa-weather-climate',
    institution: 'NASA',
    title: "What's the Difference Between Weather and Climate?",
    url: 'https://science.nasa.gov/kids/videos/video-whats-the-difference-between-weather-and-climate/',
    lastChecked: '2026-09-10',
    claimTags: ['weather-climate'],
  },
  {
    id: 'nasa-glacier-basics',
    institution: 'NASA',
    title: 'Frozen: Ice on Earth and Well Beyond',
    url: 'https://science.nasa.gov/earth/frozen-ice-on-earth-and-well-beyond/',
    lastChecked: '2026-09-10',
    claimTags: ['glacier-basics'],
  },
  {
    id: 'nasa-sea-level',
    institution: 'NASA',
    title: 'How Do We Measure Sea Level?',
    url: 'https://science.nasa.gov/kids/earth/how-do-we-measure-sea-level/',
    lastChecked: '2026-09-10',
    claimTags: ['sea-level', 'land-ice-melt'],
  },
  {
    id: 'nasa-local-sea-level',
    institution: 'NASA',
    title: 'Sea Level 101, Part Two: All Sea Level is Local',
    url: 'https://science.nasa.gov/earth/climate-change/sea-level-101-part-two-all-sea-level-is-local/',
    lastChecked: '2026-09-10',
    claimTags: ['local-sea-level', 'thermal-expansion'],
  },
  {
    id: 'usgs-drought-basics',
    institution: 'U.S. Geological Survey',
    title: 'What is streamflow drought?',
    url: 'https://labs.waterdata.usgs.gov/visualizations/what-is-drought/index.html',
    lastChecked: '2026-09-10',
    claimTags: ['drought-basics'],
  },
  {
    id: 'usgs-fire-drought',
    institution: 'U.S. Geological Survey',
    title: 'Fire and drought',
    url: 'https://www.usgs.gov/publications/fire-and-drought',
    lastChecked: '2026-09-10',
    claimTags: ['drought-fire', 'wildfire-multifactor'],
  },
  {
    id: 'usgs-wildfire-risk',
    institution: 'U.S. Geological Survey',
    title: 'Reducing Wildfire Risks with Science',
    url: 'https://www.usgs.gov/programs/ecosystems-land-change-science-program/science/reducing-wildfire-risks-science',
    lastChecked: '2026-09-10',
    claimTags: ['wildfire-risk'],
  },
  {
    id: 'usgs-ecosystems',
    institution: 'U.S. Geological Survey',
    title: 'Ecosystems',
    url: 'https://www.usgs.gov/science/science-explorer/biology/ecosystems',
    lastChecked: '2026-09-10',
    claimTags: ['ecosystems'],
  },
  {
    id: 'noaa-ocean-acidification',
    institution: 'NOAA',
    title: 'What is Ocean Acidification?',
    url: 'https://oceanservice.noaa.gov/facts/acidification.html',
    lastChecked: '2026-09-10',
    claimTags: ['ocean-acidification'],
  },

  {
    id: 'unep-circularity',
    institution: 'UNEP',
    title: 'Advancing Sustainable Consumption & Production: Circularity in the Economy of Tomorrow',
    url: 'https://www.unep.org/resources/factsheet/advancing-sustainable-consumption-production-circularity-economy-tomorrow',
    lastChecked: '2026-09-10',
    claimTags: ['materials-circularity'],
  },
  {
    id: 'unep-marine-pollution',
    institution: 'UNEP',
    title: 'Plastic pollution & marine litter',
    url: 'https://www.unep.org/topics/ocean-seas-and-coasts/ecosystem-degradation-pollution/plastic-pollution-marine-litter',
    lastChecked: '2026-09-10',
    claimTags: ['marine-pollution'],
  },
  {
    id: 'fao-forest-resources-2025',
    institution: 'FAO',
    title: 'Global Forest Resources Assessment 2025',
    url: 'https://www.fao.org/forest-resources-assessment/past-assessments/fra-2025/en',
    lastChecked: '2026-09-10',
    claimTags: ['forest-resources'],
  },
  {
    id: 'epa-water-efficiency',
    institution: 'U.S. EPA',
    title: 'Using Water Efficiently',
    url: 'https://www.epa.gov/watersense/using-water-efficiently',
    lastChecked: '2026-09-10',
    claimTags: ['water-efficiency'],
  },
  {
    id: 'ipbes-global-assessment',
    institution: 'IPBES',
    title: 'Global Assessment of Biodiversity and Ecosystem Services',
    url: 'https://ict.ipbes.net/ipbes-ict-guide/data-and-knowledge-management/citations-of-ipbes-assessments/global-assessment',
    lastChecked: '2026-09-10',
    claimTags: ['biodiversity'],
  },
  {
    id: 'iea-renewables-2025',
    institution: 'IEA',
    title: 'Renewables 2025',
    url: 'https://www.iea.org/reports/renewables-2025',
    lastChecked: '2026-09-10',
    claimTags: ['renewables'],
  },
  {
    id: 'unep-sustainable-consumption',
    institution: 'UNEP',
    title: 'Sustainable consumption and production policies',
    url: 'https://www.unep.org/explore-topics/resource-efficiency/what-we-do/policy-and-strategy/sustainable-consumption-and',
    lastChecked: '2026-09-10',
    claimTags: ['sustainable-consumption'],
  },
];

export const scienceSourcesById = Object.fromEntries(
  scienceSources.map((source) => [source.id, source]),
) as Record<string, ScienceSource>;

export const sourceRequirementsByLesson: Record<string, ScienceClaimTag[]> = {
  atmosphere: ['atmosphere-basics'],
  'weather-climate': ['weather-climate'],
  glaciers: ['glacier-basics', 'land-ice-melt'],
  'sea-level': ['sea-level', 'land-ice-melt', 'local-sea-level'],
  drought: ['drought-basics', 'drought-fire'],
  'wildfire-extreme-weather': ['drought-fire', 'wildfire-risk'],
  habitats: ['ecosystems'],
  'ocean-change': ['ocean-acidification'],
};



export const sourceRequirementsByChallenge: Record<string, ScienceClaimTag[]> = {
  'weather-detective': ['weather-climate'],
  'coastal-city': ['sea-level', 'land-ice-melt'],
  'dry-season': ['drought-basics', 'drought-fire', 'wildfire-multifactor'],
  'living-network': ['ecosystems'],
};

export const sourceRequirementsByListening: Record<string, ScienceClaimTag[]> = {
  atmosphere: ['atmosphere-basics'],
  'weather-climate': ['weather-climate'],
  glaciers: ['glacier-basics'],
  'sea-level': ['land-ice-melt', 'thermal-expansion'],
  drought: ['drought-basics'],
  'wildfire-extreme-weather': ['drought-fire', 'wildfire-risk', 'wildfire-multifactor'],
  habitats: ['ecosystems'],
  'ocean-change': ['ocean-acidification'],
};

export function resolveScienceSources(sourceIds: readonly string[]): ScienceSource[] {
  return sourceIds.flatMap((id) => {
    const source = scienceSourcesById[id];
    return source ? [source] : [];
  });
}
