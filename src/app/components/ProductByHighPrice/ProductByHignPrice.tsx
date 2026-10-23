
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

const ProductByHighPrice = async () => {
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

  const filteredPriceUpData = [...data]
    .filter((product) => Number(product.change?.pct) > 0)
    .sort(
      (a, b) =>
        Number(b.change?.pct) - Number(a.change?.pct)
    )
    .slice(0, 6);

  return (
    <section className="bg-gray-50  px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-red-600">
              Price Increase
            </p>

            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              আজ দাম বেড়েছে
            </h2>

            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              যেসব পণ্যের দাম বেড়েছে, সেগুলো এক নজরে দেখুন।
            </p>
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPriceUpData.map((product, index) => (
            <Link
              key={product.id}
              href={`/ProductsDetails/${product.id}`}
              className="group relative overflow-hidden rounded-2xl border border-red-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-300 hover:shadow-lg"
            >
              {/* Rank */}
              <div className="flex items-start justify-between">
                <span className="rounded-lg bg-red-50 px-3 py-1 text-xs font-bold text-red-700">
                  #{index + 1} Price Increase
                </span>

                <span className="text-3xl transition-transform duration-300 group-hover:scale-110">
                  {product.categoryIcon || "🛒"}
                </span>
              </div>

              {/* Product Name */}
              <h3 className="mt-5 text-lg font-bold text-gray-800 transition-colors group-hover:text-red-600">
                {product.nameBn}
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                প্রতি {product.unit}
              </p>

              {/* Price */}
              <div className="mt-4 flex items-end justify-between gap-2">
                <p className="text-2xl font-extrabold text-red-600">
                  ৳{Number(product.today).toLocaleString("bn-BD")}
                </p>

                <span className="text-sm text-gray-400">
                  টাকা
                </span>
              </div>

              {/* Price Change */}
              {product.change && (
                <div className="mt-4 border-t border-gray-100 pt-3">
                  <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-600">
                    ▲ +{Number(product.change.pct).toFixed(1)}%
                  </span>

                  <span className="ml-2 text-xs text-gray-500">
                    দাম বৃদ্ধি
                  </span>
                </div>
              )}

              {/* Bottom Accent */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-red-600 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductByHighPrice;
