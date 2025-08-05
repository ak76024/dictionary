import { Suspense } from 'react';
import WordClient from './WordClient';

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white p-10 text-xl">Loading...</div>}>
      <WordClient />
    </Suspense>
  );
}
