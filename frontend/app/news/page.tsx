import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getAllNews } from "../../actions/news";
import NewsList from "../../components/NewsList";
import Loading from "./loading";

export default async function NewsPage({ 
    searchParams 
}: { 
    searchParams: Promise<{ date?: string, page?: number }> 
}) {
    const params = await searchParams;
    const date = params.date || "";
    const currentPage = Number(params.page) || 1;
    const initialData = await getAllNews({ page: currentPage, date: date });

    if (!initialData) {
        notFound();
    }

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h2 className="">News</h2>
            </div>

            <Suspense fallback={<Loading />}>
                <NewsList 
                    initialNews={initialData.data} 
                    lastPage={initialData.last_page} 
                    currentPage={currentPage}  
                />
            </Suspense>
        </>
    );
}
