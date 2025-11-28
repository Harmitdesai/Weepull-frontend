"use client";

import React, { useState, useEffect } from "react";

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import {Post} from "@/types/textData";

// Mock data for all available data requests
const MOCK_DATA_REQUESTS: Post[] = [
  {
    postId: 101,
    title: "E-commerce Product Descriptions",
    type: "Text - Text",
    description: "High-quality product descriptions for online stores",
    example: "Input: Blue running shoes. Output: Premium athletic footwear designed for comfort and performance."
  },
  {
    postId: 102,
    title: "Multi-language Translation Dataset",
    type: "Text - Text",
    description: "Translations between English and Spanish for NLP models",
    example: "EN: Hello, how are you? -> ES: Hola, como estas?"
  },
  {
    postId: 103,
    title: "Facial Expression Recognition",
    type: "Image - Image",
    description: "Labeled images of facial expressions for emotion AI",
    example: "Image of person smiling -> Label: Happy"
  },
  {
    postId: 104,
    title: "Speech-to-Text Pairs",
    type: "Audio - Audio",
    description: "Audio recordings with accurate transcriptions",
    example: "Audio file of spoken sentence -> Text transcription"
  },
  {
    postId: 105,
    title: "Code Documentation",
    type: "Text - Text",
    description: "Code snippets paired with their documentation",
    example: "function add(a, b) { return a + b; } -> Adds two numbers and returns the sum"
  },
  {
    postId: 106,
    title: "Image Captioning Dataset",
    type: "Text - Image",
    description: "Images with descriptive captions for vision models",
    example: "Image of sunset -> A beautiful orange sunset over the ocean"
  }
];

