"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CATEGORIES } from "@/consts/prompts";
import { calculateSemanticAccuracy } from "@/utils/scoring";
import { SelectValue } from "@radix-ui/react-select";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [step, setStep] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedPrompt, setSelectedPrompt] = useState<{
    prompt: string;
    image: string;
  }>({ prompt: "", image: "" });
  const [userPrompt, setUserPrompt] = useState<string>("");

  const submitAnswer = () => {
    calculateSemanticAccuracy(selectedPrompt.prompt, userPrompt);
  };

  useEffect(() => {
    if (selectedCategory) {
      // @ts-ignore
      const randomPrompt =
        CATEGORIES[selectedCategory][
          Math.floor(Math.random() * CATEGORIES[selectedCategory].length)
        ];
      setSelectedPrompt(randomPrompt);
    }
  }, [selectedCategory]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-primary p-4">
      {
        {
          0: (
            <div className="flex w-full max-w-md flex-col gap-[25px] rounded-xl bg-white p-8 backdrop-blur-sm">
              <h1 className="bolder text-[24px]">Game category</h1>
              <Select
                onValueChange={(value: string) => setSelectedCategory(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose Game Category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(CATEGORIES).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button onClick={() => setStep(1)} variant="default">
                Play
              </Button>
            </div>
          ),
          1: (
            <div className="flex w-full max-w-md flex-col gap-5 rounded-xl bg-white p-8 backdrop-blur-sm">
              <h1 className="bolder text-[24px]">
                Category: {selectedCategory}
              </h1>
              {/* @ts-ignore */}
              <Image
                width={500}
                height={500}
                alt="category image"
                src={selectedPrompt.image}
              />
              <div className="flex flex-col gap-1">
                <Label htmlFor="message">Your prompt guess</Label>
                <div className="grid w-full gap-1.5">
                  <Textarea
                    id="prompt"
                    placeholder="Type prompt guess..."
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                  />
                </div>
              </div>
              <Button variant="default" onClick={submitAnswer}>
                Submit
              </Button>
            </div>
          ),
        }[step]
      }
    </div>
  );
}
