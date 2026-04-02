"use server";

import { PaginatedNews } from "../types/news";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/news`;

export async function getAllNews({ page = 1, date = '' }): Promise<PaginatedNews> {
    const res = await fetch(`${API_URL}?page=${page}&date=${date}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch news");
    }

    const news = await res.json();
    return news.data;
}
