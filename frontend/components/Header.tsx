import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-900 text-white p-6">
      <Link href={'/'}><h1 className="">AI News App</h1></Link>
    </header>
  );
}