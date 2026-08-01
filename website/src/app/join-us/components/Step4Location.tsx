import React, { useState, useEffect } from "react";
import { Controller, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import { Loader2, MapPin } from "lucide-react";
import { useLoadScript } from "@react-google-maps/api";

import { Step4Props } from "../types";
import {
  getNationalities,
  getStatesByNationality,
  getCitiesByState,
  locationDataset,
} from "../data/locationData";
import { getCurrentPositionWithFallback } from "@/lib/geolocation";

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
  const [isCustomCity, setIsCustomCity] = useState(false);

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

  // Reset state and city if nationality changes and current state is not in the new nationality dataset
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

  // Reset city if state changes and current city is invalid (unless custom city)
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
      toast.error("Google Maps API is still loading. Please try again.");
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

        // Extract detailed components across all geocoding result objects
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

        // Find sublocality/locality for cleaner primary address display
        const addressComponent = response.results.find(
          (r: any) =>
            r.types.includes("sublocality") ||
            r.types.includes("locality") ||
            r.types.includes("neighborhood")
        );
        if (addressComponent) {
          address = addressComponent.formatted_address;
        }

        // 1. Set Address
        setValue("location", address, { shouldValidate: true });

        // 2. Set PIN Code
        if (postalCode) {
          setValue("pincode", postalCode, { shouldValidate: true });
        }

        // 3. Set Landmark / Locality if present
        if (subLocality) {
          setValue("landmark", subLocality, { shouldValidate: true });
        }

        // 4. Resolve Nationality
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

        // 5. Resolve State / Region
        let resolvedState = stateName;
        const validStates = getStatesByNationality(resolvedNat);
        if (stateName && validStates.length > 0) {
          const matchedState = validStates.find(
            (st) =>
              st.toLowerCase() === stateName.toLowerCase() ||
              st.toLowerCase().includes(stateName.toLowerCase()) ||
              stateName.toLowerCase().includes(st.toLowerCase())
          );
          if (matchedState) {
            resolvedState = matchedState;
          }
        }
        if (resolvedState) {
          setValue("state", resolvedState, { shouldValidate: true });
        }

        // 6. Resolve City / District
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
            // Switch to custom manual city input so exact detected name is populated
            setIsCustomCity(true);
            setValue("city", cityName, { shouldValidate: true });
          }
        }

        toast.success(pos.isIpFallback ? "Location estimated via IP" : "Location resolved from current position");
      } else {
        toast.error("Could not determine address");
      }
    } catch (err) {
      toast.error("Could not fetch current location");
    } finally {
      setIsDetecting(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-[#2E2215]">
            Where are you located?
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Set your location to connect with nearby opportunities.
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

      {/* Inline Row 1: Nationality & State / Region */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Nationality Field */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="nationality"
            className="text-xs font-bold text-foreground/80 uppercase tracking-wide"
          >
            Nationality
          </label>
          <Controller
            name="nationality"
            control={control}
            rules={{ required: "Nationality is required" }}
            render={({ field }) => (
              <select
                {...field}
                id="nationality"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none focus:ring-1 focus:ring-ring focus:border-primary text-foreground cursor-pointer"
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
          {errors.nationality && (
            <span className="text-xs font-medium text-destructive">
              {errors.nationality.message}
            </span>
          )}
        </div>

        {/* State / Region Field */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="state"
            className="text-xs font-bold text-foreground/80 uppercase tracking-wide"
          >
            State / Region
          </label>
          <Controller
            name="state"
            control={control}
            rules={{ required: "State is required" }}
            render={({ field }) => (
              availableStates.length > 0 ? (
                <select
                  {...field}
                  id="state"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none focus:ring-1 focus:ring-ring focus:border-primary text-foreground cursor-pointer"
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
                  placeholder="Enter your state/region"
                  className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none focus:ring-1 focus:ring-ring focus:border-primary text-foreground"
                />
              )
            )}
          />
          {errors.state && (
            <span className="text-xs font-medium text-destructive">
              {errors.state.message}
            </span>
          )}
        </div>
      </div>

      {/* Inline Row 2: City / District & PIN Code */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* City / District Field */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="city"
            className="text-xs font-bold text-foreground/80 uppercase tracking-wide"
          >
            City / District
          </label>
          <Controller
            name="city"
            control={control}
            rules={{ required: "City / District is required" }}
            render={({ field }) => (
              availableCities.length > 0 && !isCustomCity ? (
                <select
                  {...field}
                  id="city"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none focus:ring-1 focus:ring-ring focus:border-primary text-foreground cursor-pointer"
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
                    className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none focus:ring-1 focus:ring-ring focus:border-primary text-foreground"
                  />
                  {availableCities.length > 0 && isCustomCity && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsCustomCity(false);
                        field.onChange("");
                      }}
                      className="text-xs text-primary hover:underline whitespace-nowrap"
                    >
                      Choose from list
                    </button>
                  )}
                </div>
              )
            )}
          />
          {errors.city && (
            <span className="text-xs font-medium text-destructive">
              {errors.city.message}
            </span>
          )}
        </div>

        {/* PIN Code Field */}
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
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none focus:ring-1 focus:ring-ring focus:border-primary text-foreground"
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
              className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none focus:ring-1 focus:ring-ring focus:border-primary text-foreground"
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
    </div>
  );
}
