
import Link from "next/link";
import Image from "next/image";
import marketBasket from "@/../public/bazar-hero.png";
import NavTime from "../shared/Navbar/NavTime";
import { Suspense } from "react";

const HeroBanner = () => {
  return (
    <section className="bg-[#f1f6f0] px-3 py-4 sm:px-5 sm:py-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-5 overflow-hidden rounded-3xl border border-green-100 bg-white/80 px-5 py-7 shadow-sm sm:px-8 sm:py-9 md:grid-cols-[1.5fr_0.8fr] md:px-10 lg:px-12 lg:py-10">
        {/* Left Content */}
        <div className="relative z-10">
          {/* Date Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-1.5 text-xs font-semibold text-green-800 sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-green-600" />
              <Suspense fallback={<span>লোড হচ্ছে...</span>}>
                    <NavTime />
                  </Suspense>
          </div>

          {/* Heading */}
          <h1 className="max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-[#1f2b21] sm:text-4xl lg:text-5xl lg:leading-[1.2]">
            আজকের বাজারের দাম{" "}
            <span className="text-green-700">এক নজরে</span>
          </h1>

          {/* Description */}
          <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
            বাজারভিত্তিক বিস্তৃতি, গড়, সর্বনিম্ন-সর্বোচ্চ
            এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* CTA */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/products"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-700 to-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-green-700/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-green-800 hover:to-emerald-700 hover:shadow-xl active:scale-95 sm:px-6 sm:py-3.5"
            >
              সব পণ্যদাম দেখুন
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

           
          </div>

          {/* Trust Indicators */}
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-500 sm:text-sm">
            <span className="flex items-center gap-1.5">
              <span className="text-green-600">✓</span>
              দৈনিক বাজারদর
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-green-600">✓</span>
              সহজ মূল্য তুলনা
            </span>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="relative mx-auto flex w-full max-w-sm items-center justify-center md:max-w-none">
          <div className="absolute h-48 w-48 rounded-full bg-green-100/70 blur-3xl sm:h-64 sm:w-64" />

          <Image
            src={marketBasket}
            alt="তাজা শাকসবজি ও বাজারের পণ্যে ভরা ঝুড়ি"
            width={420}
            height={360}
            priority
            className="relative z-10 h-auto w-56 object-contain drop-shadow-sm sm:w-72 md:w-full md:max-w-[360px] lg:max-w-[400px]"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
