"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setLocation } from '@/lib/store/locationSlice';
import { Modal } from '@/components/ui/Modal';
import { MapPin, Target, Search, X, Map, ArrowLeft } from 'lucide-react';
import { useLoadScript, GoogleMap } from '@react-google-maps/api';
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
  
  const [isMapMode, setIsMapMode] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 });
  const [mapAddress, setMapAddress] = useState("");
  const [isFetchingAddress, setIsFetchingAddress] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const mapRef = useRef<google.maps.Map | null>(null);

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
            // Find the most specific address that isn't just a Plus Code
            const bestResult = response.results.find((r: any) => !r.types.includes("plus_code")) || response.results[0];
            let address = bestResult.formatted_address;
            
            // Strip Plus Code from the beginning of the address if Google prepended it
            address = address.replace(/^[A-Z0-9]{4,8}\+[A-Z0-9]{2,3}(,\s*)?/, '');
            
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

  const fetchAddressFromLatLng = async (lat: number, lng: number) => {
    setIsFetchingAddress(true);
    try {
      const geocoder = new window.google.maps.Geocoder();
      const response = await geocoder.geocode({ location: { lat, lng } });
      if (response.results && response.results[0]) {
        // Find the most specific address that isn't just a Plus Code
        const bestResult = response.results.find((r: any) => !r.types.includes("plus_code")) || response.results[0];
        let address = bestResult.formatted_address;
        
        // Strip Plus Code from the beginning of the address if Google prepended it
        address = address.replace(/^[A-Z0-9]{4,8}\+[A-Z0-9]{2,3}(,\s*)?/, '');
        
        setMapAddress(address);
      } else {
        setMapAddress("Unknown Location");
      }
    } catch (err) {
      setMapAddress("Error fetching address");
    } finally {
      setIsFetchingAddress(false);
    }
  };

  const onMapDragEnd = useCallback(() => {
    setIsDragging(false);
    if (mapRef.current) {
      const newCenter = mapRef.current.getCenter();
      if (newCenter) {
        const lat = newCenter.lat();
        const lng = newCenter.lng();
        setMapCenter({ lat, lng });
        fetchAddressFromLatLng(lat, lng);
      }
    }
  }, []);

  const handleOpenMap = () => {
    setIsMapMode(true);
    if (!mapAddress) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            setMapCenter({ lat, lng });
            fetchAddressFromLatLng(lat, lng);
          },
          (error) => {
            console.log("Could not get location", error);
          }
        );
      }
    }
  };

  const handleClose = () => {
    setValue('');
    clearSuggestions();
    setIsMapMode(false);
    onClose();
  };

  if (isMapMode) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose} hideCloseButton={true} title={undefined} disableOutsideClick={true}>
        <div className="flex flex-col h-[75vh] max-h-[600px] -m-4 sm:-m-6 relative rounded-xl overflow-hidden">
          <div className="absolute top-4 left-4 z-10">
            <button onClick={() => setIsMapMode(false)} className="p-2 bg-white rounded-full shadow-md text-foreground hover:bg-muted transition-colors">
              <ArrowLeft className="size-5" />
            </button>
          </div>
          <div className="flex-1 w-full bg-muted/20 relative">
            {isLoaded ? (
              <>
                <GoogleMap
                  mapContainerStyle={{ width: '100%', height: '100%' }}
                  center={mapCenter}
                  zoom={15}
                  onLoad={(map) => { mapRef.current = map; }}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={onMapDragEnd}
                  options={{
                    disableDefaultUI: true,
                    zoomControl: true,
                  }}
                />
                <div className="absolute top-1/2 left-1/2 w-0 h-0 pointer-events-none z-10">
                  {/* Exact center point shadow */}
                  <div className={`absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-3 h-1.5 bg-black/50 rounded-[100%] blur-[1px] transition-all duration-300 ${isDragging ? 'scale-50 opacity-30' : 'scale-100 opacity-100'}`}></div>
                  
                  {/* Pin bouncing above the center */}
                  <div className={`absolute bottom-0 left-0 -translate-x-1/2 transition-all duration-300 ease-out flex flex-col items-center ${isDragging ? 'mb-6' : 'mb-[2px]'}`}>
                    <div className="relative flex justify-center">
                      <MapPin className="size-11 text-black drop-shadow-lg" fill="currentColor" strokeWidth={1.5} stroke="white" />
                      <div className="absolute top-[10px] w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground font-medium">Loading Map...</div>
            )}
          </div>
          <div className="p-4 sm:p-5 bg-white border-t border-border/50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
            <div className="mb-4">
              <p className="text-xs text-muted-foreground font-medium mb-1 uppercase tracking-wider">Selected Location</p>
              <p className="text-[15px] font-semibold text-foreground line-clamp-2">
                {isFetchingAddress ? "Fetching address..." : (mapAddress || "Drag map to select your location")}
              </p>
            </div>
            <button
              onClick={() => {
                if (mapAddress && !isFetchingAddress) {
                  dispatch(setLocation({ address: mapAddress, lat: mapCenter.lat, lng: mapCenter.lng }));
                  handleClose();
                }
              }}
              disabled={isFetchingAddress || !mapAddress}
              className="w-full bg-primary text-white font-semibold py-3.5 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              Confirm Location
            </button>
          </div>
        </div>
      </Modal>
    );
  }

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

        {/* Action Buttons */}
        <div className="p-4 sm:p-6 py-4 border-b border-border/50 flex flex-col gap-4">
          <button
            onClick={handleCurrentLocation}
            className="flex items-center gap-3 text-purple-600 font-semibold hover:text-purple-700 transition-colors w-full text-left cursor-pointer"
          >
            <Target className="size-5" />
            <span className="text-[15px]">Use current location</span>
          </button>
          <button
            onClick={handleOpenMap}
            className="flex items-center gap-3 text-primary font-semibold hover:text-primary/80 transition-colors w-full text-left cursor-pointer"
          >
            <Map className="size-5" />
            <span className="text-[15px]">Select location via map</span>
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
