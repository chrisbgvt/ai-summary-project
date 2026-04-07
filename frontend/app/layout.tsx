import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getGroupedNews } from "../services/news";
import "./globals.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { LoaderProvider } from "../context/LoaderContext";
import GlobalLoader from "../components/GlobalLoader";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "AI News App",
    description: "Stay Informed in 60 Seconds",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const newsList = await getGroupedNews();
    return (
        <html
            lang="en"
            className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className="min-h-full flex">
                <LoaderProvider>
                    <GlobalLoader />
                    <aside className="">
                        <Sidebar newsList={newsList} />
                    </aside>

                    <div className="flex flex-col flex-1 min-h-full">
                        <Header />
                        <main className="flex-1 p-6 overflow-auto [&::-webkit-scrollbar]:w-2
                            [&::-webkit-scrollbar-track]:bg-gray-100
                            [&::-webkit-scrollbar-thumb]:bg-gray-300
                            dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                            dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
                        >
                            {children}
                        </main>
                    </div>
                </LoaderProvider>
            </body>
        </html>
    );
}
