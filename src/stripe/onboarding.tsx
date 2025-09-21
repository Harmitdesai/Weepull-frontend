import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export function onboarding() {

    const [onBoarded, setOnBoarded] = useState<boolean | null>(null); // to know if use has been onboarded
    const [fetchLink, setFetchLink] = useState<boolean>(false); // to show loading state when generating link or checking onboarded status
    const [link, setLink] = useState<string | null>(null); // to store the generated onboarding link

    const checkOnBoardedLink = `http://localhost:8080/payment/checkOnBoarded`;

    const handleOnboard = async (email?: string) => {
        if (!email) {
            alert("Missing email for onboarding to Stripe");
            return;
        }
        if (onBoarded === null) {
            setFetchLink(true);
            const res = await fetch(checkOnBoardedLink, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const parsed = await res.json();
            if (parsed?.data?.onBoarded) {
                setOnBoarded(true);
                setFetchLink(false);
                return;
            } else {
                setOnBoarded(false);
                setLink(parsed?.data?.accountLink ?? null);
                setFetchLink(false);
                return;
            }
        }
    }

    return { handleOnboard, onBoarded, fetchLink, link };
}