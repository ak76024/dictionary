import { Suspense } from 'react';

function Loading() {
  return (
    <div className="text-white p-10 text-xl">
      Loading...
    </div>
  );
}

function WordPageClient() {
  "use client";
  import { useEffect, useState } from 'react';
  import { useSearchParams } from 'next/navigation';
  import Navbar from '@/components/Navbar';

  const searchParams = useSearchParams();
  const word = searchParams.get("word");

  const [definition, setDefinition] = useState(null);
  const [error, setError] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);

  useEffect(() => {
    if (!word) return;

    const fetchDefinition = async () => {
      try {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!res.ok) throw new Error("Word not found");
        const data = await res.json();
        setDefinition(data);
        setError(null);

        const phonetics = data[0]?.phonetics || [];
        const audio = phonetics.find(p => p.audio)?.audio;
        if (audio) setAudioUrl(audio);
      } catch (err) {
        setDefinition(null);
        setAudioUrl(null);
        setError(err.message);
      }
    };

    fetchDefinition();
  }, [word]);

  useEffect(() => {
    if (word) {
      document.title = `Definition of ${word} | AED Dictionary`;
    } else {
      document.title = 'AED Dictionary';
    }
  }, [word]);

  if (!word) {
    return (
      <div className="w-full min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <Navbar />
        <p className="text-2xl">Please provide a word in the URL query.</p>
        <p className="text-gray-400 text-sm mt-2">Try: <code>?word=example</code></p>
      </div>
    );
  }

  return (
    <div className="w-[100vw] text-white">
      <div className="min-h-[100vh] bg-[url('/banner.png')] bg-cover bg-no-repeat bg-center">
        <div className="min-h-[100vh] w-full bg-[#000000c2] p-5">
          <Navbar />
          <div className="flex flex-col gap-10 items-center justify-center py-10">
            <div className="flex gap-3 text-4xl">
              <span className="font-bold">AED</span>
              <span className="pl-0.5 bg-red-600"></span>
              <span>Ak76024 English Dictionary</span>
            </div>

            {error && <p className="text-red-400">❌ {error}</p>}

            {definition && (
              <>
                <div className="flex gap-5 items-center">
                  <span className="text-3xl">{word}</span>
                  <button
                    onClick={() => {
                      if (audioUrl) {
                        new Audio(audioUrl).play();
                      }
                    }}
                    className="flex items-center outline outline-white bg-[#0074f877] cursor-pointer active:scale-90 rounded-full p-2 transition-all duration-150 ease-in-out"
                  >
                    🔊
                  </button>
                </div>

                <div className="max-w-xl bg-black text-white p-4 rounded shadow">
                  <h2 className="text-xl font-bold mb-2">Definition of {word}:</h2>
                  {definition[0]?.meanings?.map((meaning, i) => (
                    <div key={i} className="mb-3">
                      <p className="font-semibold">{meaning.partOfSpeech}</p>
                      <ul className="list-disc list-inside">
                        {meaning.definitions?.map((def, j) => (
                          <li key={j}>
                            {def.definition}
                            {def.example && (
                              <p className="text-sm text-gray-400 ml-4">Example: {def.example}</p>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Main page component
export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <WordPageClient />
    </Suspense>
  );
}
