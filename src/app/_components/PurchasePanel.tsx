"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSession } from 'next-auth/react';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import {Post} from "@/types/textData";

type Props = {
  post: Post;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export default function PurchasePanel({ post }: Props) {

    const { data: session } = useSession();

    const [num, setNum] = useState<number>(0); // number of datapoints to purchase
    const [fetchPurchaseLink , setFetchPurchaseLink] = useState(false); // to fetch the purchase link from backend
    const [numDataPoints, setNumDataPoints] = useState<string | null>(null); // to store the number of data points available for purchase

    const getAvailableDatapoints = async (post_id: number) => {
        const url = `${API_URL}/dataFetch/getAvailableDatapoints`;
        const response = await fetch(url, 
            {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({post_id: post_id})
            }
        );
        const parsedResponse = await response.json();
        console.log(parsedResponse);
        return parsedResponse.data;
    }

    const getCheckoutLink = async (post_id: number, totalDataPoints: number) => {
        const email = session?.user?.email;
        const url = `${API_URL}/payment/getCheckoutLink`;
        const response = await fetch(url, 
            {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({post_id: post_id, totalDataPoints: totalDataPoints, email: email, postTitle: post.title})
            }
        );
        console.log(response);
        const parsedResponse = await response.json();
        return parsedResponse.data.url;
    }

    return (
        <Drawer onOpenChange={()=>{
            getAvailableDatapoints(post.post_id).then(result => {
            setNumDataPoints(result);
            })}} direction="left">
            <DrawerTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-500 transform transition-transform duration-300 will-change-transform hover:scale-105 rounded-xl shadow-md border-t-[1px] border-white/30 p-6">Purchase</Button>
            </DrawerTrigger>
            <DrawerContent className="flex flex-col h-full w-[30vw] ">             
              <DrawerHeader className="px-6 py-4">
                <DrawerTitle className="text-2xl font-bold">
                  Purchase Data Points
                </DrawerTitle>
                <DrawerDescription className="text-gray-600">
                  Review details and confirm your purchase.
                </DrawerDescription>
              </DrawerHeader>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 break-words">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Purchase Details</h2>
                  <p className="text-lg">
                    <strong>Title:</strong> {post.title}
                  </p>
                  <p className="text-lg">
                    <strong>Type:</strong> {post.type}
                  </p>
                  <p className="text-lg">
                    <strong>Available Datapoints:</strong>{" "}
                    {numDataPoints ?? "Loading..."}
                  </p>
                </div>

                <div>
                  <Label className="text-lg font-semibold">
                    Enter the number of data points to purchase:
                  </Label>
                  <Input
                    type="number"
                    value={num}
                    onChange={(e) => {
                      setNum(Number(e.target.value))
                      if (num > Number(numDataPoints)) {
                        setNum(Number(numDataPoints));
                      }
                    }}
                    className="mt-2 w-full"
                  />
                </div>

                {/* Pricing section */}
                <div className="space-y-2 text-lg">
                  <div className="flex justify-between">
                    <strong>Price/Datapoint:</strong>
                    <span>$0.01</span>
                  </div>
                  <div className="flex justify-between">
                    <strong>Total Price:</strong>
                    <span>${(0.01 * num).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <strong>Tax:</strong>
                    <span>$3.00</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <strong>Total Amount:</strong>
                    <span>${(0.01 * num + 3).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <DrawerFooter className="px-6 py-4 border-t">
                <Button
                  onClick={async () => {
                    if (Number(numDataPoints ?? "0") < 5) {
                      alert("Not enough datapoints available for purchase. Minimum 5 required.");
                      return;
                    }
                    setFetchPurchaseLink(!fetchPurchaseLink)
                    if (num > 0 && num <= Number(numDataPoints)) {
                      await getCheckoutLink(post.post_id, num).then(result => {
                          console.log(result);
                          window.location.href = result;
                      })
                    } else {
                      alert("Please enter a valid number of data points to purchase.");
                    }
                    setFetchPurchaseLink(!fetchPurchaseLink)
                  }}
                >
                  { (Number(numDataPoints ?? "0") < 5) ? "Not enough datapoints available" : (fetchPurchaseLink ? "Loading..." : "Checkout")}
                </Button>
              </DrawerFooter>
            </DrawerContent>
        </Drawer>
  );
}
