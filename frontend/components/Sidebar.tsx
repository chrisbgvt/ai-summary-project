"use client";
import { useState } from "react";
import Link from "next/link";
import { isToday, isYesterday, parseISO, format } from "date-fns";
import { Button } from "@/components/ui/button";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { cn } from "@/lib/utils";

import { NewsGroupedResponse } from "../types/news";

export default function SidebarClient({ newsList }: { newsList: NewsGroupedResponse }) {
    const [isMinimized, setIsMinimized] = useState(false);

    const handleMinimization = () => {
        setIsMinimized(prev => !prev);
    }

    const formatRelativeDate = (dateString: string): string => {
        if (!dateString) {
            return "";
        }

        const date = parseISO(dateString);

        if (isToday(date)) { 
            return "Today";
        }
        
        if (isYesterday(date)) { 
            return "Yesterday";
        }

        return format(date, "yyyy-MM-dd");
    };

    return (
        <div className={cn(
            "group h-full bg-gray-900 transition-all duration-300 flex flex-col",
            isMinimized ? "w-16" : "w-64"
        )}>
            <div className="p-4 flex justify-end">
                <Button variant="ghost" className="cursor-pointer" size="icon" onClick={handleMinimization}>
                    {isMinimized ? <PanelLeftOpen /> : <PanelLeftClose />}
                </Button>
            </div>

            <div className={cn(`flex-1 overflow-y-auto 
                [&::-webkit-scrollbar]:w-2 
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:bg-transparent
                group-hover:[&::-webkit-scrollbar-track]:bg-gray-800/50
                group-hover:[&::-webkit-scrollbar-thumb]:bg-gray-600
                dark:group-hover:[&::-webkit-scrollbar-track]:bg-neutral-800/50
                dark:group-hover:[&::-webkit-scrollbar-thumb]:bg-neutral-500`, isMinimized && "hidden")}
            >
                {Object.keys(newsList).length > 0 ? (
                    <>
                        {Object.entries(newsList).map(([date, articles]: [string, any]) => (
                            <div key={date} className="pl-3 pr-1 mb-4">
                                <h3 className="text-xs font-bold text-muted-foreground mb-2">{formatRelativeDate(date)}</h3>
                                <ul className="space-y-1">
                                    {articles.map((item: any) => (
                                        <li key={item.id}>
                                            <Link href={`/news/${item.id}`} className="block p-2 text-sm rounded-lg hover:bg-accent transition-colors truncate">
                                                {item.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </>
                ) : (
                    <p>No news found</p>
                )}

                <div className="flex justify-center my-5 pl-3 pr-1">
                    <Link
                        href={"/news"}
                        className="mt-4 px-4 py-[6px] w-full text-center text-white text-sm rounded-lg border disabled:bg-gray-400"
                    >
                        Show all
                    </Link>
                </div>
            </div>
        </div>
    );
}
