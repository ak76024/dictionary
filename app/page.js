"use client"
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Home() {
  const textColor = "#fff";

  const router = useRouter();

  const [word, setword] = useState("")

  const searchWord =()=>{
    router.push(`/word?word=${word}`)
  }
  return (
    <div className="w-[100vw]" style={{ color: textColor }}>
      <div className="h-[100vh] bg-[url('/banner.png')] bg-cover bg-no-repeat bg-center">
        <div className="h-full w-full bg-[#000000c2] p-5">
          <Navbar />
          <div className="flex flex-col items-center justify-center py-10">
            <div className="flex gap-3 text-4xl"><span className="font-bold">AED</span><span className="pl-0.5 bg-red-600"></span><span>Ak76024 English Dictionary</span></div>
            <div className="flex items-center gap-3 p-5 py-3 rounded-full bg-white my-10 text-black">
              <div className="font-bold">Dictionary</div>
              <input tabIndex={1} type="text" onChange={(e)=>setword(e.target.value)} value={word} className="p-1 text-lg focus:outline-blue-800 rounded-xl w-[20vw] placeholder:text-[#181818]" placeholder="Enter word here" />
              <button tabIndex={2} onClick={searchWord}>
                <svg className="w-6 h-6 text-gray-800 dark:text-black hover:scale-125 transition-all duration-150 active:scale-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 