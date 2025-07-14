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
  } from "@/components/ui/select";

  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
  
import { useRef } from 'react';

import {Post} from "@/types/textData";
import Email from "next-auth/providers/email";
import { DialogClose } from "@radix-ui/react-dialog";
  

const Dashboard = () => {

    const { data: session, status } = useSession();
    const [posts, setPosts] = useState<Post[]>([]);
    const [num, setNum] = useState(0); // to store the number of data points for purchase

    const [openPurchase, setOpenPurchase] = useState(false); // to show purchase side drawer
    const [selectedPost, setSelectedPost] = useState<Post | null>(null); // to store the post being purchased
    const [numDataPoints, setNumDataPoints] = useState<string | null>(null); // to store the number of data points available for purchase
    const inputRef = useRef<HTMLInputElement>(null); // for number of datapoint input field in purchase side drawer

    ///////////Variable for storing type of the post being added/////////
    const [type, setType] = useState("Text - Text");

    const retrievedPost = async () => {

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
        if (status === 'authenticated'){
          retrievedPost();
        }
    },[status, session]);
    
    useEffect(() => {
        if (selectedPost) {
          checkData(selectedPost.postId, 0, selectedPost.title).then(result => {
            setNumDataPoints(result);
          });
        }
    }, [selectedPost]);

    if (status === 'loading') {
      return <p className="text-white">Loading...</p>;
    }
    
    ///////////Redirecting to login for unatuhenticated user/////////
    if (status === 'unauthenticated') {
      redirect('/auth/login');
    }

    ///////////Data Fetching function////////////

    const fetchData = async (postId: number, total: number, name: string) => {
        const url = "http://localhost:8080/dataFetch/postdata";
        const response = await fetch(url, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({postId: postId, total: total})
        })

        const parsedResponse = await response.json();
        console.log(parsedResponse);

        const dataarr = []
        
        for (const item in parsedResponse.data){
            dataarr.push(parsedResponse.data[item].data);
        }

        const file_name = name.replace(/\s+/g, '_').toLowerCase();
        const blob = new Blob([JSON.stringify(dataarr)], { type: "application/json" });
        const urlnew = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = urlnew;
        a.download = file_name;
        a.click();

        URL.revokeObjectURL(url);
    }

    ///////////Check Data Function////////////
    const checkData = async (postId: number, total: number, name: string) => {
        const url = "http://localhost:8080/dataFetch/checkdata";
        const response = await fetch(url, 
            {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({postId: postId})
            }
        );
        const parsedResponse = await response.json();
        console.log(parsedResponse);
        return parsedResponse.data;
    }

  return (
    <div>
        <div className="mt-5 p-5 h-full">
            <div className="grid grid-cols-5 gap-4 h-[500px]">
            {posts.map((post, index) => (
                // <div key={index} className="h-full">
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
                                {post.title}
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
                            <DialogClose asChild>
                                
                                <Button onClick={() => {
                                    // const inputEl = document.getElementById(`dataQuant${index}`) as HTMLInputElement | null;
                                    setOpenPurchase(true);
                                    setSelectedPost(post);
                                    // checkData(post.postId, parseInt(inputEl?.value || "0"), post.title);
                                }}>
                                    Purchase
                                </Button>
                            
                            </DialogClose>
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
        {selectedPost && (
            <>
            <div
                className={`
                    fixed inset-0 bg-black transition-opacity duration-300 z-30
                    ${openPurchase ? 'opacity-70 pointer-events-auto' : 'opacity-0 pointer-events-none'}
                `}
                onClick={() => {setOpenPurchase(false); setNum(0)}} // clicking backdrop closes it
            />
            <div
            className={`fixed top-[var(--nav-height)] right-0 w-[400px] h-[calc(100vh-var(--nav-height))] bg-white shadow-md transition-transform transform z-40 duration-3000
                 ease-in-out ${
                openPurchase ? 'translate-x-0' : 'translate-x-[100%]'
            }`}
            >
                <div className="p-4">
                <Button
                    onClick={() => {setOpenPurchase(false); setNum(0)}}
                    className="absolute top-4 right-4"
                >
                    X
                </Button>
                <h2 className="text-2xl font-bold mb-2">Purchase Details</h2>
                <Label className="text-lg"><strong>Title:</strong> <br/>{selectedPost.title}</Label>
                <br/>
                <br/>
                <Label className="text-lg"><strong>Description:</strong> <br/>{selectedPost.description}</Label>
                <br/>
                <br/>
                <Label className="text-lg"><strong>Example:</strong> <br/>{selectedPost.example}</Label>
                <br/>
                <br/>
                <Label className="text-lg"><strong>Type:</strong> <br/>{selectedPost.type}</Label>
                <br/>
                <br/>
                <Label className="text-lg"><strong>Available Datapoints:</strong> <br/>{numDataPoints}</Label>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <Label className="text-lg"><strong>Enter the number of data points to purchase:</strong></Label><br/>
                <Input type="number" value={num} onChange={(e) => setNum(Number(e.target.value))}/>
                <br/>
                <br/>
                <Label className="text-lg"><strong>Price/Datapoint:</strong> <span className=" fixed right-0 mr-5">$0.01</span></Label>
                <br/>
                <Label className="text-lg"><strong>Total Price:</strong> <span className=" fixed right-0 mr-5">${0.01*num}</span></Label>
                <br/>
                <Label className="text-lg"><strong>Tax:</strong> <span className=" fixed right-0 mr-5">${3}</span></Label> {/* We have to define how the tax will be calculated */}
                <br/>
                <Label className="text-lg"><strong>Total Amount:</strong> <span className=" fixed right-0 mr-5">${(0.01*num) + 3}</span></Label>
                <br/>
                <Button>Purchase</Button>
                </div>
            </div>
            </>
        )}
    </div>
  );
};

export default Dashboard;
