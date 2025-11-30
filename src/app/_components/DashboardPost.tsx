"use client";

import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";

import {
    Card,
    CardHeader,
    CardTitle,
    CardFooter,
  } from "@/components/ui/card";

import {Post} from "@/types/textData";
import PurchasePanel from "@/app/_components/PurchasePanel";

type Props = {
  post: Post;
};

// Dynamic background classes based on post type
const getCardBackground = (type: string): string => {
  const backgrounds: Record<string, string> = {
    "Text - Text": "bg-card-text",
    "Image - Image": "bg-card-image",
    "Audio - Audio": "bg-card-audio",
    "Text - Audio": "bg-card-text-audio",
    "Text - Image": "bg-card-text-image",
    "Image - Audio": "bg-card-image-audio",
  };
  return backgrounds[type] || "bg-fancy";
};

export default function DashboardPost({ post }: Props) {
  const cardBgClass = getCardBackground(post.type);

  return (
        <Dialog key={post.postId}>
            <DialogTrigger asChild>
                <Card className={`h-[250px] ${cardBgClass} relative cursor-pointer overflow-hidden
                    transition-all duration-500 ease-out
                    hover:scale-[1.03] hover:z-10
                    hover:shadow-[0_20px_50px_rgba(56,189,248,0.15)]
                    before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-500
                    hover:before:opacity-100 before:bg-gradient-to-t before:from-transparent before:to-white/5
                    after:absolute after:inset-0 after:rounded-lg after:border after:border-white/10 
                    after:transition-all after:duration-500 hover:after:border-white/20
                    group`}>
                    <CardHeader className="relative z-10">
                        <CardTitle className="flex-[0_0_60%] text-3xl text-gray-200 font-bold line-clamp-3 
                            transition-transform duration-300 group-hover:translate-y-[-2px]">
                        {post.title}
                        </CardTitle>
                    </CardHeader>
                    <CardFooter className="absolute bottom-0 left-0 text-gray-400 text-xl z-10
                        transition-all duration-300 group-hover:text-gray-300">
                        <span className="inline-flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-cyan-400/70 animate-pulse-slow"></span>
                            {post.type}
                        </span>
                    </CardFooter>
                </Card>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px] bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-md border-t-[1px] border-l-[0px] border-b-[0px] border-r-[0px] border-white/30 text-white space-y-4">
                <DialogHeader className="bg-white/30 rounded-xl shadow-md border-t-[1px] border-white/40 p-6">
                    <DialogTitle>
                        {post.title ?? "No Title"}
                    </DialogTitle>
                    <DialogDescription className="text-gray-200">
                        {post.type}
                    </DialogDescription>
                </DialogHeader>
                <span className="bg-white/20 rounded-xl shadow-md border-t-[1px] border-white/30 p-6"><span className="text-white font-bold text-lr">Description</span> : {post.description}</span>
                <span className="bg-white/10 rounded-xl shadow-md border-t-[1px] border-white/20 p-6"><span className="text-white font-bold text-lr">Example</span> : {post.example}</span>
                {/* <span>Total &nbsp;&nbsp; &nbsp;&nbsp;datapoints are yet to fetched from this post.</span> */}
                <span>People might have provided datapoints click on purchase to see further</span>
                <DialogFooter>
                    <PurchasePanel post={post}/>
                </DialogFooter>
            </DialogContent>
        </Dialog>
  );
}