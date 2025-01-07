// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { imageData } = body;

//     // Convert data URL to base64 by removing the prefix
//     // Example prefix: "data:image/jpeg;base64,"
//     const base64Image = imageData.split(",")[1];

//     if (!base64Image) {
//       throw new Error("Invalid image format");
//     }

//     // Call fal.ai API
//     const response = await fetch("https://queue.fal.run/fal-ai/flux-pulid", {
//       method: "POST",
//       headers: {
//         Authorization: `Key ${process.env.FAL_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         reference_image_url: base64Image, // Send only the base64 part
//         prompt:
//           "An award-winning portrait vintage, of a child royalty 17th century. striking pose, blue, pink outfit",
//       }),
//     });

//     if (!response.ok) {
//       throw new Error(`Fal.ai API error: ${response.statusText}`);
//     }

//     const falResponse = await response.json();

//     return NextResponse.json(
//       {
//         success: true,
//         message: "Profile picture uploaded successfully",
//         data: falResponse,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Profile upload error:", error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Failed to upload profile picture",
//         error: error instanceof Error ? error.message : "Unknown error",
//       },
//       { status: 500 }
//     );
//   }
// }

import { route } from "@fal-ai/server-proxy/nextjs";
 
export const { GET, POST } = route;
