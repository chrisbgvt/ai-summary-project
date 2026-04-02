import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-full">
            <h2 className="">404 - Page Not Found</h2>
            <p>Sorry, we couldn’t find what you’re looking for.</p>
            <Link href={'/'} className="mt-4 px-4 py-[6px] text-white text-sm rounded-lg border disabled:bg-gray-400">
                Home
            </Link>
        </div>
    );
}
