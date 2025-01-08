"use client";

import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/consts/prompts";
import { calculateSemanticAccuracy } from "@/utils/scoring";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    const [step, setStep] = useState<number>(0);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedPrompt, setSelectedPrompt] = useState<{prompt: string, image: string}>({prompt: "", image: ""});
    const [userPrompt, setUserPrompt] = useState<string>("");

    const submitAnswer = () => {
        calculateSemanticAccuracy(selectedPrompt.prompt, userPrompt)
    }

    useEffect(() => {
        if(selectedCategory) {
            // @ts-ignore
            const randomPrompt = CATEGORIES[selectedCategory][Math.floor(Math.random() * CATEGORIES[selectedCategory].length)];
            setSelectedPrompt(randomPrompt);
        }
    },[selectedCategory])

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-primary p-4">
            {
                {
                    0: (
                        <div className="w-full flex flex-col gap-[25px] max-w-md rounded-xl bg-white p-8 backdrop-blur-sm">
                            <h1 className="bolder text-[24px]">Game category</h1>
                            <select className="h-10 w-max rounded px-2" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                                <option value="" disabled hidden>
                                    Choose category
                                </option>
                                {Object.keys(CATEGORIES).map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                            <Button onClick={() => setStep(1)} variant="default">
                                Play
                            </Button>
                        </div>
                    ),
                    1: (
                        <div className="w-full flex flex-col gap-5 max-w-md rounded-xl bg-white p-8 backdrop-blur-sm">
                            <h1 className="bolder text-[24px]">Category: {selectedCategory}</h1>
                            {/* @ts-ignore */}
                            <Image width={500} height={500} alt="category image" src={selectedPrompt.image} />
                            <div className="flex flex-col gap-1">
                                <label htmlFor="prompt" className="text-[#333]">
                                    Your prompt guess
                                </label>
                                <textarea id="prompt" placeholder="Type prompt guess..." className="border-2" value={userPrompt} onChange={(e) => setUserPrompt(e.target.value)}></textarea>
                            </div>
                            <Button variant="default" onClick={submitAnswer}>Submit</Button>
                        </div>
                    ),
                }[step]
            }
        </div>
    );
}
