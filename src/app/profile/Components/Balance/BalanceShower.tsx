import React from "react";
interface BalanceShowerProps {
    balance?: number | null;
    classname?: string;
}

export default function BalanceShower({ balance, classname }: BalanceShowerProps) {
  return (
    <div className={"relative flex items-center justify-center w-72 h-48 bg-white/5 rounded-xl shadow-md border-t-[1px] border-white/20" + (classname ? ` ${classname}` : "")}>
        <div className="relative text-center">
            <div className="text-6xl text-gray-200">${balance !== null ? balance : "-.--"}</div>
            <div className="text-sm text-gray-600">total income</div>
        </div>
    </div>
  );
}

export { BalanceShower };