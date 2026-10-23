
import Link from "next/link";
import MarqueeText from "react-marquee-text";

interface Product {
  id: number | string;
  categoryIcon?: string;
  nameBn: string;
  today: number;
  unit: string;
  change: {
    pct: number;
  };
}

const Marquee = async () => {
  const resData = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    {
      next: { revalidate: 300 },
    }
  );

  if (!resData.ok) {
    throw new Error("Failed to fetch product prices");
  }

  const data: Product[] = await resData.json();

  return (
    <section
      aria-label="আজকের বাজার দর"
      className="w-full overflow-hidden border-y border-green-100 bg-white"
    >
      <div className="flex h-14 items-stretch">
        {/* Ticker Label */}
        <div className="relative z-10 flex shrink-0 items-center gap-2 bg-gradient-to-r from-emerald-700 to-green-600 px-3 text-white shadow-md sm:px-5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-300 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lime-300" />
          </span>

          <span className="whitespace-nowrap text-xs font-bold sm:text-sm">
            আজকের বাজার দর
          </span>
        </div>

        {/* Scrolling Products */}
        <div className="min-w-0 flex-1 overflow-hidden bg-green-50/70">
          <MarqueeText direction="right" duration={30}>
            {data.map((product) => {
              const change = Number(product.change?.pct ?? 0);
              const isUp = change > 0;
              const isDown = change < 0;

              return (
                <Link
                  href={`/ProductsDetails/${product.id}`}
                  key={product.id}
                  className="group mx-1 inline-flex h-14 items-center gap-2 border-r border-green-100 px-3 transition-colors duration-200 hover:bg-green-100 sm:gap-2.5 sm:px-5"
                >
                  {/* Product Icon */}
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm ring-1 ring-green-100 transition-transform duration-200 group-hover:scale-110">
                    {product.categoryIcon || "🛒"}
                  </span>

                  {/* Product Name */}
                  <span className="whitespace-nowrap text-xs font-semibold text-gray-700 transition-colors group-hover:text-green-700 sm:text-sm">
                    {product.nameBn}
                  </span>

                  {/* Price */}
                  <span className="whitespace-nowrap text-sm font-extrabold text-gray-900 sm:text-base">
                    ৳{product.today}
                    <span className="ml-1 text-xs font-medium text-gray-500">
                      /{product.unit}
                    </span>
                  </span>

                  {/* Price Change */}
                  <span
                    className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-1 text-xs font-bold ${
                      isUp
                        ? "bg-green-100 text-green-700"
                        : isDown
                          ? "bg-red-50 text-red-600"
                          : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {isUp ? "▲" : isDown ? "▼" : "●"}
                    {change > 0 ? "+" : ""}
                    {change.toFixed(1)}%
                  </span>
                </Link>
              );
            })}
          </MarqueeText>
        </div>
      </div>
    </section>
  );
};

export default Marquee;
