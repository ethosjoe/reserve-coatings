import { z } from "zod";
import { normalizePhotoUrls } from "@/lib/upload-url";

export const quotePhotoSyncSchema = z.object({
  submissionId: z.string().uuid(),
  spaceType: z.enum(["garage", "basement", "outdoor", "commercial"]),
  sqft: z.number().min(100).max(5000),
  tier: z.enum(["standard", "premium"]),
  photoUrls: z
    .array(z.string().min(1))
    .min(1)
    .max(4)
    .transform((urls) => normalizePhotoUrls(urls)),
});

export type QuotePhotoSyncInput = z.infer<typeof quotePhotoSyncSchema>;
