"use client";

import { authClient } from "@/app/lib/auth-client";
import {
  LogIn,
  LogOut,
  Mail,
  UserPlus,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

const UserInfoPage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Sign out failed!");
        return;
      }

      toast.success("Sign out successful!");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (isPending) {
    return (
      <div className="flex h-9 w-9 items-center justify-center sm:h-10 sm:w-auto sm:gap-2 sm:rounded-xl sm:border sm:border-gray-200 sm:bg-white sm:px-3">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-green-600 border-t-transparent" />
        <span className="hidden text-sm text-gray-500 sm:inline">
          Loading...
        </span>
      </div>
    );
  }

  return (
    <div>
      {user ? (
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white p-1.5 shadow-sm sm:gap-3 sm:rounded-2xl sm:p-2">

          {/* User Information */}
          <div className="flex min-w-0 items-center gap-2 sm:gap-3 sm:px-2">

            {/* Profile Image */}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-sm sm:h-11 sm:w-11">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "User"}
                  width={44}
                  height={44}
                  unoptimized
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserRound size={20} />
              )}
            </div>

            {/* Name, Email and My Profile */}
            <div className="hidden min-w-0 sm:block">
              <p className="max-w-[150px] truncate text-sm font-bold text-gray-800">
                {user.name || "Welcome User"}
              </p>

              <div className="flex items-center gap-1.5">
                <Mail
                  size={13}
                  className="shrink-0 text-gray-400"
                />

                <p className="max-w-[150px] truncate text-xs text-gray-500">
                  {user.email}
                </p>
              </div>

              <Link
                href="/profile"
                className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-green-600 transition-colors hover:text-green-800 hover:underline"
              >
                <UserRound size={13} />
                <span>My Profile</span>
              </Link>
            </div>

           
            <Link
              href="/profile"
              aria-label="My Profile"
              title="My Profile"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-700 transition-colors hover:bg-green-100 sm:hidden"
            >
              <UserRound size={18} />
            </Link>
          </div>

          {/* Divider */}
          <div className="h-7 w-px bg-gray-200 sm:h-9" />

          {/* Sign Out */}
          <button
            type="button"
            onClick={handleSignOut}
            aria-label="Sign Out"
            title="Sign Out"
            className="group flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-600 transition-all duration-300 hover:border-red-600 hover:bg-red-600 hover:text-white active:scale-95 sm:h-auto sm:w-auto sm:gap-2 sm:rounded-xl sm:px-3 sm:py-2.5 sm:text-sm sm:font-semibold"
          >
            <LogOut
              size={17}
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-1.5 sm:gap-3">

          {/* Sign In */}
          <Link
            href="/Auth/SignIn"
            className="group flex items-center gap-1 rounded-lg border border-green-200 bg-green-50 px-2 py-2 text-xs font-semibold text-green-700 transition-all duration-300 hover:border-green-500 hover:bg-green-100 active:scale-95 sm:gap-2 sm:rounded-xl sm:px-5 sm:py-2.5 sm:text-sm"
          >
            <LogIn
              size={15}
              className="shrink-0 transition-transform duration-300 group-hover:-translate-x-0.5 sm:h-[17px] sm:w-[17px]"
            />
            <span>সাইন ইন</span>
          </Link>

          {/* Sign Up */}
          <Link
            href="/Auth/SignUp"
            className="group flex items-center gap-1 rounded-lg bg-gradient-to-r from-emerald-600 to-green-500 px-2 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-300 hover:from-emerald-700 hover:to-green-600 active:scale-95 sm:gap-2 sm:rounded-xl sm:px-5 sm:py-2.5 sm:text-sm"
          >
            <UserPlus
              size={15}
              className="shrink-0 transition-transform duration-300 group-hover:scale-110 sm:h-[17px] sm:w-[17px]"
            />
            <span>সাইন আপ</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfoPage;