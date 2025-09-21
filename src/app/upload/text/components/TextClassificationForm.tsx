"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { TextClassification } from "@/types/textData";
import { resizeTextarea } from "@/app/upload/text/utils/textarea";

type Props = {
  data: TextClassification;
  onChange: (updated: TextClassification) => void;
};

const TOPIC = [
  "Technology",
  "Health",
  "Finance",
  "Education",
  "Sports",
  "Politics",
  "Entertainment",
  "Science",
] as const;

const INTENT = [
  "Query",
  "Complaint",
  "Feedback",
  "Request",
  "Confirmation",
  "Recommendation",
] as const;

const PRODUCT = [
  "Quality",
  "Price",
  "Delivery",
  "Customer Support",
] as const;

const NEWS = ["Breaking News", "Opinion", "Editorial", "Feature"] as const;

const LEGAL = ["Contract", "Policy", "Agreement", "Laws and Regulation"] as const;

const SOCIAL = [
  "Hashtag Analysis",
  "Brand Mention",
  "Influencer Post",
  "Trending Topics",
] as const;

// Small helper to render one single-select toggle group column
function SingleSelectGroup<T extends string>(props: {
  title: string;
  items: readonly T[];
  value?: string; // may be "" initially
  onChange: (val: T) => void;
  className?: string;
}) {
  const { title, items, value, onChange, className } = props;

  return (
    <div className={className ?? "w-1/4"}>
      <div className="flex flex-col">
        <h3 className="text-center font-semibold">{title}</h3>
        <ToggleGroup
          type="single"
          className="grid grid-cols-3 gap-4"
          value={value && value.length > 0 ? value : undefined}
          onValueChange={(val) => {
            if (!val) return;
            onChange(val as T);
          }}
        >
          {items.map((item) => (
            <ToggleGroupItem key={item} value={item}>
              {item}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </div>
  );
}

export default function TextClassificationForm({ data, onChange }: Props) {
  const MAX_H_TEXT = 480;

  const update = <K extends keyof TextClassification>(
    key: K,
    value: TextClassification[K]
  ) => onChange({ ...data, [key]: value });

  return (
    <div className="bg-white w-full maxh-100 rounded p-5 grid grid-cols-[auto_1fr] gap-7">
      {/* Language */}
      <h1 className="w-32"> Language : </h1>
      <Input
        type="text"
        placeholder="Enter Language"
        name="language"
        className="w-100"
        value={data.language}
        onChange={(e) => update("language", e.target.value)}
      />

      {/* Text */}
      <h1 className="w-32">Text : </h1>
      <Textarea
        name="text"
        placeholder="Enter Text"
        className="w-100 resize-none max-h-120 h-1 overflow-y-auto"
        value={data.text}
        onChange={(e) => {
          resizeTextarea(e.target, MAX_H_TEXT);
          update("text", e.target.value);
        }}
      />

      {/* Classifications */}
      <h1 className="w-32">Classifications : </h1>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <SingleSelectGroup
          title="Topic Classification"
          items={TOPIC}
          value={data.topicClassification}
          onChange={(v) => update("topicClassification", v)}
          className="w-full md:w-[48%] lg:w-[32%] xl:w-1/4"
        />

        <SingleSelectGroup
          title="Intent Classification"
          items={INTENT}
          value={data.intentClassification}
          onChange={(v) => update("intentClassification", v)}
          className="w-full md:w-[48%] lg:w-[32%] xl:w-1/4"
        />

        <SingleSelectGroup
          title="Product Reviews"
          items={PRODUCT}
          value={data.productReviews}
          onChange={(v) => update("productReviews", v)}
          className="w-full md:w-[48%] lg:w-[32%] xl:w-1/4"
        />

        <SingleSelectGroup
          title="News Classification"
          items={NEWS}
          value={data.newsClassification}
          onChange={(v) => update("newsClassification", v)}
          className="w-full md:w-[48%] lg:w-[32%] xl:w-1/4"
        />

        <SingleSelectGroup
          title="Legal Text Classification"
          items={LEGAL}
          value={data.legaTextClassification}
          onChange={(v) => update("legaTextClassification", v)}
          className="w-full md:w-[48%] lg:w-[32%] xl:w-1/4"
        />

        <SingleSelectGroup
          title="Social Media Analysis"
          items={SOCIAL}
          value={data.socialMediaAnalysis}
          onChange={(v) => update("socialMediaAnalysis", v)}
          className="w-full md:w-[48%] lg:w-[32%] xl:w-1/4"
        />
      </div>
    </div>
  );
}
