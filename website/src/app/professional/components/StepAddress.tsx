"use client";

import React, { useState, useEffect } from "react";
import { Controller, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import { MapPin, ChevronLeft, ArrowRight, Loader2, RotateCcw } from "lucide-react";
import { useLoadScript } from "@react-google-maps/api";
import { Button } from "@/components/ui/button";
import { StepAddressProps } from "../types";
import {
  getNationalities,
  getStatesByNationality,
  getCitiesByState,
  locationDataset,
} from "@/app/join-us/data/locationData";
import { getCurrentPositionWithFallback, fetchIpLocation } from "@/lib/geolocation";

const libraries: "places"[] = ["places"];

const inputClass =
  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1.5 text-xs sm:text-sm shadow-xs placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring focus:border-primary text-foreground";

export default function StepAddress({
  control,
  errors,
  setValue,
  clearErrors,
  trigger,
  onNext,
  onBack,
}: StepAddressProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  const [isDetecting, setIsDetecting] = useState(false);
  const [isCustomCity, setIsCustomCity] = useState(false);
  const [autoDetected, setAutoDetected] = useState(false);

  const nationalities = getNationalities();

  const selectedNationality = useWatch({
    control,
    name: "nationality",
    defaultValue: "Indian",
  });

  const selectedState = useWatch({
    control,
    name: "state",
    defaultValue: "",
  });

  const selectedCity = useWatch({
    control,
    name: "city",
    defaultValue: "",
  });

  const availableStates = getStatesByNationality(selectedNationality || "Indian");
  const availableCities = selectedState
    ? getCitiesByState(selectedNationality || "Indian", selectedState)
    : [];

  // Auto-detect nationality & location by default on mount
  useEffect(() => {
    if (autoDetected) return;

    const autoDetectNationality = async () => {
      try {
        if (isLoaded && window.google) {
          const pos = await getCurrentPositionWithFallback();
          const geocoder = new window.google.maps.Geocoder();
          const response = await geocoder.geocode({ location: { lat: pos.lat, lng: pos.lng } });

          if (response.results && response.results.length > 0) {
            let countryName = "";
            let stateName = "";
            let cityName = "";
            let postalCode = "";

            for (const result of response.results) {
              for (const component of result.address_components) {
                const types = component.types;
                if (types.includes("country") && !countryName) countryName = component.long_name;
                if (types.includes("administrative_area_level_1") && !stateName) stateName = component.long_name;
                if ((types.includes("locality") || types.includes("administrative_area_level_2")) && !cityName) cityName = component.long_name;
                if (types.includes("postal_code") && !postalCode) postalCode = component.long_name;
              }
            }

            if (countryName) {
              const datasetMatch = locationDataset.find(
                (d) =>
                  d.countryName.toLowerCase() === countryName.toLowerCase() ||
                  d.nationality.toLowerCase() === countryName.toLowerCase() ||
                  d.code.toLowerCase() === countryName.toLowerCase()
              );
              const resolvedNat = datasetMatch ? datasetMatch.nationality : countryName.includes("India") ? "Indian" : countryName;
              setValue("nationality", resolvedNat, { shouldValidate: true });

              if (stateName) {
                const validStates = getStatesByNationality(resolvedNat);
                const matchedState = validStates.find(
                  (st) => st.toLowerCase() === stateName.toLowerCase() || st.toLowerCase().includes(stateName.toLowerCase())
                );
                if (matchedState) setValue("state", matchedState, { shouldValidate: true });
              }
            }
          }
        } else {
          // IP fallback if Google Maps API is still loading
          const ipPos = await fetchIpLocation();
          if (ipPos) {
            setValue("nationality", "Indian", { shouldValidate: true });
          }
        }
      } catch (err) {
        console.warn("Auto nationality detection silent fallback:", err);
      } finally {
        setAutoDetected(true);
      }
    };

    autoDetectNationality();
  }, [isLoaded, autoDetected, setValue]);

  // Reset state and city if nationality changes and current state is invalid
  useEffect(() => {
    if (selectedNationality) {
      const statesForNation = getStatesByNationality(selectedNationality);
      if (
        selectedState &&
        statesForNation.length > 0 &&
        !statesForNation.some((st) => st.toLowerCase() === selectedState.toLowerCase())
      ) {
        setValue("state", "", { shouldValidate: true });
        setValue("city", "", { shouldValidate: true });
      }
    }
  }, [selectedNationality, selectedState, setValue]);

  // Reset city if state changes and current city is invalid
  useEffect(() => {
    if (selectedState && !isCustomCity) {
      const citiesForState = getCitiesByState(selectedNationality || "Indian", selectedState);
      if (
        selectedCity &&
        citiesForState.length > 0 &&
        !citiesForState.some((ct) => ct.toLowerCase() === selectedCity.toLowerCase()) &&
        selectedCity !== "__OTHER__"
      ) {
        setValue("city", "", { shouldValidate: true });
      }
    }
  }, [selectedState, selectedCity, selectedNationality, isCustomCity, setValue]);

  const handleUseCurrentLocation = async () => {
    if (!isLoaded || !window.google) {
      toast.error("Google Maps API is loading. Please try again in a moment.");
      return;
    }

    setIsDetecting(true);
    try {
      const pos = await getCurrentPositionWithFallback();
      const lat = pos.lat;
      const lng = pos.lng;

      const geocoder = new window.google.maps.Geocoder();
      const response = await geocoder.geocode({ location: { lat, lng } });

      if (response.results && response.results.length > 0) {
        let address = response.results[0].formatted_address;
        let postalCode = "";
        let countryName = "";
        let stateName = "";
        let cityName = "";
        let subLocality = "";

        for (const result of response.results) {
          for (const component of result.address_components) {
            const types = component.types;
            if (types.includes("postal_code") && !postalCode) {
              postalCode = component.long_name;
            }
            if (types.includes("country") && !countryName) {
              countryName = component.long_name;
            }
            if (types.includes("administrative_area_level_1") && !stateName) {
              stateName = component.long_name;
            }
            if ((types.includes("locality") || types.includes("administrative_area_level_2")) && !cityName) {
              cityName = component.long_name;
            }
            if ((types.includes("sublocality") || types.includes("neighborhood")) && !subLocality) {
              subLocality = component.long_name;
            }
          }
        }

        const addressComponent = response.results.find(
          (r: any) =>
            r.types.includes("sublocality") ||
            r.types.includes("locality") ||
            r.types.includes("neighborhood")
        );
        if (addressComponent) {
          address = addressComponent.formatted_address;
        }

        // Set address, pincode, landmark/locality
        setValue("address", address, { shouldValidate: true });
        if (postalCode) setValue("pincode", postalCode, { shouldValidate: true });
        if (subLocality) {
          setValue("landmark", subLocality, { shouldValidate: true });
          setValue("locality", subLocality, { shouldValidate: true });
        } else if (cityName) {
          setValue("locality", cityName, { shouldValidate: true });
        }

        // Resolve nationality
        let resolvedNat = "Indian";
        if (countryName) {
          const datasetMatch = locationDataset.find(
            (d) =>
              d.countryName.toLowerCase() === countryName.toLowerCase() ||
              d.nationality.toLowerCase() === countryName.toLowerCase() ||
              d.code.toLowerCase() === countryName.toLowerCase()
          );
          if (datasetMatch) {
            resolvedNat = datasetMatch.nationality;
          } else if (countryName.toLowerCase().includes("india")) {
            resolvedNat = "Indian";
          } else {
            resolvedNat = countryName;
          }
        }
        setValue("nationality", resolvedNat, { shouldValidate: true });

        // Resolve state
        let resolvedState = stateName;
        const validStates = getStatesByNationality(resolvedNat);
        if (stateName && validStates.length > 0) {
          const matchedState = validStates.find(
            (st) =>
              st.toLowerCase() === stateName.toLowerCase() ||
              st.toLowerCase().includes(stateName.toLowerCase()) ||
              stateName.toLowerCase().includes(st.toLowerCase())
          );
          if (matchedState) resolvedState = matchedState;
        }
        if (resolvedState) setValue("state", resolvedState, { shouldValidate: true });

        // Resolve city
        if (cityName) {
          const validCities = getCitiesByState(resolvedNat, resolvedState);
          const matchedCity = validCities.find(
            (ct) =>
              ct.toLowerCase() === cityName.toLowerCase() ||
              ct.toLowerCase().includes(cityName.toLowerCase()) ||
              cityName.toLowerCase().includes(ct.toLowerCase())
          );
          if (matchedCity) {
            setIsCustomCity(false);
            setValue("city", matchedCity, { shouldValidate: true });
          } else {
            setIsCustomCity(true);
            setValue("city", cityName, { shouldValidate: true });
          }
        }

        toast.success(pos.isIpFallback ? "Location estimated via IP" : "Location resolved from current position");
      } else {
        toast.error("Could not determine detailed address");
      }
    } catch (err) {
      console.error("Location Detection Error:", err);
      toast.error("Could not fetch current location");
    } finally {
      setIsDetecting(false);
    }
  };

  const handleResetCurrentStep = () => {
    setValue("nationality", "Indian");
    setValue("state", "");
    setValue("city", "");
    setValue("address", "");
    setValue("landmark", "");
    setValue("locality", "");
    setValue("pincode", "");
    setIsCustomCity(false);
    clearErrors(["nationality", "state", "city", "address", "landmark", "locality", "pincode"]);
    toast.success("Address & location details reset");
  };

  const handleNextStep = async () => {
    const isValid = await trigger(["nationality", "state", "city", "address", "landmark", "locality", "pincode"]);
    if (!isValid) {
      toast.error("Please fill in all required address & location fields correctly.");
      return;
    }

    onNext();
  };

  return (
    <div className="flex flex-col gap-3 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-bold text-[#2E2215]">Address & Location</h2>
          <p className="text-[11px] text-muted-foreground">
            Set your operational region to connect with clients looking for your talent.
          </p>
        </div>

        <button
          type="button"
          onClick={handleUseCurrentLocation}
          disabled={isDetecting}
          className="inline-flex items-center justify-center gap-1.5 rounded-md border border-primary/30 bg-primary/5 px-2.5 py-1.5 text-xs font-semibold text-primary hover:bg-primary/10 transition-colors disabled:opacity-50 cursor-pointer self-start sm:self-auto"
        >
          {isDetecting ? <Loader2 className="size-3.5 animate-spin" /> : <MapPin className="size-3.5" />}
          {isDetecting ? "Detecting..." : "Use Current Location"}
        </button>
      </div>

      {/* Inline Row 1: Nationality & State / Region */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Nationality Field */}
        <div className="flex flex-col gap-1">
          <label htmlFor="nationality" className="text-[11px] font-bold uppercase tracking-wide text-foreground/80">
            Nationality <span className="text-destructive">*</span>
          </label>
          <Controller
            name="nationality"
            control={control}
            rules={{ required: "Nationality is required" }}
            render={({ field }) => (
              <select
                {...field}
                id="nationality"
                className={inputClass}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  setValue("state", "", { shouldValidate: true });
                  setValue("city", "", { shouldValidate: true });
                  setIsCustomCity(false);
                }}
              >
                <option value="">Select Nationality</option>
                {nationalities.map((nat) => (
                  <option key={nat} value={nat}>
                    {nat}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.nationality && <span className="text-[11px] font-medium text-destructive">{errors.nationality.message}</span>}
        </div>

        {/* State / Region Field */}
        <div className="flex flex-col gap-1">
          <label htmlFor="state" className="text-[11px] font-bold uppercase tracking-wide text-foreground/80">
            State / Region <span className="text-destructive">*</span>
          </label>
          <Controller
            name="state"
            control={control}
            rules={{ required: "State is required" }}
            render={({ field }) =>
              availableStates.length > 0 ? (
                <select
                  {...field}
                  id="state"
                  className={inputClass}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    setValue("city", "", { shouldValidate: true });
                    setIsCustomCity(false);
                  }}
                >
                  <option value="">Select State</option>
                  {availableStates.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  {...field}
                  id="state"
                  type="text"
                  placeholder="Enter state or region"
                  className={inputClass}
                />
              )
            }
          />
          {errors.state && <span className="text-[11px] font-medium text-destructive">{errors.state.message}</span>}
        </div>
      </div>

      {/* Inline Row 2: City / District & PIN Code */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* City / District Field */}
        <div className="flex flex-col gap-1">
          <label htmlFor="city" className="text-[11px] font-bold uppercase tracking-wide text-foreground/80">
            City / District <span className="text-destructive">*</span>
          </label>
          <Controller
            name="city"
            control={control}
            rules={{ required: "City / District is required" }}
            render={({ field }) =>
              availableCities.length > 0 && !isCustomCity ? (
                <select
                  {...field}
                  id="city"
                  className={inputClass}
                  onChange={(e) => {
                    if (e.target.value === "__OTHER__") {
                      setIsCustomCity(true);
                      field.onChange("");
                    } else {
                      field.onChange(e.target.value);
                    }
                  }}
                >
                  <option value="">Select City / District</option>
                  {availableCities.map((ct) => (
                    <option key={ct} value={ct}>
                      {ct}
                    </option>
                  ))}
                  <option value="__OTHER__">+ Enter Manually</option>
                </select>
              ) : (
                <div className="flex items-center gap-2">
                  <input
                    {...field}
                    id="city"
                    type="text"
                    placeholder="Enter city / district name"
                    className={inputClass}
                  />
                  {availableCities.length > 0 && isCustomCity && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsCustomCity(false);
                        field.onChange("");
                      }}
                      className="text-[11px] text-primary hover:underline whitespace-nowrap font-medium"
                    >
                      Choose list
                    </button>
                  )}
                </div>
              )
            }
          />
          {errors.city && <span className="text-[11px] font-medium text-destructive">{errors.city.message}</span>}
        </div>

        {/* PIN Code Field */}
        <div className="flex flex-col gap-1">
          <label htmlFor="pincode" className="text-[11px] font-bold uppercase tracking-wide text-foreground/80">
            PIN Code <span className="text-destructive">*</span>
          </label>
          <Controller
            name="pincode"
            control={control}
            rules={{
              required: "PIN Code is required",
              pattern: { value: /^\d{6}$/, message: "PIN Code must be 6 digits" },
            }}
            render={({ field }) => (
              <input
                {...field}
                id="pincode"
                type="text"
                maxLength={6}
                placeholder="Enter 6-digit PIN code"
                className={inputClass}
                onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ""))}
              />
            )}
          />
          {errors.pincode && <span className="text-[11px] font-medium text-destructive">{errors.pincode.message}</span>}
        </div>
      </div>

      {/* Inline Row 3: Street Address & Landmark / Locality */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Street / House Address */}
        <div className="flex flex-col gap-1">
          <label htmlFor="address" className="text-[11px] font-bold uppercase tracking-wide text-foreground/80">
            House / Street Address <span className="text-destructive">*</span>
          </label>
          <Controller
            name="address"
            control={control}
            rules={{ required: "Address is required" }}
            render={({ field }) => (
              <input
                {...field}
                id="address"
                type="text"
                placeholder="Flat/House No, Building, Street"
                className={inputClass}
              />
            )}
          />
          {errors.address && <span className="text-[11px] font-medium text-destructive">{errors.address.message}</span>}
        </div>

        {/* Landmark / Locality */}
        <div className="flex flex-col gap-1">
          <label htmlFor="landmark" className="text-[11px] font-bold uppercase tracking-wide text-foreground/80">
            Landmark / Locality <span className="text-destructive">*</span>
          </label>
          <Controller
            name="landmark"
            control={control}
            rules={{ required: "Landmark is required" }}
            render={({ field }) => (
              <input
                {...field}
                id="landmark"
                type="text"
                placeholder="Nearby landmark or area"
                className={inputClass}
              />
            )}
          />
          {errors.landmark && <span className="text-[11px] font-medium text-destructive">{errors.landmark.message}</span>}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between border-t border-border/50 pt-3 mt-1">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <ChevronLeft className="size-3.5" />
          Back to Personal Info
        </button>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleResetCurrentStep}
            title="Reset address details"
            className="h-9 px-3 border-border/80 text-muted-foreground hover:text-foreground hover:bg-muted/60 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="size-3.5" />
            Reset
          </Button>

          <Button
            type="button"
            onClick={handleNextStep}
            className="h-9 bg-primary text-white hover:bg-primary/95 text-xs font-semibold flex items-center gap-1.5 cursor-pointer px-5"
          >
            Next: Account Details
            <ArrowRight className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
