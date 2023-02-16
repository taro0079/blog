import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 border-b z-10 bg-white">
      <div className="max-w-4xl mx-auto flex justify-between items-center h-12">
        <Link href="/">
          <div>taroblog</div>
        </Link>
        <Link href="/">
          <div>HOME</div>
        </Link>
        <Link href="/about">
          <div>ABOUT</div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
