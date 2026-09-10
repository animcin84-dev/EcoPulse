import type { Metadata } from 'next';
import { AppNav } from '@/components/navigation/AppNav';
import { TopicLab } from '@/components/learning/TopicLab';
import { topicLabs } from '@/content/topic-labs';

const lab = topicLabs['sustainable-consumption'];

export const metadata: Metadata = {
  title: `${lab.title.en} — EcoPulse`,
  description: lab.overview.en,
};

export default function TopicPage() {
  return <main className="product-page"><AppNav /><TopicLab lab={lab} /></main>;
}
