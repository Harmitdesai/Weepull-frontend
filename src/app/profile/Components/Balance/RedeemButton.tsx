import React from "react";
import { Button } from "@/components/ui/button";

interface RedeemButtonProps {
    email?: string;
    balance?: number | null;
    classname?: string;
}

export default function RedeemButton({email, balance, classname}: RedeemButtonProps) {

    const handleRedeem = async () => {

        if (!email) return;
        if (!balance || balance <= 0) {
            alert("Insufficient balance to redeem.");
            return;
        }

        const url = "http://localhost:8080/payment/redeem";
        const res = await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email }),
        })

        const data = await res.json();
        window.location.href = data.data.loginLink; // Redirecting to Stripe's checkout page
    }

  return (
    <Button
    className={"relative px-8 py-3 rounded-2xl font-bold text-white btn-redeem shadow-[5px_5px_15px_rgba(0,0,0,0.4),-5px_-5px_15px_rgba(56,189,248,0.2)] transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[8px_8px_20px_rgba(0,0,0,0.5),-8px_-8px_20px_rgba(56,189,248,0.3)] hover:ring-2 hover:ring-emerald-300/10 hover:ring-offset-2 hover:ring-offset-transparent" + (classname ? ` ${classname}` : "")}
    onClick={handleRedeem}
    >
    Redeem
    </Button>
  );
}

export {RedeemButton}