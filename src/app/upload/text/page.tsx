"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import QuestionAnswerForm from "@/app/upload/text/components/QuestionAnswerForm";
import TranslationForm from "@/app/upload/text/components/TranslationForm";
import SentimentAndEmotionForm from "@/app/upload/text/components/SentimentAndEmotionForm";
import ConversationForm from "@/app/upload/text/components/ConversationForm";
import TextClassificationForm from "@/app/upload/text/components/TextClassificationForm";
import FreeTextForm from "@/app/upload/text/components/FreeTextForm";

import { useTextData } from "@/app/upload/text/hooks/useTextData";

import type {
  TextData,
  QuestionAnswer,
  Translation,
  SentimentAnalysis,
  Conversation,
  TextClassification,
  FreeText,
} from "@/types/textData";

import { useOnboarding } from "@/stripe/onboarding";

import { Suspense } from "react";

function TextUploadPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: session, status } = useSession();

  // central hook that manages selected type, textData, tags, onboarding, submit
  const {
    selectedDataType,
    textData,
    setFormData, // for components that return a whole typed object
    updateTextData, // shallow merge update
    tags,
    tagInputValue,
    setTagInputValue,
    addTag,
    removeTag,
    handleValueChange,
    checkOnBoarded,
    submitData,
  } = useTextData();

  const { handleOnboard, onBoarded, fetchLink, link } = useOnboarding();

  // Redirect to login if unauthenticated (client-side)
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  // Once authenticated, check onboarding state (only when session email available)
  useEffect(() => {
    if (status !== "authenticated") return;
    const email = session?.user?.email;
    if (!email) return;
    handleOnboard(email);
  }, [status, session?.user?.email, checkOnBoarded, handleOnboard]);

  // show a quick loading state while auth or onboarding check is in progress
  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated") return null; // effect above will redirect

  // Wait for onboarding check to finish
  if (onBoarded === null) return <p className="text-white">Loading...</p>;

  // Render the correct form component based on selectedDataType
  function renderForm() {
    switch (selectedDataType) {
      case "Question-Answer":
        return (
          <QuestionAnswerForm
            data={textData as QuestionAnswer}
            onChange={(updated:  QuestionAnswer) => setFormData(updated as TextData)}
          />
        );

      case "Translation":
        return (
          <TranslationForm
            data={textData as Translation}
            onChange={(updated: Translation) => setFormData(updated as TextData)}
          />
        );

      case "Sentiment And Emotion Label":
        return (
          <SentimentAndEmotionForm
            data={textData as SentimentAnalysis}
            onChange={(updated: SentimentAnalysis) => setFormData(updated as TextData)}
          />
        );

      case "Conversation":
        return (
          <ConversationForm
            data={textData as Conversation}
            onChange={(updated: Conversation) => setFormData(updated as TextData)}
          />
        );

      case "Text Classification":
        return (
          <TextClassificationForm
            data={textData as TextClassification}
            onChange={(updated: TextClassification) => setFormData(updated as TextData)}
          />
        );

      case "Free Text":
        return (
          <FreeTextForm
            data={textData as FreeText}
            onChange={(updated: FreeText) => setFormData(updated as TextData)}
          />
        );

      default:
        return null;
    }
  }

  const handleSubmit = async () => {
    try {
      const email = session?.user?.email;
      const postId = searchParams.get("postId") ?? undefined;
      const parsed = await submitData(email? email : "", postId);
      if (parsed?.success) {
        alert("Data submitted successfully");
        // Keep it simple: reload the page to reset forms (same behavior as original)
        window.location.reload();
      } else {
        alert(
          "Failed to submit data" +
            (parsed?.message ? `: ${parsed.message}` : "")
        );
        console.error("submitData response:", parsed);
      }
    } catch (err) {
      console.error("submitData error:", err);
      alert("An error occurred while submitting data. See console for details.");
    }
  };

//   If user has not onboarded, show Stripe onboarding CTA
  if (!onBoarded) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        {!fetchLink ? (
          <Button
            className="bg-[#685cfc] hover:bg-[#483999]"
            onClick={async () => {window.location.href = link ? link : window.location.href;}}
          >
            Onboard to Stripe
          </Button>
        ) : (
          <p className="text-white">Loading...</p>
        )}
        <p className="text-white">You need to connect to Stripe to upload and get paid.</p>
      </div>
    );
  }

  // Main editor UI (user is onboarded)
  return (
    <>
      <div className="mt-5 p-5 h-full">
        <Select onValueChange={(val) => handleValueChange(val as TextData["type"])}>
          <SelectTrigger className="w-[180px] bg-white border-0 hover:bg-gray-200 transition-all">
            <SelectValue placeholder="Select Text Data Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Question-Answer">Question-Answer</SelectItem>
            <SelectItem value="Translation">Translation</SelectItem>
            <SelectItem value="Sentiment And Emotion Label">Sentiment And Emotion Label</SelectItem>
            <SelectItem value="Conversation">Conversational/Dialogues</SelectItem>
            <SelectItem value="Text Classification">Text Classification</SelectItem>
            <SelectItem value="Free Text">Free Text</SelectItem>
          </SelectContent>
        </Select>

        <br />

        <div className="flex justify-center">{renderForm()}</div>

        <br />

        {/* Tags box */}
        <div className="flex justify-center">
          <div className="bg-white w-full maxh-100 rounded p-5 flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <h1 className="w-32">Tags:</h1>
              <Input
                type="text"
                value={tagInputValue}
                onChange={(e) => setTagInputValue(e.target.value)}
                placeholder="Enter a tag"
                className="w-100"
              />
              <Button
                onClick={addTag}
                className="bg-slate-500 text-white px-3 py-1 rounded hover:bg-slate-600"
              >
                +
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-slate-200 pl-2 rounded shadow justify-between"
                >
                  <span>{tag}</span>
                  <Button
                    onClick={() => removeTag(tag)}
                    className="bg-slate-500 hover:bg-slate-600 h-8 w-5"
                  >
                    x
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <br />

        {/* Metadata */}
        <div className="flex justify-center">
          <div className="bg-white w-full maxh-100 rounded p-5 grid grid-cols-[auto_1fr] gap-5">
            <h1 className="w-32"> Metadata : </h1>
            <Input
              type="text"
              placeholder="Enter Metadata"
              name="metadata"
              className="w-100"
              value={textData.metadata ?? ""}
              onChange={(e) => updateTextData({ metadata: e.target.value })}
            />
          </div>
        </div>

        <br />
        <br />
        <br />
      </div>


      <Button
        className="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-32 bg-blue-500 hover:bg-blue-900"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </>
  );
}

export default function TextUploadPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <TextUploadPageInner />
    </Suspense>
  );
}
