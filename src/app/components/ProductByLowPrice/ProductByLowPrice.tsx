
import Link from "next/link";

interface Product {
  id: number | string;
  nameBn: string;
  categoryIcon?: string;
  today: number;
  unit: string;
  change?: {
    pct: number;
  };
}

const ProductByLowPrice = async () => {
  const resData = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    {
      next: { revalidate: 300 },
    }
  );

  if (!resData.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: Product[] = await resData.json();

  // Filter products whose prices have decreased
  const filteredPriceDownData = [...data]
    .filter((product) => Number(product.change?.pct) < 0)
    .sort(
      (a, b) =>
        Number(a.change?.pct) - Number(b.change?.pct)
    )
    .slice(0, 6);

  return (
    <section className="bg-gray-50  px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-green-600">
              Price Drop
            </p>

            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              দাম কমেছে যেসব পণ্যের
            </h2>

            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              বাজারে যেসব পণ্যের দাম কমেছে, সেগুলো এক নজরে দেখুন।
            </p>
          </div>

          <span className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700">
            সর্বোচ্চ ৬টি পণ্য
          </span>
        </div>

        {/* Product Cards */}
        {filteredPriceDownData.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPriceDownData.map((product, index) => (
              <Link
                key={product.id}
                href={`/newsdetails/${product.id}`}
                className="group relative overflow-hidden rounded-2xl border border-green-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg"
              >
                {/* Rank and Icon */}
                <div className="flex items-start justify-between">
                  <span className="rounded-lg bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                    #{index + 1} Price Drop
                  </span>

                  <span className="text-3xl transition-transform duration-300 group-hover:scale-110">
                    {product.categoryIcon || "🛒"}
                  </span>
                </div>

                {/* Product Name */}
                <h3 className="mt-5 text-lg font-bold text-gray-800 transition-colors group-hover:text-green-600">
                  {product.nameBn}
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  প্রতি {product.unit}
                </p>

                {/* Current Price */}
                <div className="mt-4 flex items-end justify-between gap-2">
                  <p className="text-2xl font-extrabold text-gray-900">
                    ৳{Number(product.today).toLocaleString("bn-BD")}
                  </p>

                  <span className="text-sm text-gray-400">
                    টাকা
                  </span>
                </div>

                {/* Price Decrease */}
                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                  <span className="text-xs text-gray-500">
                    দাম কমেছে
                  </span>

                  <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1.5 text-sm font-bold text-green-700">
                    ▼{" "}
                    {Math.abs(Number(product.change?.pct)).toFixed(1)}%
                  </span>
                </div>

                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-green-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-green-200 bg-white p-8 text-center">
            <p className="text-3xl">📉</p>

            <h3 className="mt-3 font-bold text-gray-800">
              বর্তমানে দাম কমেনি
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              দাম কমলে এখানে পণ্যগুলো দেখা যাবে।
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductByLowPrice;
