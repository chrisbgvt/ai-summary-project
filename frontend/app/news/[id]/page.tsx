import { notFound } from "next/navigation";
import { getNewsById } from "../../../services/news";
import ShareButtons from "../../../components/ShareButtons";

export default async function NewsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const news = await getNewsById(id);

    if (!news) {
        notFound();
    }
    
    return (
        <article className="lg:px-30 py-10">
            <h2 className="mb-4">{news.title}</h2>
            <p className="mb-4">{news.summary}</p>
            <ShareButtons title={news.title} />
        </article>
    );
}