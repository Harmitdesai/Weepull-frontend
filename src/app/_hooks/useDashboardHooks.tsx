"use client";

import { useEffect, useState } from "react";

import {Post} from "@/types/textData";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

const retrievedPost = async (email : string) : Promise<Post[]> => {

        if (!email) {
            alert("Email is required to fetch posts. Please login");
            return [];
        };

        const url = `${API_URL}/dataFetch/userpost`;
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
    
        return postList;
};

export function useDashboardHooks(email: string | undefined, status: "loading" | "authenticated" | "unauthenticated", session: any) {

    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        if (email) {
            retrievedPost(email).then((data) => setPosts(data));
        }
    }, []);

    return { posts };    

}