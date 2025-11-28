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
import { useCallback } from "react";

// Mock data for demonstration
const MOCK_POSTS: Post[] = [
  {
    postId: 1,
    title: "Customer Support Conversations",
    type: "Text - Text",
    description: "Collection of customer support dialogues for training chatbots",
    example: "Customer: I need help with my order. Agent: I'd be happy to help you with that."
  },
  {
    postId: 2,
    title: "Product Review Sentiments",
    type: "Text - Text",
    description: "Labeled product reviews with sentiment analysis",
    example: "Great product! Works exactly as described. - Positive"
  },
  {
    postId: 3,
    title: "Medical Image Classification",
    type: "Image - Image",
    description: "Labeled medical images for diagnostic AI training",
    example: "X-ray image labeled with detected conditions"
  },
  {
    postId: 4,
    title: "Voice Command Dataset",
    type: "Audio - Audio",
    description: "Voice commands with transcriptions for voice assistant training",
    example: "Audio: 'Set a timer for 5 minutes' -> Transcription: SET_TIMER(5)"
  }
];

const Dashboard = () => {

    const { status } = useSession();
    const [posts, setPosts] = useState<Post[]>([]);
    ///////////Variable for storing type of the post being added/////////
    const [type, setType] = useState("Text - Text");

    const retrievedPost = useCallback(async () => {
        // Using mock data instead of API call
        // Simulating network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setPosts(MOCK_POSTS);
        console.log("Loaded mock posts:", MOCK_POSTS);
    }, []);

    useEffect(() => {
        // Load mock data for demo purposes
        retrievedPost();
    },[retrievedPost]);

    if (status === 'loading') {
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
            <p className="text-gray-400">Loading your dashboard...</p>
          </div>
        </div>
      );
    }

  return (
    <div className="relative">
      {/* Posts grid */}
      <div className="px-8 pt-8 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {posts.map((post) => (
            <DashboardPost key={post.postId} post={post} />
          ))}
          
          {/* Empty state placeholder cards */}
          {posts.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-20">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-400/20 flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No posts yet</h3>
              <p className="text-gray-500 text-center max-w-sm">Create your first post to start collecting valuable data from the community</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Post Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-cyan-600 hover:bg-cyan-500 rounded-full shadow-lg border border-white/10 px-8 py-6 text-base font-semibold transition-all duration-300 hover:scale-105">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Post
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] backdrop-blur-2xl bg-black/60 border border-white/10 rounded-2xl shadow-2xl">
          <DialogHeader className="pb-4">
            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Create New Post
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Define the type of data you need. Clear descriptions help contributors provide accurate data.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-5 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right text-gray-300">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Add Title"
                className="col-span-3 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right text-gray-300 pt-2">
                Description
              </Label>
              <Textarea 
                onChange={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`; 
                }}
                id="description"
                placeholder="Provide Concise Description"
                className="col-span-3 bg-white/5 border-white/10 text-white placeholder:text-gray-500 min-h-[80px]"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="example" className="text-right text-gray-300 pt-2">
                Example
              </Label>
              <Textarea 
                onChange={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`; 
                }}
                id="example"
                placeholder="Provide Concrete Example"
                className="col-span-3 bg-white/5 border-white/10 text-white placeholder:text-gray-500 min-h-[80px]"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right text-gray-300">
                Type
              </Label>
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
              className="bg-gradient-to-r from-cyan-600 to-cyan-600 hover:from-blue-500 hover:to-purple-500"
              onClick={async () => {
                const title = (document.getElementById("title") as HTMLInputElement).value;
                const description = (document.getElementById("description") as HTMLInputElement).value;
                const example = (document.getElementById("example") as HTMLInputElement).value;

                // Mock response - simulating successful post creation
                const newPost: Post = {
                  postId: Date.now(),
                  title,
                  type: type as Post["type"],
                  description,
                  example,
                };

                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 500));
                
                // Add the new post to the list
                setPosts(prev => [...prev, newPost]);
                alert("Post uploaded successfully (mock)");
              }}
            >
              Create Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
