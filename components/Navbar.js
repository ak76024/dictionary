import React from 'react';
import Image from "next/image";
import Link from 'next/link';
const Navbar = () => {
    return (
        <nav className="flex items-center justify-around">
            <Link href="/">
                <p className="text-3xl tracking-widest">Ak76024</p>
            </Link>
            <div className="flex items-center gap-5">
                <Link target="_blank" href="https://ak76024.netlify.app/">
                    <div className="p-5 rounded-full bg-[url('/ak76024.png')] bg-cover bg-no-repeat bg-center"></div>
                </Link>
                <Link target="_blank" href="https://www.instagram.com/ak76024/" rel="noopener noreferrer">
                    <Image src="/instagram.svg" alt="Instagram" width={30} height={30} />
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;