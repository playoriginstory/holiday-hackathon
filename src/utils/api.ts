import axios from "axios";

export const generateImageSubnet = async (
  prompt: string,
  imageRatio: "horizontal" | "square" | "vertical",
  modelId: string = "SG161222/RealVisXL_V4.0_Lightning",
  negativePrompt?: string
): Promise<string> => {
  const ratio = {
    horizontal: { width: 1024, height: 576 },
    square: { width: 1024, height: 1024 },
    vertical: { width: 576, height: 1024 },
  }[imageRatio];

  const options = {
    method: "POST",
    url: "https://dream-gateway.livepeer.cloud/text-to-image",
    headers: {
      Authorization: `Bearer ${process.env.SUBNET_API_KEY}`,
      "Content-Type": "application/json",
    },
    data: {
      model_id: modelId,
      prompt,
      height: ratio.height,
      width: ratio.width,
      guidance_scale: 2,
      negative_prompt: negativePrompt || "",
      safety_check: true,
      seed: undefined,
      num_inference_steps: 6,
      num_images_per_prompt: 1,
    },
  };

  try {
    const response = await axios(options);
    const imageUrl = response.data.images[0].url;
    console.log("Generated Image URL:", imageUrl);
    return imageUrl;
  } catch (error) {
    console.error("Error generating image with Subnet:", error);
    throw new Error("Failed to generate image.");
  }
};
