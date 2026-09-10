import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AppNav } from '@/components/navigation/AppNav';
import { ConceptDetailView } from '@/components/explore/ConceptDetailView';
import { knowledgeGraph } from '@/content/knowledge-graph';
import { resolveConceptDetail } from '@/domain/learning/concept-detail';
import { conceptMetadataForId } from '@/domain/learning/metadata-content';

export function generateStaticParams() {
  return knowledgeGraph.nodes.map((node) => ({ slug: node.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const content = conceptMetadataForId(slug);
  if (!content) return { title: 'Concept — EcoPulse', robots: { index: false, follow: false } };
  return content;
}

export default async function ConceptPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!resolveConceptDetail(slug)) notFound();
  return (
    <main className="product-page product-page--dark">
      <AppNav />
      <ConceptDetailView conceptId={slug} />
    </main>
  );
}
