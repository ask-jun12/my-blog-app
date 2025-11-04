import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full bg-white">
      <div className="max-w-[1440px] mx-auto h-[164px] flex justify-between items-center px-20">
        <Link href="/" className="font-bold text-2xl">
          Jun&apos;s BLOG
        </Link>
      </div>
    </header>
  );
};

export default Header;
