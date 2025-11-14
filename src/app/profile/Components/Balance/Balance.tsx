import React from "react";
import { BalanceShower } from "./BalanceShower";
import { RedeemButton } from "./RedeemButton";
import { useEffect, useState } from "react";

interface BalanceProps {
    email?: string;
    classname?: string;
}

export default function Balance({ email, classname }: BalanceProps) {

    const [balance, setBalance] = useState<number | null>(null);
    
        // Fetching user's balance from backend
        
    useEffect(() => {
        if (!email) return;

        const fetchBalance = async () => {
            try {
            const url = "http://localhost:8080/dataFetch/balance";
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email }),
            }
            );
            const data = await res.json();
            setBalance(data.data.balance);
            } catch (err) {
            console.error("Error fetching balance:", err);
            }
        };

        fetchBalance();
    }, [email]);

  return (
    <div className={"flex flex-col items-center justify-center gap-6 p-6 h-full" + (classname ? ` ${classname}` : "")}>
        <BalanceShower balance={balance}/>
        <RedeemButton balance={balance} email={email}/>
    </div>
  );
}

export {Balance}