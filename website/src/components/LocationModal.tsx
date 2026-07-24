"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setLocation } from '@/lib/store/locationSlice';
import { Modal } from '@/components/ui/Modal';
import { MapPin, Target, Search, X, Map, ArrowLeft, CheckCircle2, RefreshCw } from 'lucide-react';
import { useLoadScript, GoogleMap } from '@react-google-maps/api';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import toast from 'react-hot-toast';
import { getCurrentPositionWithFallback } from '@/lib/geolocation';

const libraries: ("places")[] = ["places"];

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LocationSelection {
  address: string;
  lat: number;
  lng: number;
  pincode?: string;
  landmark?: string;
  city?: string;
  state?: string;
  country?: string;
  isIpFallback?: boolean;
}

const extractAddressDetails = (result: any) => {
  let pincode = "";
  let landmark = "";
  let city = "";
  let state = "";
  let country = "";

  if (result && result.address_components) {
    const sublocalities: string[] = [];
    result.address_components.forEach((c: any) => {
      if (c.types.includes("postal_code")) {
        pincode = c.long_name;
      }
      if (
        c.types.includes("sublocality_level_1") ||
        c.types.includes("sublocality") ||
        c.types.includes("neighborhood") ||
        c.types.includes("route")
      ) {
        sublocalities.push(c.long_name);
      }
      if (c.types.includes("locality") || c.types.includes("administrative_area_level_2")) {
        if (!city) city = c.long_name;
      }
      if (c.types.includes("administrative_area_level_1")) {
        state = c.long_name;
      }
      if (c.types.includes("country")) {
        country = c.long_name;
      }
    });

    landmark = sublocalities.slice(0, 2).join(", ");
  }

  return { pincode, landmark, city, state, country };
};

