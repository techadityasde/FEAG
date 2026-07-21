"use client";

import React, { use } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { notFound } from "next/navigation";
import { PackageOpen, MapPin, CheckCircle2, Clock, Calendar, ArrowLeft, Loader2, CircleDashed } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { professionals } from "@/lib/data/professionals";

const OrderTrackingContent = ({ id }: { id: string }) => {
  const order = useSelector((state: RootState) => 
    state.orders.orders.find(o => o.orderId === id)
  );
  console.log("Order Tracking ID:", order);
  const location = useSelector((state: RootState) => state.location);

  if (!order) {
    return notFound();
  }

  const professional = order ? professionals.find(p => p.id === order.professionalId) : null;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "", 
  });

  const mapRef = React.useRef<google.maps.Map | null>(null);

  const onLoad = React.useCallback(
    function callback(map: google.maps.Map) {
      if (professional?.lat && professional?.lng && location?.lat && location?.lng) {
        const bounds = new window.google.maps.LatLngBounds();
        bounds.extend({ lat: professional.lat, lng: professional.lng });
        bounds.extend({ lat: location.lat, lng: location.lng });
        map.fitBounds(bounds);
        
        // Ensure it doesn't zoom in too tightly if points are very close
        const listener = window.google.maps.event.addListener(map, 'idle', () => {
          if (map.getZoom()! > 16) map.setZoom(16);
          window.google.maps.event.removeListener(listener);
        });
      } else {
        // Fallback center if one is missing
        map.setCenter({ 
          lat: location?.lat || professional?.lat || 20.5937, 
          lng: location?.lng || professional?.lng || 78.9629 
        });
        map.setZoom(5);
      }
      mapRef.current = map;
    },
    [professional, location]
  );

  const onUnmount = React.useCallback(function callback() {
    mapRef.current = null;
  }, []);

  return (
    <div className="min-h-screen bg-background/50 py-10 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/orders" className="p-2.5 bg-card hover:bg-muted border border-border rounded-xl transition-colors">
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </Link>
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
              Track Order
            </h1>
            <p className="text-muted-foreground text-sm font-medium">
              ID: {order.orderId}
            </p>
          </div>
        </div>

        {/* Order Details Card */}
        <div className="bg-card border border-border p-6 rounded-2xl shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Professional</p>
            <p className="font-semibold text-lg">{order.professionalName}</p>
            <Link href={`/portfolio/${encodeURIComponent(order.professionalName)}`} className="text-xs text-primary font-bold hover:underline">
              View Portfolio
            </Link>
          </div>
          
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Package & Date</p>
            <div className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-muted text-foreground uppercase tracking-wider mb-1">
              {order.selectedPackage} Package
            </div>
            <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              {order.bookingDate 
                ? new Date(order.bookingDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
                : new Date(order.date).toLocaleDateString()}
            </div>
            {order.bookingSlot && (
              <div className="flex items-center gap-1.5 text-sm font-medium text-foreground mt-0.5">
                <Clock className="h-4 w-4 text-muted-foreground" />
                {order.bookingSlot}
              </div>
            )}
          </div>
          
          <div className="space-y-1.5 md:text-right">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Total Amount</p>
            <p className="font-black text-2xl text-primary">
              ₹ {order.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <div className={cn(
              "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border mt-1",
              order.status === "active" ? "bg-blue-500/10 text-blue-600 border-blue-500/20" :
              order.status === "completed" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" :
              "bg-red-500/10 text-red-600 border-red-500/20"
            )}>
              {order.status === "active" ? <CircleDashed className="h-3 w-3 animate-[spin_3s_linear_infinite]" /> : <CheckCircle2 className="h-3 w-3" />}
              <span className="capitalize">{order.status}</span>
            </div>
          </div>
        </div>

        {/* Tracking Map */}
        <div className="bg-card border border-border p-6 md:p-8 rounded-2xl shadow-sm">
          <div className="flex flex-col gap-6 mb-8">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Live Tracking Status
            </h3>
            
            <div className="flex flex-col sm:flex-row items-stretch justify-between gap-4 w-full">
              {location.address && (
                <div className="bg-muted/30 p-3 rounded-xl border border-border/50 text-sm w-full text-left">
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1">Service Address</p>
                  <p className="font-semibold text-foreground line-clamp-2">{location.address}</p>
                </div>
              )}
              {professional?.location && (
                <div className="bg-muted/30 p-3 rounded-xl border border-border/50 text-sm w-full text-left">
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1">Creator Address</p>
                  <p className="font-semibold text-foreground line-clamp-2">{professional.location}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="h-[400px] md:h-[500px] w-full rounded-xl overflow-hidden border border-border relative bg-muted/10">
            {!isLoaded ? (
              <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  <p className="text-sm font-bold text-muted-foreground animate-pulse">Loading Live Map...</p>
                </div>
              </div>
            ) : (
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{
                  disableDefaultUI: false,
                  zoomControl: true,
                  mapTypeControl: false,
                  streetViewControl: false,
                  styles: [
                    {
                      featureType: "poi",
                      elementType: "labels",
                      stylers: [{ visibility: "off" }]
                    }
                  ]
                }}
              >
                {/* Professional Start Point Marker */}
                {professional?.lat && professional?.lng && (
                  <Marker
                    position={{ lat: professional.lat, lng: professional.lng }}
                    title={professional.username}
                    label={{
                      text: "P",
                      color: "white",
                      fontWeight: "bold"
                    }}
                  />
                )}
                
                {/* Customer Service Point Marker */}
                {location?.lat && location?.lng && (
                  <Marker
                    position={{ lat: location.lat, lng: location.lng }}
                    title="Service Location"
                    label={{
                      text: "S",
                      color: "white",
                      fontWeight: "bold"
                    }}
                  />
                )}
              </GoogleMap>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default function OrderTrackingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <ProtectedRoute allowedRoles={["customer"]}>
      <OrderTrackingContent id={id} />
    </ProtectedRoute>
  );
}
