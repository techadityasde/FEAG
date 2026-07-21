"use client";

import React from "react";
import { Package, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RootState } from "@/lib/store/store";
import { useSelector } from "react-redux";

export default function CreatorPackages() {
  const { user } = useSelector((state: RootState) => state.auth);
  const packages = useSelector((state: RootState) => state.package.packages) || [];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">Packages</h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            Manage your service packages and pricing
          </p>
        </div>
      </div>

      {packages.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-12 shadow-sm flex flex-col items-center justify-center text-center space-y-4 min-h-[400px]">
          <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Package className="h-8 w-8 text-primary" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-semibold">No packages found</h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              You haven't created any packages yet. Complete your profile setup to configure them.
            </p>
          </div>
          <Button className="mt-2" variant="outline">Learn about Packages</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {packages.map((pkg) => (
            <div 
              key={pkg.id} 
              className={`relative flex flex-col rounded-2xl border ${pkg.id === 'professional' ? 'border-primary shadow-md lg:scale-[1.02]' : 'border-border shadow-sm'} bg-card overflow-hidden transition-all duration-300`}
            >
              {!pkg.enabled && (
                <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] z-10 flex items-center justify-center">
                  <span className="bg-muted text-muted-foreground font-semibold px-3 py-1 rounded-full text-sm border border-border">Disabled</span>
                </div>
              )}
              {pkg.id === 'professional' && (
                <div className="bg-primary text-primary-foreground text-center text-xs font-bold uppercase tracking-wider py-1.5">
                  Most Popular
                </div>
              )}
              
              <div className="p-6 border-b border-border/50">
                <h3 className="text-xl font-bold text-foreground mb-2">{pkg.title}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-extrabold text-foreground">₹{pkg.price}</span>
                  <span className="text-muted-foreground font-medium">/ {pkg.duration}</span>
                </div>
              </div>
              
              <div className="p-6 flex-grow">
                <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Features included</h4>
                <ul className="space-y-3">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Check className="size-4 text-primary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-6 pt-0 mt-auto">
                <Button className="w-full font-semibold" variant={pkg.id === 'professional' ? 'default' : 'outline'}>
                  Edit Package
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
