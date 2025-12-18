"use client";

import Link from "next/link";
import Lottie from "lottie-react";
import catAnimation from "@/public/animations/cat-notfound.json";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-300 bg-white dark:bg-neutral-950">

            <div className="w-full max-w-[280px] md:max-w-[400px] mb-8 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-orange-100 dark:bg-orange-600/10 blur-3xl rounded-full -z-10"></div>

                <Lottie
                    animationData={catAnimation}
                    loop={true}
                    className="w-full h-auto drop-shadow-lg dark:drop-shadow-[0_10px_30px_rgba(234,88,12,0.15)]"
                />
            </div>

            <div className="text-center max-w-xl space-y-4 animate-in fade-in slide-in-from-bottom-5 duration-700">

                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                    Halaman <span className="text-orange-600">Tidak Ditemukan</span>
                </h1>

                <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                    Mohon maaf, halaman yang Anda tuju saat ini tidak tersedia, telah dipindahkan, atau tautan yang Anda gunakan tidak valid.
                </p>

                <div className="pt-8">
                    <Link
                        href="/"
                        className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white transition-all duration-200 bg-orange-600 rounded-full hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 dark:focus:ring-offset-neutral-900 shadow-md shadow-orange-600/20 hover:shadow-orange-600/40"
                    >
                        <svg
                            className="w-5 h-5 mr-2 -ml-1 transition-transform group-hover:-translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Kembali ke Beranda
                    </Link>
                </div>

            </div>

            <div className="absolute bottom-6 text-xs font-semibold text-neutral-400 dark:text-neutral-700 font-mono tracking-wider">
                Error 404 • Pura Agung Kertajaya
            </div>
        </div>
    );
}