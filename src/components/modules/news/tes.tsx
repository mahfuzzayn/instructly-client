/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { IArticle } from "@/types";

export default function News({ articles }: { articles: IArticle[] }) {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filteredArticles, setFilteredArticles] = useState<IArticle[]>([]);

    

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = articles.filter((article) =>
            article.title.toLowerCase().includes(query)
        );
        setFilteredArticles(filtered);
    };

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
                    filteredArticles.map((article: IArticle, index) => (
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