const DataRequests = () => {

    const { status } = useSession();
    const [posts, setPosts] = useState<Post[]>([]);
    const [type, setType] = useState("Text - Text");

    const retrievedPost = async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        setPosts(MOCK_DATA_REQUESTS);
    };

    useEffect(() => {
        retrievedPost();
    },[]);

    if (status === 'loading') {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                    <p className="text-gray-400">Loading data requests...</p>
                </div>
            </div>
        );
    }
    
    if (status === 'unauthenticated') {
        redirect('/auth/login');
    }

  return (
    <div className="relative">
        <div className="px-8 pt-8 pb-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-teal-100 to-cyan-100 bg-clip-text text-transparent">
                Data Requests
            </h1>
            <p className="text-gray-400 mt-2">Browse available data collection opportunities and contribute</p>
        </div>

        <div className="px-8 pb-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {posts.map((post, index) => (
                <Dialog key={index}>
                <DialogTrigger asChild>
                    <Card className="h-[250px] relative cursor-pointer group overflow-hidden bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-white/10 hover:border-cyan-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-400/10">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-cyan-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                        
                        <CardHeader className="relative z-10">
                            <CardTitle className="flex-[0_0_60%] text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-300 line-clamp-3 group-hover:from-teal-200 group-hover:to-cyan-100 transition-all duration-300">
                                {post.title}
                            </CardTitle>
                            <CardDescription className="absolute bottom-6 left-6 text-gray-500 text-base z-10">
                                <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-400 to-cyan-300"></div>
                                    {post.type}
                                </span>
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] backdrop-blur-2xl bg-black/40 rounded-2xl p-0 shadow-2xl border border-white/10 text-white overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-cyan-500/20 via-cyan-400/10 to-transparent pointer-events-none"></div>
                    
                    <div className="relative p-8 space-y-4">
                        <DialogHeader className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
                            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                                {post.title}
                            </DialogTitle>
                            <DialogDescription className="text-gray-300 flex items-center gap-2 mt-2">
                                <span className="px-2 py-1 rounded-md bg-gradient-to-r from-cyan-500/20 to-cyan-400/20 border border-white/10 text-sm">
                                    {post.type}
                                </span>
                            </DialogDescription>
                        </DialogHeader>
                        
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/15 p-5">
                            <span className="text-teal-300 font-semibold text-sm uppercase tracking-wide">Description</span>
                            <p className="text-gray-200 mt-2 leading-relaxed">{post.description}</p>
                        </div>
                        
                        <div className="bg-white/5 backdrop-blur-sm rounded-xl shadow-lg border border-white/10 p-5">
                            <span className="text-cyan-200 font-semibold text-sm uppercase tracking-wide">Example</span>
                            <p className="text-gray-300 mt-2 leading-relaxed">{post.example}</p>
                        </div>
                        
                        <DialogFooter className="pt-2">
                            <Button 
                                className="bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-purple-500 hover:to-cyan-500 rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 border border-white/10 px-6 py-5 font-semibold transition-all duration-300 hover:scale-105"
                                onClick={() => {
                                    if (post.type === "Text - Text"){
                                        redirect('/upload/text?postId=' + post.postId)
                                    } else {
                                        alert("This type of post is not supported yet");
                                    }
                                }}>
                                Provide Data
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
                </Dialog>
            ))}
            </div>
        </div>

        <Dialog>
            <DialogTrigger asChild>
                <Button className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-purple-500 hover:to-cyan-500 rounded-full shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 border border-white/10 px-8 py-6 text-base font-semibold transition-all duration-300 hover:scale-105">
                    Request Data
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] backdrop-blur-2xl bg-black/60 border border-white/10 rounded-2xl shadow-2xl">
                <DialogHeader className="pb-4">
                    <DialogTitle className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        Create Data Request
                    </DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Describe the data you need. Clear descriptions help contributors provide accurate data.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-5 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right text-gray-300">Title</Label>
                        <Input id="title" placeholder="Add Title" className="col-span-3 bg-white/5 border-white/10 text-white placeholder:text-gray-500" />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="description" className="text-right text-gray-300 pt-2">Description</Label>
                        <Textarea id="description" placeholder="Provide Concise Description" className="col-span-3 bg-white/5 border-white/10 text-white placeholder:text-gray-500 min-h-[80px]" />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="example" className="text-right text-gray-300 pt-2">Example</Label>
                        <Textarea id="example" placeholder="Provide Concrete Example" className="col-span-3 bg-white/5 border-white/10 text-white placeholder:text-gray-500 min-h-[80px]" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="type" className="text-right text-gray-300">Type</Label>
                        <Select onValueChange={(value) => setType(value)} defaultValue="Text - Text">
                            <SelectTrigger className="w-[200px] bg-white/5 border-white/10 text-gray-200">
                                <SelectValue placeholder="Select a Type" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-900 border-white/10">
                                <SelectGroup>
                                    <SelectLabel className="text-gray-400">Type of Data</SelectLabel>
                                    <SelectItem value="Text - Text">Text - Text</SelectItem>
                                    <SelectItem value="Image - Image">Image - Image</SelectItem>
                                    <SelectItem value="Audio - Audio">Audio - Audio</SelectItem>
                                    <SelectItem value="Text - Audio">Text - Audio</SelectItem>
                                    <SelectItem value="Text - Image">Text - Image</SelectItem>
                                    <SelectItem value="Image - Audio">Image - Audio</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button 
                        id="upload"
                        className="bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-purple-500 hover:to-cyan-500"
                        onClick={async () => {
                            const title = (document.getElementById("title") as HTMLInputElement).value;
                            const description = (document.getElementById("description") as HTMLInputElement).value;
                            const example = (document.getElementById("example") as HTMLInputElement).value;

                            const newPost: Post = { postId: Date.now(), title, type: type as Post["type"], description, example };
                            await new Promise(resolve => setTimeout(resolve, 500));
                            setPosts(prev => [...prev, newPost]);
                            alert("Data request created successfully (mock)");
                        }}
                    >
                        Create Request
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  );
};

export default DataRequests;
