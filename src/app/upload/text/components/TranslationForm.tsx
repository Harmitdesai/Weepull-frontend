"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Translation } from "@/types/textData";
import { resizeTextarea } from "@/app/upload/text/utils/textarea";

type Props = {
  data: Translation;
  onChange: (updated: Translation) => void;
};

export default function TranslationForm({ data, onChange }: Props) {
  console.log("Rendering TranslationForm with data:", data);
  // Update any field in the Translation object
  const updateField = <K extends keyof Translation>(key: K, value: Translation[K]) => {
    onChange({ ...data, [key]: value });
  };

  // Update a specific translation string by index
  const updateTranslation = (index: number, value: string) => {
    const newTranslations = [...data.translations];
    newTranslations[index] = value;
    onChange({ ...data, translations: newTranslations });
  };

  // Add a new empty translation string
  const addTranslation = () => {
    onChange({ ...data, translations: [...data.translations, ""] });
  };

  const MAX_H_TEXTAREA = 160; // max height for textareas

  return (
    <div className="bg-white w-full maxh-100 rounded p-5 grid grid-cols-2 gap-5">
      {/* Left side: Language 1 + Main Text */}
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-[auto_1fr] gap-4 items-center">
          <h1 className="w-32">Language 1:</h1>
          <Input
            type="text"
            name="language1"
            placeholder="Enter Language"
            className="w-100 ml-5"
            value={data.language1 || ""}
            onChange={(e) => updateField("language1", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-[auto_1fr] gap-4 items-center">
          <h1 className="w-32">Main Text:</h1>
          <Textarea
            name="mainText"
            placeholder="Enter text"
            className="w-100 ml-5 resize-none max-h-40 h-1 overflow-y-auto"
            value={data.mainText || ""}
            onChange={(e) => {
              resizeTextarea(e.target, MAX_H_TEXTAREA);
              updateField("mainText", e.target.value);
            }}
          />
        </div>
      </div>

      {/* Right side: Language 2 + translations */}
      <div className="flex flex-col gap-4 justify-center">
        <div className="grid grid-cols-[auto_1fr] gap-4 items-center">
          <h1 className="w-32">Language 2:</h1>
          <Input
            type="text"
            name="language2"
            placeholder="Enter Language"
            className="w-100 ml-5"
            value={data.language2 || ""}
            onChange={(e) => updateField("language2", e.target.value)}
          />
        </div>

        {data.translations ? (data.translations.map((translation, index) => (
          <div key={`translation-${index}`} className="grid grid-cols-[auto_1fr] gap-4 items-center">
            <h1 className="w-32">Translation {index + 1}:</h1>
            <Textarea
              name={`translation-${index}`}
              placeholder="Enter text"
              className="w-100 ml-5 resize-none max-h-40 h-1 overflow-y-auto"
              value={translation || ""}
              onChange={(e) => {
                resizeTextarea(e.target, MAX_H_TEXTAREA);
                updateTranslation(index, e.target.value);
              }}
            />
          </div>
        ))) : null}

        <button
          type="button"
          onClick={addTranslation}
          className="mt-2 p-2 bg-slate-500 text-white rounded hover:bg-slate-600 w-12 self-start"
          aria-label="Add translation"
        >
          +
        </button>
      </div>
    </div>
  );
}
