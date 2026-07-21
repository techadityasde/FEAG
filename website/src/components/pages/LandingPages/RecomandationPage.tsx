"use client";

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { professionals, Professional } from '@/lib/data/professionals';
import { getDistance } from '@/lib/utils';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { useFilteredProfessionals } from '@/hooks/useFilteredProfessionals';

export default function RecomandationPage() {
    const filteredData = useFilteredProfessionals();

    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => window.removeEventListener("resize", checkScroll);
    }, [filteredData]);

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const { clientWidth } = scrollContainerRef.current;
            const scrollAmount = clientWidth > 400 ? 152 : clientWidth; // 140px width + 12px gap
            scrollContainerRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <section className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-base sm:text-lg font-bold text-[#2E2215]">Top Rated Recommendations</h2>
                {filteredData.length > 0 && (
                    <div className="flex gap-1">
                        <button
                            onClick={() => scroll("left")}
                            disabled={!canScrollLeft}
                            className="p-1 rounded-full border border-border/40 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4 text-gray-700" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            disabled={!canScrollRight}
                            className="p-1 rounded-full border border-border/40 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight className="w-4 h-4 text-gray-700" />
                        </button>
                    </div>
                )}
            </div>

            {/* Carousel Track Container (Smaller Cards) */}
            <div className="relative -mx-2 px-2 pb-1">
                {filteredData.length === 0 ? (
                    <div className="w-full flex flex-col items-center justify-center py-8 rounded-xl border border-dashed border-gray-300 bg-gray-50/50">
                        <p className="text-sm text-gray-500 font-medium text-center">
                            No experts found for your selected location and date.<br />Try choosing a different date or time slot!
                        </p>
                    </div>
                ) : (
                    <div
                        ref={scrollContainerRef}
                        onScroll={checkScroll}
                        className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 hide-scrollbar"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        <style dangerouslySetInnerHTML={{
                            __html: `
                        .hide-scrollbar::-webkit-scrollbar {
                          display: none;
                        }
                      `}} />

                        {filteredData.map((prof) => (
                            <div
                                key={prof.id}
                                className="snap-start min-w-[140px] w-[140px] border border-border/20 rounded-xl p-2 bg-white shadow-sm flex flex-col gap-1.5 flex-shrink-0"
                            >
                                {/* Image */}
                                <div className="w-full h-[90px] relative rounded-md overflow-hidden group-hover:shadow-md transition-shadow">
                                    <Image
                                        src={prof.profileImage}
                                        alt={prof.username}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 140px"
                                        className="object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                </div>

                                {/* Header (Name, Rating) */}
                                <div className="flex justify-between items-center mt-0.5">
                                    <h3 className="font-bold text-xs text-[#2E2215] truncate">{prof.fullName}</h3>
                                    <div className="flex items-center gap-0.5 text-[#F59E0B]">
                                        <Star className="w-2.5 h-2.5 fill-current" />
                                        <span className="text-[10px] font-bold text-[#F59E0B]">{prof.rating.toFixed(1)}</span>
                                    </div>
                                </div>

                                {/* Subtitle / Role */}
                                <div className="flex justify-between items-center text-[9px] text-gray-500 capitalize gap-1">
                                    <span className="truncate max-w-[80px]" title={prof.location}>{prof.location}</span>
                                    {prof.distance !== undefined && (
                                        <span className="text-[8px] bg-gray-100 text-gray-600 px-1 py-0.5 rounded-full font-medium shrink-0">
                                            {prof.distance.toFixed(1)} Km away
                                        </span>
                                    )}


                                </div>
                                {/* Subtitle / Role */}
                                <div className="flex justify-between items-center text-[9px] text-gray-500 capitalize">
                                    <span>{prof.category}</span>
                                    <span className='p-0.5 rounded-lg border bg-primary text-background text-[7px]'>{prof.feature}</span>

                                </div>

                                <Link href={`/portfolio/${prof.username}`} className="w-full mt-0.5 block">
                                    <button className="w-full bg-gray-100 hover:bg-gray-200 text-[#2E2215] text-[10px] font-bold py-1.5 rounded-md transition-colors">
                                        View Profile
                                    </button>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}