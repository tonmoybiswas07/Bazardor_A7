import Link from "next/link";

export const instant = false;

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "same";
    pct: number;
  };
  markets: Market[];
}

interface ProductDetailsPageProps {
  params: Promise<{
    detailsId: string;
  }>;
}

const formatPrice = (price: number) =>
  Number(price).toLocaleString("bn-BD", {
    maximumFractionDigits: 2,
  });

const ProductDetailsPage = async ({
  params,
}: ProductDetailsPageProps) => {
  const { detailsId } = await params;

  const res = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products/${encodeURIComponent(detailsId)}`,
    {
      next: { revalidate: 300 },
    }
  );

  if (!res.ok) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f0f5f0] px-4">
        <div className="rounded-2xl border border-[#dfe8df] bg-white p-10 text-center shadow-sm">
          <p className="text-4xl">🛒</p>
          <h1 className="mt-4 text-xl font-bold text-gray-800">
            পণ্য পাওয়া যায়নি
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            পণ্যের তথ্য পাওয়া যায়নি অথবা ঠিকানাটি ভুল।
          </p>
          <Link
            href="/"
            className="mt-5 inline-block rounded-lg bg-green-600 px-5 py-2 text-white transition hover:bg-green-700"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </main>
    );
  }

  const product: Product = await res.json();
  const markets = product.markets ?? [];
  const lowestPrice = markets.length
    ? Math.min(...markets.map((market) => market.min))
    : 0;
  const highestPrice = markets.length
    ? Math.max(...markets.map((market) => market.max))
    : 0;
  const averagePrice = markets.length
    ? markets.reduce(
        (total, market) => total + (market.min + market.max) / 2,
        0
      ) / markets.length
    : 0;
  const priceChange = Number(product.change?.pct ?? 0);

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <nav className="mb-7 flex flex-wrap items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-green-700">
            হোম
          </Link>
          <span>›</span>
          <Link
            href={`/category/${product.category}`}
            className="hover:text-green-700"
          >
            {product.categoryNameBn}
          </Link>
          <span>›</span>
          <span className="font-medium text-gray-800">
            {product.nameBn}
          </span>
        </nav>

        {/* Product Header */}
        <section className="flex flex-col gap-5 rounded-2xl border border-[#dfe8df] bg-[#fbfdfb] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#eff5ef] text-3xl sm:h-20 sm:w-20 sm:text-4xl">
              {product.image || product.categoryIcon || "🛒"}
            </div>

            <div>
              <h1 className="text-2xl font-extrabold text-[#202a22] sm:text-3xl">
                {product.nameBn}
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                প্রতি {product.unit} · {product.categoryNameBn}
              </p>
              <p className="mt-3 text-sm text-gray-700">
                গতকালের তুলনায় দাম{" "}
                <span
                  className={
                    priceChange > 0
                      ? "font-bold text-red-600"
                      : priceChange < 0
                        ? "font-bold text-green-700"
                        : "font-bold text-gray-600"
                  }
                >
                  {priceChange > 0
                    ? `বেড়েছে ${formatPrice(priceChange)}%`
                    : priceChange < 0
                      ? `কমেছে ${formatPrice(Math.abs(priceChange))}%`
                      : "অপরিবর্তিত"}
                </span>
              </p>
            </div>
          </div>

          {/* Current Price */}
          <div className="min-w-36 rounded-2xl bg-[#eff5ef] px-6 py-4 text-center sm:min-w-40">
            <p className="text-sm text-gray-500">আজকের দাম</p>
            <p className="mt-1 text-3xl font-extrabold text-[#202a22]">
              ৳{formatPrice(product.today)}
            </p>
            <p className="text-sm text-gray-500">
              টাকা / {product.unit}
            </p>
            <p
              className={`mt-2 text-sm font-bold ${
                priceChange > 0
                  ? "text-red-600"
                  : priceChange < 0
                    ? "text-green-700"
                    : "text-gray-500"
              }`}
            >
              {priceChange > 0 ? "▲" : priceChange < 0 ? "▼" : "●"}{" "}
              {formatPrice(Math.abs(priceChange))}%
            </p>
          </div>
        </section>

        {/* Price Summary */}
        <section className="mt-5 rounded-2xl border border-[#dfe8df] bg-[#fbfdfb] p-4 sm:p-5">
          <h2 className="mb-4 text-lg font-bold text-[#202a22]">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#dfe8df] p-5">
              <p className="text-sm text-gray-500">সর্বনিম্ন দাম</p>
              <p className="mt-1 text-2xl font-extrabold text-green-700">
                ৳{formatPrice(lowestPrice)}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            <div className="rounded-2xl border border-[#dfe8df] p-5">
              <p className="text-sm text-gray-500">সর্বোচ্চ দাম</p>
              <p className="mt-1 text-2xl font-extrabold text-red-600">
                ৳{formatPrice(highestPrice)}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            <div className="rounded-2xl border border-[#dfe8df] p-5">
              <p className="text-sm text-gray-500">গড় দাম</p>
              <p className="mt-1 text-2xl font-extrabold text-green-700">
                ৳{formatPrice(averagePrice)}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                প্রতি {product.unit}-এর হিসাব
              </p>
            </div>
          </div>

          {/* Market Table */}
          <div className="mt-6">
            <h2 className="mb-4 text-lg font-bold text-[#202a22]">
              বাজারভিত্তিক আজকের দাম
            </h2>

            {markets.length > 0 ? (
              <div className="overflow-x-auto rounded-xl border border-[#dfe8df]">
                <table className="w-full min-w-[650px] border-collapse text-sm">
                  <thead className="bg-[#f4f7f4] text-gray-600">
                    <tr>
                      <th className="px-4 py-4 text-left font-semibold">
                        বাজার
                      </th>
                      <th className="px-4 py-4 text-left font-semibold">
                        বিভাগ
                      </th>
                      <th className="px-4 py-4 text-right font-semibold">
                        সর্বনিম্ন
                      </th>
                      <th className="px-4 py-4 text-right font-semibold">
                        সর্বোচ্চ
                      </th>
                      <th className="px-4 py-4 text-right font-semibold">
                        গড়
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {markets.map((market, index) => (
                      <tr
                        key={`${market.market}-${index}`}
                        className={`border-t border-[#dfe8df] transition hover:bg-green-50 ${
                          index % 2 === 0
                            ? "bg-[#fbfdfb]"
                            : "bg-[#f0f5f0]"
                        }`}
                      >
                        <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-800">
                          {market.market}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-gray-700">
                          {market.division}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-right text-gray-700">
                          ৳{formatPrice(market.min)}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-right text-gray-700">
                          ৳{formatPrice(market.max)}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-right font-bold text-[#202a22]">
                          ৳{formatPrice((market.min + market.max) / 2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="rounded-xl bg-gray-50 p-6 text-center text-gray-500">
                এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
              </p>
            )}
          </div>
        </section>

        {/* Historical Prices */}
        <section className="mt-5 rounded-2xl border border-[#dfe8df] bg-[#fbfdfb] p-5 sm:p-6">
          <h2 className="mb-4 text-lg font-bold text-[#202a22]">
            আগের দামের তুলনা
          </h2>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "আজকের দাম", price: product.today },
              { label: "গতকালের দাম", price: product.yesterday },
              { label: "গত সপ্তাহ", price: product.lastWeek },
              { label: "গত মাস", price: product.lastMonth },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl bg-[#f0f5f0] p-4"
              >
                <p className="text-sm text-gray-500">{item.label}</p>
                <p className="mt-2 text-xl font-bold text-[#202a22]">
                  ৳{formatPrice(item.price)}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  প্রতি {product.unit}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Note */}
        <p className="px-2 py-6 text-center text-xs leading-6 text-gray-500">
          সকল দাম সম্ভাব্য। বাজার ও সময় অনুযায়ী প্রকৃত দাম পরিবর্তিত হতে পারে।
        </p>
      </div>
    </main>
  );
};

export default ProductDetailsPage;
