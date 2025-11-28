"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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

export default function PurchasePanel({ post }: Props) {

    const [num, setNum] = useState<number>(0); // number of datapoints to purchase
    const [fetchPurchaseLink , setFetchPurchaseLink] = useState(false); // to fetch the purchase link from backend
    const [numDataPoints, setNumDataPoints] = useState<string | null>(null); // to store the number of data points available for purchase

    // Mock function - returns random available datapoints
    const getAvailableDatapoints = async () => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        // Return mock data - random number between 10 and 100
        const mockDatapoints = Math.floor(Math.random() * 90) + 10;
        return mockDatapoints.toString();
    }

    // Mock function - simulates checkout
    const handleCheckout = async () => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Mock checkout - just show an alert
        alert(`Mock Checkout: Purchasing ${num} datapoints for $${(0.01 * num + 3).toFixed(2)}`);
    }

    return (
        <Drawer onOpenChange={()=>{
            getAvailableDatapoints().then(result => {
            setNumDataPoints(result);
            })}} direction="left">
            <DrawerTrigger asChild>
                <Button className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-blue-500 hover:to-purple-500 rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 border border-white/10 px-6 py-5 font-semibold transition-all duration-300 hover:scale-105">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Purchase
                </Button>
            </DrawerTrigger>
            <DrawerContent className="flex flex-col h-full w-[400px] backdrop-blur-2xl bg-black/80 border-r border-white/10">             
              <DrawerHeader className="px-6 py-6 border-b border-white/10">
                <DrawerTitle className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Purchase Data Points
                </DrawerTitle>
                <DrawerDescription className="text-gray-400 mt-1">
                  Review details and confirm your purchase
                </DrawerDescription>
              </DrawerHeader>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 break-words">
                {/* Post details card */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                  <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Post Details
                  </h2>
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-gray-400 text-sm">Title</span>
                      <span className="text-white text-sm text-right max-w-[60%]">{post.title}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Type</span>
                      <span className="px-2 py-1 rounded-md bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-white/10 text-white text-xs">{post.type}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Available</span>
                      <span className="text-emerald-400 font-semibold">
                        {numDataPoints ?? (
                          <span className="flex items-center gap-2">
                            <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Loading...
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quantity input */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                  <Label className="text-white font-semibold text-sm mb-3 block">
                    Quantity to Purchase
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
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 text-lg h-12"
                    placeholder="Enter quantity"
                  />
                </div>

                {/* Pricing section */}
                <div className="bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Pricing
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center text-gray-300">
                      <span>Price per datapoint</span>
                      <span className="font-mono">$0.01</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-300">
                      <span>Subtotal ({num} points)</span>
                      <span className="font-mono">${(0.01 * num).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-300">
                      <span>Processing fee</span>
                      <span className="font-mono">$3.00</span>
                    </div>
                    <div className="border-t border-white/10 pt-3 mt-3">
                      <div className="flex justify-between items-center text-white font-bold text-lg">
                        <span>Total</span>
                        <span className="font-mono text-emerald-400">${(0.01 * num + 3).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust indicators */}
                <div className="flex items-center justify-center gap-6 py-2">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                    </svg>
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <svg className="w-4 h-4 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span>Verified</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <DrawerFooter className="px-6 py-4 border-t border-white/10 bg-black/40">
                <Button
                  className={`w-full py-6 text-base font-semibold ${
                    Number(numDataPoints ?? "0") < 5 
                      ? "bg-gray-600 cursor-not-allowed" 
                      : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-500/25"
                  }`}
                  onClick={async () => {
                    if (Number(numDataPoints ?? "0") < 5) {
                      alert("Not enough datapoints available for purchase. Minimum 5 required.");
                      return;
                    }
                    setFetchPurchaseLink(true);
                    if (num > 0 && num <= Number(numDataPoints)) {
                      await handleCheckout();
                    } else {
                      alert("Please enter a valid number of data points to purchase.");
                    }
                    setFetchPurchaseLink(false);
                  }}
                >
                  { (Number(numDataPoints ?? "0") < 5) ? (
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Insufficient datapoints
                    </span>
                  ) : (fetchPurchaseLink ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                      Proceed to Checkout
                    </span>
                  ))}
                </Button>
              </DrawerFooter>
            </DrawerContent>
        </Drawer>
  );
}
