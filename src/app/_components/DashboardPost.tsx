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
    DialogClose
  } from "@/components/ui/dialog";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

import {Post} from "@/types/textData";
import PurchasePanel from "@/app/_components/PurchasePanel";

type Props = {
  post: Post;
};

export default function DashboardPost({ post }: Props) {

  return (
        <Dialog key={post.postId}>
            <DialogTrigger asChild>
                <Card className="h-[250px]">
                    <CardHeader>
                        <CardTitle className="flex-[0_0_60%] text-3xl font-bold line-clamp-3">
                        {post.title}
                        </CardTitle>
                        <CardDescription className="flex-[0_0_40%] text-gray-600 text-xl">
                        {post.type}
                        </CardDescription>
                    </CardHeader>
                </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {post.title ?? "No Title"}
                    </DialogTitle>
                    <DialogDescription>
                        {post.type}
                    </DialogDescription>
                </DialogHeader>
                <span><span className="text-black font-bold text-lr">Description</span> : {post.description}</span>
                <span><span className="text-black font-bold text-lr">Example</span> : {post.example}</span>
                {/* <span>Total &nbsp;&nbsp; &nbsp;&nbsp;datapoints are yet to fetched from this post.</span> */}
                <span>People might have provided datapoints click on purchase to see further</span>
                <DialogFooter>
                    <PurchasePanel post={post}/>
                </DialogFooter>
            </DialogContent>
        </Dialog>
  );
}
