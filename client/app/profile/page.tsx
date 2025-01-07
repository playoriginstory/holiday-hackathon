"use client";

import { useState, useRef } from "react";
import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";
import { fal } from "@fal-ai/client";

export default function ProfilePage() {
  const { address, isConnected } = useAccount();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  fal.config({
    proxyUrl: "/api/profile/upload",
  });

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) return;

    setIsUploading(true);
    try {
      // Upload the selected image to get a URL
      const uploadedImageUrl = await fal.storage.upload(selectedImage);

      console.log("Uploaded Image URL:", uploadedImageUrl);

      // Generate an image using the uploaded image as reference
      const prompt =
        "An award-winning portrait vintage, of a child royalty 17th century. striking pose, blue, pink outfit";
      const result = await fal.subscribe("fal-ai/flux-pulid", {
        input: {
          prompt,
          reference_image_url: uploadedImageUrl, // Use the uploaded image URL here
        },
        logs: true,
        onQueueUpdate: (update) => {
          if (update.status === "IN_PROGRESS") {
            update.logs.map((log) => log.message).forEach(console.log);
          }
        },
      });

      console.log("Generated Image Data:", result.data);
      console.log("Request ID:", result.requestId);

      if (result.data) {
        alert("Profile picture uploaded and image generated successfully!");
      } else {
        throw new Error("Failed to generate image");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to upload or generate image"
      );
    } finally {
      setIsUploading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-primary">
        <p className="mb-4 text-white">
          Please connect your wallet to manage your profile:
        </p>
        <ConnectKitButton />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-primary p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <h1 className="mb-6 text-2xl font-bold">Profile Settings</h1>

        <div className="mb-6">
          <p className="mb-2 text-sm text-gray-600">Connected as: {address}</p>
        </div>

        <div className="mb-6">
          {previewImage && (
            <div className="mb-4">
              <img
                src={previewImage}
                alt="Selected profile picture"
                className="mx-auto h-32 w-32 rounded-full object-cover"
              />
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            ref={fileInputRef}
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="mb-2 w-full rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
          >
            Select Image
          </button>

          <button
            onClick={handleUpload}
            disabled={!selectedImage || isUploading}
            className={`w-full rounded-lg px-4 py-2 transition-colors ${
              !selectedImage || isUploading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            {isUploading ? "Uploading..." : "Upload Profile Picture"}
          </button>
        </div>
      </div>
    </div>
  );
}
