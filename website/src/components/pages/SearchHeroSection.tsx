"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, Video, MicVocal, Clapperboard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import SearchFormPlan from './SearchFormPlan';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTab } from '@/lib/store/tabSlice';

const MaskIcon = ({ url, className, scale = 1.5 }: { url: string, className?: string, scale?: number }) => (
  <div
    className={cn("bg-current inline-block", className)}
    style={{
      transform: `scale(${scale})`,
      maskImage: `url(${url})`,
      maskSize: 'contain',
      maskRepeat: 'no-repeat',
      maskPosition: 'center',
      WebkitMaskImage: `url(${url})`,
      WebkitMaskSize: 'contain',
      WebkitMaskRepeat: 'no-repeat',
      WebkitMaskPosition: 'center',
      filter: 'drop-shadow(0px 0px 0.5px currentColor) drop-shadow(0px 0px 0.5px currentColor)',
    }}
  />
);

const CinematicIcon = ({ className }: { className?: string }) => <MaskIcon url="/Cinematic.svg" className={className} />;
const PhotographerIcon = ({ className }: { className?: string }) => <MaskIcon url="/camaraman.svg" className={className} scale={2.7} />;
const VideographerIcon = ({ className }: { className?: string }) => <MaskIcon url="/videogharapher.svg" className={className} scale={2.2} />;
const SingerIcon = ({ className }: { className?: string }) => <MaskIcon url="/singer.svg" className={className} scale={2.7} />;

const categories = [
  { id: 'Cinematic', label: 'Cinematic', icon: CinematicIcon },
  { id: 'photographer', label: 'Photographer', icon: PhotographerIcon },
  { id: 'videographer', label: 'Videographer', icon: VideographerIcon },
  { id: 'singer', label: 'Singer', icon: SingerIcon },
];

export default function SearchHeroSection() {
  const dispatch = useDispatch();
  const router = useRouter();
  const activeTab = useSelector((state: any) => state.tab.activeTab);

  return (
    <section className="w-full bg-slate-100/50 py-4 px-2 sm:px-6 lg:px-8 flex justify-center">
      <div className="w-full max-w-[1200px]">

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] relative pb-4 border border-gray-100">

          {/* Top Tabs */}
          <div className="relative border-b border-gray-100 w-full">
            <div className="grid grid-cols-4 sm:flex sm:items-center sm:justify-center sm:gap-6 px-1 sm:px-6 py-2 w-full">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeTab === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => dispatch(setActiveTab(cat.id))}
                    className={cn(
                      "flex flex-col items-center gap-1 sm:gap-1.5 pb-2.5 sm:pb-3 px-1 sm:px-6 relative transition-colors whitespace-nowrap flex-shrink-0 w-full sm:w-auto",
                      isActive ? "text-primary" : "text-gray-500 hover:text-gray-700"
                    )}
                  >
                    <Icon className={cn("w-6 h-6 sm:w-7 sm:h-9", isActive ? "text-primary" : "text-gray-400")} />
                    <span className="text-[11px] min-[360px]:text-xs sm:text-[12px] font-bold">{cat.label}</span>
                    {/* Active Indicator Underline */}
                    {isActive && (
                      <div className="absolute -bottom-[1px] left-0 right-0 h-[3px] bg-primary rounded-t-md" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Body Content */}
          <div className="p-3 sm:p-6 pt-3 pb-6">
            <SearchFormPlan activeTab={activeTab} showSearchButton={true} />
          </div>
        </div>

      </div>
    </section>
  );
}