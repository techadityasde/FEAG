"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { professionals, Professional } from '@/lib/data/professionals';
import { getDistance, cn } from '@/lib/utils';
import { Star, ChevronLeft, ChevronRight, SlidersHorizontal, ChevronDown, Check } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { useFilteredProfessionals } from '@/hooks/useFilteredProfessionals';

const priceOptions = [
    { value: "All", label: "Any Price" },
    { value: "Under2000", label: "Under ₹2,000" },
    { value: "2000To4000", label: "₹2,000 - ₹4,000" },
    { value: "Above4000", label: "Above ₹4,000" },
];

export default function RecomandationPage() {
    const filteredData = useFilteredProfessionals();
    const [filters, setFilters] = useState({ priceRange: "All", customMaxPrice: 5000 });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const onFilterChange = (updated: Partial<typeof filters>) => {
        setFilters(prev => ({ ...prev, ...updated }));
    };

    const displayData = React.useMemo(() => {
        if (filters.priceRange === "All") return filteredData;
        return filteredData.filter((prof) => {
            const price = prof.hourlyPricing?.oneHourPrice || 0;
            if (filters.priceRange === "Under2000") return price < 2000;
            if (filters.priceRange === "2000To4000") return price >= 2000 && price <= 4000;
            if (filters.priceRange === "Above4000") return price > 4000;
            if (filters.priceRange === "Custom") return price <= filters.customMaxPrice;
            return true;
        });
    }, [filteredData, filters.priceRange, filters.customMaxPrice]);

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
    }, [displayData]);

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

    const getSelectedLabel = () => {
        if (filters.priceRange === "Custom") {
            return `Up to ₹${filters.customMaxPrice.toLocaleString('en-IN')}`;
        }
        return priceOptions.find(o => o.value === filters.priceRange)?.label || "Any Price";
    };

    return (
        <section className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-base sm:text-lg font-bold text-[#2E2215]">Top Rated Recommendations</h2>

                    {/* Custom Styled Price Dropdown Menu */}
                    <div className="relative inline-block text-left" ref={dropdownRef}>
                        <button
                            type="button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border/80 bg-white hover:bg-gray-50 active:bg-gray-100 transition-all shadow-2xs group focus:outline-none focus:ring-2 focus:ring-primary/20 text-xs font-normal text-foreground cursor-pointer"
                        >
                            <SlidersHorizontal className="w-3 h-3 text-primary shrink-0" />
                            <span className="text-[11px] font-normal text-muted-foreground hidden min-[400px]:inline">Price:</span>
                            <span className="font-semibold text-foreground text-xs">
                                {getSelectedLabel()}
                            </span>
                            <ChevronDown className={cn("w-3 h-3 text-muted-foreground shrink-0 transition-transform duration-200", isDropdownOpen && "rotate-180 text-primary")} />
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute left-0 sm:right-0 sm:left-auto mt-1.5 w-56 bg-white rounded-xl border border-border/80 shadow-xl py-1 z-50 animate-in fade-in duration-150">
                                <div className="px-2.5 py-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider border-b border-border/40 mb-1">
                                    Filter by Price
                                </div>
                                {priceOptions.map((opt) => {
                                    const isSelected = filters.priceRange === opt.value;
                                    return (
                                        <button
                                            key={opt.value}
                                            type="button"
                                            onClick={() => {
                                                onFilterChange({ priceRange: opt.value });
                                                setIsDropdownOpen(false);
                                            }}
                                            className={cn(
                                                "w-[calc(100%-8px)] text-left px-2.5 py-1.5 text-xs font-medium flex items-center justify-between transition-colors cursor-pointer rounded-lg mx-1",
                                                isSelected ? "bg-primary/10 text-primary font-semibold" : "text-foreground hover:bg-muted/70"
                                            )}
                                        >
                                            <span>{opt.label}</span>
                                            {isSelected && <Check className="w-3.5 h-3.5 text-primary shrink-0" />}
                                        </button>
                                    );
                                })}

                                {/* Custom Price Range Input */}
                                <div className="border-t border-border/40 mt-1 pt-2 px-2.5 pb-1">
                                    <div className="flex items-center justify-between text-[10px] font-semibold text-foreground mb-1">
                                        <span>Custom Range</span>
                                        <span className="text-primary font-bold">Max: ₹{filters.customMaxPrice.toLocaleString('en-IN')}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min={1000}
                                        max={10000}
                                        step={250}
                                        value={filters.customMaxPrice}
                                        onChange={(e) => {
                                            const val = Number(e.target.value);
                                            onFilterChange({ priceRange: "Custom", customMaxPrice: val });
                                        }}
                                        className="w-full accent-primary h-1.5 bg-gray-200 rounded-lg cursor-pointer"
                                    />
                                    <div className="flex justify-between text-[9px] text-muted-foreground mt-1">
                                        <span>₹1,000</span>
                                        <span>₹10,000+</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {displayData.length > 0 && (
                    <div className="flex gap-1 shrink-0">
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
                {displayData.length === 0 ? (
                    <div className="w-full flex flex-col items-center justify-center py-8 rounded-xl border border-dashed border-gray-300 bg-gray-50/50">
                        <p className="text-sm text-gray-500 font-medium text-center">
                            No experts found for your selected criteria.<br />Try choosing a different price range or location!
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

                        {displayData.map((prof) => {
                            const currentPrice = prof.hourlyPricing?.oneHourPrice || 0;
                            const originalPrice = Math.round(currentPrice * 1.2);

                            return (
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

                                    {/* Subtitle / Category & Feature */}
                                    <div className="flex justify-between items-center text-[9px] text-gray-500 capitalize">
                                        <span>{prof.category}</span>
                                        <span className='p-0.5 rounded-lg border bg-primary text-background text-[7px]'>{prof.feature}</span>
                                    </div>

                                    {/* Basic Package Pricing with 20% Line-through Discount Price */}
                                    <div className="flex justify-between items-center text-[9px] pt-1 border-t border-border/20 mt-0.5">
                                        <span className="text-gray-500 font-medium">Pricing</span>
                                        <div className="flex items-center gap-1">
                                            <span className="line-through text-gray-400 text-[8px] font-normal">
                                                ₹{originalPrice.toLocaleString('en-IN')}
                                            </span>
                                            <span className="font-bold text-primary">
                                                ₹{currentPrice.toLocaleString('en-IN')}
                                                <span className="text-[8px] text-gray-500 font-normal">/hr</span>
                                            </span>
                                        </div>
                                    </div>

                                    <Link href={`/portfolio/${prof.username}`} className="w-full mt-0.5 block">
                                        <button className="w-full bg-gray-100 hover:bg-gray-200 text-[#2E2215] text-[10px] font-bold py-1.5 rounded-md transition-colors">
                                            View Profile
                                        </button>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}