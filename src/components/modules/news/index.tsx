/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loading from "../../../assets/gifs/loading.gif";
import Link from "next/link";
import Image from "next/image";

type Article = {
    title: string;
    description: string | null;
    url: string;
    publishedAt: string;
    source: { name: string };
};

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API;
const API_URL = `https://newsapi.org/v2/everything?q=education&apiKey=${API_KEY}`;

export default function News() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();

                if (data.articles) {
                    setArticles(data.articles);
                    setFilteredArticles(data.articles);
                    setIsLoading(true);
                }
            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        };

        fetchArticles();
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = articles.filter((article) =>
            article.title.toLowerCase().includes(query)
        );
        setFilteredArticles(filtered);
    };

    if (!isLoading) {
        return (
            <div className="flex min-h-screen flex-col justify-center items-center gap-4">
                <Image src={Loading} height={120} width={120} alt="Loader" />
                <p className="text-it-medium-dark font-bold">Loading</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto mt-20 mb-32 px-6">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8">
                News & Blogs
            </h1>
            <div className="flex items-center gap-x-2 mt-16 mb-8">
                <Input
                    placeholder="Search articles by just typing characters..."
                    className="bg-gray-100 text-black py-5 placeholder:text-black"
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.length > 0 ? (
                    filteredArticles.map((article: Article, index) => (
                        <Card key={index} className="bg-it-medium-primary">
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    {article.title.length > 50
                                        ? `${article.title.slice(0, 50)}...`
                                        : article.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-700">
                                    {article.description
                                        ? `${article.description.slice(
                                              0,
                                              100
                                          )}...`
                                        : "No description available."}
                                </p>
                                <p className="flex">
                                    <Link
                                        href={article.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-it-medium-dark hover:bg-it-destructive text-white text-sm px-4 py-2 rounded-md mt-4 block"
                                    >
                                        Read more
                                    </Link>
                                </p>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <p>No articles found for "{searchQuery}".</p>
                )}
            </div>
        </div>
    );
}
