"use client";

import React, { useState, useEffect } from "react";

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
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
import Email from "next-auth/providers/email";
  

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
    
        const postList: Post[] = data.map((post: any) => ({
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

    // const posts = [{
    //     title: "Example 1",
    //     type: "Text to Text",
    //     description: "a",
    //     postId: 1
    // },{
    //     title: "Example 2",
    //     type: "Text to Text",
    //     description: "b",
    //     postId: 2
    // },{
    //     title: "Example 3",
    //     type: "Text to Text",
    //     description: "c",
    //     postId: 3
    // },{
    //     title: "Example 4",
    //     type: "Text to Text",
    //     description: "d",
    //     postId: 4
    // },{
    //     title: "Example 5",
    //     type: "Text to Text",
    //     description: "e",
    //     postId: 5
    // },{
    //     title: "Example 6",
    //     type: "Text to Text",
    //     description: "f",
    //     postId: 6
    // },{
    //     title: "Example 7",
    //     type: "Text to Text",
    //     description: "g",
    //     postId: 7
    // },{
    //     title: "Example 8",
    //     type: "Text to Text",
    //     description: "h",
    //     postId: 8
    // },{
    //     title: "Example 9",
    //     type: "Text to Text",
    //     description: "i",
    //     postId: 9
    // },{
    //     title: "Example 10",
    //     type: "Text to Text",
    //     description: "j",
    //     postId: 10
    // }];



  return (
    <>
        <div className="mt-5 p-5 h-full">
            <div className="grid grid-cols-5 gap-4 h-[500px]">
            {posts.map((post, index) => (
                // <div key={index} className="h-full">
                <Dialog key={index}>
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
                        {post.title}
                    </DialogTitle>
                    <DialogDescription>
                        {post.type}
                    </DialogDescription>
                    </DialogHeader>
                    <span>{"Description : " + post.description}</span>
                    <span>{"Example : " + post.example}</span>
                    <DialogFooter>
                        <Button onClick={() => {
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
                <Button className="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-32 bg-blue-500 hover:bg-blue-900">Add Post</Button>
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
