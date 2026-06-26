export interface HourlyPricing {
  oneHourPrice: number;
  twoHourPrice: number;
  threeHourPrice: number;
}

export interface Professional {
  id: string;
  username: string;
  profileImage: string;
  location: string; // E.g., "Mumbai, MH", "New Delhi, DL", "Bangalore, KA"
  rating: number;
  totalReviews: number;
  experience: string; // E.g., "5+ Years Exp."
  experienceYears: number; // For filtering: years numeric
  description: string;
  hourlyPricing: HourlyPricing;
  isVerified: boolean;
  availability: 'Anytime' | 'Weekdays' | 'Weekends';
  category: 'photographer' | 'videographer' | 'singer';
}

export const professionals: Professional[] = [
  // PHOTOGRAPHERS
  {
    id: "p1",
    username: "Arjun Singh",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
    location: "Mumbai, MH",
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
    isVerified: true,
    availability: "Anytime",
    category: "photographer"
  },
  {
    id: "p2",
    username: "Elena Rossi",
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=80",
    location: "New Delhi, DL",
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
    isVerified: true,
    availability: "Weekends",
    category: "photographer"
  },
  {
    id: "p3",
    username: "Marcus Chen",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80",
    location: "Bangalore, KA",
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
    isVerified: true,
    availability: "Weekdays",
    category: "photographer"
  },
  {
    id: "p4",
    username: "Priya Sharma",
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
    location: "Mumbai, MH",
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
    category: "photographer"
  },
  {
    id: "p5",
    username: "David K.",
    profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80",
    location: "Kolkata, WB",
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
    category: "photographer"
  },

  // VIDEOGRAPHERS
  {
    id: "v1",
    username: "Kabir Mehta",
    profileImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=80",
    location: "Mumbai, MH",
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
    isVerified: true,
    availability: "Anytime",
    category: "videographer"
  },
  {
    id: "v2",
    username: "Sophia Lin",
    profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80",
    location: "Bangalore, KA",
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
    isVerified: true,
    availability: "Weekends",
    category: "videographer"
  },
  {
    id: "v3",
    username: "David Miller",
    profileImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=80",
    location: "New Delhi, DL",
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
    category: "videographer"
  },
  {
    id: "v4",
    username: "Ananya Patel",
    profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80",
    location: "Hyderabad, TS",
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
    isVerified: true,
    availability: "Anytime",
    category: "videographer"
  },
  {
    id: "v5",
    username: "Alex Mercer",
    profileImage: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=80",
    location: "Pune, MH",
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
    category: "videographer"
  },

  // SINGERS
  {
    id: "s1",
    username: "Rohan Sharma",
    profileImage: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=500&auto=format&fit=crop&q=80",
    location: "New Delhi, DL",
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
    isVerified: true,
    availability: "Weekends",
    category: "singer"
  },
  {
    id: "s2",
    username: "Aisha Khan",
    profileImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80",
    location: "Mumbai, MH",
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
    isVerified: true,
    availability: "Anytime",
    category: "singer"
  },
  {
    id: "s3",
    username: "Chloe Bennett",
    profileImage: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&auto=format&fit=crop&q=80",
    location: "Bangalore, KA",
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
    category: "singer"
  },
  {
    id: "s4",
    username: "Vikram Malhotra",
    profileImage: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=500&auto=format&fit=crop&q=80",
    location: "Chennai, TN",
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
    isVerified: true,
    availability: "Anytime",
    category: "singer"
  },
  {
    id: "s5",
    username: "Sarah Jenkins",
    profileImage: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=500&auto=format&fit=crop&q=80",
    location: "Mumbai, MH",
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
    category: "singer"
  }
];
