"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { LogOut, UserRound, Mail, Save } from "lucide-react";
import Image from "next/image";
import { toast } from "react-toastify";

export default function MyProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleSignOut = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Sign out failed!");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে!");
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে!");
    }
  };

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f0f5f0]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-600 border-t-transparent" />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f0f5f0] px-4">
        <div className="rounded-2xl border border-green-100 bg-white p-8 text-center shadow-sm">
          <UserRound className="mx-auto mb-4 text-green-600" size={40} />
          <h1 className="mb-2 text-xl font-bold text-gray-800">
            প্রোফাইল দেখতে লগইন করুন
          </h1>
          <a
            href="/Auth/SignIn"
            className="mt-4 inline-block rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            সাইন ইন
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-5xl">
        {/* Page Heading */}
        <div className="mb-7">
          <h1 className="text-2xl font-extrabold tracking-tight text-[#202a22] sm:text-3xl">
            আমার প্রোফাইল
          </h1>
          <p className="mt-1 text-sm text-gray-600 sm:text-base">
             অ্যাকাউন্টের তথ্য এখানে 
          </p>
        </div>

        {/* User Information Card */}
        <section className="mb-7 flex flex-col gap-5 rounded-2xl border border-[#dce6dd] bg-white/70 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex min-w-0 items-center gap-4">
            {/* Profile Image */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gray-100 sm:h-20 sm:w-20">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "User"}
                  width={80}
                  height={80}
                  unoptimized
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserRound size={34} className="text-gray-500" />
              )}
            </div>

            {/* Name and Email */}
            <div className="min-w-0">
              <h2 className="truncate text-lg font-semibold text-[#202a22] sm:text-xl">
                {user.name || "ব্যবহারকারী"}
              </h2>

              <p className="mt-1 flex items-center gap-1.5 break-all text-sm text-gray-600 sm:text-base">
                <Mail size={16} className="shrink-0" />
                {user.email}
              </p>
            </div>
          </div>

          {/* Sign Out */}
          <button
            type="button"
            onClick={handleSignOut}
            className="flex shrink-0 items-center justify-center gap-2 self-start rounded-lg border border-red-500 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 active:scale-95 sm:self-center"
          >
            <LogOut size={16} />
            সাইন আউট
          </button>
        </section>

        {/* Profile Details Form */}
        <section className="rounded-2xl border border-[#dce6dd] bg-white/70 p-5 sm:p-7">
          <h2 className="mb-7 text-lg font-bold text-[#202a22]">
            তথ্য
          </h2>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              toast.info("প্রোফাইল আপডেট করার API এখনো যুক্ত করা হয়নি।");
            }}
            className="space-y-5 sm:px-5"
          >
            {/* Name Field */}
            <div>
              <label
                htmlFor="profile-name"
                className="mb-2 block text-sm font-medium text-[#27332a]"
              >
                নাম
              </label>

              <input
                id="profile-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="আপনার নাম লিখুন"
                className="h-11 w-full rounded-xl border border-[#dce6dd] bg-transparent px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="profile-email"
                className="mb-2 block text-sm font-medium text-[#27332a]"
              >
                ইমেইল
              </label>

              <input
                id="profile-email"
                type="email"
                value={email}
                readOnly
                className="h-11 w-full rounded-xl border border-green-600 bg-transparent px-4 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 active:scale-95"
              >
                <Save size={16} />
                পরিবর্তন সংরক্ষণ
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}