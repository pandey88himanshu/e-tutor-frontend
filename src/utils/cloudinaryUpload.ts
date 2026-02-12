const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;

interface CloudinaryUploadResult {
    secure_url: string;
    public_id: string;
    format: string;
    resource_type: string;
    bytes: number;
    original_filename: string;
}

/**
 * Get a signed upload signature from our Next.js API route.
 */
async function getSignature(folder?: string) {
    const res = await fetch("/api/cloudinary-signature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder }),
    });

    if (!res.ok) {
        throw new Error("Failed to get upload signature");
    }

    return res.json() as Promise<{
        signature: string;
        timestamp: number;
        apiKey: string;
        cloudName: string;
    }>;
}

/**
 * Upload a file directly to Cloudinary from the browser.
 * Signature is generated server-side via /api/cloudinary-signature.
 *
 * @param file       - The File object to upload
 * @param folder     - Optional Cloudinary folder (e.g. "resumes", "intro-videos")
 * @param onProgress - Optional callback with upload progress (0–100)
 */
export const uploadToCloudinary = async (
    file: File,
    folder?: string,
    onProgress?: (percent: number) => void
): Promise<CloudinaryUploadResult> => {
    // 1. Get signature from server
    const { signature, timestamp, apiKey, cloudName } =
        await getSignature(folder);

    // 2. Upload directly to Cloudinary
    const resourceType = file.type.startsWith("video/") ? "video" : "auto";
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp.toString());
    formData.append("signature", signature);
    if (folder) formData.append("folder", folder);

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        // Progress tracking
        if (onProgress) {
            xhr.upload.addEventListener("progress", (e) => {
                if (e.lengthComputable) {
                    const percent = Math.round((e.loaded / e.total) * 100);
                    onProgress(percent);
                }
            });
        }

        xhr.addEventListener("load", () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                const response: CloudinaryUploadResult = JSON.parse(xhr.responseText);
                resolve(response);
            } else {
                let errorMsg = "Upload failed";
                try {
                    const errResponse = JSON.parse(xhr.responseText);
                    errorMsg = errResponse?.error?.message || errorMsg;
                } catch {
                    // ignore parse error
                }
                reject(new Error(errorMsg));
            }
        });

        xhr.addEventListener("error", () => {
            reject(new Error("Network error during upload"));
        });

        xhr.open("POST", url);
        xhr.send(formData);
    });
};
