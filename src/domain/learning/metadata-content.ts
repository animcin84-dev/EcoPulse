import { knowledgeGraph } from '../../content/knowledge-graph.ts';
import { worldPresentation } from '../../content/lesson-presentation.ts';

export type PublicMetadataContent = {
  title: string;
  description: string;
};

const staticMetadata: Record<string, PublicMetadataContent> = {
  '/': {
    title: 'EcoPulse — Learn English. Understand Earth.',
    description: 'Learn environmental English through connected Earth systems, critical thinking, review and small real-world actions.',
  },
  '/learn': {
    title: 'Learn Environmental English — EcoPulse',
    description: 'Explore EcoPulse worlds and build environmental English through connected lessons, practice, reasoning and review.',
  },
  '/explore': {
    title: 'Explore Earth Connections — EcoPulse',
    description: 'Explore how atmosphere, climate, glaciers, drought, wildfire, habitats, oceans and ecosystems connect in EcoPulse.',
  },
  '/challenges': {
    title: 'Eco Missions — EcoPulse',
    description: 'Take EcoPulse learning off-screen with safe, optional environmental observation and reflection missions.',
  },
  '/about': {
    title: 'How EcoPulse Works — Science & Learning Method',
    description: 'See how EcoPulse connects environmental English, semantic relationships, evidence-based mastery, official science sources, privacy and accessible learning.',
  },
};

export function publicMetadataForPath(pathname: string): PublicMetadataContent | null {
  return staticMetadata[pathname] ?? null;
}

export function worldMetadataForId(worldId: string): PublicMetadataContent | null {
  const world = worldPresentation[worldId];
  if (!world) return null;
  return {
    title: `${world.name} — EcoPulse`,
    description: world.description.en,
  };
}

export function conceptMetadataForId(conceptId: string): PublicMetadataContent | null {
  const node = knowledgeGraph.nodes.find((candidate) => candidate.id === conceptId);
  if (!node) return null;
  return {
    title: `${node.label.en} — EcoPulse`,
    description: node.description.en,
  };
}
