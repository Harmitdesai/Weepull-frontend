// src/types/textData.ts

export interface Message {
  speaker: "speaker1" | "speaker2";  // Alternating speakers
  message: string;                   // The content of the message
}

export interface BaseTextData {
    tags: string[];
    metadata: string;
  }

  
  export interface QuestionAnswer extends BaseTextData {
    type: "Question-Answer";
    language: string;
    question: string;
    answer: string;
  }
  
  export interface Translation extends BaseTextData {
    type: "Translation";
    language1: string;
    language2: string;
    mainText: string;
    translations: string[];
  }
  
  export interface TextClassification extends BaseTextData {
    type: "Text Classification";
    language: string;
    text: string;
    topicClassification: "Technology" | "Health" | "Finance" | "Education" | "Sports" | "Politics" | "Entertainment" | "Science" | "";
    newsClassification: "Breaking News" | "Opinion" | "Editorial" | "Feature" | "";
    intentClassification: "Query" | "Complaint" | "Feedback" | "Request" | "Confirmation" | "Recommendation" | "";
    legaTextClassification: "Contract" | "Policy" | "Agreement" | "Laws and Regulation" | "";
    productReviews: "Quality" | "Price" | "Delivery" | "Customer Support" | "";
    socialMediaAnalysis: "Hashtag Analysis" | "Brand Mention" | "Influencer Post" | "Trending Topics" | ""
  }
  
  export interface SentimentAnalysis extends BaseTextData {
    type: "Sentiment And Emotion Label";
    language: string;
    text: string;
    sentiment: "Positive" | "Negative" | "Neutral";
    basicEmotion: Set< "Happiness" | "Sadness" | "Anger" | "Fear" | "Disgust" | "Surprise" | "Neutral" >;
    complexEmotion: Set< "Optimism" | "Pessimism" | "Trust" | "Anticipation" | "Satisfaction" | "Boredom" >;
    extendedEmotion: Set< "Joy" | "Excitement" | "Love" | "Gratitude" | "Confusion" | "Embarrassment" | "Guilt" | "Pride" | "Shame" >;
    // valenceBasedEmotion: Set< "Positive" | "Negative" | "Neutral" >;
  }
  
  export interface Conversation extends BaseTextData {
    type: "Conversation";
    language: string;
    messages: Message[];
  }
  
  export interface FreeText extends BaseTextData {
    type: "Free Text";
    language: string;
    content: string;
  }
  
  export type TextData = 
    | QuestionAnswer
    | Translation
    | TextClassification
    | SentimentAnalysis
    | Conversation
    | FreeText;

   export type Post = {
    postId: number;
    title: string;
    description: string;
    example: string;
    type: "Text - Text" | "Image - Image" | "Audio - Audio" | "Text - Audio" | "Text - Image" | "Image - Audio";
  };
  