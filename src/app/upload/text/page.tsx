"use client";

import React, { useState } from "react";
import { useEffect } from "react";
import { TextData, Message } from "@/types/textData";
import { useSearchParams } from 'next/navigation';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { set } from "react-hook-form";

const Text = () => {

    const { data: session, status } = useSession();

    ////////////Object containing values of text////////////////////
    const [textData, setTextData] = useState<TextData>({
        type: "Question-Answer",
        language: "",
        question: "",
        answer: "",
        tags: [],
        metadata: ""
    });
    const searchParams = useSearchParams();

    const [selectedDataType, setSelectedDataType] = useState<"Question-Answer" | "Translation" | "Text Classification" | "Sentiment And Emotion Label" | "Conversation" | "Free Text">("Question-Answer");

    ////////////useEffect to clear text data object everytime user changes selected data type///////////////
    useEffect(() => {
        if (selectedDataType === "Question-Answer"){
            setTextData({
                type: "Question-Answer",
                language: "",
                question: "",
                answer: "",
                tags: [],
                metadata: ""
            });
        } else if (selectedDataType === "Translation"){
            setTextData({
                type: "Translation",
                language1: "",
                language2: "",
                mainText: "",
                translations: [],
                tags: [],
                metadata: ""
            });
        } else if (selectedDataType === "Text Classification"){
            setTextData({
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
            })
        } else if (selectedDataType === "Sentiment And Emotion Label"){
            setTextData({
                type: "Sentiment And Emotion Label",
                language: "",
                text: "",
                sentiment: "Neutral",
                basicEmotion: new Set([]),
                extendedEmotion: new Set([]),
                // valenceBasedEmotion: new Set([]),
                complexEmotion: new Set([]),
                tags: [],
                metadata: "",
            })
        } else if (selectedDataType === "Conversation"){
            setTextData({
                type: "Conversation",
                language: "",
                messages: [
                    { speaker: "speaker1", message: "" },
                    { speaker: "speaker2", message: "" },
                ],
                tags: [],
                metadata: ""
            })
        } else if (selectedDataType === "Free Text"){
            setTextData({
                type: "Free Text",
                language: "",
                content: "",
                tags: [],
                metadata: ""
            })
        }
      }, [selectedDataType]);

    ///////// This use state is for translation part's columns///////////
    const [translations, setTranslations] = useState<string[]>([""]);

    ///////////// This use state is for sentiment analysis //////////////
    const [basicEmotion,setBasicEmotion] = useState<Set<"Hapiness" | "Sadness" | "Anger" | "Fear" | "Disgust" | "Surprise" | "Neutral">>(new Set([]));
    const [extendedEmotion, setExtendedEmotion] = useState<Set< "Joy" | "Excitemnet" | "Love" | "Gratitude" | "Confusion" | "Embarrassment" | "Guilt" | "Pride" | "Shame" >>(new Set([]));
    const [complexEmotion, setComplexEmotion] = useState<Set< "Optimism" | "Pessimism" | "Trust" | "Anticipation" | "Satisfaction" | "Boredom" >>(new Set([]));
    
    ////////// This is used for conversations ////////////
    const [dialogues, setDialogues] = useState<Message[]>([
        { speaker: "speaker1", message: "" },
        { speaker: "speaker2", message: "" },
    ]);

    ////////// This is for Text Classification //////////

    ///////// This is for tags //////////////////////////
    const [tags, setTags] = useState<string[]>([]);
    const [tagInputValue, setTagInputValue] = useState<string>("");

    const addTag = () => {
        if (tagInputValue.trim() && !tags.includes(tagInputValue)) {
        setTags([...tags, tagInputValue.trim()]);
        setTagInputValue(""); // Clear the input field
        }
    };

    const removeTag = (tagToRemove:string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    useEffect(() => {
        setTextData((prev) => ({
            ...prev,
            tags: tags
        }))
    }, [tags]);

    /////////this function is useful for handling top-left menu buttons content///////////////
    const handleValueChange = (value: "Question-Answer" | "Translation" | "Text Classification" | "Sentiment And Emotion Label" | "Conversation" | "Free Text") => {
        setSelectedDataType(value);
        setTags([]);
        setTagInputValue("");
        setTranslations([""]);
        setDialogues([
            { speaker: "speaker1", message: "" },
            { speaker: "speaker2", message: "" },
        ]);
    }


    //////////Make sures that textarea hieght grows as user types but to the maximum and than it should start scrolling////////////
    const handleTextAreaHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.target.style.height = "auto"; // Reset height to calculate new height
        e.target.style.height = `${e.target.scrollHeight}px`;
    }

    ////////////For OnBoarding purpose//////////

    const [onBoarded, setOnBoarded] = useState<boolean|null>(null);

    useEffect(() => {
        if (status === 'loading') return;
        if (status === 'unauthenticated') return;
        const email = session?.user?.email;
        const checkOnBoarded = async () => {
            const response = await fetch("http://localhost:8080/users/checkOnBoarded", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify({email: email})
            });
            const parsedResponse = await response.json();
            const data = parsedResponse.data;
            setOnBoarded(data.onBoarded);
        };
        checkOnBoarded();
    }, [status]);

    const [fetchLink, setFetchLink] = useState<boolean>(false);

    ///////Checking Authentication///////////
    if (status === 'loading') {
        return <p>Loading...</p>;
    }
    
    ///////////Redirecting to login for unatuhenticated user/////////
    if (status === 'unauthenticated') {
        redirect('/auth/login');
    }

    ///////////main text fields/////////////
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const {name, value} = e.target;
        setTextData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    function renderComponent(value: string) {
        
        
        switch (value) {

            case "Question-Answer":

                return  <div className="bg-white w-full maxh-100 rounded p-5 grid grid-cols-[auto_1fr] gap-5">
                            <h1 className="w-24"> Language : </h1>
                            <Input type="text" name="language" placeholder="Enter Language" className="w-100 ml-5" onChange={(e) => {handleChange(e);}}/>
                            <h1 className="w-24"> Question : </h1>
                            <Textarea name="question" placeholder="Enter Question" onChange={ (e) => {handleTextAreaHeight(e); handleChange(e);} } className="w-100 ml-5 resize-none max-h-40 h-1 overflow-y-auto"/>
                            <h1 className="w-24"> Answer : </h1>
                            <Textarea name="answer" placeholder="Enter Answer" onChange={ (e) => {handleTextAreaHeight(e); handleChange(e);} } className="w-100 ml-5 resize-none max-h-120 h-1 overflow-y-auto"/>
                        </div>;

            case "Translation":

                const handleAddItem = () => {
                    setTranslations([...translations, ""]);
                };

                const handleTranslationChange = (e: React.ChangeEvent<HTMLTextAreaElement> ,index:number) => {
                    const {value} = e.target;
                    const updatedTrans = [...translations];
                    updatedTrans[index]  = value;
                    setTranslations(updatedTrans);
                    setTextData((prev) => ({
                        ...prev,
                        translations: translations
                    }))
                }
                
                return  <div className="bg-white w-full maxh-100 rounded p-5 grid grid-cols-2 gap-5">
                            <div className="flex flex-col item-center gap-4">
                                <div className="grid grid-cols-[auto_1fr] gap-4">
                                    <h1 className="w-32"> Language 1 : </h1>
                                    <Input type="text" name="language1" placeholder="Enter Language" className="w-100 ml-5" onChange={(e) => {handleChange(e);}}/>
                                </div>
                                    <div className="grid grid-cols-[auto_1fr] gap-4">
                                        <h1 className="w-32">Main Text</h1>
                                        <Textarea
                                        name="mainText"
                                        placeholder="Enter text"
                                        className="w-100 ml-5 resize-none max-h-40 h-1 overflow-y-auto"
                                        onChange={(e) => {
                                            handleTextAreaHeight(e);
                                            handleChange(e);
                                        }}
                                        />
                                    </div>
                            </div>
                            <div className="flex flex-col item-center gap-4 justify-center">
                                <div className="grid grid-cols-[auto_1fr] gap-4">
                                    <h1 className="w-32"> Language 2 : </h1>
                                    <Input type="text" placeholder="Enter Language" className="w-100 ml-5" name="language2" onChange={(e) => {handleChange(e);}}/>
                                </div>
                                {translations.map((translationBox, index) => (
                                    <div key={`translationDiv-${index}`} className="grid grid-cols-[auto_1fr] gap-4">
                                        <h1 className="w-32">Translation {index+1}:</h1>
                                        <Textarea
                                        name={`translation-${index}`}
                                        placeholder={"Enter text"}
                                        className="w-100 ml-5 resize-none max-h-40 h-1 overflow-y-auto"
                                        onChange={(e) => {handleTextAreaHeight(e);handleTranslationChange(e,index);}}
                                        />
                                    </div>
                                ))}
                                <Button className="mt-2 p-2 bg-slate-500 text-white rounded hover:bg-slate-600" onClick={() => handleAddItem()} >
                                    +
                                </Button>
                            </div>
                        </div>;

            case "Sentiment And Emotion Label":

                ///////////////////////////////////// Funtions to handle all the toggles //////////////////////////////////
                const handleSentimentValue = (value: "Positive" | "Negative" | "Neutral") => {
                    setTextData((prev) => ({
                        ...prev,
                        sentiment: value
                    }));
                }

                const handleBasicEmotion = (value: "Hapiness" | "Sadness" | "Anger" | "Fear" | "Disgust" | "Surprise" | "Neutral") => {
                    const newSet = new Set(basicEmotion);
                    if (newSet.has(value)){
                        newSet.delete(value)
                    } else {
                        newSet.add(value)
                    }
                    setBasicEmotion(newSet);
                    setTextData((prev) => ({
                       ...prev,
                       basicEmotion: newSet 
                    }));
                }

                const handleExtendedEmotion = (value: "Joy" | "Excitemnet" | "Love" | "Gratitude" | "Confusion" | "Embarrassment" | "Guilt" | "Pride" | "Shame") => {
                    const newSet = new Set(extendedEmotion);
                    if (newSet.has(value)){
                        newSet.delete(value)
                    } else {
                        newSet.add(value)
                    }
                    setExtendedEmotion(newSet);
                    setTextData((prev) => ({
                       ...prev,
                       extendedEmotion: newSet 
                    }));
                }

                const handleComplexEmotion = (value: "Optimism" | "Pessimism" | "Trust" | "Anticipation" | "Satisfaction" | "Boredom") => {
                    const newSet = new Set(complexEmotion);
                    if (newSet.has(value)){
                        newSet.delete(value)
                    } else {
                        newSet.add(value)
                    }
                    setComplexEmotion(newSet);
                    setTextData((prev) => ({
                       ...prev,
                       complexEmotion: newSet 
                    }));
                }

                return  <div className="bg-white w-full maxh-100 rounded p-5 grid grid-cols-[auto_1fr] gap-7">
                            
                            <h1 className="w-32"> Language : </h1>
                            <Input type="text" placeholder="Enter Language" name="language" className="w-100" onChange={(e) => {handleChange(e);}}/>

                            <h1 className="w-32">Text : </h1>
                            <Textarea
                            name="text"
                            placeholder={`Enter Text`}
                            className="w-100 resize-none max-h-40 h-1 overflow-y-auto"
                            onChange={(e) => {handleTextAreaHeight(e);handleChange(e);}}
                            />

                            <h1 className="w-32">Sentiment : </h1>

                            <ToggleGroup type="single" className="justify-start">
                                <ToggleGroupItem value="Negative" onClick={() => {handleSentimentValue("Negative");}}>
                                    Negative
                                </ToggleGroupItem>
                                <ToggleGroupItem value="Neutral" onClick={() => {handleSentimentValue("Neutral");}}>
                                    Neutral
                                </ToggleGroupItem>
                                <ToggleGroupItem value="Positive" onClick={() => {handleSentimentValue("Positive");}}>
                                    Positive
                                </ToggleGroupItem>
                            </ToggleGroup>

                            <h1 className="w-32">Emotion : </h1>
                            <ToggleGroup type="multiple" className="flex items-start justify-between gap-4">
                                {/* Basic Emotions */}
                                <div className="flex flex-col">
                                    <h3 className="text-center font-semibold">Basic Emotions</h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        <ToggleGroupItem value="happiness" onClick={() => {handleBasicEmotion("Hapiness")}}>Happiness</ToggleGroupItem>
                                        <ToggleGroupItem value="sadness" onClick={() => {handleBasicEmotion("Sadness")}}>Sadness</ToggleGroupItem>
                                        <ToggleGroupItem value="anger" onClick={() => {handleBasicEmotion("Anger")}}>Anger</ToggleGroupItem>
                                        <ToggleGroupItem value="fear" onClick={() => {handleBasicEmotion("Fear")}}>Fear</ToggleGroupItem>
                                        <ToggleGroupItem value="disgust" onClick={() => {handleBasicEmotion("Disgust")}}>Disgust</ToggleGroupItem>
                                        <ToggleGroupItem value="surprise" onClick={() => {handleBasicEmotion("Surprise")}}>Surprise</ToggleGroupItem>
                                        <ToggleGroupItem value="neutral" onClick={() => {handleBasicEmotion("Neutral")}}>Neutral</ToggleGroupItem>
                                    </div>
                                </div>

                                {/* Extended Emotions */}
                                <div className="flex flex-col">
                                    <h3 className="text-center font-semibold">Extended Emotions</h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        <ToggleGroupItem value="joy" onClick={() => {handleExtendedEmotion("Joy")}}>Joy</ToggleGroupItem>
                                        <ToggleGroupItem value="excitement" onClick={() => {handleExtendedEmotion("Excitemnet")}}>Excitement</ToggleGroupItem>
                                        <ToggleGroupItem value="love" onClick={() => {handleExtendedEmotion("Love")}}>Love</ToggleGroupItem>
                                        <ToggleGroupItem value="gratitude" onClick={() => {handleExtendedEmotion("Gratitude")}}>Gratitude</ToggleGroupItem>
                                        <ToggleGroupItem value="confusion" onClick={() => {handleExtendedEmotion("Confusion")}}>Confusion</ToggleGroupItem>
                                        <ToggleGroupItem value="embarrassment" onClick={() => {handleExtendedEmotion("Embarrassment")}}>Embarrassment</ToggleGroupItem>
                                        <ToggleGroupItem value="guilt" onClick={() => {handleExtendedEmotion("Guilt")}}>Guilt</ToggleGroupItem>
                                        <ToggleGroupItem value="pride" onClick={() => {handleExtendedEmotion("Pride")}}>Pride</ToggleGroupItem>
                                        <ToggleGroupItem value="shame" onClick={() => {handleExtendedEmotion("Shame")}}>Shame</ToggleGroupItem>
                                    </div>
                                </div>

                                {/* Valence-Based Emotions */}
                                {/* <div className="flex flex-col">
                                    <h3 className="text-center font-semibold">Valence-Based Emotions</h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        <ToggleGroupItem value="positive">Positive</ToggleGroupItem>
                                        <ToggleGroupItem value="negative">Negative</ToggleGroupItem>
                                        <ToggleGroupItem value="neutral">Neutral</ToggleGroupItem>
                                    </div>
                                </div> */}

                                {/* Complex Emotions */}
                                <div className="flex flex-col">
                                    <h3 className="text-center font-semibold">Complex Emotions</h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        <ToggleGroupItem value="optimism" onClick={() => {handleComplexEmotion("Optimism")}}>Optimism</ToggleGroupItem>
                                        <ToggleGroupItem value="pessimism" onClick={() => {handleComplexEmotion("Pessimism")}}>Pessimism</ToggleGroupItem>
                                        <ToggleGroupItem value="trust" onClick={() => {handleComplexEmotion("Trust")}}>Trust</ToggleGroupItem>
                                        <ToggleGroupItem value="anticipation" onClick={() => {handleComplexEmotion("Anticipation")}}>Anticipation</ToggleGroupItem>
                                        <ToggleGroupItem value="satisfaction" onClick={() => {handleComplexEmotion("Satisfaction")}}>Satisfaction</ToggleGroupItem>
                                        <ToggleGroupItem value="boredom" onClick={() => {handleComplexEmotion("Boredom")}}>Boredom</ToggleGroupItem>
                                    </div>
                                </div>
                            </ToggleGroup>
                        </div>;

            case "Conversation":

                const addDialogue = () => {
                    setDialogues([
                    ...dialogues,
                    { speaker: dialogues.length % 2 === 0 ? "speaker1" : "speaker2", message: "" },
                    ]);
                };

                const handleConversation = (e: React.ChangeEvent<HTMLTextAreaElement>, index:number) => {
                    const newConversation = dialogues;
                    newConversation[index] = {
                        ...newConversation[index],    
                        message:e.target.value
                    };
                    setDialogues(newConversation);
                    setTextData((prev) => ({
                        ...prev,
                        messages: newConversation
                    }))
                }

                return  <div className="bg-white w-full maxh-100 rounded p-5 flex flex-col gap-7">

                            <div className="grid grid-cols-[auto_1fr]">
                                <h1 className="w-32"> Language : </h1>
                                <Input type="text" placeholder="Enter Language" name="language" onChange={(e) => {handleChange(e);}} className="w-100"/>
                            </div>

                            { dialogues.map((dialogue, index) => (
                                <div className="grid grid-cols-[auto_1fr]" key={index}>
                                <h1 className="w-32">{dialogue.speaker} : </h1>
                                <Textarea value={dialogue.message} onChange={(e) => {
                                                                    handleTextAreaHeight(e);
                                                                    handleConversation(e,index);
                                                                    }} name="question" placeholder="Enter Dialogue" className="w-100 resize-none max-h-40 h-1 overflow-y-auto"/>
                                </div>
                            ))}
                            <Button onClick={addDialogue} className="bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded-md">
                                + 
                            </Button>
                        </div>;

            case "Text Classification":

                const handleTopicClassification = (value: "Technology" | "Health" | "Finance" | "Education" | "Sports" | "Politics" | "Entertainment" | "Science") => {
                    setTextData((prev) => ({
                        ...prev,
                        topicClassification: value
                    }));
                }

                const handleIntentClassification = (value: "Query" | "Complaint" | "Feedback" | "Request" | "Confirmation" | "Recommendation") => {
                    setTextData((prev) => ({
                        ...prev,
                        intentClassification: value
                    }));
                }

                const handleProductReviewClassification = (value: "Quality" | "Price" | "Delivery" | "Customer Support") => {
                    setTextData((prev) => ({
                        ...prev,
                        productReviews: value
                    }));
                }

                const handleNewsClassification = (value: "Breaking News" | "Opinion" | "Editorial" | "Feature") => {
                    setTextData((prev) => ({
                        ...prev,
                        newsClassification: value
                    }));
                }

                const handleLegalTextClassification = (value: "Contract" | "Policy" | "Agreement" | "Laws and Regulation") => {
                    setTextData((prev) => ({
                        ...prev,
                        legaTextClassification : value
                    }));
                }

                const handleSocialMediaAnalysis = (value: "Hashtag Analysis" | "Brand Mention" | "Influencer Post" | "Trending Topics") => {
                    setTextData((prev) => ({
                        ...prev,
                        socialMediaAnalysis : value
                    }));
                }

                return <div className="bg-white w-full maxh-100 rounded p-5 grid grid-cols-[auto_1fr] gap-7">
                            
                            <h1 className="w-32"> Language : </h1>
                            <Input type="text" placeholder="Enter Language" name="language" className="w-100" onChange={(e) => {handleChange(e);}}/>

                            <h1 className="w-32">Text : </h1>
                            <Textarea
                            name="text"
                            placeholder={`Enter Text`}
                            className="w-100 resize-none max-h-120 h-1 overflow-y-auto"
                            onChange={(e) => {handleTextAreaHeight(e);}}
                            />

                            <h1 className="w-32">Classifications : </h1>
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                {/* Topic Classification */}
                                <ToggleGroup type="single" className="w-1/4">
                                <div className="flex flex-col">
                                    <h3 className="text-center font-semibold">Topic Classification</h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        <ToggleGroupItem value="technology" onClick={() => {handleTopicClassification("Technology");}}>Technology</ToggleGroupItem>
                                        <ToggleGroupItem value="health" onClick={() => {handleTopicClassification("Health");}}>Health</ToggleGroupItem>
                                        <ToggleGroupItem value="finance" onClick={() => {handleTopicClassification("Finance");}}>Finance</ToggleGroupItem>
                                        <ToggleGroupItem value="education" onClick={() => {handleTopicClassification("Education");}}>Education</ToggleGroupItem>
                                        <ToggleGroupItem value="sports" onClick={() => {handleTopicClassification("Sports");}}>Sports</ToggleGroupItem>
                                        <ToggleGroupItem value="politics" onClick={() => {handleTopicClassification("Politics");}}>Politics</ToggleGroupItem>
                                        <ToggleGroupItem value="entertainment" onClick={() => {handleTopicClassification("Entertainment");}}>Entertainment</ToggleGroupItem>
                                        <ToggleGroupItem value="science" onClick={() => {handleTopicClassification("Science");}}>Science</ToggleGroupItem>
                                    </div>
                                </div>
                                </ToggleGroup>

                                <ToggleGroup type="single" className="w-1/4">
                                {/* Intent Classification */}
                                <div className="flex flex-col">
                                    <h3 className="text-center font-semibold">Intent Classification</h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        <ToggleGroupItem value="query" onClick={() => {handleIntentClassification("Query");}}>Query</ToggleGroupItem>
                                        <ToggleGroupItem value="complaint" onClick={() => {handleIntentClassification("Complaint");}}>Complaint</ToggleGroupItem>
                                        <ToggleGroupItem value="feedback" onClick={() => {handleIntentClassification("Feedback");}}>Feedback</ToggleGroupItem>
                                        <ToggleGroupItem value="request" onClick={() => {handleIntentClassification("Request");}}>Request</ToggleGroupItem>
                                        <ToggleGroupItem value="confirmation" onClick={() => {handleIntentClassification("Confirmation");}}>Confirmation</ToggleGroupItem>
                                        <ToggleGroupItem value="recommendation" onClick={() => {handleIntentClassification("Recommendation");}}>Recommendation</ToggleGroupItem>
                                    </div>
                                </div>
                                </ToggleGroup>

                                <ToggleGroup type="single" className="w-1/4">
                                {/* Product Reviews */}
                                <div className="flex flex-col">
                                    <h3 className="text-center font-semibold">Product Reviews</h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        <ToggleGroupItem value="quality" onClick={() => {handleProductReviewClassification("Quality");}}>Quality</ToggleGroupItem>
                                        <ToggleGroupItem value="price" onClick={() => {handleProductReviewClassification("Price");}}>Price</ToggleGroupItem>
                                        <ToggleGroupItem value="delivery" onClick={() => {handleProductReviewClassification("Delivery");}}>Delivery</ToggleGroupItem>
                                        <ToggleGroupItem value="customer-support" onClick={() => {handleProductReviewClassification("Customer Support");}}>Customer Support</ToggleGroupItem>
                                    </div>
                                </div>
                                </ToggleGroup>

                                <ToggleGroup type="single" className="w-1/4">
                                {/* News Classification */}
                                <div className="flex flex-col">
                                    <h3 className="text-center font-semibold">News Classification</h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        <ToggleGroupItem value="breaking-news" onClick={() => {handleNewsClassification("Breaking News");}}>Breaking News</ToggleGroupItem>
                                        <ToggleGroupItem value="opinion" onClick={() => {handleNewsClassification("Opinion");}}>Opinion</ToggleGroupItem>
                                        <ToggleGroupItem value="editorial" onClick={() => {handleNewsClassification("Editorial");}}>Editorial</ToggleGroupItem>
                                        <ToggleGroupItem value="feature" onClick={() => {handleNewsClassification("Feature");}}>Feature</ToggleGroupItem>
                                    </div>
                                </div>
                                </ToggleGroup>

                                <ToggleGroup type="single" className="w-1/4">
                                {/* Legal Text Classification */}
                                <div className="flex flex-col">
                                    <h3 className="text-center font-semibold">Legal Text Classification</h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        <ToggleGroupItem value="contract" onClick={() => {handleLegalTextClassification("Contract");}}>Contract</ToggleGroupItem>
                                        <ToggleGroupItem value="policy" onClick={() => {handleLegalTextClassification("Policy");}}>Policy</ToggleGroupItem>
                                        <ToggleGroupItem value="agreement" onClick={() => {handleLegalTextClassification("Agreement");}}>Agreement</ToggleGroupItem>
                                        <ToggleGroupItem value="laws-and-regulation" onClick={() => {handleLegalTextClassification("Laws and Regulation");}}>Laws and Regulation</ToggleGroupItem>
                                    </div>
                                </div>
                                </ToggleGroup>

                                <ToggleGroup type="single" className="w-1/4">
                                {/* Social Media Analysis */}
                                <div className="flex flex-col">
                                    <h3 className="text-center font-semibold">Social Media Analysis</h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        <ToggleGroupItem value="contract" onClick={() => {handleSocialMediaAnalysis("Hashtag Analysis");}}>Hashtag Analysis</ToggleGroupItem>
                                        <ToggleGroupItem value="policy" onClick={() => {handleSocialMediaAnalysis("Brand Mention");}}>Brand Mention</ToggleGroupItem>
                                        <ToggleGroupItem value="agreement" onClick={() => {handleSocialMediaAnalysis("Influencer Post");}}>Influencer Post</ToggleGroupItem>
                                        <ToggleGroupItem value="laws-and-regulation" onClick={() => {handleSocialMediaAnalysis("Trending Topics");}}>Trending Topics</ToggleGroupItem>
                                    </div>
                                </div>
                                </ToggleGroup>
                            </div>
                        </div>;

            case "Free Text":
                return <div className="bg-white w-full maxh-100 rounded p-5 grid grid-cols-[auto_1fr] gap-5">

                            <h1 className="w-32"> Language : </h1>
                            <Input type="text" placeholder="Enter Language" name="language" className="w-100" onChange={(e) => {handleChange(e);}}/>

                            <h1 className="w-24"> Free Text : </h1>
                            <Textarea name="content" placeholder="Enter Text" onChange={ (e) => {handleTextAreaHeight(e); handleChange(e)} } className="w-100 resize-none max-h-120 h-1 overflow-y-auto"/>
                        </div>;
        }
    }

    ////////////submit function/////////////
    const submitData = async () => {
        // const userid = session.user!.id;
        const email = session?.user?.email;
        const postId = searchParams.get('postId');
        const url = "http://localhost:8080/dataUpload/text?postId="+(postId||"-1");
        const data = (() => {
            if (textData.type === "Sentiment And Emotion Label"){
                return {
                    data: {...textData,
                        basicEmotion: Array.from(textData.basicEmotion),
                        complexEmotion: Array.from(textData.complexEmotion),
                        extendedEmotion: Array.from(textData.extendedEmotion)
                    },
                    email: email
                }
            } else return {data: {...textData}, email: email}
        })();

        const response = await fetch(url, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(data)
        });

        const parsedResponse = await response.json();

        if (parsedResponse.success){
            alert("Data submitted successfully");
            window.location.reload();
        }
    }

    const generateLink = async () => {
        const email = session?.user?.email;
        setFetchLink(true);
        const response = await fetch("http://localhost:8080/payment/onboardSeller", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email})
        });
        const parsedResponse = await response.json();
        console.log(parsedResponse);
        setFetchLink(false);
    }

    if (onBoarded === null) return <p className="text-white">Loading...</p>;

    // return onBoarded ? (
    return true ? (
        <>
        <div className="mt-5 p-5 h-full">
            <Select onValueChange={handleValueChange}>
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
            <br></br>
            <div className="flex justify-center">
                {renderComponent(selectedDataType)}
            </div>
            <br></br>
            <div className="flex justify-center">
                <div className="bg-white w-full maxh-100 rounded p-5 flex flex-col gap-5">
                    {/* Input Row */}
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

                    {/* Tags Display */}
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
            <br></br>
            <div className="flex justify-center">
                <div className="bg-white w-full maxh-100 rounded p-5 grid grid-cols-[auto_1fr] gap-5">

                    <h1 className="w-32"> Metadata : </h1>
                    <Input type="text" placeholder="Enter Language" name="metadata" className="w-100" onChange={(e) => {handleChange(e);}}/>

                </div>;
            </div>
            <br></br>
            <br></br>
            <br></br>
        </div>
        <Button className="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-32 bg-blue-500 hover:bg-blue-900" onClick={submitData}>Submit</Button>
        </>
    ) : (
        <div className="flex flex-col items-center justify-center h-screen">
            {!fetchLink ? (<Button className="bg-[#685cfc] hover:bg-[#483999]" onClick={generateLink}>Onboard to Stripe</Button>) : (<p className="text-white"> Loading... </p>)}
            <p className="text-white">You need to connect to Stripe to upload and get paid.</p>
        </div>
    );
};

export default Text;