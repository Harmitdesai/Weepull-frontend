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

export default function DashboardPost({ post }: Props) {

  return (
        <Dialog key={post.post_id}>
            <DialogTrigger asChild>
                <Card className="h-[250px] bg-fancy relative transform transition-transform duration-300 will-change-transform hover:scale-105 hover:z-10">
                    <CardHeader>
                        <CardTitle className="flex-[0_0_60%] text-3xl text-gray-300 font-bold line-clamp-3 ">
                        {post.title}
                        </CardTitle>
                    </CardHeader>
                    <CardFooter className="absolute bottom-0 left-0 text-gray-500 text-xl">
                    {post.type}
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