"use client";

import React, { useState, useEffect } from "react";

import { useSession } from 'next-auth/react';
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
  } from "@/components/ui/select";

import {Post} from "@/types/textData";
import DashboardPost from "./_components/DashboardPost";
import { RetrievedPost } from "./_hooks/useDashboardHooks";
import { useCallback } from "react";

// Mock data for demo mode
const MOCK_POSTS: Post[] = [
    {
        postId: 1,
        title: "Customer Support Conversations",
        type: "Text - Text",
        description: "Collection of customer support chat conversations for training AI chatbots",
        example: "User: How do I reset my password? Agent: You can reset it by clicking forgot password..."
    },
    {
        postId: 2,
        title: "Product Review Sentiments",
        type: "Text - Text",
        description: "Product reviews with sentiment labels for sentiment analysis models",
        example: "Review: Great product, works exactly as described! Label: Positive"
    },
    {
        postId: 3,
        title: "Medical Image Classification",
        type: "Image - Image",
        description: "X-ray images with annotations for medical diagnosis AI",
        example: "Chest X-ray with highlighted regions indicating potential issues"
    },
    {
        postId: 4,
        title: "Voice Command Dataset",
        type: "Audio - Audio",
        description: "Voice recordings with transcriptions for speech recognition",
        example: "Audio clip: 'Turn on the lights' with timestamp markers"
    },
    {
        postId: 5,
        title: "Image Caption Dataset",
        type: "Text - Image",
        description: "Images paired with descriptive captions for image captioning models",
        example: "Image of sunset with caption: A beautiful orange sunset over the ocean"
    },
    {
        postId: 6,
        title: "Podcast Transcription",
        type: "Text - Audio",
        description: "Audio podcast episodes with accurate text transcriptions",
        example: "Audio segment paired with verbatim transcription text"
    }
];

const Dashboard = () => {

    const { data: session, status } = useSession();
    const [posts, setPosts] = useState<Post[]>([]);
    ///////////Variable for storing type of the post being added/////////
    const [type, setType] = useState("Text - Text");

    const retrievedPost = useCallback(async () => {
        // Demo mode: use mock data
        if (!session?.user?.email || session.user.email === 'demo@weepull.com') {
            setPosts(MOCK_POSTS);
            return;
        }

        try {
            const email = session?.user?.email;
            const url = "http://localhost:8080/dataFetch/userpost";
            const response = await fetch(url, {
              method : 'POST',
              headers : {
                  'Content-Type' : 'application/json',
              },
              body : JSON.stringify({email: email})
            });
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
        } catch {
            // Fallback to mock data if backend is unavailable
            setPosts(MOCK_POSTS);
        }
    }, [session]);

    useEffect(() => {
        if (status === 'authenticated'){
          retrievedPost();
        }
        // Demo mode: show mock posts when unauthenticated
        if (status === 'unauthenticated') {
            setPosts(MOCK_POSTS);
        }
    },[status, retrievedPost]);

    if (status === 'loading') {
      return <p className="text-white">Loading...</p>;
    }

  return (
    <div>
         <div className="mt-5 p-5 h-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 h-[500px]">
            {posts.map((post) => (
                <DashboardPost key={post.postId} post={post}>
                </DashboardPost>
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
    </div>
  );
};

export default Dashboard;
