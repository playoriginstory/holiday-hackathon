"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateImageSubnet = void 0;
const axios_1 = __importDefault(require("axios"));
const generateImageSubnet = (prompt_1, imageRatio_1, ...args_1) => __awaiter(void 0, [prompt_1, imageRatio_1, ...args_1], void 0, function* (prompt, imageRatio, modelId = "SG161222/RealVisXL_V4.0_Lightning", negativePrompt) {
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
        const response = yield (0, axios_1.default)(options);
        const imageUrl = response.data.images[0].url;
        console.log("Generated Image URL:", imageUrl);
        return imageUrl;
    }
    catch (error) {
        console.error("Error generating image with Subnet:", error);
        throw new Error("Failed to generate image.");
    }
});
exports.generateImageSubnet = generateImageSubnet;
