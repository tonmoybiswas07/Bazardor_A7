"use client"
import Link from "next/link";
import { Home, ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f0f5f0] px-4 py-12">
      {/* Background Decorations */}
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-green-200/40 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />

      <section className="relative w-full max-w-lg rounded-3xl border border-green-100 bg-white/80 px-6 py-10 text-center shadow-xl shadow-green-900/5 backdrop-blur-sm sm:px-10 sm:py-14">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-green-50 text-green-600 ring-1 ring-green-100 sm:h-24 sm:w-24">
          <SearchX size={44} strokeWidth={1.5} />
        </div>

        {/* 404 Text */}
        <h1 className="animate-pulse text-7xl font-black tracking-tight text-green-600 sm:text-8xl">
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-4 text-2xl font-extrabold text-[#202a22] sm:text-3xl">
          পেজটি খুঁজে পাওয়া যায়নি!
        </h2>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-gray-500 sm:text-base">
          দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি সরানো হয়েছে,
          নাম পরিবর্তন করা হয়েছে অথবা ঠিকানাটি ভুল।
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-green-600/20 transition duration-300 hover:-translate-y-0.5 hover:from-emerald-700 hover:to-green-600 hover:shadow-xl active:scale-95"
          >
            <Home size={18} />
            হোম পেজে ফিরে যান
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-green-200 bg-white px-6 py-3 text-sm font-bold text-green-700 transition duration-300 hover:border-green-500 hover:bg-green-50 active:scale-95"
          >
            <ArrowLeft size={18} />
            আগের পেজে ফিরুন
          </button>
        </div>

        {/* Footer */}
        <div className="mt-10 border-t border-green-100 pt-5">
          <p className="text-sm font-semibold text-gray-500">
            বাজার <span className="text-green-600">দর</span>
          </p>
          <p className="mt-1 text-xs text-gray-400">
            আপনার বাজারের বিশ্বস্ত সঙ্গী
          </p>
        </div>
      </section>
    </main>
  );
}