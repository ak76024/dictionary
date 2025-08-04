"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { useSearchParams } from 'next/navigation';

const Page = () => {
    const searchParams = useSearchParams();
    const word = searchParams.get("word");
    const textColor = "#fff";

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
                if (audio) {
                    setAudioUrl(audio);
                }
            } catch (err) {
                setDefinition(null);
                setAudioUrl(null);
                setError(err.message);
            }
        };

        fetchDefinition();
    }, [word]);

    return (
        <div className="w-[100vw]" style={{ color: textColor }}>
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
                                <div className='flex gap-5 items-center'>
                                    <span className='text-3xl'>{word}</span>
                                    <button onClick={() => {
                                        if (audioUrl) {
                                            new Audio(audioUrl).play();
                                        }
                                    }} className='flex items-center outline outline-white bg-[#0074f877] cursor-pointer active:scale-90 rounded-full p-2 transition-all duration-150 ease-in-out'>
                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M13 6.037c0-1.724-1.978-2.665-3.28-1.562L5.638 7.933H4c-1.105 0-2 .91-2 2.034v4.066c0 1.123.895 2.034 2 2.034h1.638l4.082 3.458c1.302 1.104 3.28.162 3.28-1.562V6.037Z" />
                                            <path fillRule="evenodd" d="M14.786 7.658a.988.988 0 0 1 1.414-.014A6.135 6.135 0 0 1 18 12c0 1.662-.655 3.17-1.715 4.27a.989.989 0 0 1-1.414.014 1.029 1.029 0 0 1-.014-1.437A4.085 4.085 0 0 0 16 12a4.085 4.085 0 0 0-1.2-2.904 1.029 1.029 0 0 1-.014-1.438Z" clipRule="evenodd" />
                                            <path fillRule="evenodd" d="M17.657 4.811a.988.988 0 0 1 1.414 0A10.224 10.224 0 0 1 22 12c0 2.807-1.12 5.35-2.929 7.189a.988.988 0 0 1-1.414 0 1.029 1.029 0 0 1 0-1.438A8.173 8.173 0 0 0 20 12a8.173 8.173 0 0 0-2.343-5.751 1.029 1.029 0 0 1 0-1.438Z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="max-w-xl bg-black text-white p-4 rounded shadow">
                                    <h2 className="text-xl font-bold mb-2">Definition of {word}:</h2>
                                    {definition[0]?.meanings?.map((meaning, i) => (
                                        <div key={i} className="mb-3">
                                            <p className="font-semibold">{meaning.partOfSpeech}</p>
                                            <ul className="list-disc list-inside">
                                                {meaning.definitions?.map((def, j) => (
                                                    <li key={j}>{def.definition}</li>
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
};
export default Page;