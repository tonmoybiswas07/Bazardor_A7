"use client";

import { useEffect, useState, type FormEvent } from "react";
import { authClient } from "@/lib/auth-client";
import {
  LogOut,
  UserRound,
  Mail,
  Save,
  Pencil,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

export default function MyProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setImageUrl(user.image || "");
    }
  }, [user]);

  const handleEditProfile = () => {
    setName(user?.name || "");
    setImageUrl(user?.image || "");
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setName(user?.name || "");
    setImageUrl(user?.image || "");
    setIsEditing(false);
  };

  const handleUpdateProfile = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("আপনার নাম লিখুন!");
      return;
    }

    if (imageUrl.trim()) {
      try {
        const parsedUrl = new URL(imageUrl.trim());

        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
          toast.error("সঠিক Profile Image URL দিন!");
          return;
        }
      } catch {
        toast.error("সঠিক Profile Image URL দিন!");
        return;
      }
    }

    setIsUpdating(true);

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
        image: imageUrl.trim() || null,
      });

      if (error) {
        toast.error(error.message || "Profile update failed!");
        return;
      }

      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
      setIsEditing(false);
    } catch {
      toast.error("প্রোফাইল আপডেট করা যায়নি। আবার চেষ্টা করুন!");
    } finally {
      setIsUpdating(false);
    }
  };

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
          <UserRound
            className="mx-auto mb-4 text-green-600"
            size={40}
          />

          <h1 className="mb-2 text-xl font-bold text-gray-800">
            প্রোফাইল দেখতে লগইন করুন
          </h1>

          <Link
            href="/Auth/SignIn"
            className="mt-4 inline-block rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            সাইন ইন
          </Link>
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
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
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

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleEditProfile}
              disabled={isEditing}
              className="flex items-center justify-center gap-2 rounded-lg border border-green-600 px-4 py-2.5 text-sm font-semibold text-green-700 transition hover:bg-green-50 active:scale-95 disabled:opacity-50"
            >
              <Pencil size={16} />
              Edit Profile
            </button>

            <button
              type="button"
              onClick={handleSignOut}
              className="flex items-center justify-center gap-2 rounded-lg border border-red-500 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 active:scale-95"
            >
              <LogOut size={16} />
              সাইন আউট
            </button>
          </div>
        </section>

        {/* Profile Form: only visible in edit mode */}
        {isEditing && (
          <section className="rounded-2xl border border-[#dce6dd] bg-white/70 p-5 sm:p-7">
            <div className="mb-7 flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-[#202a22]">
                প্রোফাইল সম্পাদনা
              </h2>

              <button
                type="button"
                onClick={handleCancelEdit}
                disabled={isUpdating}
                aria-label="Cancel editing"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleUpdateProfile}
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
                  name="name"
                  id="profile-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="আপনার নাম লিখুন"
                  required
                  maxLength={100}
                  className="border-b-2 border-b-green-700 h-11 w-full rounded-xl border border-[#dce6dd] bg-transparent px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
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
                  value={user.email || ""}
                  readOnly
                  className="h-11 w-full cursor-not-allowed border-b-2 border-b-green-700 rounded-xl border border-[#dce6dd] bg-gray-50 px-4 text-sm text-gray-500 outline-none"
                />

                <p className="mt-1 text-xs text-gray-500">
                  ইমেইল পরিবর্তন এই ফর্মে সমর্থিত নয়।
                </p>
              </div>

              {/* Profile Image URL */}
              <div>
                <label
                  htmlFor="profile-image"
                  className="mb-2 block text-sm font-medium text-[#27332a]"
                >
                  প্রোফাইল ছবির URL
                </label>

                <input
                  name="imageUrl"
                  id="profile-image"
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="h-11 w-full rounded-xl border-b-2 border-b-green-700 border border-[#dce6dd] bg-transparent px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col-reverse justify-end gap-3 pt-2 sm:flex-row">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  disabled={isUpdating}
                  className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                >
                  <X size={16} />
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Save size={16} />
                  {isUpdating
                    ? "সংরক্ষণ হচ্ছে..."
                    : "Save Changes"}
                </button>
              </div>
            </form>
          </section>
        )}
      </div>
    </main>
  );
}