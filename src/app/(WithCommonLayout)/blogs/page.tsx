import ITNews from "@/components/modules/news";
import { IArticle } from "@/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "News ‣ Instructly",
    description:
        "Get the latest updates, announcements, and features from our platform.",
};

const BlogsPage = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/news`, {
        cache: "force-cache",
    });
    const { data: news }: { data: { articles: IArticle[] } } = await res.json();

    return (
        <section className="min-h-screen">
            <ITNews articles={news.articles}></ITNews>
        </section>
    );
};

export default BlogsPage;
