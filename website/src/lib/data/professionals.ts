export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface AvailableDate {
  date: string;
  isSlotBooked: boolean;
  slots: TimeSlot[]; // inside AvailableDate
}

export interface HourlyPricing {
  oneHourPrice: number;
  twoHourPrice: number;
  threeHourPrice: number;
}

export interface Professional {
  role: 'creator';
  mobile: string;
  email: string;
  id: string;
  fullName: string;
  username: string;
  profileImage: string;
  location: string; // E.g., "Mumbai, MH", "New Delhi, DL", "Bangalore, KA"
  nationality?: string;
  city?: string;
  state?: string;
  dateOfBirth?: string;
  rating: number;
  totalReviews: number;
  experience: string; // E.g., "5+ Years Exp."
  experienceYears: number; // For filtering: years numeric
  description: string;
  hourlyPricing: HourlyPricing;
  isVerified: boolean;
  availability: 'Anytime' | 'Weekdays' | 'Weekends';
  category: 'photographer' | 'videographer' | 'singer' | 'Cinematic';
  feature: 'photo' | 'video' | 'photo+video' | 'singer';
  availableDates?: AvailableDate[];
  lat?: number;
  lng?: number;
  distance?: number; // Calculated dynamically from useFilteredProfessionals
  isSaved: boolean;
  isProfileDone: boolean;
  gender?: "male" | "female" | "other";
  orders?: any[];
  wallet?: any[];
}

