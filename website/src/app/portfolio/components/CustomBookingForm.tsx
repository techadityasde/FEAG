import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { MapPin, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { CustomBookingFormProps } from "../types";

export default function CustomBookingForm({
  professional,
  control,
  handleSubmit,
  onSubmit,
  errors,
  setValue,
}: CustomBookingFormProps) {
  const { username, category } = professional;

  const [isLocating, setIsLocating] = useState(false);

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);
    toast.loading("Detecting current location...", { id: "location-detect" });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const coordinatesStr = `📍 Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`;
        setValue("eventLocation", coordinatesStr, { shouldValidate: true });
        
        toast.dismiss("location-detect");
        toast.success(`Location detected: Lat ${latitude.toFixed(2)}, Lng ${longitude.toFixed(2)}`);
        setIsLocating(false);
      },
      (error) => {
        toast.dismiss("location-detect");
        toast.error("Unable to retrieve location. Please type manually.");
        setIsLocating(false);
        console.error("Geolocation error:", error);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const todayStr = `${yyyy}-${mm}-${dd}`;

  return (
    <section id="booking-request-section" className="bg-white border border-border/50 rounded-2xl p-2 sm:p-8 shadow-sm space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-foreground tracking-tight">Custom Booking Request</h2>
        <p className="text-xs text-muted-foreground mt-1">Submit custom booking events or direct specific packaging requirements to {username}.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Common: Event Type */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="eventType" className="text-xs font-bold text-foreground/80 uppercase tracking-wide">Event Type</label>
            <Controller
              name="eventType"
              control={control}
              rules={{ required: "Event type is required" }}
              render={({ field }) => (
                <select {...field} id="eventType" className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none focus:ring-1 focus:ring-ring text-foreground">
                  <option value="">Select Event Type</option>
                  <option value="wedding">Wedding Ceremony</option>
                  <option value="corporate">Corporate Gala</option>
                  <option value="birthday">Birthday Party</option>
                  <option value="concert">Live Concert / Club Gig</option>
                  <option value="other">Other Events</option>
                </select>
              )}
            />
            {errors.eventType && <span className="text-xs text-destructive font-medium">{errors.eventType.message}</span>}
          </div>

          {/* Common: Event Date */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="eventDate" className="text-xs font-bold text-foreground/80 uppercase tracking-wide">Event Date</label>
            <Controller
              name="eventDate"
              control={control}
              rules={{ 
                required: "Event date is required",
                validate: (value) => value >= todayStr || "Event date cannot be in the past"
              }}
              render={({ field }) => (
                <input 
                  {...field} 
                  id="eventDate" 
                  type="date" 
                  min={todayStr}
                  className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none focus:ring-1 focus:ring-ring text-foreground" 
                />
              )}
            />
            {errors.eventDate && <span className="text-xs text-destructive font-medium">{errors.eventDate.message}</span>}
          </div>

          {/* Common: Location */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="eventLocation" className="text-xs font-bold text-foreground/80 uppercase tracking-wide">Event Location</label>
            <Controller
              name="eventLocation"
              control={control}
              rules={{ required: "Location details are required" }}
              render={({ field }) => (
                <div className="relative flex items-center w-full">
                  <input 
                    {...field} 
                    id="eventLocation" 
                    type="text" 
                    placeholder="Enter venue or click GPS icon" 
                    className="flex h-10 w-full rounded-md border border-input bg-transparent pl-3 pr-10 py-2 text-sm shadow-sm outline-none focus:ring-1 focus:ring-ring text-foreground" 
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    onClick={handleGetCurrentLocation}
                    disabled={isLocating}
                    className="absolute right-2 text-muted-foreground hover:text-primary cursor-pointer rounded-full size-7 hover:bg-muted"
                    title="Use Current Location"
                  >
                    {isLocating ? (
                      <Loader2 className="size-4 animate-spin text-primary" />
                    ) : (
                      <MapPin className="size-4 text-primary" />
                    )}
                  </Button>
                </div>
              )}
            />
            {errors.eventLocation && <span className="text-xs text-destructive font-medium">{errors.eventLocation.message}</span>}
          </div>

         

          {/* Dynamic Fields - Photographer */}
          {category === "photographer" && (
            <>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="shootType" className="text-xs font-bold text-foreground/80 uppercase tracking-wide">Shoot Style</label>
                <Controller
                  name="shootType"
                  control={control}
                  render={({ field }) => (
                    <select {...field} id="shootType" className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none focus:ring-1 focus:ring-ring text-foreground">
                      <option value="">Select Shoot Style</option>
                      <option value="candid">Candid Style</option>
                      <option value="traditional">Traditional Portraits</option>
                      <option value="mixed">Mixed Package</option>
                    </select>
                  )}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="needAlbum" className="text-xs font-bold text-foreground/80 uppercase tracking-wide">Printed Album Required?</label>
                <Controller
                  name="needAlbum"
                  control={control}
                  render={({ field }) => (
                    <select {...field} id="needAlbum" className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none focus:ring-1 focus:ring-ring text-foreground">
                      <option value="no">No</option>
                      <option value="yes">Yes (Premium Print)</option>
                    </select>
                  )}
                />
              </div>
            </>
          )}

          {/* Dynamic Fields - Videographer */}
          {category === "videographer" && (
            <>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="cinematicFilm" className="text-xs font-bold text-foreground/80 uppercase tracking-wide">Cinematic Film Required?</label>
                <Controller
                  name="cinematicFilm"
                  control={control}
                  render={({ field }) => (
                    <select {...field} id="cinematicFilm" className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none focus:ring-1 focus:ring-ring text-foreground">
                      <option value="yes">Yes (3-5 Min cinematic teaser)</option>
                      <option value="no">No (Raw clips only)</option>
                      <option value="full">Yes (Teaser + full length documentary)</option>
                    </select>
                  )}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="reelsCount" className="text-xs font-bold text-foreground/80 uppercase tracking-wide">Social Media Reels needed?</label>
                <Controller
                  name="reelsCount"
                  control={control}
                  render={({ field }) => (
                    <select {...field} id="reelsCount" className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none focus:ring-1 focus:ring-ring text-foreground">
                      <option value="0">None</option>
                      <option value="2">2 Reels</option>
                      <option value="5">5 Reels</option>
                    </select>
                  )}
                />
              </div>
            </>
          )}

          {/* Dynamic Fields - Singer */}
          {category === "singer" && (
            <>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="musicGenre" className="text-xs font-bold text-foreground/80 uppercase tracking-wide">Preferred Genre/Vibe</label>
                <Controller
                  name="musicGenre"
                  control={control}
                  render={({ field }) => (
                    <select {...field} id="musicGenre" className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none focus:ring-1 focus:ring-ring text-foreground">
                      <option value="">Select Vibe</option>
                      <option value="bollywood">Bollywood Unplugged</option>
                      <option value="sufi">Classical & Sufi</option>
                      <option value="pop">Western Pop / Jazz</option>
                      <option value="mix">Mixed Party Playlist</option>
                    </select>
                  )}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="setupType" className="text-xs font-bold text-foreground/80 uppercase tracking-wide">Setup Scale</label>
                <Controller
                  name="setupType"
                  control={control}
                  render={({ field }) => (
                    <select {...field} id="setupType" className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none focus:ring-1 focus:ring-ring text-foreground">
                      <option value="solo">Solo Performance (with backtracks)</option>
                      <option value="acoustic">Intimate Acoustic Band (3-piece)</option>
                      <option value="full">Full Concert Setup (5+ piece band)</option>
                    </select>
                  )}
                />
              </div>
            </>
          )}

          {/* Common: Budget */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="budgetRange" className="text-xs font-bold text-foreground/80 uppercase tracking-wide">Budget Range (₹)</label>
            <Controller
              name="budgetRange"
              control={control}
              render={({ field }) => (
                <input {...field} id="budgetRange" type="text" placeholder="E.g., 10,000 - 15,000" className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none focus:ring-1 focus:ring-ring text-foreground" />
              )}
            />
          </div>
        </div>

        {/* Notes */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="notes" className="text-xs font-bold text-foreground/80 uppercase tracking-wide">Additional Event Details</label>
          <Controller
            name="notes"
            control={control}
            render={({ field }) => (
              <textarea {...field} id="notes" rows={3} placeholder="Provide specific performance themes, deliverables, or scheduling request details..." className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none focus:ring-1 focus:ring-ring text-foreground" />
            )}
          />
        </div>

        <Button type="submit" className="w-full bg-primary hover:bg-primary/95 text-white font-extrabold text-xs sm:text-sm py-2 px-4 h-10 rounded-lg cursor-pointer">
          Submit Request
        </Button>
      </form>
    </section>
  );
}
