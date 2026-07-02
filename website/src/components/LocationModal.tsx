"use client";

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLocation } from '@/lib/store/locationSlice';
import { Modal } from '@/components/ui/Modal';
import { MapPin, Target, Search, X } from 'lucide-react';
import { useLoadScript } from '@react-google-maps/api';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import toast from 'react-hot-toast';

const libraries: ("places")[] = ["places"];

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LocationModal({ isOpen, onClose }: LocationModalProps) {
  const dispatch = useDispatch();
  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: "in" },
    },
    debounce: 300,
    initOnMount: isLoaded,
  });

  useEffect(() => {
    if (isLoaded && !ready) {
      setValue(value);
    }
  }, [isLoaded, ready, setValue, value]);

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      dispatch(setLocation({ address, lat, lng }));
      onClose();
    } catch (error) {
      console.error("Error: ", error);
      toast.error('Could not fetch location details.');
    }
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    const toastId = toast.loading('Fetching current location...');
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          const geocoder = new window.google.maps.Geocoder();
          const response = await geocoder.geocode({ location: { lat, lng } });
          
          if (response.results && response.results[0]) {
            // Find a locality/sublocality for cleaner address display like "Omaxe City, Lucknow"
            let address = response.results[0].formatted_address;
            const addressComponent = response.results.find(
              (r) => r.types.includes("sublocality") || r.types.includes("locality") || r.types.includes("neighborhood")
            );
            if (addressComponent) {
               address = addressComponent.formatted_address;
            }
            
            dispatch(setLocation({ address, lat, lng }));
            toast.success('Location updated', { id: toastId });
            onClose();
          } else {
            toast.error('Could not determine address', { id: toastId });
          }
        } catch (err) {
          toast.error('Error reverse geocoding', { id: toastId });
        }
      },
      (error) => {
        toast.error('Error fetching location', { id: toastId });
      },
      { enableHighAccuracy: true }
    );
  };

  const handleClose = () => {
    setValue('');
    clearSuggestions();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} hideCloseButton={true} title={undefined} disableOutsideClick={true}>
      <div className="flex flex-col gap-0 -m-4 sm:-m-6">
        {/* Search Input Area */}
        <div className="p-4 sm:p-6 pb-2 border-b border-border/50 flex items-center gap-3">
          <div className="relative flex items-center bg-transparent border border-border/50 rounded-xl px-3 py-2.5 shadow-sm focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all flex-1">
            <Search className="size-5 text-muted-foreground mr-1 shrink-0" />
            <input
              type="text"
              placeholder="Search for your location/society/apartment"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              disabled={!ready}
              className="flex-1 bg-transparent border-none focus:outline-none px-2 text-[15px] font-medium placeholder:font-normal placeholder:text-muted-foreground w-full"
              autoFocus
            />
            {value && (
              <button onClick={() => setValue("")} className="p-1 ml-1 bg-muted-foreground/20 rounded-full text-foreground hover:bg-muted-foreground/30 transition-colors shrink-0">
                <X className="size-3.5" />
              </button>
            )}
          </div>
          <button onClick={handleClose} className="p-2 bg-muted/50 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer shrink-0">
            <X className="size-5" />
          </button>
        </div>

        {/* Current Location Button */}
        <div className="p-4 sm:p-6 py-4 border-b border-border/50">
          <button
            onClick={handleCurrentLocation}
            className="flex items-center gap-3 text-purple-600 font-semibold hover:text-purple-700 transition-colors w-full text-left cursor-pointer"
          >
            <Target className="size-5" />
            <span className="text-[15px]">Use current location</span>
          </button>
        </div>

        {/* Suggestions List */}
        <div className="p-4 sm:p-6 flex flex-col">
          {status === "OK" && data.map(({ place_id, description, structured_formatting: { main_text, secondary_text } }) => (
            <button
              key={place_id}
              onClick={() => handleSelect(description)}
              className="flex items-start gap-4 py-4 border-b border-border/20 last:border-0 hover:bg-muted/30 transition-colors text-left"
            >
              <div className="mt-0.5 text-muted-foreground/70 shrink-0">
                <MapPin className="size-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[15px] font-semibold text-foreground truncate">{main_text}</span>
                <span className="text-sm text-muted-foreground truncate">{secondary_text}</span>
              </div>
            </button>
          ))}
          {status !== "OK" && value && ready && (
            <div className="py-8 text-center text-sm text-muted-foreground">
              No results found for "{value}"
            </div>
          )}
          
          <div className="mt-2 flex justify-center opacity-80 pointer-events-none pb-2">
             <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1.5">
               powered by 
               <span className="font-bold tracking-tighter text-[13px] font-sans">
                 <span style={{ color: "#4285F4" }}>G</span>
                 <span style={{ color: "#EA4335" }}>o</span>
                 <span style={{ color: "#FBBC05" }}>o</span>
                 <span style={{ color: "#4285F4" }}>g</span>
                 <span style={{ color: "#34A853" }}>l</span>
                 <span style={{ color: "#EA4335" }}>e</span>
               </span>
             </span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
