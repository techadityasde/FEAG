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

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { lat, lng } = useSelector((state: any) => state.location);

  useEffect(() => {
    // If location is already saved in Redux, skip
    if (lat && lng) return;

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const currentLat = position.coords.latitude;
          const currentLng = position.coords.longitude;

          try {
            const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
            if (!apiKey) return;

            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentLat},${currentLng}&key=${apiKey}`);
            const data = await response.json();

            if (data.results && data.results.length > 0) {
              // Usually the first result is a full formatted address
              // or we can extract the most relevant part. We'll use formatted_address for accuracy.
              let address = data.results[0].formatted_address;
              
              // Try to find a slightly shorter, more readable address (like City, State, Country)
              // Google Maps usually provides a "locality" and "administrative_area_level_1" component
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
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    }
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
