import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const { folder } = await request.json();

    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    console.log(
      "Secret Length:",
      apiSecret?.length,
      "| Value:",
      apiSecret?.substring(0, 3) + "...",
    );

    if (!apiSecret || !apiKey || !cloudName) {
      return NextResponse.json(
        { error: "Credentials missing" },
        { status: 500 },
      );
    }

    const timestamp = Math.floor(Date.now() / 1000);

    // 1. Create object with ONLY the params to be signed (NO api_key here)
    const paramsToSign: Record<string, string | number> = { timestamp };
    if (folder) paramsToSign.folder = folder;

    // 2. Sort keys alphabetically
    const sortedKeys = Object.keys(paramsToSign).sort();

    // 3. Join them into a string (e.g., "folder=my-folder&timestamp=12345")
    const stringToSign = sortedKeys
      .map((key) => `${key}=${paramsToSign[key]}`)
      .join("&");

    // 4. Generate signature by appending the secret (NO '&' before the secret)
    const signature = crypto
      .createHash("sha1")
      .update(stringToSign + apiSecret)
      .digest("hex");

    return NextResponse.json({ signature, timestamp, apiKey, cloudName });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate signature" },
      { status: 500 },
    );
  }
}
