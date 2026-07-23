"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "@/lib/store/locationSlice";
import Loader from "@/components/Loader";
import Hero from "@/components/pages/Hero";
import Services from "@/components/pages/Services";
import Process from "@/components/pages/Process";
import Testimonials from "@/components/pages/Testimonials";
import SearchHeroSection from "@/components/pages/SearchHeroSection";
import RecomandationPage from "@/components/pages/LandingPages/RecomandationPage";

import { getCurrentPositionWithFallback } from "@/lib/geolocation";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { lat, lng } = useSelector((state: any) => state.location);

  useEffect(() => {
    // If location is already saved in Redux, skip
    if (lat && lng) return;

    getCurrentPositionWithFallback()
      .then(async (pos) => {
        const currentLat = pos.lat;
        const currentLng = pos.lng;

        try {
          const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
          if (!apiKey) return;

          const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentLat},${currentLng}&key=${apiKey}`);
          const data = await response.json();

          if (data.results && data.results.length > 0) {
            let address = data.results[0].formatted_address;
            
            const cityComp = data.results[0].address_components.find((c: any) => c.types.includes('locality'));
            const stateComp = data.results[0].address_components.find((c: any) => c.types.includes('administrative_area_level_1'));
            const countryComp = data.results[0].address_components.find((c: any) => c.types.includes('country'));
            
            if (cityComp && stateComp && countryComp) {
              address = `${cityComp.long_name}, ${stateComp.short_name}, ${countryComp.long_name}`;
            }

            dispatch(setLocation({
              address,
              lat: currentLat,
              lng: currentLng
            }));
          }
        } catch (error) {
          console.error("Error fetching location data from Google Maps API:", error);
        }
      })
      .catch((error) => {
        console.warn("Could not determine initial location:", error.message || error);
      });
  }, [lat, lng, dispatch]);

  if (isLoading) {
    return <Loader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <main className="flex-1 w-full flex flex-col items-center">
      <SearchHeroSection />
      <RecomandationPage />
      {/* <Hero /> */}
      <Services />
      <Process />
      <Testimonials />
    </main>
  );
}
