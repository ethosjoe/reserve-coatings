/** UploadThing v7+ returns `ufsUrl`; older clients used `url`. */
export function getUploadedFileUrl(file: {
  ufsUrl?: string;
  url?: string;
  appUrl?: string;
}): string {
  return (file.ufsUrl ?? file.url ?? file.appUrl ?? "").trim();
}

export function normalizePhotoUrls(urls: readonly (string | null | undefined)[] | undefined): string[] {
  if (!urls?.length) return [];
  return Array.from(
    new Set(urls.map((url) => String(url ?? "").trim()).filter(Boolean))
  ).slice(0, 4);
}
