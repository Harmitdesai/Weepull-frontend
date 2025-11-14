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
import { RetrievedPost } from "../_hooks/useDashboardHooks";

const DataRequests = () => {

    const { data: session, status } = useSession();
    const [posts, setPosts] = useState<Post[]>([]);

    ///////////Variable for storing type of the post being added/////////
    const [type, setType] = useState("Text - Text");

    const retrievedPost = async () => {
        const url = "http://localhost:8080/dataFetch/post";
        const response = await fetch(url);
        const parsedResponse = await response.json();
        const data = parsedResponse.data;
    
        const postList: Post[] = data.map((post: RetrievedPost) => ({
          title: post.title,
          type: post.type,
          description: post.description,
          postId: post.postid,
          example: post.example,
        }));
    
        setPosts(postList);
        console.log(postList);
    };

    useEffect(() => {
        retrievedPost();
    },[]);

    if (status === 'loading') {
        return <p>Loading...</p>;
    }
    
    ///////////Redirecting to login for unatuhenticated user/////////
    if (status === 'unauthenticated') {
        redirect('/auth/login');
    }

  return (
    <>
        <div className="mt-5 p-5 h-full">
            <div className="grid grid-cols-5 gap-4 h-[500px]">
            {posts.map((post, index) => (
                // <div key={index} className="h-full">
                <Dialog key={index}>
                <DialogTrigger asChild>
                <Card className="h-[250px] bg-fancy relative transform transition-transform duration-300 will-change-transform hover:scale-105 hover:z-10">
                    <CardHeader>
                        <CardTitle className="flex-[0_0_60%] text-3xl text-gray-300 font-bold line-clamp-3">
                        {post.title}
                        </CardTitle>
                        <CardDescription className="absolute bottom-6 left-6 text-gray-500 text-xl">
                        {post.type}
                        </CardDescription>
                    </CardHeader>
                </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-md border-t-[1px] border-l-[0px] border-b-[0px] border-r-[0px] border-white/30 text-white space-y-4">
                    <DialogHeader className="bg-white/30 rounded-xl shadow-md border-t-[1px] border-white/40 p-6">
                    <DialogTitle>
                        {post.title}
                    </DialogTitle>
                    <DialogDescription className="text-gray-200">
                        {post.type}
                    </DialogDescription>
                    </DialogHeader>
                    <span className="bg-white/20 rounded-xl shadow-md border-t-[1px] border-white/30 p-6">{"Description : " + post.description}</span>
                    <span className="bg-white/10 rounded-xl shadow-md border-t-[1px] border-white/20 p-6">{"Example : " + post.example}</span>
                    <DialogFooter>
                        <Button className="bg-blue-600 hover:bg-blue-500 transform transition-transform duration-300 will-change-transform hover:scale-105 rounded-xl shadow-md border-t-[1px] border-white/30 p-6" 
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
                </DialogContent>
                </Dialog>
            ))}
            </div>
        </div>
        <Dialog>
            <DialogTrigger asChild>
                <Button className="fixed bottom-5 left-1/2 bg-blue-600 hover:bg-blue-500 transform transition-transform duration-300 will-change-transform hover:scale-105 rounded-xl shadow-md border-t-[1px] border-white/30 p-6 px-10">Add Post</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                <DialogTitle>Add Post</DialogTitle>
                <DialogDescription>
                    Add description and type of the post well, so other users can provide accurate data.
                </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                    Title
                    </Label>
                    <Input
                    id="title"
                    placeholder="Add Title"
                    className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                    Description
                    </Label>
                    <Textarea onChange={ (e) => {
                        e.target.style.height = "auto"; // Reset height to calculate new height
                        e.target.style.height = `${e.target.scrollHeight}px`; 
                    }}
                    id="description"
                    placeholder="Provide Concise Description"
                    className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="example" className="text-right">
                    Example
                    </Label>
                    <Textarea onChange={ (e) => {
                        e.target.style.height = "auto"; // Reset height to calculate new height
                        e.target.style.height = `${e.target.scrollHeight}px`; 
                    }}
                    id="example"
                    placeholder="Provide Concrete Example"
                    className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                    Type
                    </Label>
                    <Select onValueChange={(value) => setType(value)} defaultValue="Text - Text">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            <SelectLabel>Type of Data</SelectLabel>
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
                <Button id = "upload" onClick={
                    async () => {
                        const title = (document.getElementById("title") as HTMLInputElement).value;
                        const description = (document.getElementById("description") as HTMLInputElement).value;
                        const example = (document.getElementById("example") as HTMLInputElement).value;

                        const data = {
                            post:{
                                title: title,
                                type: type,
                                description: description,
                                example: example,
                            },
                            email: session?.user?.email,
                        }
                        
                        const url = "http://localhost:8080/dataUpload/post";
                        const response = await fetch(url, {
                            method : 'POST',
                            headers : {
                                'Content-Type' : 'application/json',
                            },
                            body : JSON.stringify(data)
                        });

                        const parsedResponse = await response.json();

                        if (parsedResponse.success){
                            alert("Post uploaded successfully");
                            window.location.reload();
                        }

                    }
                }>Upload</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
  );
};

export default DataRequests;
