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
        <div className="flex flex-col h-[75vh] max-h-[600px] -m-4 sm:-m-6 relative rounded-xl overflow-hidden">
          <div className="absolute top-4 left-4 z-10">
            <button onClick={() => setIsMapMode(false)} className="p-2 bg-white rounded-full shadow-md text-foreground hover:bg-muted transition-colors cursor-pointer">
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
                  handleConfirmSetLocation({ address: mapAddress, lat: mapCenter.lat, lng: mapCenter.lng, ...mapDetails });
                }
              }}
              disabled={isFetchingAddress || !mapAddress}
              className="w-full bg-primary text-white font-semibold py-3.5 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm cursor-pointer"
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
        <div className="p-4 sm:p-6 pb-2 border-b border-border/50 flex items-center gap-3">
          <div className="relative flex items-center bg-transparent border border-border/50 rounded-xl px-3 py-2.5 shadow-sm focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all flex-1">
            <Search className="size-5 text-muted-foreground mr-1 shrink-0" />
            <input
              type="text"
              placeholder="Search for your location/society/apartment"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                if (selectedLocation) setSelectedLocation(null);
              }}
              disabled={!ready}
              className="flex-1 bg-transparent border-none focus:outline-none px-2 text-[15px] font-medium placeholder:font-normal placeholder:text-muted-foreground w-full"
              autoFocus
            />
            {value && (
              <button onClick={() => { setValue(""); setSelectedLocation(null); }} className="p-1 ml-1 bg-muted-foreground/20 rounded-full text-foreground hover:bg-muted-foreground/30 transition-colors shrink-0">
                <X className="size-3.5" />
              </button>
            )}
          </div>
          <button onClick={handleClose} className="p-2 bg-muted/50 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer shrink-0">
            <X className="size-5" />
          </button>
        </div>

        {/* Selected Location Preview Card */}
        {selectedLocation && (
          <div className="p-4 sm:p-6 bg-primary/5 border-b border-primary/20 flex flex-col gap-3 animate-in fade-in duration-200">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-5 text-emerald-600 shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Fetched Location
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLocation(null)}
                className="text-xs text-muted-foreground hover:text-foreground underline transition-colors cursor-pointer"
              >
                Change
              </button>
            </div>

            <div className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-border/60 shadow-xs">
              <MapPin className="size-5 text-primary shrink-0 mt-0.5" />
              <p className="text-[14px] font-medium text-foreground leading-snug">
                {selectedLocation.address}
              </p>
            </div>

            <button
              onClick={() => handleConfirmSetLocation()}
              className="w-full bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary/95 transition-all shadow-sm cursor-pointer"
            >
              Set Location
            </button>
          </div>
        )}

        {/* Action Buttons (when no location is currently previewed) */}
        {!selectedLocation && (
          <div className="p-4 sm:p-6 py-4 border-b border-border/50 flex flex-col gap-4">
            <button
              onClick={handleCurrentLocation}
              disabled={isFetchingLocation}
              className="flex items-center gap-3 text-purple-600 font-semibold hover:text-purple-700 transition-colors w-full text-left cursor-pointer disabled:opacity-50"
            >
              {isFetchingLocation ? (
                <RefreshCw className="size-5 animate-spin" />
              ) : (
                <Target className="size-5" />
              )}
              <span className="text-[15px]">
                {isFetchingLocation ? "Detecting location..." : "Use current location"}
              </span>
            </button>
            <button
              onClick={handleOpenMap}
              className="flex items-center gap-3 text-primary font-semibold hover:text-primary/80 transition-colors w-full text-left cursor-pointer"
            >
              <Map className="size-5" />
              <span className="text-[15px]">Select location via map</span>
            </button>
          </div>
        )}

        {/* Suggestions List (when no location is currently previewed) */}
        {!selectedLocation && (
          <div className="p-4 sm:p-6 flex flex-col">
            {status === "OK" && data.map(({ place_id, description, structured_formatting: { main_text, secondary_text } }) => (
              <button
                key={place_id}
                onClick={() => handleSelectSuggestion(description)}
                className="flex items-start gap-4 py-4 border-b border-border/20 last:border-0 hover:bg-muted/30 transition-colors text-left cursor-pointer"
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
        )}
      </div>
    </Modal>
  );
}
