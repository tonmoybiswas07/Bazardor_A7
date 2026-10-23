
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

const AllProductPage = async () => {
  const resData = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    {
      next: { revalidate: 300 },
    }
  );

  if (!resData.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: Product[] = await resData.json();

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-green-600">
            Product Library
          </p>

          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            সকল পণ্য
          </h1>

          <p className="mt-2 text-gray-600">
            বাজারের সব পণ্যের বর্তমান দাম এক জায়গায় দেখুন।
          </p>

          <p className="mt-4 text-sm font-medium text-gray-500">
            মোট পণ্য:{" "}
            <span className="font-bold text-green-600">
              {products.length}
            </span>
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 ">
            {products.map((product) => {
              const priceChange = Number(product.change?.pct ?? 0);
              const priceIncreased = priceChange > 0;
              const priceDecreased = priceChange < 0;

              return (
                <Link
                  key={product.id}
                  href={`/ProductsDetails/${product.id}`}
                  className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg"
                >
                  {/* Icon and Category */}
                  <div className="flex items-start justify-between">
                    <span className="rounded-lg bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                      {product.unit}
                    </span>

                    <span className="text-3xl transition-transform duration-300 group-hover:scale-110">
                      {product.categoryIcon || "🛒"}
                    </span>
                  </div>

                  {/* Product Name */}
                  <h2 className="mt-5 min-h-14 text-lg font-bold text-gray-800 transition-colors group-hover:text-green-600">
                    {product.nameBn}
                  </h2>

                  {/* Current Price */}
                  <div className="mt-4">
                    <p className="text-xs text-gray-500">
                      বর্তমান দাম
                    </p>

                    <p className="mt-1 text-2xl font-extrabold text-gray-900">
                      ৳{Number(product.today).toLocaleString("bn-BD")}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      প্রতি {product.unit}
                    </p>
                  </div>

                  {/* Price Change */}
                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                    <span className="text-xs text-gray-500">
                      দাম পরিবর্তন
                    </span>

                    {priceIncreased ? (
                      <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-600">
                        ▲ +{priceChange.toFixed(1)}%
                      </span>
                    ) : priceDecreased ? (
                      <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-700">
                        ▼ {Math.abs(priceChange).toFixed(1)}%
                      </span>
                    ) : (
                      <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-500">
                        অপরিবর্তিত
                      </span>
                    )}
                  </div>

                  {/* Bottom Accent */}
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-green-500 transition-all duration-300 group-hover:w-full" />
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
            <p className="text-4xl">🛒</p>

            <h2 className="mt-4 text-lg font-bold text-gray-800">
              কোনো পণ্য পাওয়া যায়নি
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              পরে আবার চেষ্টা করুন।
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllProductPage;
