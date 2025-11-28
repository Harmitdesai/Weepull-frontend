"use client";

import React from "react";

import { useSession } from 'next-auth/react';
import { Balance } from "./Components/Balance/Balance";
import { OrdersList } from "./Components/Orders/OrdersList";

const Profile = () => {

    const { data: session, status } = useSession();

    if (status === 'loading') {
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
            <p className="text-gray-400">Loading...</p>
          </div>
        </div>
      );
    }

    // Demo user data for unauthenticated users
    const userEmail = session?.user?.email || "demo@weepull.com";
    const userName = session?.user?.name || "Demo User";

  return (
    <div className="mx-auto h-full p-8">
      <div className="grid grid-cols-10 grid-rows-10 gap-4 h-full">
        {/* Balance Card */}
        <div className="col-start-1 col-end-5 row-start-1 row-end-5 bg-black/20 rounded-xl shadow-lg border border-white/10 overflow-hidden">
          <Balance email={userEmail}/>
        </div>
        
        {/* User Info Card */}
        <div className="col-start-5 col-end-11 row-start-1 row-end-5 bg-black/20 rounded-xl flex flex-col items-center justify-center gap-6 p-6 shadow-lg border border-white/10">
          
          <div className="w-full max-w-md bg-white/5 rounded-xl shadow-md border border-white/10 p-6">
            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 text-left">
              <p className="text-gray-500 font-medium">Name:</p>
              <p className="text-gray-200">{userName}</p>

              <p className="text-gray-500 font-medium">Email:</p>
              <p className="text-cyan-400 break-all">{userEmail}</p>
            </div>
          </div>
          
          {/* Score Badge */}
          <div className="flex items-center justify-center w-48 h-48 bg-white/5 rounded-xl shadow-md border border-white/10">
            <div className="text-center">
              <div className="text-6xl font-bold text-cyan-400">324</div>
              <div className="text-sm text-gray-500 mt-1">score</div>
            </div>
          </div>
        </div>
        
        {/* Orders Card */}
        <div className="col-start-1 col-end-6 row-start-5 row-end-11 bg-black/20 rounded-xl flex flex-col items-start gap-4 p-6 shadow-lg border border-white/10 text-white">
          <span className="text-2xl font-bold text-gray-300">Orders</span>
          <div className="bg-white/5 rounded-lg p-4 w-full h-full flex items-center justify-center shadow-md border border-white/10">
            <OrdersList email={userEmail}/>
          </div>
        </div>
        
        {/* Data Points Card */}
        <div className="col-start-6 col-end-11 row-start-5 row-end-11 bg-black/20 rounded-xl flex flex-col items-center justify-center gap-4 p-6 shadow-lg border border-white/10 text-white">
          <svg className="w-12 h-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          </svg>
          <span className="text-lg text-gray-400">Data Points</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
