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
            <p className="text-gray-400">Loading your profile...</p>
          </div>
        </div>
      );
    }

    // Demo user data for unauthenticated users
    const userEmail = session?.user?.email || "demo@weepull.com";
    const userName = session?.user?.name || "Demo User";

  return (
    <div className="mx-auto h-full">
      {/* Page header */}
      <div className="px-8 pt-8 pb-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-cyan-100 to-emerald-200 bg-clip-text text-transparent">
          Profile
        </h1>
        <p className="text-gray-400 mt-2">Manage your account and view your activity</p>
      </div>

      <div className="grid grid-cols-10 grid-rows-10 gap-4 p-8 h-full">
        {/* Balance Card */}
        <div className="col-start-1 col-end-5 row-start-1 row-end-5 backdrop-blur-xl bg-white/5 rounded-2xl shadow-2xl shadow-black/20 border border-white/10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-emerald-500/5 pointer-events-none"></div>
          <Balance email={userEmail}/>
        </div>
        
        {/* User Info Card */}
        <div className="col-start-5 col-end-11 row-start-1 row-end-5 backdrop-blur-xl bg-white/5 rounded-2xl flex flex-col items-center justify-center gap-6 p-6 shadow-2xl shadow-black/20 border border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-cyan-500/5 pointer-events-none"></div>
          
          <div className="relative w-full max-w-md bg-white/5 backdrop-blur-sm rounded-xl shadow-lg border border-white/10 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              User Information
            </h3>
            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 text-left">
              <p className="text-gray-500 font-medium">Name:</p>
              <p className="text-gray-200">{userName}</p>

              <p className="text-gray-500 font-medium">Email:</p>
              <p className="text-cyan-400 break-all">{userEmail}</p>
            </div>
          </div>
          
          {/* Score Badge */}
          <div className="relative flex items-center justify-center w-48 h-48 bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 backdrop-blur-sm rounded-2xl shadow-lg border border-white/10">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-2xl blur-xl opacity-50"></div>
            <div className="relative text-center">
              <div className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">324</div>
              <div className="text-sm text-gray-400 uppercase tracking-wide mt-1">Reputation Score</div>
            </div>
          </div>
        </div>
        
        {/* Orders Card */}
        <div className="relative col-start-1 col-end-6 row-start-5 row-end-11 backdrop-blur-xl bg-white/5 rounded-2xl flex flex-col items-start gap-4 p-6 shadow-2xl shadow-black/20 border border-white/10 text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-teal-500/5 pointer-events-none"></div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent flex items-center gap-2 relative z-10">
            <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Orders
          </h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 w-full h-full flex items-center justify-center shadow-lg border border-white/10 relative z-10">
            <OrdersList email={userEmail}/>
          </div>
        </div>
        
        {/* Data Points Card */}
        <div className="col-start-6 col-end-11 row-start-5 row-end-11 backdrop-blur-xl bg-white/5 rounded-2xl flex flex-col items-center justify-center gap-6 p-6 shadow-2xl shadow-black/20 border border-white/10 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/5 pointer-events-none"></div>
          <div className="relative z-10 text-center">
            <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">Data Points</h3>
            <p className="text-gray-500">Your contributed data points will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
