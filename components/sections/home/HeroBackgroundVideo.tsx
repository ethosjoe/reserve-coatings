"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IMAGES, VIDEOS } from "@/lib/images";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

function useSaveData(): boolean {
  const [saveData, setSaveData] = useState(false);

  useEffect(() => {
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
    ).connection;
    if (!connection) return;
    setSaveData(!!connection.saveData || connection.effectiveType === "slow-2g");
  }, []);

  return saveData;
}

export function HeroBackgroundVideo() {
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const saveData = useSaveData();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  const showVideo = !reducedMotion && !saveData;
  const src = isMobile ? VIDEOS.heroHomeMobile : VIDEOS.heroHome;

  useEffect(() => {
    if (!showVideo) return;

    const video = videoRef.current;
    if (!video) return;

    setVideoReady(false);
    video.src = src;
    video.load();

    const play = () => {
      void video.play().catch(() => {
        // Autoplay blocked — poster remains visible
      });
    };

    if (isMobile) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          play();
          observer.disconnect();
        },
        { threshold: 0.01 }
      );
      observer.observe(video);
      return () => observer.disconnect();
    }

    play();
  }, [showVideo, src, isMobile]);

  if (!showVideo) {
    return (
      <Image
        src={IMAGES.heroHome}
        alt="High-end Birmingham garage interior at dusk with metallic flake epoxy floor"
        fill
        priority
        fetchPriority="high"
        quality={82}
        className="object-cover"
        sizes="100vw"
      />
    );
  }

  return (
    <>
      <Image
        src={IMAGES.heroHome}
        alt=""
        aria-hidden
        fill
        priority
        fetchPriority="high"
        quality={82}
        className={cn(
          "object-cover transition-opacity duration-700",
          videoReady ? "opacity-0" : "opacity-100"
        )}
        sizes="100vw"
      />
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload={isMobile ? "none" : "metadata"}
        poster={IMAGES.heroHome}
        onPlaying={() => setVideoReady(true)}
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
          videoReady ? "opacity-100" : "opacity-0"
        )}
        aria-hidden
      />
    </>
  );
}
