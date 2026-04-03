"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { getAllNews } from "../actions/news";
import { News } from "../types/news";
import { format } from "date-fns";

import { Pagination } from "./Pagination";
import { FilterModal } from "./FilterModal";
import { useLoader } from "../context/LoaderContext";

export default function NewsList({ 
    initialNews, 
    lastPage, 
    currentPage 
}: { 
    initialNews: News[], 
    lastPage: number, 
    currentPage: number  
}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const [news, setNews] = useState(initialNews);
    const [page, setPage] = useState(currentPage);
    const [totalPages, setTotalPages] = useState(lastPage);
    const { loading, setLoading } = useLoader(); 
    
    const dateFromUrl = searchParams.get("date");
    const selectedDate = dateFromUrl ? new Date(dateFromUrl) : undefined;

    useEffect(() => {
        setNews(initialNews);
        setTotalPages(lastPage);
        setPage(Number(searchParams.get("page")) || 1);
    }, [initialNews, lastPage, searchParams]);

    const fetchNews = async (newPage: number, date?: Date) => {
        setLoading(true);
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());
        const formattedDate = date ? format(date, "yyyy-MM-dd") : "";
        if (formattedDate) { 
            params.set("date", formattedDate);
        } else { 
            params.delete("date");
        }

        router.push(`?${params.toString()}`, { scroll: true });

        const data = await getAllNews({ page: newPage, date: formattedDate });
        setNews(data.data);
        setTotalPages(data.last_page);
        setPage(newPage);
        setLoading(false);
    };

    const handleApplyFilter = (date?: Date) => {
        fetchNews(1, date);
    };

    const handleResetFilter = () => {
        fetchNews(1, undefined);
    };

    const handlePageChange = (newPage: number) => {
        fetchNews(newPage, selectedDate);
    };

    return (
        <div className="relative space-y-6">
            <FilterModal
                selectedDate={selectedDate}
                onApply={handleApplyFilter}
                onReset={handleResetFilter}
            />

            <div className="grid gap-4">
                {news.length > 0 ? (
                    <>
                        {news.map((item) => (
                            <div key={item.id} className="p-3 border rounded-lg hover:bg-accent transition-colors">
                                <Link href={`/news/${item.id}`} className="block font-semibold mb-1">
                                {item.title}
                                </Link>
                                <p className="text-sm text-muted-foreground line-clamp-1">{item.summary}</p>
                            </div>
                        ))}
                    </>
                ) : (
                    <p>No news found</p>
                )}
            </div>

            {totalPages > 1 &&
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    isLoading={loading}
                />
            }
        </div>
    );
}
