"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { logout } from "@/lib/store/authSlice";
import { setBookingDate, setBookingSlot } from "@/lib/store/bookingSlice";
import { toggleWishlist } from "@/lib/store/wishlistSlice";
import { AlertTriangle } from "lucide-react";

import { professionals } from "@/lib/data/professionals";
import { BookingFormValues, PortfolioItem } from "../types";

// Import modular components
import HeroSection from "../components/HeroSection";
import PortfolioSection from "../components/PortfolioSection";
import AboutSection from "../components/AboutSection";
import HighlightsSection from "../components/HighlightsSection";
import PackagesSection from "../components/PackagesSection";
import CalendarSection from "../components/CalendarSection";
import CustomBookingForm from "../components/CustomBookingForm";
import ReviewSection from "../components/ReviewSection";
import FAQSection from "../components/FAQSection";
import SimilarProfessionals from "../components/SimilarProfessionals";
import StickyBookingPanel from "../components/StickyBookingPanel";
import LightboxModal from "../components/LightboxModal";
import { Modal } from "@/components/ui/Modal";
import { LoginModal } from "@/components/auth/LoginModal";
import CheckoutSidepanel from "@/components/ui/CheckoutSidepanel";
import { calculateFSPACustomPrice } from "@/lib/fspa";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Mock portfolio media items based on category
const mockPortfolioMedia: Record<string, PortfolioItem[]> = {
  photographer: [
    { id: "m1", type: "image", url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80", title: "Elegant Wedding Vows" },
    { id: "m2", type: "image", url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80", title: "Candid Couple Dance" },
    { id: "m3", type: "image", url: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&auto=format&fit=crop&q=80", title: "High-Fashion Portrait" },
    { id: "m4", type: "image", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80", title: "Symmetrical Peak Landscape" },
    { id: "m5", type: "image", url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80", title: "Modernist Steel & Glass" },
    { id: "m6", type: "image", url: "https://images.unsplash.com/photo-1519225495810-7512c696505a?w=800&auto=format&fit=crop&q=80", title: "Warm Family Gathering" },
  ],
  videographer: [
    { id: "v1", type: "video", url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&auto=format&fit=crop&q=80", duration: "3:45", title: "Cinematic Wedding Film" },
    { id: "v2", type: "video", url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=80", duration: "1:00", title: "Corporate Promo Highlight" },
    { id: "v3", type: "video", url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80", duration: "0:30", title: "Social Media Engagement Reel" },
    { id: "v4", type: "video", url: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&auto=format&fit=crop&q=80", duration: "2:15", title: "Aerial Drone Showcase" },
    { id: "v5", type: "image", url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80", title: "BTS Director Frame" },
    { id: "v6", type: "image", url: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop&q=80", title: "Behind The Scenes Production" },
  ],
  singer: [
    { id: "s1", type: "audio", url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80", duration: "4:20", title: "Bollywood Classic Cover" },
    { id: "s2", type: "audio", url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80", duration: "3:10", title: "Acoustic Sufi Fusion" },
    { id: "s3", type: "video", url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80", duration: "5:00", title: "Grand Concert Performance" },
    { id: "s4", type: "video", url: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&auto=format&fit=crop&q=80", duration: "2:40", title: "Intimate Cafe Acoustic Live" },
    { id: "s5", type: "image", url: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&auto=format&fit=crop&q=80", title: "Live Concert Portrait" },
    { id: "s6", type: "image", url: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&auto=format&fit=crop&q=80", title: "Stage Soundcheck Vibe" },
  ]
};

// Mock professional details
const mockHighlights: Record<string, { key: string, value: string }[]> = {
  photographer: [
    { key: "Camera Gear", value: "Sony A7R V & Canon EOS R5" },
    { key: "Drone Coverage", value: "DJI Mavic 3 Pro (4K)" },
    { key: "Editing Software", value: "Adobe Lightroom & Photoshop" },
    { key: "Album Offerings", value: "Premium Flush-mount Albums" },
    { key: "Delivery Turnaround", value: "5 - 7 Business Days" }
  ],
  videographer: [
    { key: "Video Resolution", value: "4K UHD at 60fps & 10bit Color" },
    { key: "Drone Systems", value: "DJI Inspire 3 & DJI Mavic 3 Cine" },
    { key: "Stabilization", value: "DJI Ronin RS3 Pro & Gimbal Rigs" },
    { key: "Editing Suite", value: "DaVinci Resolve Studio & Premiere" },
    { key: "Delivery Turnaround", value: "7 - 10 Business Days" }
  ],
  singer: [
    { key: "Music Genres", value: "Bollywood Classics, Acoustic Pop, Sufi" },
    { key: "Performance Languages", value: "Hindi, English, Punjabi, Urdu" },
    { key: "Acoustic Setup", value: "Soundcraft Mixers, JBL Pro Speakers" },
    { key: "Own Band Option", value: "4-Piece Acoustic Band Available" },
    { key: "Standard Set Time", value: "2 x 45-Minute Sets with Break" }
  ]
};

const mockFaqs = [
  { q: "Do you travel outside your base city?", a: "Yes, I am available to travel national-wide and internationally for assignments. Travel and accommodation fees apply." },
  { q: "Is travel cost included in the listed packages?", a: "No, listed prices assume services rendered locally. Out-of-city travel, lodging, and local transit expenses are billed additionally." },
  { q: "How long does delivery take for the final deliverables?", a: "Deliverables are standardly completed within the timeline stated in your package details (usually 5 to 10 days). Expedited delivery can be added on request." },
  { q: "Can we extend hours on the event day?", a: "Absolutely. Extra hours can be added dynamically on the event day, subject to availability and billed at my standard hourly rate." }
];

const mockReviews = [
  { name: "Sneha Kapoor", rating: 5, date: "Oct 12, 2025", event: "Wedding Ceremony", text: "Incredible attention to detail! The absolute best choice we made for our wedding. So professional, supportive and talented!" },
  { name: "Rahul Deshmukh", rating: 5, date: "Sep 28, 2025", event: "Corporate Gala", text: "Top-tier execution and flawless service. Delivered high-quality outputs ahead of the deadline. Highly recommended!" },
  { name: "Kunal Sen", rating: 4, date: "Aug 15, 2025", event: "Intimate Birthday Party", text: "Wonderful session, very accommodating with guest requests. The vibes were perfect and sound clarity was outstanding." }
];

export default function ProfessionalProfile({ params }: PageProps) {
  const slug = use(params).slug;
  const bookings = useSelector((state: RootState) => state.booking);
  console.log("bookings", bookings)
  // Decode username and lookup professional
  const decodedSlug = decodeURIComponent(slug);
  const professional = professionals.find(
    (p) => p.username.toLowerCase() === decodedSlug.toLowerCase()
  );

  const [activeTab, setActiveTab] = useState<"all" | "images" | "videos" | "audio">("all");
  const [selectedPackage, setSelectedPackage] = useState<"basic" | "professional" | "premium" | "custom" | null>(null);

  // Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [isCheckoutPanelOpen, setIsCheckoutPanelOpen] = useState(false);
  const [isActiveOrderModalOpen, setIsActiveOrderModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [pendingCustomModal, setPendingCustomModal] = useState(false);

  const orders = useSelector((state: RootState) => state.orders?.orders || []);
  const auth = useSelector((state: RootState) => state.auth);
  const booking = useSelector((state: RootState) => state.booking);
  const event = useSelector((state: RootState) => state.event);
  const locationState = useSelector((state: RootState) => state.location);
  const wishlist = useSelector((state: RootState) => state.wishlist?.items || []);
  const packageState = useSelector((state: RootState) => state.package);
  const dispatch = useDispatch();

  const isWishlisted = professional ? wishlist.some(item => item.id === professional.id) : false;

  const handleWishlistToggle = () => {
    if (!professional) return;

    dispatch(toggleWishlist(professional));
    if (isWishlisted) {
      toast.success("Removed from wishlist");
    } else {
      toast.success("Added to wishlist");
    }
  };

  React.useEffect(() => {
    if (auth.isAuthenticated && pendingCustomModal) {
      if (auth.user?.role === "creator") {
        toast.error("You are not authorized for this feature. This is only for customers or clients.");
        dispatch(logout());
      } else {
        setIsCustomModalOpen(true);
      }
      setPendingCustomModal(false);
      setIsLoginModalOpen(false);
    }
  }, [auth.isAuthenticated, auth.user, pendingCustomModal, dispatch]);

  React.useEffect(() => {
    if (booking.isCustomSlot && booking.customStartTime && booking.customEndTime) {
      setSelectedPackage("custom");
    } else if (selectedPackage === "custom") {
      setSelectedPackage(null);
    }
  }, [booking.isCustomSlot, booking.customStartTime, booking.customEndTime]);

  const handleCustomRequest = () => {
    if (auth.isAuthenticated) {
      if (auth.user?.role === "creator") {
        toast.error("You are not authorized for this feature. This is only for customers or clients.");
      } else {
        setIsCustomModalOpen(true);
      }
    } else {
      setPendingCustomModal(true);
      setIsLoginModalOpen(true);
    }
  };

  // Calendar dates mock
  const selectedDate = booking?.selectedDate || null;
  const selectedSlot = booking?.selectedSlot || null;
  const bookedDates = ["2026-06-28", "2026-07-02", "2026-07-05", "2026-07-12"];
  const limitedDates = ["2026-06-29", "2026-07-08", "2026-07-15"];

  const { control, handleSubmit, setValue, formState: { errors } } = useForm<BookingFormValues>({
    defaultValues: {
      eventType: "",
      eventDate: "",
      eventTime: "",
      eventAddress: "",
      streetAddress: "",
      locality: "",
      pincode: "",
      guestsCount: "",
      budgetRange: "",
      notes: "",
      shootType: "",
      needAlbum: "",
      needDrone: "",
      venueType: "",
      otherRequirements: "",
      reelDuration: "",
      reelsCount: "",
      musicGenre: "",
      setupType: "",
      needDJ: "",
      performanceHours: ""
    }
  });

  if (!professional) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 px-4 bg-background">
        <h2 className="text-2xl font-extrabold text-foreground mb-3">Profile Not Found</h2>
        <p className="text-sm text-muted-foreground mb-6">The requested professional profile does not exist.</p>
        <Link href="/" className="text-xs sm:text-sm font-semibold text-white bg-primary hover:bg-primary/90 px-5 py-2 rounded-lg shadow-md cursor-pointer">
          Go Back Home
        </Link>
      </div>
    );
  }

  const {
    username,
    profileImage,
    location,
    rating,
    totalReviews,
    description,
    hourlyPricing,
    category
  } = professional;

  // Filter media based on tab
  const mediaList = mockPortfolioMedia[category] || [];
  const filteredMedia = mediaList.filter((item) => {
    if (activeTab === "all") return true;
    if (activeTab === "images") return item.type === "image";
    if (activeTab === "videos") return item.type === "video";
    if (activeTab === "audio") return item.type === "audio";
    return true;
  });

  const highlights = mockHighlights[category] || [];
  const similarProfessionals = professionals
    .filter((p) => p.category === category && p.id !== professional.id)
    .slice(0, 3);

  const parseTime = (timeStr: string) => {
    if (!timeStr) return 0;
    const [time, period] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (period.toUpperCase() === "PM" && hours !== 12) hours += 12;
    if (period.toUpperCase() === "AM" && hours === 12) hours = 0;
    return hours + minutes / 60;
  };

  const calculateCustomHours = (start?: string | null, end?: string | null) => {
    if (!start || !end) return 0;
    const startTime = parseTime(start);
    let endTime = parseTime(end);
    if (endTime < startTime) endTime += 24;
    return endTime - startTime;
  };

  const getPackagePrice = (pkg: "basic" | "professional" | "premium" | "custom" | null) => {
    if (!pkg) return 0;
    if (pkg === "basic") return hourlyPricing.oneHourPrice;
    if (pkg === "professional") return hourlyPricing.twoHourPrice;
    if (pkg === "premium") return hourlyPricing.threeHourPrice;
    if (pkg === "custom") {
      const hours = calculateCustomHours(booking.customStartTime, booking.customEndTime);
      return calculateFSPACustomPrice(hourlyPricing, hours).totalPrice;
    }
    return 0;
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Profile link copied to clipboard!");
  };

  const handleBookClick = () => {
    if (!selectedPackage) {
      toast.error("Please select a package before proceeding to payment.");
      return;
    }

    if (!booking.selectedDate || !booking.selectedSlot) {
      toast.error("Please select the date and time before proceeding to checkout.");
      return;
    }
    
    if (!locationState.address) {
      toast.error("Please select address before proceeding to checkout.");
      return;
    }

    if (!event.eventFunction) {
      toast.error("Please select an event before proceeding to checkout.");
      return;
    }

    const hasActiveOrder = orders.some(
      (order: any) =>
        order.professionalName.toLowerCase() === professional.username.toLowerCase() &&
        order.selectedPackage === selectedPackage &&
        order.status === "active"
    );

    if (hasActiveOrder) {
      setIsActiveOrderModalOpen(true);
      return;
    }

    setIsCheckoutPanelOpen(true);
  };



  const onSubmitBooking = () => {
    toast.success(`Booking request sent successfully to ${username}!`);
  };

  const selectCalendarDate = (dateStr: string) => {
    dispatch(setBookingDate(dateStr));
    setValue("eventDate", dateStr);
    toast.success(`Selected Date: ${dateStr}`);
  };

  const selectCalendarSlot = (slot: string) => {
    dispatch(setBookingSlot(slot));
    setValue("eventTime", slot);
    toast.success(`Selected Time: ${slot}`);
  };

  // Lightbox navigation helpers
  const handlePrevMedia = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex !== null) {
      const nextIdx = lightboxIndex === 0 ? filteredMedia.length - 1 : lightboxIndex - 1;
      setLightboxIndex(nextIdx);
    }
  };

  const handleNextMedia = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex !== null) {
      const nextIdx = lightboxIndex === filteredMedia.length - 1 ? 0 : lightboxIndex + 1;
      setLightboxIndex(nextIdx);
    }
  };

  return (
    <div className="flex-1 w-full bg-background min-h-screen pb-16 relative">
      {/* Dynamic light gradient bg */}
      <div className="absolute top-0 left-0 w-full h-[350px] bg-gradient-to-b from-[#F5ECE3]/40 to-transparent pointer-events-none -z-10" />

      {/* Main Section */}
      <div className="max-w-[1400px] mx-auto px-2 sm:px-6 lg:px-8 pt-6">

        {/* Breadcrumbs & Back */}
        <div className="flex items-center justify-between mb-6">
          <Link href={`/services/${category}`} className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer select-none">
            <ArrowLeft className="size-4" />
            <span>Back to Listings</span>
          </Link>
        </div>

        {/* Desktop Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Main Info Columns */}
          <div className="lg:col-span-8 space-y-8">
            <HeroSection
              professional={professional}
              wishlisted={isWishlisted}
              onWishlist={handleWishlistToggle}
              onShare={handleShare}
              onCustomRequest={handleCustomRequest}
            />
            <CalendarSection
              selectedDate={selectedDate}
              onSelectDate={selectCalendarDate}
              bookedDates={bookedDates}
              limitedDates={limitedDates}
              availableDates={professional.availableDates || []}
              selectedSlot={selectedSlot}
              onSelectSlot={selectCalendarSlot}
            />
            <PackagesSection
              hourlyPricing={hourlyPricing}
              selectedPackage={selectedPackage}
              setSelectedPackage={setSelectedPackage}
              booking={booking}
            />
            <PortfolioSection
              category={category}
              filteredMedia={filteredMedia}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onMediaClick={(idx) => setLightboxIndex(idx)}
            />

            <AboutSection
              category={category}
              description={description}
              location={location}
            />

            {/* <HighlightsSection
              category={category}
              highlights={highlights}
            /> */}



            <Modal
              isOpen={isCustomModalOpen}
              onClose={() => setIsCustomModalOpen(false)}
              maxWidth="max-w-2xl"
            >
              <CustomBookingForm
                professional={professional}
                control={control}
                handleSubmit={handleSubmit}
                onSubmit={(data: any) => {
                  onSubmitBooking();
                  setIsCustomModalOpen(false);
                }}
                errors={errors}
                setValue={setValue}
              />
            </Modal>

            <ReviewSection
              rating={rating}
              totalReviews={totalReviews}
              reviews={mockReviews}
            />

            <FAQSection faqs={mockFaqs} />

            <SimilarProfessionals
              category={category}
              similarList={similarProfessionals}
            />
          </div>

          {/* Desktop Sticky Sidebar Panel */}
          <div className="hidden lg:block lg:col-span-4 sticky top-24">
            <StickyBookingPanel
              professional={professional}
              selectedPackage={selectedPackage}
              getPackagePrice={getPackagePrice}
              onBookClick={handleBookClick}
              onCustomRequest={handleCustomRequest}
            />
          </div>

        </div>

      </div>

      {/* MOBILE STICKY BOTTOM BAR PANEL */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-border/80 bg-white/95 backdrop-blur-md px-4 py-3 shadow-lg lg:hidden flex items-center justify-between gap-4 select-none">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-end gap-1.5">
            <span className="text-lg font-black text-foreground leading-none">₹{getPackagePrice(selectedPackage)}</span>
            {selectedPackage && getPackagePrice(selectedPackage) > 0 && (
              <span className="text-xs font-semibold text-muted-foreground line-through leading-none mb-0.5">
                ₹{Math.round(getPackagePrice(selectedPackage) * 1.2)}
              </span>
            )}
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wide leading-relaxed mb-0.5">
              {selectedPackage}
            </span>
          </div>

          {booking?.selectedDate ? (
            <div className="flex items-center gap-1.5 text-[10px] font-semibold">
              <span className="text-muted-foreground">
                {new Date(booking.selectedDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </span>
              {booking?.isCustomSlot && booking.customStartTime && booking.customEndTime ? (
                <>
                  <span className="text-muted-foreground/40">•</span>
                  <span className="text-emerald-600 font-extrabold truncate max-w-[130px]">
                    {booking.customStartTime}-{booking.customEndTime}
                  </span>
                </>
              ) : booking?.selectedSlot ? (
                <>
                  <span className="text-muted-foreground/40">•</span>
                  <span className="text-primary font-bold truncate max-w-[130px]">
                    {booking.selectedSlot}
                  </span>
                </>
              ) : null}
            </div>
          ) : (
            <span className="text-[10px] font-medium text-muted-foreground">Select a date</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={handleBookClick}
            className="bg-primary hover:bg-primary/95 text-white font-extrabold text-xs py-2 px-4 h-9 rounded-lg cursor-pointer"
          >
            Checkout
          </Button>
          {/* <Button
            onClick={handleCustomRequest}
            variant="outline"
            className="border-border text-foreground hover:bg-muted text-[10px] font-bold py-2 px-3 h-9 rounded-lg cursor-pointer"
          >
            Custom
          </Button> */}
        </div>
      </div>

      {/* Lightbox Modal for Media */}
      {lightboxIndex !== null && (
        <LightboxModal
          mediaItem={filteredMedia[lightboxIndex]}
          onClose={() => setLightboxIndex(null)}
          onPrev={handlePrevMedia}
          onNext={handleNextMedia}
        />
      )}

      {/* Checkout Sidepanel */}
      <CheckoutSidepanel
        isOpen={isCheckoutPanelOpen}
        onClose={() => setIsCheckoutPanelOpen(false)}
        professional={professional}
        selectedPackage={selectedPackage}
        packagePrice={getPackagePrice(selectedPackage)}
      />

      {/* Active Order Exists Modal */}
      <Modal isOpen={isActiveOrderModalOpen} onClose={() => setIsActiveOrderModalOpen(false)} maxWidth="max-w-sm">
        <div className="p-6 text-center space-y-4">
          <div className="h-12 w-12 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-foreground">Active Order Exists</h3>
          <p className="text-sm text-muted-foreground">You already have an active order for this professional's {selectedPackage} package. Please complete it first before making another booking.</p>
          <div className="pt-4 flex gap-3 w-full">
            <Button className="flex-1 border-border font-bold text-xs" variant="outline" onClick={() => setIsActiveOrderModalOpen(false)}>Cancel</Button>
            <Button asChild className="flex-1 bg-primary text-white font-bold text-xs">
              <Link href="/orders">View Orders</Link>
            </Button>
          </div>
        </div>
      </Modal>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => {
          setIsLoginModalOpen(false);
          setPendingCustomModal(false);
        }}
      />
    </div>
  );
}
