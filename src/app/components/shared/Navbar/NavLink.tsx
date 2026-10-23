
import Link from "next/link";

interface Category {
  slug: string;
  icon: string;
  nameBn: string;
}

const NavLink = async () => {
  const resData = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories",
    {
      next: { revalidate: 3600 },
    }
  );

  if (!resData.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data: Category[] = await resData.json();

  return (
    <nav
      aria-label="পণ্যের ক্যাটাগরি"
      className="w-full border-b border-green-100 bg-white"
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-5 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto py-3 sm:gap-3 md:justify-center md:gap-4 lg:gap-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {data.map((nav) => (
            <Link
              key={nav.slug}
              href={`/category/${nav.slug}`}
              className="group inline-flex shrink-0 items-center gap-2 rounded-xl border border-transparent px-3 py-2.5 text-sm font-medium text-gray-600 transition-all duration-200 hover:border-green-200 hover:bg-green-50 hover:text-green-700 active:scale-95 sm:px-4 sm:text-base"
            >
              <span className="text-lg transition-transform duration-200 group-hover:scale-110 sm:text-xl">
                {nav.icon}
              </span>

              <span className="whitespace-nowrap">
                {nav.nameBn}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavLink;
