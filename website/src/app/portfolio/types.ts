import { Control, FieldErrors, UseFormSetValue } from "react-hook-form";
import { Professional } from "@/lib/data/professionals";

export interface PortfolioItem {
  id: string;
  type: string;
  url: string;
  title: string;
  duration?: string;
}

export interface BookingFormValues {
  eventType: string;
  eventDate: string;
  eventTime: string;
  eventAddress: string;
  streetAddress: string;
  locality: string;
  pincode: string;
  guestsCount: string;
  budgetRange: string;
  notes: string;
  // Dynamic fields
  shootType?: string;
  needAlbum?: string;
  needDrone?: string;
  venueType?: string;
  otherRequirements?: string;
  reelDuration?: string;
  reelsCount?: string;
  musicGenre?: string;
  setupType?: string;
  needDJ?: string;
  performanceHours?: string;
}

export interface HeroSectionProps {
  professional: Professional;
  wishlisted: boolean;
  onWishlist: () => void;
  onShare: () => void;
  onCustomRequest?: () => void;
}

export interface PortfolioSectionProps {
  category: string;
  filteredMedia: PortfolioItem[];
  activeTab: "all" | "images" | "videos" | "audio";
  setActiveTab: (tab: "all" | "images" | "videos" | "audio") => void;
  onMediaClick: (index: number) => void;
}

export interface AboutSectionProps {
  category: string;
  description: string;
  location: string;
}

export interface HighlightsSectionProps {
  category: string;
  highlights: { key: string; value: string }[];
}

export interface PackagesSectionProps {
  hourlyPricing: { oneHourPrice: number; twoHourPrice: number; threeHourPrice: number };
  selectedPackage: "basic" | "professional" | "premium";
  setSelectedPackage: (pkg: "basic" | "professional" | "premium") => void;
}

export interface CalendarSectionProps {
  selectedDate: string | null;
  onSelectDate: (dateStr: string) => void;
  bookedDates: string[];
  limitedDates: string[];
}

export interface CustomBookingFormProps {
  professional: Professional;
  control: Control<BookingFormValues>;
  handleSubmit: any;
  onSubmit: (data: BookingFormValues) => void;
  errors: FieldErrors<BookingFormValues>;
  setValue: UseFormSetValue<BookingFormValues>;
}

export interface ReviewSectionProps {
  rating: number;
  totalReviews: number;
  reviews: { name: string; rating: number; date: string; event: string; text: string }[];
}

export interface FAQSectionProps {
  faqs: { q: string; a: string }[];
}

export interface SimilarProfessionalsProps {
  category: string;
  similarList: Professional[];
}

export interface StickyBookingPanelProps {
  professional: Professional;
  selectedPackage: "basic" | "professional" | "premium";
  getPackagePrice: (pkg: "basic" | "professional" | "premium") => number;
  onBookClick: () => void;
  onCustomRequest?: () => void;
}

export interface LightboxModalProps {
  mediaItem: PortfolioItem;
  onClose: () => void;
  onPrev: (e?: React.MouseEvent) => void;
  onNext: (e?: React.MouseEvent) => void;
}
