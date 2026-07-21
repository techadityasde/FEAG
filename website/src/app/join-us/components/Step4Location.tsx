import React, { useState } from "react";
import { Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { Loader2, MapPin } from "lucide-react";
import { useLoadScript } from "@react-google-maps/api";

import { Step4Props } from "../types";

const libraries: "places"[] = ["places"];

export default function Step4Location({
  control,
  errors,
  setValue,
}: Step4Props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  const [isDetecting, setIsDetecting] = useState(false);

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    if (!isLoaded || !window.google) {
      toast.error("Google Maps API is still loading. Please try again.");
      return;
    }

    setIsDetecting(true);
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

            // Extract postal code from any of the results
            for (const result of response.results) {
              for (const component of result.address_components) {
                if (component.types.includes("postal_code")) {
                  postalCode = component.long_name;
                  break;
                }
              }
              if (postalCode) break;
            }

            // Find a locality/sublocality for cleaner address display if desired
            const addressComponent = response.results.find(
              (r: any) =>
                r.types.includes("sublocality") ||
                r.types.includes("locality") ||
                r.types.includes("neighborhood"),
            );
            if (addressComponent) {
              address = addressComponent.formatted_address;
            }

            setValue("location", address, { shouldValidate: true });
            if (postalCode) {
              setValue("pincode", postalCode, { shouldValidate: true });
            }

            toast.success("Location resolved from current position");
          } else {
            toast.error("Could not determine address");
          }
        } catch (err) {
          toast.error("Error reverse geocoding");
        } finally {
          setIsDetecting(false);
        }
      },
      (error) => {
        toast.error("Error fetching location: " + error.message);
        setIsDetecting(false);
      },
      { enableHighAccuracy: true },
    );
  };

  return (
    <div className="flex flex-col gap-5 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-[#2E2215]">
            Where do you live?
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Search your residential address to connect with local clients.
          </p>
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

      {/* Editable address field */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="location"
          className="text-xs font-bold text-foreground/80 uppercase tracking-wide"
        >
          Address
        </label>
        <Controller
          name="location"
          control={control}
          rules={{ required: "Address is required" }}
          render={({ field }) => (
            <input
              {...field}
              id="location"
              type="text"
              placeholder="Enter your address..."
              className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm  outline-none focus:ring-1 focus:ring-ring focus:border-primary text-foreground"
            />
          )}
        />
        {errors.location && (
          <span className="text-xs font-medium text-destructive">
            {errors.location.message}
          </span>
        )}
      </div>

      {/* Landmark/Locality input */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="landmark"
          className="text-xs font-bold text-foreground/80 uppercase tracking-wide"
        >
          Landmark / Locality
        </label>
        <Controller
          name="landmark"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="landmark"
              type="text"
              placeholder="e.g. Near Apollo Hospital, Sector 50"
              className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none focus:ring-1 focus:ring-ring focus:border-primary text-foreground"
            />
          )}
        />
      </div>

      {/* PIN Code input */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="pincode"
          className="text-xs font-bold text-foreground/80 uppercase tracking-wide"
        >
          PIN Code
        </label>
        <Controller
          name="pincode"
          control={control}
          rules={{
            required: "PIN Code is required",
            pattern: {
              value: /^\d{6}$/,
              message: "PIN Code must be exactly 6 digits",
            },
          }}
          render={({ field }) => (
            <input
              {...field}
              id="pincode"
              type="text"
              maxLength={6}
              placeholder="Enter 6-digit PIN Code (e.g. 110001)"
              className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm  outline-none focus:ring-1 focus:ring-ring focus:border-primary text-foreground"
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                field.onChange(val);
              }}
            />
          )}
        />
        {errors.pincode && (
          <span className="text-xs font-medium text-destructive">
            {errors.pincode.message}
          </span>
        )}
      </div>
    </div>
  );
}
