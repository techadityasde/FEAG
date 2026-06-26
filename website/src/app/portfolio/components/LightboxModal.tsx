import React from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LightboxModalProps } from "../types";

const sampleVideos: Record<string, string> = {
  v1: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  v2: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  v3: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  v4: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  s3: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  s4: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
};

const sampleAudios: Record<string, string> = {
  s1: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  s2: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
};

const defaultVideo = "https://www.w3schools.com/html/mov_bbb.mp4";
const defaultAudio = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3";

export default function LightboxModal({
  mediaItem,
  onClose,
  onPrev,
  onNext,
}: LightboxModalProps) {
  if (!mediaItem) return null;

  const isVideo = mediaItem.type === "video";
  const isAudio = mediaItem.type === "audio";

  const videoUrl = isVideo ? (sampleVideos[mediaItem.id] || defaultVideo) : "";
  const audioUrl = isAudio ? (sampleAudios[mediaItem.id] || defaultAudio) : "";

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center select-none transition-all duration-300"
      onClick={onClose}
    >
      {/* Close button */}
      <Button 
        variant="outline"
        size="icon"
        onClick={onClose}
        className="absolute top-6 right-6 z-50 rounded-full bg-white/10 hover:bg-white/20 text-white border-white/10 hover:text-white cursor-pointer size-11 shadow-lg backdrop-blur-md transition-all active:scale-95"
      >
        <X className="size-5.5" />
      </Button>

      {/* Previous Button */}
      <Button 
        variant="outline"
        size="icon"
        onClick={onPrev}
        className="absolute left-6 z-40 rounded-full bg-white/10 hover:bg-white/20 text-white border-white/10 hover:text-white cursor-pointer size-12 shadow-lg backdrop-blur-md transition-all active:scale-95"
      >
        <ChevronLeft className="size-6" />
      </Button>

      {/* Media Frame Container */}
      <div 
        className="max-w-5xl max-h-[85vh] w-full px-6 flex flex-col items-center justify-center relative" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Aspect-Ratio Main Display */}
        <div className="relative group/lightbox flex items-center justify-center max-w-full max-h-[70vh] w-full">
          {isVideo ? (
            <video 
              key={mediaItem.id}
              src={videoUrl} 
              poster={mediaItem.url} 
              controls 
              autoPlay 
              className="max-w-full max-h-[70vh] rounded-2xl border border-white/10 shadow-2xl outline-none"
              onContextMenu={(e) => e.preventDefault()}
            />
          ) : isAudio ? (
            <div className="relative flex flex-col items-center justify-center w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-muted">
              <Image 
                src={mediaItem.url} 
                alt={mediaItem.title} 
                fill
                className="object-cover select-none brightness-40 filter blur-[2px]"
                onContextMenu={(e) => e.preventDefault()}
                sizes="(max-width: 640px) 100vw, 450px"
                priority
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 space-y-6 z-10">
                {/* Visualizer bars */}
                <div className="flex gap-1.5 items-end justify-center h-12 w-20">
                  <div className="w-1.5 bg-primary rounded-full animate-pulse h-8" />
                  <div className="w-1.5 bg-primary rounded-full animate-pulse h-12" />
                  <div className="w-1.5 bg-primary rounded-full animate-pulse h-6" />
                  <div className="w-1.5 bg-primary rounded-full animate-pulse h-10" />
                  <div className="w-1.5 bg-primary rounded-full animate-pulse h-7" />
                </div>
                <audio 
                  key={mediaItem.id}
                  src={audioUrl} 
                  controls 
                  autoPlay 
                  className="w-full max-w-xs outline-none accent-primary" 
                />
              </div>
            </div>
          ) : (
            <Image 
              src={mediaItem.url} 
              alt={mediaItem.title} 
              width={1200}
              height={800}
              className="w-auto h-auto max-w-full max-h-[70vh] object-contain rounded-2xl border border-white/10 shadow-2xl select-none"
              onContextMenu={(e) => e.preventDefault()}
              priority
            />
          )}
          
          {/* Subtle Watermark Overlay */}
          {!isVideo && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-25deg] text-white/5 text-4xl sm:text-7xl font-black tracking-widest pointer-events-none select-none uppercase">
              FEAG PREVIEW
            </div>
          )}
        </div>

        {/* Glassmorphic Media Title Footer */}
        <div className="mt-5 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl text-center max-w-md w-full">
          <p className="text-white font-extrabold text-sm sm:text-base tracking-tight">{mediaItem.title}</p>
          <span className="inline-flex mt-1.5 bg-primary/20 text-primary border border-primary/20 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
            {mediaItem.type === "image" ? "📷 Image Preview" : mediaItem.type === "video" ? "🎥 Video Preview" : "🎵 Audio Preview"} 
            {mediaItem.duration && ` • ${mediaItem.duration} Mins`}
          </span>
        </div>
      </div>

      {/* Next Button */}
      <Button 
        variant="outline"
        size="icon"
        onClick={onNext}
        className="absolute right-6 z-40 rounded-full bg-white/10 hover:bg-white/20 text-white border-white/10 hover:text-white cursor-pointer size-12 shadow-lg backdrop-blur-md transition-all active:scale-95"
      >
        <ChevronRight className="size-6" />
      </Button>

    </div>
  );
}
