import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { Loader2, MapPin } from "lucide-react";

import { Step4Props } from "../types";

export default function Step4Location({
  control,
  errors,
  setError,
  clearErrors,
  watchedValues,
  setValue,
}: Step4Props) {
  const [locations, setLocations] = useState<string[]>([]);
  const [isFetchingLocations, setIsFetchingLocations] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setIsDetecting(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

        if (!apiKey) {
          toast.error("Google Maps API Key is not configured");
          setIsDetecting(false);
          return;
        }

        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
          );
          const data = await response.json();

          if (data.status === "OK" && data.results && data.results.length > 0) {
            let postalCode = "";
            let locality = "";
            
            for (const result of data.results) {
              for (const component of result.address_components) {
                if (component.types.includes("postal_code")) {
                  postalCode = component.long_name;
                }
                if (component.types.includes("sublocality") || component.types.includes("locality")) {
                  locality = component.long_name;
                }
              }
              if (postalCode) break;
            }

            if (postalCode) {
              setValue("pincode", postalCode, { shouldValidate: true });
              toast.success(`Location resolved: ${locality || "Area"} (${postalCode})`);
              
              if (locality) {
                setLocations(prev => prev.includes(locality) ? prev : [locality, ...prev]);
                setTimeout(() => {
                  setValue("location", locality, { shouldValidate: true });
                }, 600);
              }
            } else {
              toast.error("Could not resolve postal code from location coordinates");
            }
          } else {
            toast.error("Google Geocoding failed: " + (data.error_message || data.status));
          }
        } catch (error) {
          toast.error("Google Maps API geocoding request failed");
        } finally {
          setIsDetecting(false);
        }
      },
      (error) => {
        toast.error("Failed to retrieve current location: " + error.message);
        setIsDetecting(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  useEffect(() => {
    const pincode = watchedValues.pincode;
    if (pincode && pincode.length === 6 && /^\d+$/.test(pincode)) {
      const fetchLocations = async () => {
        setIsFetchingLocations(true);
        clearErrors("pincode");
        try {
          const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
          const data = await res.json();
          if (data && data[0] && data[0].Status === "Success") {
            const list = data[0].PostOffice.map((po: any) => po.Name);
            setLocations(list);
            toast.success(`${list.length} locations resolved for PIN ${pincode}`);
          } else {
            setLocations([]);
            setError("pincode", { type: "manual", message: "Invalid PIN Code or location not found" });
            toast.error("Invalid PIN Code");
          }
        } catch (error) {
          setLocations([]);
          setError("pincode", { type: "manual", message: "Failed to resolve locations" });
          toast.error("Postal API request failed");
        } finally {
          setIsFetchingLocations(false);
        }
      };
      fetchLocations();
    } else {
      setLocations([]);
      if (pincode && pincode.length > 0 && pincode.length !== 6) {
        setError("pincode", { type: "manual", message: "PIN Code must be exactly 6 digits" });
      }
    }
  }, [watchedValues.pincode, setError, clearErrors]);

  return (
    <div className="flex flex-col gap-5 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-[#2E2215]">Where do you live?</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Share your local residential postal coordinates.</p>
        </div>
        <button
          type="button"
          onClick={handleUseCurrentLocation}
          disabled={isDetecting}
          className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/95 transition-all duration-200 border border-primary/20 bg-primary/5 hover:bg-primary/10 px-3 py-1.5 rounded-lg select-none cursor-pointer disabled:opacity-50"
        >
          {isDetecting ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <MapPin className="size-3.5" />
          )}
          Use Current Location
        </button>
      </div>

      {/* PIN Code input */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="pincode" className="text-xs font-bold text-foreground/80 uppercase tracking-wide">
          PIN Code
        </label>
        <div className="relative">
          <Controller
            name="pincode"
            control={control}
            rules={{
              required: "PIN Code is required",
              pattern: {
                value: /^\d{6}$/,
                message: "PIN Code must be exactly 6 digits",
              }
            }}
            render={({ field }) => (
              <input
                {...field}
                id="pincode"
                type="text"
                maxLength={6}
                placeholder="Enter 6-digit PIN Code (e.g. 110001)"
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 pr-10 text-sm shadow-sm placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring focus:border-primary text-foreground"
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  field.onChange(val);
                }}
              />
            )}
          />
          {isFetchingLocations && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            </div>
          )}
        </div>
        {errors.pincode && (
          <span className="text-xs font-medium text-destructive">{errors.pincode.message}</span>
        )}
      </div>

      {/* Location selector */}
      {(locations.length > 0 || isFetchingLocations) && (
        <div className="flex flex-col gap-1.5 animate-in fade-in duration-300">
          <label htmlFor="location" className="text-xs font-bold text-foreground/80 uppercase tracking-wide">
            Select Location Area
          </label>
          <Controller
            name="location"
            control={control}
            rules={{ required: "Location selection is required" }}
            render={({ field }) => (
              <select
                {...field}
                id="location"
                disabled={isFetchingLocations}
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-white px-3 py-2 text-sm shadow-sm outline-none focus:ring-1 focus:ring-ring focus:border-primary text-foreground"
              >
                <option value="" disabled>Select your neighborhood area</option>
                {locations.map((loc, idx) => (
                  <option key={idx} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.location && (
            <span className="text-xs font-medium text-destructive">{errors.location.message}</span>
          )}
        </div>
      )}
    </div>
  );
}
