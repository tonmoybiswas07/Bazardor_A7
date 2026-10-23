
import Link from "next/link";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f0f5f0] px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-green-100 bg-white p-6 shadow-xl shadow-green-900/5 sm:p-9">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-600 text-2xl">
            🛒
          </span>
          <span className="text-2xl font-extrabold text-gray-900">
            বাজার<span className="text-green-600"> দর</span>
          </span>
        </Link>

        {/* Heading */}
        <div className="mb-8 mt-8 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">
            অ্যাকাউন্ট তৈরি করুন
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            বাজারের আপডেট পেতে আজই যোগ দিন
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-semibold text-gray-700">
              আপনার নাম
            </label>
            <input
              id="name"
              type="text"
              placeholder="সম্পূর্ণ নাম লিখুন"
              required
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
            />
          </div>
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-semibold text-gray-700">
              আপনার ছবি
            </label>
            <input
              id="image"
              type="text"
              placeholder=""
              required
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-700">
              ইমেইল অ্যাড্রেস
            </label>
            <input
              id="email"
              type="email"
              placeholder="আপনার ইমেইল লিখুন"
              required
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-semibold text-gray-700">
              পাসওয়ার্ড
            </label>
            <input
              id="password"
              type="password"
              placeholder="কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড"
              minLength={6}
              required
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
            />
          </div>

          <button
            type="button"
            className="w-full rounded-xl bg-green-600 py-3.5 font-bold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700 active:scale-[0.98]"
          >
            অ্যাকাউন্ট তৈরি করুন
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-400">অথবা</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Google and github Button */}
         <div className="flex flex-col gap-5">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
                transform="translate(2 2) scale(.92)"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.42 37.94 46.98 31.81 46.98 24.55Z"
                transform="translate(1 1) scale(.92)"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.2A23.93 23.93 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z"
                transform="translate(2 2) scale(.92)"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.14 1.44-4.89 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 43.62 14.62 48 24 48Z"
                transform="translate(2 0) scale(.92)"
              />
            </svg>
            Google দিয়ে চালিয়ে যান
          </button>
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3 font-semibold text-gray-800 transition hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425
      2.865 8.18 6.839 9.504.5.092.682-.217.682-.483
      0-.237-.009-.866-.014-1.7-2.782.605-3.369-1.343
      -3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466
      -.908-.62.069-.608.069-.608 1.003.07 1.531 1.032
      1.531 1.032.892 1.53 2.341 1.088 2.91.832.092
      -.647.35-1.088.636-1.338-2.22-.253-4.555-1.113
      -4.555-4.951 0-1.093.39-1.988 1.029-2.688
      -.103-.253-.446-1.272.098-2.65 0 0 .84-.27
      2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004
      1.705.115 2.504.337 1.909-1.295 2.748-1.025
      2.748-1.025.546 1.378.202 2.397.1 2.65.64.7
      1.028 1.595 1.028 2.688 0 3.847-2.339 4.695
      -4.566 4.944.359.31.678.921.678 1.856 0 1.34
      -.012 2.42-.012 2.75 0 .268.18.58.688.482A10.019
      10.019 0 0 0 22 12.017C22 6.484 17.523 2 12 2Z"
              />
            </svg>
            Continue with GitHub
          </button>
        </div>

        {/* Login Link */}
        <p className="mt-7 text-center text-sm text-gray-500">
          আগে থেকেই অ্যাকাউন্ট আছে?{" "}
          <Link href="/Auth/SignIn" className="font-bold text-green-600 hover:underline">
            লগইন করুন
          </Link>
        </p>

        <Link href="/" className="mt-5 block text-center text-sm text-gray-400 hover:text-green-600">
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}