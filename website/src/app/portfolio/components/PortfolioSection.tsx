import React from "react";
import Image from "next/image";
import { Play, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PortfolioSectionProps } from "../types";

export default function PortfolioSection({
  category,
  filteredMedia,
  activeTab,
  setActiveTab,
  onMediaClick,
}: PortfolioSectionProps) {
  return (
    <section id="portfolio-section" className="bg-white border border-border/50 rounded-2xl p-2 sm:p-8 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-extrabold text-foreground tracking-tight">Featured Portfolio</h2>
        
        {/* Tabs */}
        <div className="flex items-center p-0.5 rounded-lg bg-muted/60 border border-border/40 self-start sm:self-auto overflow-x-auto max-w-full">
          <Button 
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab("all")} 
            className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer whitespace-nowrap h-7 ${activeTab === "all" ? "bg-white text-primary hover:bg-white shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-transparent"}`}
          >
            All
          </Button>
          <Button 
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab("images")} 
            className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer whitespace-nowrap h-7 ${activeTab === "images" ? "bg-white text-primary hover:bg-white shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-transparent"}`}
          >
            Images
          </Button>
          {category !== "photographer" && (
            <Button 
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab("videos")} 
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer whitespace-nowrap h-7 ${activeTab === "videos" ? "bg-white text-primary hover:bg-white shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-transparent"}`}
            >
              Videos
            </Button>
          )}
          {category === "singer" && (
            <Button 
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab("audio")} 
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer whitespace-nowrap h-7 ${activeTab === "audio" ? "bg-white text-primary hover:bg-white shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-transparent"}`}
            >
              Audio
            </Button>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {filteredMedia.map((item, idx) => (
          <div 
            key={item.id} 
            onClick={() => onMediaClick(idx)}
            className="relative aspect-square rounded-xl overflow-hidden bg-muted group cursor-pointer border border-border/40 hover:border-primary/50 transition-all select-none"
          >
            <Image src={item.url} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 50vw, 33vw" />
            
            {/* Watermark preview overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-25deg] text-white/15 text-[10px] sm:text-xs font-black tracking-widest pointer-events-none select-none uppercase">
              FEAG PREVIEW
            </div>

            {/* Media Type Icon indicator */}
            {item.type === "video" && (
              <div className="absolute inset-0 bg-black/25 flex items-center justify-center group-hover:bg-black/35 transition-colors">
                <div className="size-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform">
                  <Play className="size-4 fill-white text-white ml-0.5" />
                </div>
              </div>
            )}

            {item.type === "audio" && (
              <div className="absolute inset-0 bg-black/25 flex items-center justify-center group-hover:bg-black/35 transition-colors">
                <div className="size-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform">
                  <Volume2 className="size-4 text-white" />
                </div>
              </div>
            )}

            {/* Hover Title Card */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-white text-[11px] font-bold truncate">{item.title}</p>
              {item.duration && (
                <p className="text-white/70 text-[9px] font-semibold mt-0.5">{item.duration} Min</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
