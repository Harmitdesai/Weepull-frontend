"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { QuestionAnswer } from "@/types/textData";
import { resizeTextarea } from "@/app/upload/text/utils/textarea";

type Props = {
  data: QuestionAnswer;
  onChange: (updated: QuestionAnswer) => void;
};

export default function QuestionAnswerForm({ data, onChange }: Props) {
  // Small helper to update any field
  const update = <K extends keyof QuestionAnswer>(key: K, value: QuestionAnswer[K]) => {
    onChange({ ...data, [key]: value });
  };

  // Tailwind max-h-40 = 10rem ≈ 160px; max-h-120 = 30rem ≈ 480px
  const MAX_H_QUESTION = 160;
  const MAX_H_ANSWER = 480;

  return (
    <div className="bg-white w-full maxh-100 rounded p-5 grid grid-cols-[auto_1fr] gap-5">
      {/* Language */}
      <h1 className="w-24"> Language : </h1>
      <Input
        type="text"
        name="language"
        placeholder="Enter Language"
        className="w-100 ml-5"
        value={data.language || ""}
        onChange={(e) => update("language", e.target.value)}
      />

      {/* Question */}
      <h1 className="w-24"> Question : </h1>
      <Textarea
        name="question"
        placeholder="Enter Question"
        className="w-100 ml-5 resize-none max-h-40 h-1 overflow-y-auto"
        value={data.question || ""}
        onChange={(e) => {
          resizeTextarea(e.target, MAX_H_QUESTION);
          update("question", e.target.value);
        }}
      />

      {/* Answer */}
      <h1 className="w-24"> Answer : </h1>
      <Textarea
        name="answer"
        placeholder="Enter Answer"
        className="w-100 ml-5 resize-none max-h-120 h-1 overflow-y-auto"
        value={data.answer || ""}
        onChange={(e) => {
          resizeTextarea(e.target, MAX_H_ANSWER);
          update("answer", e.target.value);
        }}
      />
    </div>
  );
}