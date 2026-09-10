'use client';

import { ErrorExperience } from '@/components/navigation/ErrorExperience';

export default function Error({ reset }: { reset: () => void }) {
  return <ErrorExperience reset={reset} />;
}
