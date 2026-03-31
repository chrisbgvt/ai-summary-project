import { News, NewsGroupedResponse } from "../types/news";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/news`;

export async function getGroupedNews(): Promise<NewsGroupedResponse> {
    const res = await fetch(`${API_URL}/latest-by-date`, {
        cache: "no-store", // or revalidate
    });

    if (!res.ok) {
        throw new Error("Failed to fetch news");
    }

    const news = await res.json();
    return news.data;
}

export async function getNewsById(id: string): Promise<News> {
    const res = await fetch(`${API_URL}/${id}`);

    if (!res.ok) {
        throw new Error("Failed to fetch news");
    }

    const news = await res.json();
    return news.data;
}