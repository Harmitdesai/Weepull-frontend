"use client";

import { useEffect, useState } from "react";
import { TextData } from "@/types/textData";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

/**
 * Return an empty/default TextData object for a given type.
 */
function getDefaultTextData(type: TextData["type"]): TextData {
  switch (type) {
    case "Question-Answer":
      return {
        type: "Question-Answer",
        language: "",
        question: "",
        answer: "",
        tags: [],
        metadata: ""
      };
    case "Translation":
      return {
        type: "Translation",
        language1: "",
        language2: "",
        mainText: "",
        translations: [""],
        tags: [],
        metadata: ""
      };
    case "Text Classification":
      return {
        type: "Text Classification",
        language: "",
        text: "",
        topicClassification: "",
        newsClassification: "",
        intentClassification: "",
        legaTextClassification: "",
        productReviews: "",
        socialMediaAnalysis: "",
        tags: [],
        metadata: ""
      };
    case "Sentiment And Emotion Label":
      return {
        type: "Sentiment And Emotion Label",
        language: "",
        text: "",
        sentiment: "Neutral",
        basicEmotion: new Set([]),
        extendedEmotion: new Set([]),
        complexEmotion: new Set([]),
        tags: [],
        metadata: ""
      };
    case "Conversation":
      return {
        type: "Conversation",
        language: "",
        messages: [
          { speaker: "speaker1", message: "" },
          { speaker: "speaker2", message: "" }
        ],
        tags: [],
        metadata: ""
      };
    case "Free Text":
      return {
        type: "Free Text",
        language: "",
        content: "",
        tags: [],
        metadata: ""
      };
    default:
      // Fallback (shouldn't happen)
      return {
        type: "Free Text",
        language: "",
        content: "",
        tags: [],
        metadata: ""
      } as TextData;
  }
}

export function useTextData() {
  const [selectedDataType, setSelectedDataType] =
    useState<TextData["type"]>("Question-Answer");

  const [textData, setTextData] = useState<TextData>(() =>
    getDefaultTextData("Question-Answer")
  );

  const [tags, setTags] = useState<string[]>([]);
  const [tagInputValue, setTagInputValue] = useState<string>("");

  const [onBoarded, setOnBoarded] = useState<boolean | null>(null);
  const [fetchLink, setFetchLink] = useState<boolean>(false);

  // Reset textData when selectedDataType changes
  useEffect(() => {
    setTextData(getDefaultTextData(selectedDataType));
    // reset UI-related ephemeral states
    setTags([]);
    setTagInputValue("");
  }, [selectedDataType]);

  // Keep textData.tags in sync when tags state changes
  useEffect(() => {
    setTextData((prev) => ({ ...prev, tags }) as TextData);
  }, [tags]);

  // Helper: set entire textData (useful because each component returns a typed object)
  const setFormData = (data: TextData) => {
    setTextData(data);
  };

  // Generic partial updater (merges partial into current textData)
  const updateTextData = (partial: Partial<TextData>) => {
    setTextData((prev) => ({ ...prev, ...partial } as TextData));
  };

  // Called from the top-left Select to change data type:
  const handleValueChange = (value: TextData["type"]) => {
    setSelectedDataType(value);
    // other ephemeral resets done by the effect above
  };

  // Tags helpers
  const addTag = () => {
    const v = tagInputValue.trim();
    if (!v) return;
    if (!tags.includes(v)) {
      setTags((prev) => [...prev, v]);
    }
    setTagInputValue("");
  };

  const removeTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((t) => t !== tagToRemove));
  };

  // API helpers (these return parsed JSON or throw on network error)
  const checkOnBoarded = async (email?: string) => {
    if (!email) return null;
    const res = await fetch(`${API_URL}/users/checkOnBoarded`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const parsed = await res.json();
    setOnBoarded(parsed?.data?.onBoarded ?? false);
    return parsed;
  };

  const generateLink = async (email?: string) => {
    if (!email) throw new Error("Missing email for generateLink");
    setFetchLink(true);
    try {
      const res = await fetch(`${API_URL}/payment/onboardSeller`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const parsed = await res.json();
      return parsed;
    } finally {
      setFetchLink(false);
    }
  };

  const submitData = async (email?: string, postId?: string) => {
    const url = `${API_URL}/dataUpload/text?postId=${postId ?? "-1"}`;

    // Convert Sets to arrays for JSON serialization for sentiment type
    let payloadData: any = { ...textData };
    if (textData.type === "Sentiment And Emotion Label") {
      const sen = textData as any;
      payloadData = {
        ...textData,
        basicEmotion: Array.from(sen.basicEmotion || []),
        extendedEmotion: Array.from(sen.extendedEmotion || []),
        complexEmotion: Array.from(sen.complexEmotion || []),
      };
    }

    const body = {
      data: payloadData,
      email,
    };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const parsed = await res.json();
    return parsed;
  };

  return {
    // state
    selectedDataType,
    setSelectedDataType,
    textData,
    setFormData, // for components that return a whole typed object
    updateTextData, // shallow merge update
    tags,
    tagInputValue,
    setTagInputValue,
    addTag,
    removeTag,
    handleValueChange,

    // onboarding / payment states + actions
    onBoarded,
    fetchLink,
    checkOnBoarded,
    generateLink,

    // submit
    submitData,
  };
}
