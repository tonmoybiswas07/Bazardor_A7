import { Suspense } from "react";
import NavTime from "./NavTime";
import Image from "next/image";
import Link from "next/link";
import navLogo from "../../../../../public/logo-icon.png";
import UserInfoPage from "@/app/UserInfo/page";
import NavLink from "./NavLink";

const Navbar = () => {
  return (
    <div>
      <header className="sticky top-0 z-50 w-full border-b border-green-100 bg-white/95 shadow-sm backdrop-blur-md">
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-5 md:px-6 lg:px-8">
          {/* Logo and Branding */}
          <Link
            href="/"
            className="group flex min-w-0 flex-1 items-center gap-2 sm:gap-3"
          >
            {/* Logo */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-green-500 p-1.5 shadow-md shadow-green-600/20 transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-12 sm:rounded-2xl sm:p-2 md:h-14 md:w-14">
              <Image
                src={navLogo}
                alt="বাজার দর লোগো"
                width={50}
                height={50}
                priority
                className="h-full w-full object-contain"
              />
            </div>

            {/* Brand Name and Date */}
            <div className="min-w-0">
              <h1 className="truncate text-base font-extrabold leading-tight tracking-tight text-gray-900 sm:text-xl md:text-2xl">
                বাজার <span className="text-green-600">দর</span>
              </h1>

              <div className="mt-1 flex min-w-0 items-center gap-1.5 text-[10px] leading-tight text-gray-500 sm:text-xs md:text-sm">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-500 sm:h-2 sm:w-2" />

                <div className="min-w-0 truncate">
                  <Suspense fallback={<span>লোড হচ্ছে...</span>}>
                    <NavTime />
                  </Suspense>
                </div>
              </div>
            </div>
          </Link>

          <div className="flex shrink-0 items-center">
            <UserInfoPage />
          </div>
        </nav>
      </header>

      <NavLink />
    </div>
  );
};

export default Navbar;
