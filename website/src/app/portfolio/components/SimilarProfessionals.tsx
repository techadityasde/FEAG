import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Star } from "lucide-react";
import { SimilarProfessionalsProps } from "../types";

export default function SimilarProfessionals({
  category,
  similarList,
}: SimilarProfessionalsProps) {
  return (
    <section className="bg-white border border-border/60 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm space-y-6">
      <h2 className="text-lg sm:text-xl font-extrabold text-foreground tracking-tight capitalize">Similar {category}s</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {similarList.map((sim) => (
          <Link 
            key={sim.id} 
            href={`/portfolio/${sim.username}`}
            className="flex flex-col border border-border/60 rounded-xl overflow-hidden shadow-2xs hover:shadow-md hover:border-primary/40 transition-all select-none bg-card group"
          >
            <div className="aspect-square overflow-hidden bg-muted relative">
              <Image src={sim.profileImage} alt={sim.username} fill className="object-cover object-top transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 33vw" />
            </div>
            <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-foreground truncate group-hover:text-primary transition-colors">{sim.fullName || sim.username}</h3>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-0.5 font-medium">
                  <MapPin className="size-3 text-primary shrink-0" />
                  <span className="truncate">{sim.location}</span>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-border/40 pt-2 mt-1">
                <div className="flex items-center gap-1 text-xs">
                  <Star className="size-3 fill-amber-400 text-amber-400 shrink-0" />
                  <span className="font-bold text-[10px] text-foreground">{sim.rating.toFixed(1)}</span>
                </div>
                <span className="text-[10px] font-black text-primary">₹{sim.hourlyPricing.oneHourPrice.toLocaleString('en-IN')}/hr</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
