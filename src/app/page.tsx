"use client";

import React, { useState, useEffect } from "react";

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
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

import DashboardPost from "./_components/DashboardPost";
import { useDashboardHooks } from "./_hooks/useDashboardHooks";

const Dashboard = () => {

    const { data: session, status } = useSession();
    const [type, setType] = useState("Text - Text");
    
    const { posts } = useDashboardHooks(session?.user?.email || undefined);

    if (status === 'loading') {
      return <p className="text-white">Loading...</p>;
    }
    
    ///////////Redirecting to login for unatuhenticated user/////////
    if (status === 'unauthenticated') {
      redirect('/auth/login');
    }

  return (
    <div>
         <div className="mt-5 p-5 h-full">
            <div className="grid grid-cols-5 gap-4 h-[500px]">
            {posts.map((post) => (
                <DashboardPost key={post.post_id} post={post}>
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
                    <Select onValueChange={(value) => setType(value)} defaultValue="text_text">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            <SelectLabel>Type of Data</SelectLabel>
                            <SelectItem value="text_text">Text - Text</SelectItem>
                            <SelectItem value="image_image">Image - Image</SelectItem>
                            <SelectItem value="audio_audio">Audio - Audio</SelectItem>
                            <SelectItem value="text_audio">Text - Audio</SelectItem>
                            <SelectItem value="text_image">Text - Image</SelectItem>
                            <SelectItem value="image_audio">Image - Audio</SelectItem>
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
                        
                        const url = "/api/dataUpload/post";
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
