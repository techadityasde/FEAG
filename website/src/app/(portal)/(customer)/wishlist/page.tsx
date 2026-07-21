"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store/store";
import { removeFromWishlist } from "@/lib/store/wishlistSlice";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Star, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const WishlistContent = () => {
  const wishlist = useSelector((state: RootState) => state.wishlist?.items || []);
  const dispatch = useDispatch();

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const categories = ["all", ...Array.from(new Set(wishlist.map((item: any) => item.category)))];
  const filteredWishlist = activeCategory === "all" ? wishlist : wishlist.filter((item: any) => item.category === activeCategory);

  const handleRemove = (id: string, name: string) => {
    dispatch(removeFromWishlist(id));
    toast.success(`${name} removed from wishlist`);
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-background/50 py-10 px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">My Wishlist</h1>
            <p className="text-muted-foreground">
              View and manage the professionals you have saved.
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-12 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
            <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center">
              <Heart className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-semibold">Your wishlist is empty</h3>
              <p className="text-muted-foreground mb-4">
                Explore our professionals and save them to your wishlist to easily find them later.
              </p>
              <Link href="/services/photographer">
                <Button className="mt-4">Browse Professionals</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background/50 py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">My Wishlist</h1>
            <p className="text-muted-foreground">
              You have saved {wishlist.length} professionals.
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        {categories.length > 1 && (
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((category: string) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-semibold capitalize transition-colors cursor-pointer ${
                  activeCategory === category
                    ? "bg-primary text-white shadow-sm"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Filtered Empty State */}
        {filteredWishlist.length === 0 && wishlist.length > 0 && (
          <div className="bg-card border border-border rounded-xl p-12 shadow-sm flex flex-col items-center justify-center text-center space-y-3">
            <p className="text-muted-foreground font-medium">No saved professionals found in the {activeCategory} category.</p>
            <Button variant="outline" className="cursor-pointer" onClick={() => setActiveCategory("all")}>View All</Button>
          </div>
        )}

        {filteredWishlist.length > 0 && (
          <>
            {/* Desktop Table View */}
        <div className="hidden md:block bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/50 text-muted-foreground border-b border-border text-sm font-semibold">
                <th className="py-4 px-6">Professional</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Location</th>
                <th className="py-4 px-6">Rating</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredWishlist.map((item: any) => (
                <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-full overflow-hidden bg-muted shrink-0 relative">
                        <Image src={item.profileImage} alt={item.username} fill className="object-cover" sizes="48px" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-base">{item.username}</h3>
                        <p className="text-xs text-muted-foreground">{item.experience}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="capitalize px-2.5 py-1 bg-primary/10 text-primary font-semibold text-xs rounded-full">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="size-4" />
                      <span className="truncate max-w-[150px]">{item.location}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1.5 text-sm font-medium">
                      <Star className="size-4 fill-amber-400 text-amber-400" />
                      {item.rating.toFixed(1)}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/portfolio/${item.username.toLowerCase()}`}>
                        <Button variant="outline" size="sm" className="font-semibold shadow-sm">
                          View Profile
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2"
                        onClick={() => handleRemove(item.id, item.username)}
                        title="Remove from wishlist"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {filteredWishlist.map((item: any) => (
            <div key={item.id} className="bg-card p-4 rounded-xl border border-border shadow-sm flex flex-col gap-4 relative">
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute top-2 right-2 text-red-500 hover:text-red-600 hover:bg-red-50 p-2 h-auto"
                onClick={() => handleRemove(item.id, item.username)}
              >
                <Heart className="size-5 fill-red-500" />
              </Button>
              
              <div className="flex items-center gap-4">
                <div className="size-16 rounded-xl overflow-hidden bg-muted shrink-0 relative shadow-sm border border-border/50">
                  <Image src={item.profileImage} alt={item.username} fill className="object-cover" sizes="64px" />
                </div>
                <div className="flex-1 min-w-0 pr-8">
                  <h3 className="font-bold text-foreground text-base truncate">{item.username}</h3>
                  <span className="inline-block mt-0.5 capitalize px-2 py-0.5 bg-primary/10 text-primary font-semibold text-[10px] rounded-md">
                    {item.category}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground border-t border-border/50 pt-3">
                <div className="flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-primary" />
                  <span className="truncate max-w-[120px] text-xs">{item.location}</span>
                </div>
                <div className="flex items-center gap-1 font-medium text-foreground">
                  <Star className="size-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs">{item.rating.toFixed(1)}</span>
                </div>
              </div>
              
              <Link href={`/portfolio/${item.username.toLowerCase()}`} className="w-full mt-1">
                <Button className="w-full font-semibold text-xs shadow-sm h-9">
                  View Profile
                </Button>
              </Link>
            </div>
          ))}
        </div>
          </>
        )}
      </div>
    </div>
  );
};

export default function WishlistPage() {
  return (
    <ProtectedRoute allowedRoles={["customer"]}>
      <WishlistContent />
    </ProtectedRoute>
  );
}
