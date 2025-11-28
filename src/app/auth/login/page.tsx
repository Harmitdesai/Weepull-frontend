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
    <div className="flex min-h-screen items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative w-full max-w-md">
        {/* Glass card container */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl shadow-black/30 p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25 mb-4">
              <span className="text-white font-bold text-xl">W</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-400 text-sm">Sign in to continue to WeePull</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter your email" 
                required 
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-blue-500/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Enter your password" 
                required 
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-blue-500/20"
              />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-transparent px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* OAuth buttons */}
          <div className="flex flex-col space-y-3">
            <Button 
              variant="outline" 
              onClick={() => handleOAuthLogin("google")} 
              className="w-full group"
            >
              <AiOutlineGoogle className="text-red-400 group-hover:text-red-300" style={{ width: "20px", height: "20px" }} />
              <span>Continue with Google</span>
            </Button>
            <Button variant="outline" className="w-full group">
              <AiFillFacebook className="text-blue-400 group-hover:text-blue-300" style={{ width: "20px", height: "20px" }} />
              <span>Continue with Facebook</span>
            </Button>
            <Button variant="outline" className="w-full group">
              <AiFillApple className="text-gray-200 group-hover:text-white" style={{ width: "20px", height: "20px" }} />
              <span>Continue with Apple</span>
            </Button>
          </div>

          {/* Sign up link */}
          <p className="text-sm text-center text-gray-400">
            Don&apos;t have an account?{" "}
            <a href="/auth/signup" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
              Sign up
            </a>
          </p>

          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-4 pt-2 border-t border-white/5">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
              </svg>
              <span>Secure Login</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span>256-bit SSL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
