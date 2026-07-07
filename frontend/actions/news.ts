"use server";

import { getApiUrl } from "../lib/api";
import { PaginatedNews } from "../types/news";

const API_URL = `${getApiUrl()}/api/news`;

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
