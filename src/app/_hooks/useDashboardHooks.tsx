"use client";

import { useEffect, useState } from "react";

import {Post} from "@/types/textData";

export interface RetrievedPost {
    title: string;
    type: string;
    description: string;
    post_id: string;
    example: string;
}

const retrievedPost = async (email : string) : Promise<Post[]> => {

        if (!email) {
            alert("Email is required to fetch posts. Please login");
            return [];
        };

        const url = `/api/dataFetch/userpost`;
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
          post_id: post.post_id,
          example: post.example,
        }));
    
        return postList;
};

export function useDashboardHooks(email: string | undefined) {

    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        if (email) {
            retrievedPost(email).then((data) => setPosts(data));
        }
    }, [email]);

    return { posts };    
}