export function LocationModal({ isOpen, onClose }: LocationModalProps) {
  const dispatch = useDispatch();
  
  const [isMapMode, setIsMapMode] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 });
  const [mapAddress, setMapAddress] = useState("");
  const [isFetchingAddress, setIsFetchingAddress] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationSelection | null>(null);
  const [mapDetails, setMapDetails] = useState<{ pincode?: string; landmark?: string; city?: string; state?: string; country?: string }>({});

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

  const handleSelectSuggestion = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      const details = extractAddressDetails(results[0]);
      setSelectedLocation({ address, lat, lng, ...details });
    } catch (error) {
      console.error("Error: ", error);
      toast.error('Could not fetch location details.');
    }
  };

  const handleCurrentLocation = async () => {
    setIsFetchingLocation(true);
    const toastId = toast.loading('Fetching current location...');

    try {
      const pos = await getCurrentPositionWithFallback();
      const lat = pos.lat;
      const lng = pos.lng;

      if (!window.google) {
        toast.error('Google Maps API is loading...', { id: toastId });
        setIsFetchingLocation(false);
        return;
      }

      const geocoder = new window.google.maps.Geocoder();
      const response = await geocoder.geocode({ location: { lat, lng } });

      if (response.results && response.results[0]) {
        // Find the most specific address that isn't just a Plus Code
        const bestResult = response.results.find((r: any) => !r.types.includes("plus_code")) || response.results[0];
        let address = bestResult.formatted_address;

        // Strip Plus Code from the beginning of the address if Google prepended it
        address = address.replace(/^[A-Z0-9]{4,8}\+[A-Z0-9]{2,3}(,\s*)?/, '');

        const details = extractAddressDetails(bestResult);
        setSelectedLocation({ address, lat, lng, isIpFallback: pos.isIpFallback, ...details });
        toast.success(pos.isIpFallback ? 'Location estimated via IP' : 'Location fetched!', { id: toastId });
      } else {
        toast.error('Could not determine address', { id: toastId });
      }
    } catch (err) {
      toast.error('Could not fetch location. Please search manually.', { id: toastId });
    } finally {
      setIsFetchingLocation(false);
    }
  };

  const handleConfirmSetLocation = (locationToSet?: LocationSelection) => {
    const loc = locationToSet || selectedLocation;
    if (loc) {
      dispatch(
        setLocation({
          address: loc.address,
          lat: loc.lat,
          lng: loc.lng,
          pincode: loc.pincode,
          landmark: loc.landmark,
          city: loc.city,
          state: loc.state,
          country: loc.country,
        })
      );
      toast.success('Location set successfully!');
      handleClose();
    }
  };

  const fetchAddressFromLatLng = async (lat: number, lng: number) => {
    setIsFetchingAddress(true);
    try {
      const geocoder = new window.google.maps.Geocoder();
      const response = await geocoder.geocode({ location: { lat, lng } });
      if (response.results && response.results[0]) {
        const bestResult = response.results.find((r: any) => !r.types.includes("plus_code")) || response.results[0];
        let address = bestResult.formatted_address;
        address = address.replace(/^[A-Z0-9]{4,8}\+[A-Z0-9]{2,3}(,\s*)?/, '');
        setMapAddress(address);
        setMapDetails(extractAddressDetails(bestResult));
      } else {
        setMapAddress("Unknown Location");
        setMapDetails({});
      }
    } catch (err) {
      setMapAddress("Error fetching address");
      setMapDetails({});
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

  const handleOpenMap = async () => {
    setIsMapMode(true);
    if (!mapAddress) {
      try {
        const pos = await getCurrentPositionWithFallback();
        setMapCenter({ lat: pos.lat, lng: pos.lng });
        fetchAddressFromLatLng(pos.lat, pos.lng);
      } catch (error) {
        console.log("Could not get location", error);
      }
    }
  };

  const handleClose = () => {
    setValue('');
    clearSuggestions();
    setIsMapMode(false);
    setSelectedLocation(null);
    onClose();
  };

  if (isMapMode) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose} hideCloseButton={true} title={undefined} disableOutsideClick={true}>
        <div className="flex flex-col h-[75vh] max-h-[600px] -m-4 sm:-m-6 relative rounded-2xl overflow-hidden">
          <div className="absolute top-4 left-4 z-10">
            <button onClick={() => setIsMapMode(false)} className="p-2.5 bg-white/95 backdrop-blur-md rounded-full shadow-md text-foreground hover:bg-white transition-all active:scale-95 cursor-pointer border border-border/40">
              <ArrowLeft className="size-4.5" />
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
                  <div className={`absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-3 h-1.5 bg-black/50 rounded-[100%] blur-[1px] transition-all duration-300 ${isDragging ? 'scale-50 opacity-30' : 'scale-100 opacity-100'}`}></div>
                  <div className={`absolute bottom-0 left-0 -translate-x-1/2 transition-all duration-300 ease-out flex flex-col items-center ${isDragging ? 'mb-6' : 'mb-[2px]'}`}>
                    <div className="relative flex justify-center">
                      <MapPin className="size-11 text-black drop-shadow-lg" fill="currentColor" strokeWidth={1.5} stroke="white" />
                      <div className="absolute top-[10px] w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground font-medium text-sm">Loading Map...</div>
            )}
          </div>
          <div className="p-4 sm:p-5 bg-white/95 backdrop-blur-md border-t border-border/50 shadow-lg z-20">
            <div className="mb-3.5">
              <p className="text-[10px] text-muted-foreground font-extrabold uppercase tracking-wider mb-1">Selected Location</p>
              <p className="text-sm font-bold text-foreground line-clamp-2 leading-snug">
                {isFetchingAddress ? "Fetching address..." : (mapAddress || "Drag map to select your location")}
              </p>
            </div>
            <button
              onClick={() => {
                if (mapAddress && !isFetchingAddress) {
                  handleConfirmSetLocation({ address: mapAddress, lat: mapCenter.lat, lng: mapCenter.lng, ...mapDetails });
                }
              }}
              disabled={isFetchingAddress || !mapAddress}
              className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm active:scale-[0.99] cursor-pointer text-sm"
            >
              Set Location
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
        <div className="p-4 sm:p-5 pb-3 border-b border-border/40 flex items-center gap-3">
          <div className="relative flex items-center bg-muted/40 hover:bg-muted/60 border border-border/70 rounded-2xl px-3.5 py-2.5 shadow-xs focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 focus-within:bg-background transition-all flex-1">
            <Search className="size-4.5 text-muted-foreground mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search for location, society, apartment..."
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                if (selectedLocation) setSelectedLocation(null);
              }}
              disabled={!ready}
              className="flex-1 bg-transparent border-none focus:outline-none text-sm font-semibold placeholder:font-normal placeholder:text-muted-foreground w-full text-foreground"
              autoFocus
            />
            {value && (
              <button onClick={() => { setValue(""); setSelectedLocation(null); }} className="p-1 ml-1 bg-muted-foreground/15 rounded-full text-foreground hover:bg-muted-foreground/30 transition-all shrink-0 active:scale-90">
                <X className="size-3.5" />
              </button>
            )}
          </div>
          <button onClick={handleClose} className="p-2.5 bg-muted/60 hover:bg-muted rounded-full text-muted-foreground hover:text-foreground transition-all cursor-pointer shrink-0 active:scale-95">
            <X className="size-4.5" />
          </button>
        </div>

        {/* Selected Location Preview Card */}
        {selectedLocation && (
          <div className="p-4 sm:p-5 bg-gradient-to-b from-primary/5 to-transparent border-b border-primary/15 flex flex-col gap-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4.5 text-emerald-600 shrink-0" />
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-primary">
                  Fetched Location
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLocation(null)}
                className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              >
                Change
              </button>
            </div>

            <div className="flex items-start gap-3 bg-white p-3.5 rounded-2xl border border-border/60 shadow-xs">
              <div className="p-2 bg-primary/10 rounded-xl text-primary shrink-0 mt-0.5">
                <MapPin className="size-4.5" />
              </div>
              <p className="text-sm font-semibold text-foreground leading-snug">
                {selectedLocation.address}
              </p>
            </div>

            <button
              onClick={() => handleConfirmSetLocation()}
              className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/95 transition-all shadow-sm active:scale-[0.99] cursor-pointer text-sm"
            >
              Confirm Location
            </button>
          </div>
        )}

        {/* Action Buttons (when no location is currently previewed) */}
        {!selectedLocation && (
          <div className="p-4 sm:p-5 py-3 border-b border-border/40 flex flex-col gap-2.5">
            <button
              onClick={handleCurrentLocation}
              disabled={isFetchingLocation}
              className="flex items-center gap-3.5 p-3 rounded-2xl bg-purple-50/60 hover:bg-purple-100/70 border border-purple-100 transition-all w-full text-left cursor-pointer disabled:opacity-50 group active:scale-[0.99]"
            >
              <div className="size-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                {isFetchingLocation ? (
                  <RefreshCw className="size-4 animate-spin" />
                ) : (
                  <Target className="size-4" />
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-purple-950">
                  {isFetchingLocation ? "Detecting location..." : "Use current location"}
                </span>
                <span className="text-[11px] font-medium text-purple-700/80">Using GPS / IP auto-detection</span>
              </div>
            </button>

            <button
              onClick={handleOpenMap}
              className="flex items-center gap-3.5 p-3 rounded-2xl bg-primary/5 hover:bg-primary/10 border border-primary/15 transition-all w-full text-left cursor-pointer group active:scale-[0.99]"
            >
              <div className="size-9 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <Map className="size-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-foreground">Select location via map</span>
                <span className="text-[11px] font-medium text-muted-foreground">Pinpoint exact address visually</span>
              </div>
            </button>
          </div>
        )}

        {/* Suggestions List (when no location is currently previewed) */}
        {!selectedLocation && (
          <div className="p-3 sm:p-4 pt-1 flex flex-col max-h-[260px] overflow-y-auto">
            {status === "OK" && data.map(({ place_id, description, structured_formatting: { main_text, secondary_text } }) => (
              <button
                key={place_id}
                onClick={() => handleSelectSuggestion(description)}
                className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-muted/50 transition-all text-left cursor-pointer group"
              >
                <div className="size-8 rounded-lg bg-muted/80 group-hover:bg-primary/10 group-hover:text-primary text-muted-foreground flex items-center justify-center shrink-0 transition-colors mt-0.5">
                  <MapPin className="size-4" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-foreground truncate">{main_text}</span>
                  <span className="text-xs text-muted-foreground truncate font-medium">{secondary_text}</span>
                </div>
              </button>
            ))}
            {status !== "OK" && value && ready && (
              <div className="py-6 text-center text-xs font-semibold text-muted-foreground">
                No results found for "{value}"
              </div>
            )}
            
            <div className="mt-1 pt-1 pb-1 flex justify-center opacity-70 pointer-events-none">
               <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1.5">
                 powered by 
                 <span className="font-bold tracking-tighter text-[12px] font-sans">
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
        )}
      </div>
    </Modal>
  );
}
