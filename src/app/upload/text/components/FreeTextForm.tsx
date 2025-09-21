"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FreeText } from "@/types/textData";
import { resizeTextarea } from "@/app/upload/text/utils/textarea";

type Props = {
  data: FreeText;
  onChange: (updated: FreeText) => void;
};

export default function FreeTextForm({ data, onChange }: Props) {
  const MAX_H_CONTENT = 480; // px, matches your original max-h-120 roughly

  const update = <K extends keyof FreeText>(key: K, value: FreeText[K]) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <div className="bg-white w-full maxh-100 rounded p-5 grid grid-cols-[auto_1fr] gap-5">
      {/* Language */}
      <h1 className="w-32"> Language : </h1>
      <Input
        type="text"
        placeholder="Enter Language"
        name="language"
        className="w-100"
        value={data.language || ""}
        onChange={(e) => update("language", e.target.value)}
      />

      {/* Free Text / Content */}
      <h1 className="w-24"> Free Text : </h1>
      <Textarea
        name="content"
        placeholder="Enter Text"
        className="w-100 resize-none max-h-120 h-1 overflow-y-auto"
        value={data.content || ""}
        onChange={(e) => {
          resizeTextarea(e.target, MAX_H_CONTENT);
          update("content", e.target.value);
        }}
      />
    </div>
  );
}
