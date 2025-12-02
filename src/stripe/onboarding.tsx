"use client";

import { useState, useCallback } from "react";

export function useOnboarding() {

    const [onBoarded, setOnBoarded] = useState<boolean | null>(null); // to know if use has been onboarded
    const [fetchLink, setFetchLink] = useState<boolean>(false); // to show loading state when generating link or checking onboarded status
    const [link, setLink] = useState<string | null>(null); // to store the generated onboarding link

    const handleOnboard = useCallback(async (email?: string) => {
    if (!email) {
        alert("Missing email for onboarding to Stripe");
        return;
    }
    if (onBoarded === null) {
        setFetchLink(true);
        const res = await fetch("/api/payment/checkOnBoarded", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        const parsed = await res.json();
        if (parsed?.data?.onBoarded) {
            setOnBoarded(true);
            setFetchLink(false);
        } else {
            setOnBoarded(false);
            setLink(parsed?.data?.accountLink ?? null);
            setFetchLink(false);
        }
    }
}, [onBoarded]);

    return { handleOnboard, onBoarded, fetchLink, link };
}