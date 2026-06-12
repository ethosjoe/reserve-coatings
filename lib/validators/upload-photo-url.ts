import { z } from "zod";

/** Accept UploadThing CDN URLs (utfs.io, *.ufs.sh, legacy domains). */
export function isAllowedUploadUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return false;
    const host = parsed.hostname.toLowerCase();
    return (
      host === "utfs.io" ||
      host.endsWith(".utfs.io") ||
      host.endsWith(".ufs.sh") ||
      host.endsWith(".uploadthing.com") ||
      host.endsWith(".uploadthing.dev") ||
      host.includes("uploadthing") ||
      host.includes("ufs.sh")
    );
  } catch {
    return false;
  }
}

export const uploadPhotoUrlSchema = z
  .string()
  .url()
  .refine(isAllowedUploadUrl, { message: "Photo URL must be from UploadThing" });
