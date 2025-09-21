"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Conversation, Message } from "@/types/textData";
import { resizeTextarea } from "@/app/upload/text/utils/textarea";

type Props = {
  data: Conversation;
  onChange: (updated: Conversation) => void;
};

export default function ConversationForm({ data, onChange }: Props) {
  const MAX_H_TEXT = 160;

  const update = <K extends keyof Conversation>(
    key: K,
    value: Conversation[K]
  ) => onChange({ ...data, [key]: value });

  const handleMessageChange = (index: number, value: string) => {
    const next: Message[] = data.messages.map((m, i) =>
      i === index ? { ...m, message: value } : m
    );
    update("messages", next);
  };

  const getNextSpeaker = (): Message["speaker"] => {
    if (data.messages.length === 0) return "speaker1";
    const last = data.messages[data.messages.length - 1].speaker;
    return last === "speaker1" ? "speaker2" : "speaker1";
  };

  const addDialogue = () => {
    const next: Message[] = [
      ...data.messages,
      { speaker: getNextSpeaker(), message: "" },
    ];
    update("messages", next);
  };

  return (
    <div className="bg-white w-full maxh-100 rounded p-5 flex flex-col gap-7">
      {/* Language row */}
      <div className="grid grid-cols-[auto_1fr]">
        <h1 className="w-32"> Language : </h1>
        <Input
          type="text"
          placeholder="Enter Language"
          name="language"
          className="w-100"
          value={data.language || ""}
          onChange={(e) => update("language", e.target.value)}
        />
      </div>

      {/* Dialogues */}
      {(data.messages || [""]).map((dlg, index) => (
        <div className="grid grid-cols-[auto_1fr]" key={index}>
          <h1 className="w-32">{dlg.speaker} : </h1>
          <Textarea
            value={dlg.message || ""}
            onChange={(e) => {
              resizeTextarea(e.target, MAX_H_TEXT);
              handleMessageChange(index, e.target.value);
            }}
            placeholder="Enter Dialogue"
            className="w-100 resize-none max-h-40 h-1 overflow-y-auto"
          />
        </div>
      ))}

      <Button
        onClick={addDialogue}
        className="bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded-md"
        type="button"
      >
        +
      </Button>
    </div>
  );
}
