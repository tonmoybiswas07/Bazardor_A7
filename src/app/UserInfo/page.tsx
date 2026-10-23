import { LogIn, UserPlus } from "lucide-react";
import Link from "next/link";

const UserInfoPage = () => {
  return (
    <div className="flex items-center gap-3">
      {/* Sign In */}
      <Link
        href="/Auth/SignIn"
        className="group flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-5 py-2.5 text-sm font-semibold text-green-700 shadow-sm transition-all duration-300 hover:border-green-500 hover:bg-green-100 hover:text-green-800 hover:shadow-md active:scale-95"
      >
        <LogIn
          size={17}
          className="transition-transform duration-300 group-hover:-translate-x-0.5"
        />
        সাইন ইন
      </Link>

      {/* Sign Up */}
      <Link
        href="/Auth/SignUp"
        className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-green-500/20 transition-all duration-300 hover:from-emerald-700 hover:to-green-600 hover:shadow-lg active:scale-95"
      >
        <UserPlus
          size={17}
          className="transition-transform duration-300 group-hover:scale-110"
        />
        সাইন আপ
      </Link>
    </div>
  );
};

export default UserInfoPage;