export const professionals: Professional[] = [
  // PHOTOGRAPHERS
  {
    id: "p1",
    fullName: "Arjun Singh",
    username: "arjun_singh708",
    gender: "male",
    role: "creator",
    isProfileDone: false,
    mobile: "9823288167",
    email: "arjun.singh@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    location: "Mumbai, MH",
    nationality: "Indian",
    city: "Mumbai",
    state: "Maharashtra",
    dateOfBirth: "1994-06-15",
    lat: 19.0737,
    lng: 72.8374,
    rating: 4.9,
    totalReviews: 120,
    experience: "5+ Years Exp.",
    experienceYears: 5,
    description: "Specializing in cinematic wedding photography and high-fashion portraits, capturing life's most precious frames with style.",
    hourlyPricing: {
      oneHourPrice: 1500,
      twoHourPrice: 2800,
      threeHourPrice: 4000
    },
    isVerified: false,
    availability: "Anytime",
    category: "Cinematic",
    isSaved: false,
    feature: "photo+video",
    availableDates: [
      {
        date: "2026-07-17",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-18",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-19",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-20",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-21",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-22",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-23",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-24",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-25",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      }
    ]
  },
  {
    id: "p2",
    fullName: "Elena Rossi",
    username: "elena_rossi656",
    gender: "male",
    role: "creator",
    isProfileDone: false,
    mobile: "9843656487",
    email: "elena.rossi@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
    location: "New Delhi, DL",
    nationality: "Indian",
    city: "New Delhi",
    state: "Delhi (NCT)",
    dateOfBirth: "1997-03-22",
    lat: 28.6213,
    lng: 77.1662,
    rating: 4.8,
    totalReviews: 82,
    experience: "5+ Years Exp.",
    experienceYears: 6,
    description: "Candid street photography and emotive personal portraits capturing the soul of the subject in their natural element.",
    hourlyPricing: {
      oneHourPrice: 1200,
      twoHourPrice: 2200,
      threeHourPrice: 3200
    },
    isVerified: false,
    availability: "Weekends",
    category: "Cinematic",
    isSaved: false,
    feature: "photo+video",
    availableDates: [
      {
        date: "2026-07-17",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-18",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-19",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-20",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-21",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-22",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-23",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-24",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-25",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      }
    ]
  },
  {
    id: "p3",
    fullName: "Marcus Chen",
    username: "marcus_chen487",
    gender: "male",
    role: "creator",
    isProfileDone: false,
    mobile: "9862530225",
    email: "marcus.chen@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/men/46.jpg",
    location: "Bangalore, KA",
    nationality: "Indian",
    city: "Bengaluru",
    state: "Karnataka",
    dateOfBirth: "1993-11-10",
    lat: 12.9605,
    lng: 77.6050,
    rating: 5.0,
    totalReviews: 44,
    experience: "10+ Years Exp.",
    experienceYears: 10,
    description: "Award-winning architectural and commercial photographer with a focus on geometric precision, lighting, and visual depth.",
    hourlyPricing: {
      oneHourPrice: 2500,
      twoHourPrice: 4500,
      threeHourPrice: 6000
    },
    isVerified: false,
    availability: "Weekdays",
    category: "photographer",
    isSaved: false,
    feature: "photo",
    availableDates: [
      {
        date: "2026-07-17",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-18",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-19",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-20",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-21",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-22",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-23",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-24",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-25",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      }
    ]
  },
  {
    id: "p4",
    fullName: "Priya Sharma",
    username: "priya_sharma924",
    gender: "female",
    role: "creator",
    isProfileDone: false,
    mobile: "9889687036",
    email: "priya.sharma@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/women/65.jpg",
    location: "Mumbai, MH",
    nationality: "Indian",
    city: "Mumbai",
    state: "Maharashtra",
    dateOfBirth: "1998-09-04",
    lat: 19.0395,
    lng: 72.8315,
    rating: 4.6,
    totalReviews: 95,
    experience: "3+ Years Exp.",
    experienceYears: 3,
    description: "Event and maternity photographer who creates bright, warm, and joyful photographic keepsakes for families.",
    hourlyPricing: {
      oneHourPrice: 1800,
      twoHourPrice: 3200,
      threeHourPrice: 4500
    },
    isVerified: false,
    availability: "Weekends",
    category: "photographer",
    isSaved: false,
    feature: "photo",
    availableDates: [
      {
        date: "2026-07-17",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-18",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-19",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-20",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-21",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-22",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-23",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-24",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-25",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      }
    ]
  },
  {
    id: "p5",
    fullName: "David K.",
    username: "david_k_422",
    gender: "male",
    role: "creator",
    isProfileDone: false,
    mobile: "9822488100",
    email: "david.k.@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/men/22.jpg",
    location: "Kolkata, WB",
    nationality: "Indian",
    city: "Kolkata",
    state: "West Bengal",
    dateOfBirth: "1991-01-28",
    lat: 22.5688,
    lng: 88.4097,
    rating: 4.3,
    totalReviews: 31,
    experience: "2 Years Exp.",
    experienceYears: 2,
    description: "Young and passionate landscape photographer exploring local heritage sites and food cultures through a creative lens.",
    hourlyPricing: {
      oneHourPrice: 1000,
      twoHourPrice: 1800,
      threeHourPrice: 2500
    },
    isVerified: false,
    availability: "Anytime",
    category: "photographer",
    isSaved: false,
    feature: "photo",
    availableDates: [
      {
        date: "2026-07-17",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-18",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-19",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-20",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-21",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-22",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-23",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-24",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-25",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      }
    ]
  },

  // VIDEOGRAPHERS
  {
    id: "v1",
    fullName: "Kabir Mehta",
    username: "kabir_mehta606",
    gender: "male",
    role: "creator",
    isProfileDone: false,
    mobile: "9892592008",
    email: "kabir.mehta@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/men/11.jpg",
    location: "Mumbai, MH",
    nationality: "Indian",
    city: "Mumbai",
    state: "Maharashtra",
    dateOfBirth: "1992-07-19",
    lat: 19.0362,
    lng: 72.8980,
    rating: 4.9,
    totalReviews: 68,
    experience: "6+ Years Exp.",
    experienceYears: 6,
    description: "Cinematographer creating premium cinematic wedding teasers, brand films, and documentary style music videos.",
    hourlyPricing: {
      oneHourPrice: 3000,
      twoHourPrice: 5500,
      threeHourPrice: 8000
    },
    isVerified: false,
    availability: "Anytime",
    category: "Cinematic",
    isSaved: false,
    feature: "photo+video",
    availableDates: [
      {
        date: "2026-07-17",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-18",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-19",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-20",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-21",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-22",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-23",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-24",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-25",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      }
    ]
  },
  {
    id: "v2",
    fullName: "Sophia Lin",
    username: "sophia_lin440",
    gender: "male",
    role: "creator",
    isProfileDone: false,
    mobile: "9810443656",
    email: "sophia.lin@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/women/24.jpg",
    location: "Bangalore, KA",
    nationality: "Indian",
    city: "Bengaluru",
    state: "Karnataka",
    dateOfBirth: "1996-05-14",
    lat: 12.9698,
    lng: 77.6207,
    rating: 4.7,
    totalReviews: 50,
    experience: "4+ Years Exp.",
    experienceYears: 4,
    description: "Specializes in high-energy event highlights, product videography, and social media reels that boost audience engagement.",
    hourlyPricing: {
      oneHourPrice: 2000,
      twoHourPrice: 3800,
      threeHourPrice: 5000
    },
    isVerified: false,
    availability: "Weekends",
    category: "videographer",
    isSaved: false,
    feature: "video",
    availableDates: [
      {
        date: "2026-07-17",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-18",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-19",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-20",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-21",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-22",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-23",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-24",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-25",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      }
    ]
  },
  {
    id: "v3",
    fullName: "David Miller",
    username: "david_miller637",
    gender: "male",
    role: "creator",
    isProfileDone: false,
    mobile: "9894048725",
    email: "david.miller@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/men/73.jpg",
    location: "New Delhi, DL",
    nationality: "Indian",
    city: "New Delhi",
    state: "Delhi (NCT)",
    dateOfBirth: "1995-12-03",
    lat: 28.5822,
    lng: 77.2487,
    rating: 4.5,
    totalReviews: 29,
    experience: "5+ Years Exp.",
    experienceYears: 5,
    description: "Corporate event videography, interviews, and drone footage, providing crisp 4K visual storytelling for companies.",
    hourlyPricing: {
      oneHourPrice: 2800,
      twoHourPrice: 5000,
      threeHourPrice: 7000
    },
    isVerified: false,
    availability: "Weekdays",
    category: "videographer",
    isSaved: false,
    feature: "video",
    availableDates: [
      {
        date: "2026-07-17",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-18",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-19",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-20",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-21",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-22",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-23",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-24",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-25",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      }
    ]
  },
  {
    id: "v4",
    fullName: "Ananya Patel",
    username: "ananya_patel349",
    gender: "female",
    role: "creator",
    isProfileDone: false,
    mobile: "9875952004",
    email: "ananya.patel@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/women/39.jpg",
    location: "Hyderabad, TS",
    nationality: "Indian",
    city: "Hyderabad",
    state: "Telangana",
    dateOfBirth: "1990-10-25",
    lat: 17.3922,
    lng: 78.4665,
    rating: 4.8,
    totalReviews: 37,
    experience: "8+ Years Exp.",
    experienceYears: 8,
    description: "Professional filmmaker focusing on short indie films, storytelling, and high-fidelity aerial/drone videography.",
    hourlyPricing: {
      oneHourPrice: 3500,
      twoHourPrice: 6500,
      threeHourPrice: 9000
    },
    isVerified: false,
    availability: "Anytime",
    category: "videographer",
    isSaved: false,
    feature: "video",
    availableDates: [
      {
        date: "2026-07-17",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-18",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-19",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-20",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-21",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-22",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-23",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-24",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-25",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      }
    ]
  },
  {
    id: "v5",
    fullName: "Alex Mercer",
    username: "alex_mercer574",
    gender: "male",
    role: "creator",
    isProfileDone: false,
    mobile: "9860520993",
    email: "alex.mercer@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/men/50.jpg",
    location: "Pune, MH",
    nationality: "Indian",
    city: "Pune",
    state: "Maharashtra",
    dateOfBirth: "1999-04-08",
    lat: 18.5648,
    lng: 73.8519,
    rating: 4.2,
    totalReviews: 14,
    experience: "1 Year Exp.",
    experienceYears: 1,
    description: "Budding music video director and visual effects editor passionate about dynamic transitions and urban aesthetics.",
    hourlyPricing: {
      oneHourPrice: 1500,
      twoHourPrice: 2800,
      threeHourPrice: 4000
    },
    isVerified: false,
    availability: "Weekends",
    category: "videographer",
    isSaved: false,
    feature: "video",
    availableDates: [
      {
        date: "2026-07-17",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-18",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-19",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-20",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-21",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-22",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-23",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-24",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-25",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      }
    ]
  },

  // SINGERS
  {
    id: "s1",
    fullName: "Rohan Sharma",
    username: "rohan_sharma660",
    gender: "male",
    role: "creator",
    isProfileDone: false,
    mobile: "9831610118",
    email: "rohan.sharma@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/men/82.jpg",
    location: "New Delhi, DL",
    nationality: "Indian",
    city: "New Delhi",
    state: "Delhi (NCT)",
    dateOfBirth: "1993-02-17",
    lat: 28.6281,
    lng: 77.2215,
    rating: 4.9,
    totalReviews: 145,
    experience: "8+ Years Exp.",
    experienceYears: 8,
    description: "Versatile vocalist specializing in Bollywood classics, unplugged melodies, and acoustic live setups for grand events.",
    hourlyPricing: {
      oneHourPrice: 4000,
      twoHourPrice: 7500,
      threeHourPrice: 10000
    },
    isVerified: false,
    availability: "Weekends",
    category: "singer",
    isSaved: false,
    feature: "singer",
    availableDates: [
      {
        date: "2026-07-17",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-18",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-19",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-20",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-21",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-22",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-23",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-24",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-25",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      }
    ]
  },
  {
    id: "s2",
    fullName: "Aisha Khan",
    username: "aisha_khan681",
    gender: "male",
    role: "creator",
    isProfileDone: false,
    mobile: "9846239710",
    email: "aisha.khan@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/women/14.jpg",
    location: "Mumbai, MH",
    nationality: "Indian",
    city: "Mumbai",
    state: "Maharashtra",
    dateOfBirth: "1996-08-30",
    lat: 19.0956,
    lng: 72.9276,
    rating: 4.8,
    totalReviews: 112,
    experience: "6+ Years Exp.",
    experienceYears: 6,
    description: "Classical-fusion and Sufi singer with a powerful, soulful voice. Performs with a full band or intimate semi-acoustic setups.",
    hourlyPricing: {
      oneHourPrice: 3500,
      twoHourPrice: 6500,
      threeHourPrice: 9000
    },
    isVerified: false,
    availability: "Anytime",
    category: "singer",
    isSaved: false,
    feature: "singer",
    availableDates: [
      {
        date: "2026-07-17",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-18",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-19",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-20",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-21",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-22",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-23",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-24",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-25",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      }
    ]
  },
  {
    id: "s3",
    fullName: "Chloe Bennett",
    username: "chloe_bennett823",
    gender: "male",
    role: "creator",
    isProfileDone: false,
    mobile: "9884383101",
    email: "chloe.bennett@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/women/68.jpg",
    location: "Bangalore, KA",
    nationality: "Indian",
    city: "Bengaluru",
    state: "Karnataka",
    dateOfBirth: "1994-09-12",
    lat: 12.9416,
    lng: 77.5708,
    rating: 4.7,
    totalReviews: 53,
    experience: "5+ Years Exp.",
    experienceYears: 5,
    description: "Jazz, soul, and pop cover artist. Perfect for corporate cocktail hours, gallery launches, and intimate lounge vibes.",
    hourlyPricing: {
      oneHourPrice: 2500,
      twoHourPrice: 4500,
      threeHourPrice: 6000
    },
    isVerified: false,
    availability: "Weekdays",
    category: "singer",
    isSaved: false,
    feature: "singer",
    availableDates: [
      {
        date: "2026-07-17",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-18",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-19",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-20",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-21",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-22",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-23",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-24",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-25",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      }
    ]
  },
  {
    id: "s4",
    fullName: "Vikram Malhotra",
    username: "vikram_malhotra423",
    gender: "male",
    role: "creator",
    isProfileDone: false,
    mobile: "9882328743",
    email: "vikram.malhotra@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/men/91.jpg",
    location: "Chennai, TN",
    nationality: "Indian",
    city: "Chennai",
    state: "Tamil Nadu",
    dateOfBirth: "1997-11-23",
    lat: 13.0467,
    lng: 80.2680,
    rating: 4.6,
    totalReviews: 28,
    experience: "4+ Years Exp.",
    experienceYears: 4,
    description: "Indie-pop singer-songwriter playing original songs and global hits. Accompanies himself on acoustic guitar and loop pedal.",
    hourlyPricing: {
      oneHourPrice: 2000,
      twoHourPrice: 3600,
      threeHourPrice: 5000
    },
    isVerified: false,
    availability: "Anytime",
    category: "singer",
    isSaved: false,
    feature: "singer",
    availableDates: [
      {
        date: "2026-07-17",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-18",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-19",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-20",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-21",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-22",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-23",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-24",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-25",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      }
    ]
  },
  {
    id: "s5",
    fullName: "Sarah Jenkins",
    username: "sarah_jenkins593",
    gender: "male",
    role: "creator",
    isProfileDone: false,
    mobile: "9860815292",
    email: "sarah.jenkins@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/women/79.jpg",
    location: "Mumbai, MH",
    nationality: "Indian",
    city: "Mumbai",
    state: "Maharashtra",
    dateOfBirth: "1992-03-05",
    lat: 19.0859,
    lng: 72.8400,
    rating: 4.4,
    totalReviews: 19,
    experience: "3 Years Exp.",
    experienceYears: 3,
    description: "Soprano opera singer and classical theatre performer bringing theatrical grandeur to high-end receptions and galas.",
    hourlyPricing: {
      oneHourPrice: 3000,
      twoHourPrice: 5500,
      threeHourPrice: 7500
    },
    isVerified: false,
    availability: "Weekends",
    category: "singer",
    isSaved: false,
    feature: "singer",
    availableDates: [
      {
        date: "2026-07-17",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-18",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-19",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-20",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-21",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-22",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-23",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-24",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-25",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      }
    ]
  },
  // LUCKNOW PROFESSIONALS
  {
    id: "l1",
    fullName: "Ravi Prakash",
    username: "ravi_prakash740",
    gender: "male",
    role: "creator",
    isProfileDone: false,
    mobile: "9820053694",
    email: "ravi.prakash@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/men/15.jpg",
    location: "Gomti Nagar, Lucknow, UP",
    nationality: "Indian",
    city: "Lucknow",
    state: "Uttar Pradesh",
    dateOfBirth: "1995-05-18",
    lat: 26.8528,
    lng: 81.0029,
    rating: 4.7,
    totalReviews: 89,
    experience: "5+ Years Exp.",
    experienceYears: 5,
    description: "Expert in candid wedding photography and pre-wedding shoots across scenic locations in Lucknow.",
    hourlyPricing: { oneHourPrice: 1500, twoHourPrice: 2800, threeHourPrice: 4000 },
    isVerified: false,
    availability: "Anytime",
    category: "photographer",
    isSaved: false,
    feature: "photo",
    availableDates: [
      {
        date: "2026-07-17",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-18",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-19",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-20",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-21",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-22",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-23",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-24",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-25",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      }
    ]
  },
  {
    id: "l2",
    fullName: "Snehil Verma",
    username: "snehil_verma813",
    gender: "male",
    role: "creator",
    isProfileDone: false,
    mobile: "9837037104",
    email: "snehil.verma@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/women/25.jpg",
    location: "Indira Nagar, Lucknow, UP",
    nationality: "Indian",
    city: "Lucknow",
    state: "Uttar Pradesh",
    dateOfBirth: "1998-01-22",
    lat: 26.8837,
    lng: 80.9859,
    rating: 4.5,
    totalReviews: 45,
    experience: "3+ Years Exp.",
    experienceYears: 3,
    description: "Creative videographer specializing in reel-style highlights for birthdays and engagements.",
    hourlyPricing: { oneHourPrice: 2000, twoHourPrice: 3800, threeHourPrice: 5000 },
    isVerified: false,
    availability: "Weekends",
    category: "videographer",
    isSaved: false,
    feature: "video",
    availableDates: [
      {
        date: "2026-07-17",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-18",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-19",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-20",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-21",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-22",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-23",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-24",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-25",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      }
    ]
  },
  {
    id: "l3",
    fullName: "Amitabh Tiwari",
    username: "amitabh_tiwari752",
    gender: "male",
    role: "creator",
    isProfileDone: false,
    mobile: "9899400898",
    email: "amitabh.tiwari@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/men/35.jpg",
    location: "Hazratganj, Lucknow, UP",
    nationality: "Indian",
    city: "Lucknow",
    state: "Uttar Pradesh",
    dateOfBirth: "1993-09-09",
    lat: 26.8485,
    lng: 80.9419,
    rating: 4.9,
    totalReviews: 120,
    experience: "10+ Years Exp.",
    experienceYears: 10,
    description: "Renowned classical singer performing at prestigious cultural events and private baithaks.",
    hourlyPricing: { oneHourPrice: 4000, twoHourPrice: 7500, threeHourPrice: 10000 },
    isVerified: false,
    availability: "Anytime",
    category: "singer",
    isSaved: false,
    feature: "singer",
    availableDates: [
      {
        date: "2026-07-17",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-18",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-19",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-20",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-21",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-22",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-23",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-24",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-25",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      }
    ]
  },
  {
    id: "l4",
    fullName: "Pooja Yadav",
    username: "pooja_yadav220",
    gender: "male",
    role: "creator",
    isProfileDone: false,
    mobile: "9826100019",
    email: "pooja.yadav@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/women/45.jpg",
    location: "Alambagh, Lucknow, UP",
    nationality: "Indian",
    city: "Lucknow",
    state: "Uttar Pradesh",
    dateOfBirth: "1996-12-04",
    lat: 26.8142,
    lng: 80.9016,
    rating: 4.8,
    totalReviews: 60,
    experience: "6+ Years Exp.",
    experienceYears: 6,
    description: "Cinematographer creating emotional wedding films and corporate documentaries.",
    hourlyPricing: { oneHourPrice: 3000, twoHourPrice: 5500, threeHourPrice: 8000 },
    isVerified: false,
    availability: "Weekdays",
    category: "videographer",
    isSaved: false,
    feature: "video",
    availableDates: [
      {
        date: "2026-07-17",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-18",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-19",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-20",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-21",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-22",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-23",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-24",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-25",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      }
    ]
  },
  {
    id: "l5",
    fullName: "Nikhil Srivastava",
    username: "nikhil_srivastava216",
    gender: "male",
    role: "creator",
    isProfileDone: false,
    mobile: "9862700174",
    email: "nikhil.srivastava@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/men/55.jpg",
    location: "Ashiyana, Lucknow, UP",
    nationality: "Indian",
    city: "Lucknow",
    state: "Uttar Pradesh",
    dateOfBirth: "1997-07-31",
    lat: 26.7821,
    lng: 80.9161,
    rating: 4.6,
    totalReviews: 32,
    experience: "4+ Years Exp.",
    experienceYears: 4,
    description: "Specialist in outdoor portrait and fashion photography, utilizing natural light.",
    hourlyPricing: { oneHourPrice: 1200, twoHourPrice: 2200, threeHourPrice: 3200 },
    isVerified: false,
    availability: "Weekends",
    category: "photographer",
    isSaved: false,
    feature: "photo",
    availableDates: [
      {
        date: "2026-07-17",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-18",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-19",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-20",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-21",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-22",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-23",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-24",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-25",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      }
    ]
  },
  {
    id: "l6",
    fullName: "Sneha Kapoor",
    username: "sneha_kapoor640",
    gender: "female",
    role: "creator",
    isProfileDone: false,
    mobile: "9812122182",
    email: "sneha.kapoor@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/women/55.jpg",
    location: "Mahanagar, Lucknow, UP",
    nationality: "Indian",
    city: "Lucknow",
    state: "Uttar Pradesh",
    dateOfBirth: "1994-04-19",
    lat: 26.8776,
    lng: 80.9443,
    rating: 4.3,
    totalReviews: 15,
    experience: "2+ Years Exp.",
    experienceYears: 2,
    description: "Versatile singer for cocktail parties and corporate dinners, mixing Bollywood and Western pop.",
    hourlyPricing: { oneHourPrice: 2500, twoHourPrice: 4500, threeHourPrice: 6000 },
    isVerified: false,
    availability: "Anytime",
    category: "singer",
    isSaved: false,
    feature: "singer",
    availableDates: [
      {
        date: "2026-07-17",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-18",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-19",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-20",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-21",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-22",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-23",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-24",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-25",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      }
    ]
  },
  {
    id: "l7",
    fullName: "Aditya Mishra",
    username: "aditya_mishra295",
    gender: "male",
    role: "creator",
    isProfileDone: false,
    mobile: "9859138327",
    email: "aditya.mishra@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/men/65.jpg",
    location: "Aminabad, Lucknow, UP",
    nationality: "Indian",
    city: "Lucknow",
    state: "Uttar Pradesh",
    dateOfBirth: "1992-11-28",
    lat: 26.8437,
    lng: 80.9250,
    rating: 4.7,
    totalReviews: 78,
    experience: "7+ Years Exp.",
    experienceYears: 7,
    description: "Street-style photographer bringing raw emotions into event highlights and cultural shoots.",
    hourlyPricing: { oneHourPrice: 1800, twoHourPrice: 3200, threeHourPrice: 4500 },
    isVerified: false,
    availability: "Anytime",
    category: "photographer",
    isSaved: false,
    feature: "photo",
    availableDates: [
      {
        date: "2026-07-17",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-18",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-19",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-20",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-21",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-22",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-23",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-24",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-25",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      }
    ]
  },
  {
    id: "l8",
    fullName: "Riya Sharma",
    username: "riya_sharma718",
    gender: "female",
    role: "creator",
    isProfileDone: false,
    mobile: "9828606556",
    email: "riya.sharma@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/women/75.jpg",
    location: "Chowk, Lucknow, UP",
    nationality: "Indian",
    city: "Lucknow",
    state: "Uttar Pradesh",
    dateOfBirth: "1999-06-11",
    lat: 26.8665,
    lng: 80.9068,
    rating: 4.4,
    totalReviews: 24,
    experience: "3+ Years Exp.",
    experienceYears: 3,
    description: "Provides beautifully curated drone videography for destination weddings in Lucknow.",
    hourlyPricing: { oneHourPrice: 2500, twoHourPrice: 4800, threeHourPrice: 6500 },
    isVerified: false,
    availability: "Weekends",
    category: "videographer",
    isSaved: false,
    feature: "video",
    availableDates: [
      {
        date: "2026-07-17",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-18",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-19",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-20",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-21",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-22",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-23",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-24",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-25",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      }
    ]
  },
  {
    id: "l9",
    fullName: "Aditya Srivastava",
    username: "aditya_srivastava257",
    gender: "male",
    role: "creator",
    isProfileDone: false,
    mobile: "9729289604",
    email: "aditya.srivastava@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/men/75.jpg",
    location: "Vikas Nagar, Lucknow, UP",
    nationality: "Indian",
    city: "Lucknow",
    state: "Uttar Pradesh",
    dateOfBirth: "1995-10-02",
    lat: 26.8925,
    lng: 80.9575,
    rating: 4.8,
    totalReviews: 104,
    experience: "8+ Years Exp.",
    experienceYears: 8,
    description: "Professional photographer with a passion for capturing moments.",
    hourlyPricing: { oneHourPrice: 3000, twoHourPrice: 5500, threeHourPrice: 7500 },
    isVerified: false,
    availability: "Anytime",
    category: "photographer",
    isSaved: false,
    feature: "singer",
    availableDates: [
      {
        date: "2026-07-17",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-18",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-19",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-20",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-21",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-22",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-23",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-24",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-25",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      }
    ]
  },
  {
    id: "l10",
    fullName: "Shreya Gupta",
    username: "shreya_gupta668",
    gender: "male",
    role: "creator",
    isProfileDone: false,
    mobile: "9843222910",
    email: "shreya.gupta@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/women/85.jpg",
    location: "Omaxe City, Lucknow, UP",
    nationality: "Indian",
    city: "Lucknow",
    state: "Uttar Pradesh",
    dateOfBirth: "1997-02-14",
    lat: 26.7584,
    lng: 80.9327,
    rating: 4.5,
    totalReviews: 38,
    experience: "4+ Years Exp.",
    experienceYears: 4,
    description: "Maternity and newborn photographer offering a comforting and premium photoshoot experience.",
    hourlyPricing: { oneHourPrice: 1600, twoHourPrice: 3000, threeHourPrice: 4200 },
    isVerified: false,
    availability: "Weekdays",
    category: "photographer",
    isSaved: false,
    feature: "photo",
    availableDates: [
      {
        date: "2026-07-17",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-18",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-19",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-20",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-21",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-22",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-23",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-24",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-25",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      }
    ]
  },
  {
    id: "techaditya",
    fullName: "Tech Aditya",
    username: "tech_aditya101",
    gender: "male",
    role: "creator",
    isProfileDone: false,
    mobile: "9335265907",
    email: "techaditya.sde@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/men/99.jpg",
    location: "New Delhi, DL",
    nationality: "Indian",
    city: "New Delhi",
    state: "Delhi (NCT)",
    dateOfBirth: "1998-03-25",
    lat: 28.6139,
    lng: 77.2090,
    rating: 5.0,
    totalReviews: 42,
    experience: "3+ Years Exp.",
    experienceYears: 3,
    description: "Expert software engineer and tech creator, bringing innovative digital experiences to life.",
    hourlyPricing: {
      oneHourPrice: 1000,
      twoHourPrice: 1800,
      threeHourPrice: 2500
    },
    isVerified: true,
    availability: "Anytime",
    category: "videographer",
    feature: "video",
    isSaved: false,
    availableDates: [
      {
        date: "2026-07-17",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-18",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-19",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-20",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-21",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-22",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-23",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-24",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      },
      {
        date: "2026-07-25",
        isSlotBooked: false,
        slots: [
          { id: "slot-1", startTime: "10:00 AM", endTime: "01:00 PM", isBooked: false },
          { id: "slot-2", startTime: "02:00 PM", endTime: "05:00 PM", isBooked: false },
          { id: "slot-3", startTime: "06:00 PM", endTime: "09:00 PM", isBooked: false }
        ]
      }
    ]
  }
];
