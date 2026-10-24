"use client";

import { use, useEffect, useState } from "react";
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

type SortOption = "default" | "asc" | "desc";

interface CategoryPageProps {
  params: Promise<{
    categoryId: string;
  }>;
}

const CategoryPage = ({ params }: CategoryPageProps) => {
  const { categoryId } = use(params);

  const [categoryProduct, setCategoryProduct] = useState<Product[]>([]);
  const [sort, setSort] = useState<SortOption>("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch products
  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(false);

        const resData = await fetch(
          `https://api.abcz.workers.dev/api/bazardor/products?category=${encodeURIComponent(categoryId)}`,
          { signal: controller.signal }
        );

        if (!resData.ok) {
          throw new Error(
            `Failed to fetch category products: ${resData.status}`
          );
        }

        const data: unknown = await resData.json();

        let products: Product[] = [];

        if (Array.isArray(data)) {
          products = data as Product[];
        } else if (
          typeof data === "object" &&
          data !== null &&
          "products" in data &&
          Array.isArray(data.products)
        ) {
          products = data.products as Product[];
        } else if (
          typeof data === "object" &&
          data !== null &&
          "data" in data &&
          Array.isArray(data.data)
        ) {
          products = data.data as Product[];
        }

        setCategoryProduct(products);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        console.error(err);
        setError(true);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      controller.abort();
    };
  }, [categoryId]);

  // Sort products by price
  const sortedProducts = [...categoryProduct].sort((a, b) => {
    if (sort === "asc") {
      return Number(a.today) - Number(b.today);
    }

    if (sort === "desc") {
      return Number(b.today) - Number(a.today);
    }

    return 0;
  });

  if (loading) {
    return (
      <section className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <span className="loading loading-spinner loading-lg text-green-600" />
          <p className="mt-4 text-gray-600">পণ্য লোড হচ্ছে...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-7xl rounded-2xl bg-white p-10 text-center">
          <h2 className="text-xl font-bold text-red-600">
            পণ্য লোড করা যায়নি
          </h2>
          <p className="mt-2 text-gray-600">
            অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-green-600">
            Category Products
          </p>

          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            ক্যাটাগরির সকল পণ্য
          </h1>

          <p className="mt-2 text-gray-600">
            এই ক্যাটাগরির পণ্য ও বর্তমান দাম দেখুন।
          </p>
        </div>

        {/* Product count and sorting */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500">
            মোট পণ্য:{" "}
            <span className="font-bold text-green-600">
              {categoryProduct.length.toLocaleString("bn-BD")}
            </span>
          </p>

          <div className="flex items-center gap-3">
            <label
              htmlFor="product-sort"
              className="shrink-0 text-sm font-semibold text-gray-700"
            >
              সাজান:
            </label>

            <select
              id="product-sort"
              value={sort}
              onChange={(e) =>
                setSort(e.target.value as SortOption)
              }
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 shadow-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 sm:w-auto"
            >
              <option value="default">ডিফল্ট</option>
              <option value="asc">দাম: কম থেকে বেশি</option>
              <option value="desc">দাম: বেশি থেকে কম</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sortedProducts.map((product) => {
              const change = Number(product.change?.pct ?? 0);

              return (
                <Link
                  key={product.id}
                  href={`/ProductsDetails/${product.id}`}
                  className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg"
                >
                  {/* Icon and Unit */}
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
                  <p className="mt-4 text-xs text-gray-500">
                    বর্তমান দাম
                  </p>

                  <p className="mt-1 text-2xl font-extrabold text-gray-900">
                    ৳{Number(product.today).toLocaleString("bn-BD")}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    প্রতি {product.unit}
                  </p>

                  {/* Price Change */}
                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                    <span className="text-xs text-gray-500">
                      দাম পরিবর্তন
                    </span>

                    {change > 0 ? (
                      <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-600">
                        ▲ +{change.toFixed(1)}%
                      </span>
                    ) : change < 0 ? (
                      <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-700">
                        ▼ {Math.abs(change).toFixed(1)}%
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
              এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              অন্য কোনো ক্যাটাগরি দেখুন।
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryPage;