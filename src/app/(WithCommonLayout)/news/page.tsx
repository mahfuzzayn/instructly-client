import ITNews from "@/components/modules/news";
import { getAllNews } from "@/services/News";
import { IArticle } from "@/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "News ‣ Instructly",
    description:
        "Get the latest updates, announcements, and features from our platform.",
};

const NewsPage = async () => {
    const { data: news }: { data: { articles: IArticle[] } } =
        await getAllNews();
    console.log(news.articles);

    return (
        <section className="min-h-screen">
            <ITNews articles={news.articles}></ITNews>
        </section>
    );
};

export default NewsPage;
