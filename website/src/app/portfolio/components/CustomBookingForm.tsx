import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { MapPin, Loader2, Search, X } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { CustomBookingFormProps } from "../types";
import { useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode } from "use-places-autocomplete";

const libraries: ("places")[] = ["places"];

export default function CustomBookingForm({
  professional,
  control,
  handleSubmit,
  onSubmit,
  errors,
  setValue,
}: CustomBookingFormProps) {
  const { username, category } = professional;
  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  const {
    ready,
    value: addressValue,
    suggestions: { status: addressStatus, data: addressData },
    setValue: setAddressValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: "in" },
    },
    debounce: 300,
    initOnMount: isLoaded,
  });

  const [isLocating, setIsLocating] = useState(false);

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }
    
    if (!isLoaded || !window.google) {
      toast.error('Google Maps API is still loading. Please try again.');
      return;
    }

    setIsLocating(true);
    toast.loading("Detecting current location...", { id: "location-detect" });

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        try {
          const geocoder = new window.google.maps.Geocoder();
          const response = await geocoder.geocode({ location: { lat, lng } });
          
          if (response.results && response.results.length > 0) {
            let address = response.results[0].formatted_address;
            let postalCode = "";
            let localityName = "";
            
            for (const result of response.results) {
              for (const component of result.address_components) {
                if (component.types.includes("postal_code")) {
                  postalCode = component.long_name;
                }
                if (component.types.includes("sublocality") || component.types.includes("locality")) {
                  if (!localityName) localityName = component.long_name;
                }
              }
            }

            setAddressValue(address, false);
            setValue("eventAddress", address, { shouldValidate: true });
            if (localityName) {
              setValue("locality", localityName, { shouldValidate: true });
            }
            if (postalCode) {
              setValue("pincode", postalCode, { shouldValidate: true });
            }
            
            toast.dismiss("location-detect");
            toast.success('Location resolved from current position');
          } else {
            toast.dismiss("location-detect");
            toast.error('Could not determine address');
          }
        } catch (err) {
          toast.dismiss("location-detect");
          toast.error('Error reverse geocoding');
        } finally {
          setIsLocating(false);
        }
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

  const handleSelectAddress = async (address: string) => {
    setAddressValue(address, false);
    clearSuggestions();
    
    setValue("eventAddress", address, { shouldValidate: true });

    try {
      const results = await getGeocode({ address });
      let postalCode = "";
      let localityName = "";
      
      if (results[0]) {
        for (const component of results[0].address_components) {
          if (component.types.includes("postal_code")) {
            postalCode = component.long_name;
          }
          if (component.types.includes("sublocality") || component.types.includes("locality")) {
            localityName = component.long_name;
          }
        }
      }
      
      if (localityName) {
        setValue("locality", localityName, { shouldValidate: true });
      }
      if (postalCode) {
        setValue("pincode", postalCode, { shouldValidate: true });
      }
    } catch (error) {
      console.error("Error fetching location details:", error);
    }
  };

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const todayStr = `${yyyy}-${mm}-${dd}`;

  return (
    <section id="booking-request-section" className="space-y-6 px-1 py-1">
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
                  <option value="wedding">Wedding</option>
                  <option value="pre_wedding">Pre-Wedding</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="birthday">Birthday/Anniversary</option>
                  <option value="commercial">Commercial/Ad Shoot</option>
                  <option value="music_video">Music Video</option>
                  <option value="live_concert">Live Concert/Gig</option>
                  <option value="other">Other</option>
                </select>
              )}
            />
            {errors.eventType && <span className="text-xs text-destructive font-medium">{errors.eventType.message}</span>}
          </div>

          {/* Common: Event Date & Time */}
          <div className="flex gap-3">
            <div className="flex flex-col gap-1.5 flex-1">
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
            
            <div className="flex flex-col gap-1.5 flex-[0.7]">
              <label htmlFor="eventTime" className="text-xs font-bold text-foreground/80 uppercase tracking-wide">Event Time</label>
              <Controller
                name="eventTime"
                control={control}
                rules={{ required: "Time is required" }}
                render={({ field }) => (
                  <select 
                    {...field} 
                    id="eventTime" 
                    className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none focus:ring-1 focus:ring-ring text-foreground" 
                  >
                    <option value="">Select Time</option>
                    {Array.from({ length: 11 }).map((_, i) => {
                      const hour24 = i + 10; // 10 to 20
                      const hour12 = hour24 === 12 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
                      const ampm = hour24 >= 12 ? 'PM' : 'AM';
                      const hourStr = hour12.toString().padStart(2, '0');
                      
                      return (
                        <React.Fragment key={i}>
                          <option value={`${hourStr}:00 ${ampm}`}>{`${hourStr}:00 ${ampm}`}</option>
                          {hour24 < 20 && (
                            <option value={`${hourStr}:30 ${ampm}`}>{`${hourStr}:30 ${ampm}`}</option>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </select>
                )}
              />
              {errors.eventTime && <span className="text-xs text-destructive font-medium">{errors.eventTime.message}</span>}
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="border border-border/50 rounded-lg p-4 space-y-4 bg-muted/5">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <MapPin className="size-4 text-primary" /> Location Details
          </h3>
          
          <div className="flex flex-col gap-1.5 relative">
            <label className="text-xs font-bold text-foreground/80 uppercase tracking-wide">Search Event Address</label>
            <div className="relative flex items-center bg-white border border-input rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-ring">
              <Search className="size-4 text-muted-foreground mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Search location via Google Maps..."
                value={addressValue}
                onChange={(e) => setAddressValue(e.target.value)}
                disabled={!ready}
                className="flex-1 bg-transparent border-none focus:outline-none text-sm placeholder:text-muted-foreground w-full text-foreground"
              />
              {addressValue && (
                <button 
                  type="button" 
                  onClick={() => {
                    setAddressValue("");
                    setValue("eventAddress", "", { shouldValidate: true });
                  }} 
                  className="p-1 ml-1 bg-muted rounded-full text-foreground hover:bg-muted-foreground/20 transition-colors shrink-0 cursor-pointer"
                >
                  <X className="size-3" />
                </button>
              )}
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                onClick={handleGetCurrentLocation}
                disabled={isLocating}
                className="ml-2 text-muted-foreground hover:text-primary cursor-pointer rounded-full size-6 hover:bg-muted"
                title="Use Current Location"
              >
                {isLocating ? <Loader2 className="size-3 animate-spin text-primary" /> : <MapPin className="size-3 text-primary" />}
              </Button>
            </div>
            
            {addressStatus === "OK" && (
              <div className="absolute top-[100%] left-0 right-0 mt-1 bg-white border border-border/50 rounded-md shadow-lg z-50 max-h-48 overflow-y-auto">
                {addressData.map(({ place_id, description, structured_formatting: { main_text, secondary_text } }) => (
                  <button
                    key={place_id}
                    type="button"
                    onClick={() => handleSelectAddress(description)}
                    className="flex items-start gap-3 p-3 border-b border-border/20 last:border-0 hover:bg-muted/50 transition-colors text-left w-full cursor-pointer"
                  >
                    <MapPin className="size-4 text-muted-foreground shrink-0 mt-0.5" />
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-semibold text-foreground truncate">{main_text}</span>
                      <span className="text-xs text-muted-foreground truncate">{secondary_text}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
            
            <Controller
              name="eventAddress"
              control={control}
              rules={{ required: "Event Address is required" }}
              render={({ field }) => (
                <input type="hidden" {...field} />
              )}
            />
            {errors.eventAddress && <span className="text-xs text-destructive font-medium">{errors.eventAddress.message}</span>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5 md:col-span-1">
              <label htmlFor="streetAddress" className="text-xs font-bold text-foreground/80 uppercase tracking-wide">Street / Landmark</label>
              <Controller
                name="streetAddress"
                control={control}
                rules={{ required: "Street address is required" }}
                render={({ field }) => (
                  <input {...field} id="streetAddress" type="text" placeholder="House/Flat No, Landmark" className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm shadow-sm outline-none focus:ring-1 focus:ring-ring text-foreground" />
                )}
              />
              {errors.streetAddress && <span className="text-xs text-destructive font-medium">{errors.streetAddress.message}</span>}
            </div>
            
            <div className="flex flex-col gap-1.5 md:col-span-1">
              <label htmlFor="locality" className="text-xs font-bold text-foreground/80 uppercase tracking-wide">Locality</label>
              <Controller
                name="locality"
                control={control}
                rules={{ required: "Locality is required" }}
                render={({ field }) => (
                  <input {...field} id="locality" type="text" placeholder="Area / City" className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm shadow-sm outline-none focus:ring-1 focus:ring-ring text-foreground" />
                )}
              />
              {errors.locality && <span className="text-xs text-destructive font-medium">{errors.locality.message}</span>}
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-1">
              <label htmlFor="pincode" className="text-xs font-bold text-foreground/80 uppercase tracking-wide">PIN Code</label>
              <Controller
                name="pincode"
                control={control}
                rules={{ 
                  required: "PIN Code is required",
                  pattern: { value: /^\d{6}$/, message: "Must be 6 digits" }
                }}
                render={({ field }) => (
                  <input {...field} id="pincode" type="text" maxLength={6} placeholder="e.g. 110001" className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm shadow-sm outline-none focus:ring-1 focus:ring-ring text-foreground" 
                  onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ""))} />
                )}
              />
              {errors.pincode && <span className="text-xs text-destructive font-medium">{errors.pincode.message}</span>}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <label htmlFor="otherRequirements" className="text-xs font-bold text-foreground/80 uppercase tracking-wide">Other Requirement</label>
                <Controller
                  name="otherRequirements"
                  control={control}
                  rules={{ required: "Other requirement is required" }}
                  render={({ field }) => (
                    <select {...field} id="otherRequirements" className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none focus:ring-1 focus:ring-ring text-foreground">
                      <option value="">Select Requirement</option>
                      <option value="cinematic_full">Cinematic Film (Teaser + Full)</option>
                      <option value="raw">Raw Footage only</option>
                      <option value="drone">Drone Coverage</option>
                      <option value="same_day">Same Day Edit</option>
                      <option value="other">Other</option>
                    </select>
                  )}
                />
                {errors.otherRequirements && <span className="text-xs text-destructive font-medium">{errors.otherRequirements.message}</span>}
              </div>
              
              <div className="flex gap-3">
                <div className="flex flex-col gap-1.5 flex-[0.7]">
                  <label htmlFor="reelsCount" className="text-xs font-bold text-foreground/80 uppercase tracking-wide">Reels count</label>
                  <Controller
                    name="reelsCount"
                    control={control}
                    rules={{ required: "Required" }}
                    render={({ field }) => (
                      <select {...field} id="reelsCount" className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none focus:ring-1 focus:ring-ring text-foreground">
                        <option value="">Select</option>
                        <option value="0">None</option>
                        <option value="1">1 Reel</option>
                        <option value="2">2 Reels</option>
                        <option value="5">5 Reels</option>
                        <option value="10+">10+ Reels</option>
                      </select>
                    )}
                  />
                  {errors.reelsCount && <span className="text-xs text-destructive font-medium">{errors.reelsCount.message}</span>}
                </div>

                <div className="flex flex-col gap-1.5 flex-1">
                  <label htmlFor="reelDuration" className="text-xs font-bold text-foreground/80 uppercase tracking-wide">Reel Duration</label>
                  <Controller
                    name="reelDuration"
                    control={control}
                    rules={{ required: "Required" }}
                    render={({ field }) => (
                      <select {...field} id="reelDuration" className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none focus:ring-1 focus:ring-ring text-foreground">
                        <option value="">Select Duration</option>
                        <option value="15s">15 Seconds</option>
                        <option value="30s">30 Seconds</option>
                        <option value="60s">60 Seconds</option>
                      </select>
                    )}
                  />
                  {errors.reelDuration && <span className="text-xs text-destructive font-medium">{errors.reelDuration.message}</span>}
                </div>
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
