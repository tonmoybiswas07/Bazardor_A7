
const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-[#f8fbf9]">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-4 py-6 sm:px-6 md:flex-row md:items-center lg:px-8">
        {/* Left Text */}
        <p className="text-sm font-medium text-gray-800 sm:text-base">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে
        </p>

        {/* Right Text */}
        <p className="text-sm text-gray-700 sm:text-base md:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার উপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;
