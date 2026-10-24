import Image from "next/image";
import navLogo from "../../public/logo-icon.png";

export default function Loading() {
  return (
    <main className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-[#f0f5f0] px-4">
      {/* Background Decoration */}
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-green-200/30 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />

      <div className="relative flex w-full max-w-sm flex-col items-center rounded-3xl border border-green-100 bg-white/80 px-8 py-12 text-center shadow-xl shadow-green-900/5 backdrop-blur-sm">
        {/* Logo */}
        <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-green-500 p-3 shadow-lg shadow-green-600/20">
          <Image
            src={navLogo}
            alt="বাজার দর"
            width={64}
            height={64}
            priority
            className="h-full w-full object-contain"
          />

          {/* Pulse Ring */}
          <span className="absolute inset-0 animate-ping rounded-2xl border-2 border-green-400 opacity-20" />
        </div>

        {/* Brand */}
        <h1 className="text-3xl font-extrabold tracking-tight text-[#202a22]">
          বাজার <span className="text-green-600">দর</span>
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          আপনার বাজারের বিশ্বস্ত সঙ্গী
        </p>

        {/* Spinner */}
        <div
          role="status"
          aria-label="লোড হচ্ছে"
          className="relative mt-9 h-12 w-12"
        >
          <div className="absolute inset-0 rounded-full border-4 border-green-100" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-green-600 border-r-emerald-400" />
          <div className="absolute inset-3 rounded-full bg-green-100" />
        </div>

        <p className="mt-5 animate-pulse text-sm font-semibold text-green-700">
          একটু অপেক্ষা করুন...
        </p>

        {/* Animated Progress Indicator */}
        <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-green-100">
          <div className="h-full w-1/3 animate-bounce rounded-full bg-gradient-to-r from-emerald-500 to-green-600 [animation-duration:1.5s]" />
        </div>
      </div>
    </main>
  );
}