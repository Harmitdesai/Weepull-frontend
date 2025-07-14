"use client";

import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AiOutlineGoogle, AiFillFacebook, AiFillApple } from "react-icons/ai";

const LoginPage = () => {
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login form submitted");
  };

  const handleOAuthLogin = async (provider: string) => {
    await signIn(provider, { redirect: true , callbackUrl: "/"});
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter your password" required />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <div className="flex flex-col space-y-2">
          <Button variant="outline" onClick={() => handleOAuthLogin("google")} className="w-full">
            Login with <AiOutlineGoogle style={{ width: "30px", height: "30px" }} className="text-red-500"/>
          </Button>
          <Button variant="outline" className="w-full">
            Login with <AiFillFacebook style={{ width: "30px", height: "30px" }} className="text-blue-600" />
          </Button>
          <Button variant="outline" className="w-full">
            Login with <AiFillApple style={{ width: "30px", height: "30px" }} className="text-black" />
          </Button>
        </div>
        <p className="text-sm text-center">
          Don’t have an account? <a href="/auth/signup" className="text-blue-500">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;