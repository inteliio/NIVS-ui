"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Download, Loader2 } from "lucide-react";

export default function DownloadCatalogueButton() {
  const t = useTranslations("products");
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/catalogue");
      if (!res.ok) throw new Error("Download failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "nivs-product-catalogue.pdf";
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      // Network or missing file — fail quietly; user can retry
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={loading}
      aria-busy={loading}
      className="inline-flex min-h-[2.75rem] shrink-0 items-center justify-center gap-2 self-start rounded-lg border-2 border-nivs-navy-deep bg-transparent px-4 py-2.5 text-sm font-semibold text-nivs-navy-deep transition hover:bg-nivs-navy-deep hover:text-white disabled:cursor-wait disabled:opacity-70 sm:self-auto"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden />
      ) : (
        <Download className="h-4 w-4 shrink-0" aria-hidden />
      )}
      <span>{t("downloadCatalogue")}</span>
    </button>
  );
}
