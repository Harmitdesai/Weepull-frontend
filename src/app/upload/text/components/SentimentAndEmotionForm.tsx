"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { SentimentAnalysis } from "@/types/textData";
import { resizeTextarea } from "@/app/upload/text/utils/textarea";

type Props = {
  data: SentimentAnalysis;
  onChange: (updated: SentimentAnalysis) => void;
};

const BASIC = [
  "Hapiness",
  "Sadness",
  "Anger",
  "Fear",
  "Disgust",
  "Surprise",
  "Neutral",
] as const;

const EXTENDED = [
  "Joy",
  "Excitemnet",
  "Love",
  "Gratitude",
  "Confusion",
  "Embarrassment",
  "Guilt",
  "Pride",
  "Shame",
] as const;

const COMPLEX = [
  "Optimism",
  "Pessimism",
  "Trust",
  "Anticipation",
  "Satisfaction",
  "Boredom",
] as const;

type BasicEmotion = (typeof BASIC)[number];
type ExtendedEmotion = (typeof EXTENDED)[number];
type ComplexEmotion = (typeof COMPLEX)[number];

export default function SentimentAndEmotionForm({ data, onChange }: Props) {
  const update = <K extends keyof SentimentAnalysis>(
    key: K,
    value: SentimentAnalysis[K]
  ) => onChange({ ...data, [key]: value });

  const MAX_H_TEXT = 160;

  return (
    <div className="bg-white w-full maxh-100 rounded p-5 grid grid-cols-[auto_1fr] gap-7">
      {/* Language */}
      <h1 className="w-32"> Language : </h1>
      <Input
        type="text"
        name="language"
        placeholder="Enter Language"
        className="w-100"
        value={data.language || ""}
        onChange={(e) => update("language", e.target.value)}
      />

      {/* Text */}
      <h1 className="w-32">Text : </h1>
      <Textarea
        name="text"
        placeholder="Enter Text"
        className="w-100 resize-none max-h-40 h-1 overflow-y-auto"
        value={data.text || ""}
        onChange={(e) => {
          resizeTextarea(e.target, MAX_H_TEXT);
          update("text", e.target.value);
        }}
      />

      {/* Sentiment (single) */}
      <h1 className="w-32">Sentiment : </h1>
      <ToggleGroup
        type="single"
        className="justify-start"
        value={data.sentiment || ""}
        onValueChange={(val) => {
          if (!val) return;
          update("sentiment", val as SentimentAnalysis["sentiment"]);
        }}
      >
        <ToggleGroupItem value="Negative">Negative</ToggleGroupItem>
        <ToggleGroupItem value="Neutral">Neutral</ToggleGroupItem>
        <ToggleGroupItem value="Positive">Positive</ToggleGroupItem>
      </ToggleGroup>

      {/* Emotions (multiple) */}
      <h1 className="w-32">Emotion : </h1>
      <div className="flex items-start justify-between gap-4">
        {/* Basic Emotions */}
        <div className="flex flex-col">
          <h3 className="text-center font-semibold">Basic Emotions</h3>
          <ToggleGroup
            type="multiple"
            className="grid grid-cols-3 gap-4"
            value={Array.from(data.basicEmotion ?? []) as string[] || ""}
            onValueChange={(vals) =>
              update(
                "basicEmotion",
                new Set(vals as BasicEmotion[]) as SentimentAnalysis["basicEmotion"]
              )
            }
          >
            {BASIC.map((b) => (
              <ToggleGroupItem key={b} value={b}>
                {b}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        {/* Extended Emotions */}
        <div className="flex flex-col">
          <h3 className="text-center font-semibold">Extended Emotions</h3>
          <ToggleGroup
            type="multiple"
            className="grid grid-cols-3 gap-4"
            value={Array.from(data.extendedEmotion ?? []) as string[] || ""}
            onValueChange={(vals) =>
              update(
                "extendedEmotion",
                new Set(vals as ExtendedEmotion[]) as SentimentAnalysis["extendedEmotion"]
              )
            }
          >
            {EXTENDED.map((e) => (
              <ToggleGroupItem key={e} value={e}>
                {e}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        {/* Complex Emotions */}
        <div className="flex flex-col">
          <h3 className="text-center font-semibold">Complex Emotions</h3>
          <ToggleGroup
            type="multiple"
            className="grid grid-cols-3 gap-4"
            value={Array.from(data.complexEmotion ?? []) as string[] || ""}
            onValueChange={(vals) =>
              update(
                "complexEmotion",
                new Set(vals as ComplexEmotion[]) as SentimentAnalysis["complexEmotion"]
              )
            }
          >
            {COMPLEX.map((c) => (
              <ToggleGroupItem key={c} value={c}>
                {c}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>
    </div>
  );
}
