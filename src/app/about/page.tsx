import type { Metadata } from 'next';
import { MethodologyExperience } from '@/components/about/MethodologyExperience';
import { publicMetadataForPath } from '@/domain/learning/metadata-content';

export const metadata: Metadata = publicMetadataForPath('/about')!;

export default function AboutPage() {
  return <MethodologyExperience />;
}
