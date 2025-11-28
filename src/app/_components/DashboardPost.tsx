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
        <Dialog key={post.postId}>
            <DialogTrigger asChild>
                <Card className="h-[250px] relative cursor-pointer group overflow-hidden bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-white/10 hover:border-cyan-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-400/10">
                    {/* Decorative gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Glow effect on hover */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-cyan-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                    
                    <CardHeader className="relative z-10">
                        <CardTitle className="flex-[0_0_60%] text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-300 line-clamp-3 group-hover:from-cyan-200 group-hover:to-cyan-100 transition-all duration-300">
                        {post.title}
                        </CardTitle>
                    </CardHeader>
                    <CardFooter className="absolute bottom-0 left-0 text-gray-500 text-base font-medium z-10">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-300"></div>
                            {post.type}
                        </div>
                    </CardFooter>
                </Card>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px] backdrop-blur-2xl bg-black/40 rounded-2xl p-0 shadow-2xl border border-white/10 text-white overflow-hidden">
                {/* Header gradient decoration */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-cyan-500/20 via-cyan-400/10 to-transparent pointer-events-none"></div>
                
                <div className="relative p-8 space-y-4">
                    <DialogHeader className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
                        <DialogTitle className="text-xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                            {post.title ?? "No Title"}
                        </DialogTitle>
                        <DialogDescription className="text-gray-300 flex items-center gap-2 mt-2">
                            <span className="px-2 py-1 rounded-md bg-gradient-to-r from-cyan-500/20 to-cyan-400/20 border border-white/10 text-sm">
                                {post.type}
                            </span>
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/15 p-5">
                        <span className="text-cyan-300 font-semibold text-sm uppercase tracking-wide">Description</span>
                        <p className="text-gray-200 mt-2 leading-relaxed">{post.description}</p>
                    </div>
                    
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl shadow-lg border border-white/10 p-5">
                        <span className="text-cyan-200 font-semibold text-sm uppercase tracking-wide">Example</span>
                        <p className="text-gray-300 mt-2 leading-relaxed">{post.example}</p>
                    </div>
                    
                    <p className="text-gray-400 text-sm text-center py-2">
                        Click purchase to see available datapoints
                    </p>
                    
                    <DialogFooter className="pt-2">
                        <PurchasePanel post={post}/>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
  );
}