"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UploadDropzone } from "@/lib/uploadthing";
import { getUploadedFileUrl, normalizePhotoUrls } from "@/lib/upload-url";
import type { FinishTier } from "@/lib/pricing";
import type { SpaceType } from "./quote-state";

async function syncPhotosToSheetRequest(input: {
  submissionId: string;
  spaceType: SpaceType;
  sqft: number;
  tier: FinishTier;
  photoUrls: string[];
}) {
  const res = await fetch("/api/quote/photos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const payload = (await res.json().catch(() => null)) as { error?: string } | null;
  if (!res.ok) {
    throw new Error(payload?.error ?? "Sheet sync failed");
  }
}

export function StepPhotos({
  submissionId,
  spaceType,
  sqft,
  tier,
  urls,
  onChange,
  onNext,
  onSkip,
  onBack,
}: {
  submissionId: string;
  spaceType: SpaceType;
  sqft: number;
  tier: FinishTier;
  urls: string[];
  onChange: (urls: string[]) => void;
  onNext: () => void;
  onSkip: () => void;
  onBack: () => void;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [sheetSyncError, setSheetSyncError] = useState<string | null>(null);

  const syncPhotosToSheet = async (photoUrls: string[]) => {
    if (photoUrls.length === 0) return;
    setIsSyncing(true);
    setSheetSyncError(null);
    try {
      await syncPhotosToSheetRequest({
        submissionId,
        spaceType,
        sqft,
        tier,
        photoUrls,
      });
    } catch (err) {
      setSheetSyncError(
        err instanceof Error
          ? `${err.message}. You can still continue — we'll retry when you submit your estimate.`
          : "Photos saved locally but could not sync to our team sheet. You can still continue."
      );
    } finally {
      setIsSyncing(false);
    }
  };

  const appendUploadedUrls = async (
    files: { ufsUrl?: string; url?: string; appUrl?: string }[]
  ) => {
    const next = normalizePhotoUrls([
      ...urls,
      ...files.map((file) => getUploadedFileUrl(file)),
    ]);
    onChange(next);
    setUploadError(null);
    await syncPhotosToSheet(next);
  };

  const handleContinue = async () => {
    if (urls.length > 0) {
      await syncPhotosToSheet(urls);
    }
    onNext();
  };

  const isBusy = isUploading || isSyncing;

  return (
    <div>
      <h1 className="font-display text-3xl font-light text-obsidian sm:text-4xl">
        Add photos (optional)
      </h1>
      <p className="mt-4 text-sm text-graphite">
        Photos help us account for cracks, oil staining, and prep needs in your estimate. You can skip this and we&apos;ll send a price range based on size and tier alone.
      </p>
      <div className="mt-8 rounded-sm border border-hairline bg-white p-4">
        <UploadDropzone
          endpoint="quoteImage"
          onUploadBegin={() => {
            setIsUploading(true);
            setUploadError(null);
          }}
          onClientUploadComplete={(res) => {
            setIsUploading(false);
            void appendUploadedUrls(res);
          }}
          onUploadError={(error) => {
            setIsUploading(false);
            console.error(error);
            setUploadError(
              "Photo upload failed. You can skip this step and email photos later, or try again."
            );
          }}
        />
        {isUploading && (
          <p className="mt-2 text-xs text-smoke" role="status">
            Uploading photo…
          </p>
        )}
        {isSyncing && (
          <p className="mt-2 text-xs text-smoke" role="status">
            Saving photos to your inquiry…
          </p>
        )}
        {uploadError && (
          <p className="mt-2 text-xs text-destructive" role="alert">
            {uploadError}
          </p>
        )}
        {sheetSyncError && (
          <p className="mt-2 text-xs text-destructive" role="alert">
            {sheetSyncError}
          </p>
        )}
        {urls.length > 0 && (
          <div className="mt-4 space-y-3">
            <p className="text-xs text-smoke">{urls.length} photo(s) ready for your estimate</p>
            <div className="flex flex-wrap gap-3">
              {urls.map((url) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block h-20 w-20 overflow-hidden rounded-sm border border-hairline"
                >
                  <Image src={url} alt="Uploaded project photo" fill className="object-cover" sizes="80px" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="mt-10 flex flex-wrap gap-4">
        <Button onClick={onBack} className="btn-secondary" disabled={isBusy}>
          Back
        </Button>
        <Button onClick={onSkip} className="btn-secondary" disabled={isBusy}>
          Skip
        </Button>
        <Button onClick={() => void handleContinue()} className="btn-primary" disabled={isBusy}>
          {isUploading ? "Uploading…" : isSyncing ? "Saving…" : "Continue"}
        </Button>
      </div>
    </div>
  );
}
