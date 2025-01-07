"use client";

import { useState, useRef } from "react";
import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";

export default function ProfilePage() {
  const { address, isConnected } = useAccount();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) return;

    setIsUploading(true);
    try {
      const response = await fetch("/api/profile/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
          imageData: selectedImage,
        }),
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const result = await response.json();

      if (result.success) {
        alert("Profile picture uploaded successfully!");
        console.log("Fal.ai response:", result.data);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to upload profile picture"
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
          {selectedImage && (
            <div className="mb-4">
              <img
                src={selectedImage}
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
