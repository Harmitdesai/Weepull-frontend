"use client";

import React, { useEffect } from "react";

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Balance } from "./Components/Balance/Balance";
import { OrdersList } from "./Components/Orders/OrdersList";



const Profile = () => {

    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'authenticated'){
            // Fetch user's data here
        }
    },[status, session]);

    if (status === 'loading') {
      return <p className="text-white">Loading...</p>;
    }
    
    ///////////Redirecting to login for unatuhenticated user/////////
    if (status === 'unauthenticated') {
      redirect('/auth/login');
    }

  return (
    <div className=" mx-auto h-full">

        <div className="grid grid-cols-10 grid-rows-10 gap-4 p-8 h-full">
            <div className="col-start-1 col-end-5 row-start-1 row-end-5 bg-black/20 rounded-xl shadow-lg border-t-[1px] border-white/10">
                <Balance email={session?.user?.email ? session?.user?.email : undefined }/>
            </div>
            <div className="col-start-5 col-end-11 row-start-1 row-end-5 bg-black/20 rounded-xl flex flex-col items-center justify-center gap-6 p-6 shadow-sm border-t-[1px] border-white/10">
                <div className="relative w-full max-w-md bg-white/5 rounded-xl shadow-md border-t-[1px] border-white/20 p-4">
                    <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-left">
                    <p className="text-gray-600 font-medium">Name:</p>
                    <p className="text-gray-400">Harmit Desai</p>

                    <p className="text-gray-600 font-medium">Email:</p>
                    <p className="text-gray-400 break-all">{session?.user?.email}</p>
                    </div>
                </div>
                <div className="relative flex items-center justify-center w-48 h-48 bg-white/5 rounded-xl shadow-md border-t-[1px] border-white/20">
                    <div className="relative text-center">
                    <div className="text-6xl text-gray-400">324</div>
                    <div className="text-sm text-gray-600">score</div>
                    </div>
                </div>
            </div>
            <div className="relative col-start-1 col-end-6 row-start-5 row-end-11 bg-black/20 rounded-xl flex flex-col items-start gap-6 p-6 shadow-sm border-t-[1px] border-white/10 text-white">
                <span className="text-3xl font-bold text-gray-300 ml-4 mt-2">Orders</span>
                <div className="bg-white/5 rounded-lg p-6 w-full h-full flex items-center justify-center shadow-lg border-t-[1px] border-white/10">
                    <OrdersList email={session?.user?.email ? session?.user?.email : undefined }/>
                </div>
            </div>
            <div className="col-start-6 col-end-11 row-start-5 row-end-11 bg-black/20 rounded-xl flex flex-col items-center justify-center gap-6 p-6 shadow-sm border-t-[1px] border-white/10 text-white">
                Data points list
            </div>
        </div>
        
    </div>
  );
};

export default Profile;
