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
  lat?: number;
  lng?: number;
}

export const professionals: Professional[] = [
  // PHOTOGRAPHERS
  {
    id: "p1",
    username: "Arjun Singh",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    location: "Mumbai, MH",
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
    isVerified: true,
    availability: "Anytime",
    category: "photographer"
  },
  {
    id: "p2",
    username: "Elena Rossi",
    profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
    location: "New Delhi, DL",
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
    isVerified: true,
    availability: "Weekends",
    category: "photographer"
  },
  {
    id: "p3",
    username: "Marcus Chen",
    profileImage: "https://randomuser.me/api/portraits/men/46.jpg",
    location: "Bangalore, KA",
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
    isVerified: true,
    availability: "Weekdays",
    category: "photographer"
  },
  {
    id: "p4",
    username: "Priya Sharma",
    profileImage: "https://randomuser.me/api/portraits/women/65.jpg",
    location: "Mumbai, MH",
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
    category: "photographer"
  },
  {
    id: "p5",
    username: "David K.",
    profileImage: "https://randomuser.me/api/portraits/men/22.jpg",
    location: "Kolkata, WB",
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
    category: "photographer"
  },

  // VIDEOGRAPHERS
  {
    id: "v1",
    username: "Kabir Mehta",
    profileImage: "https://randomuser.me/api/portraits/men/11.jpg",
    location: "Mumbai, MH",
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
    isVerified: true,
    availability: "Anytime",
    category: "videographer"
  },
  {
    id: "v2",
    username: "Sophia Lin",
    profileImage: "https://randomuser.me/api/portraits/women/24.jpg",
    location: "Bangalore, KA",
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
    isVerified: true,
    availability: "Weekends",
    category: "videographer"
  },
  {
    id: "v3",
    username: "David Miller",
    profileImage: "https://randomuser.me/api/portraits/men/73.jpg",
    location: "New Delhi, DL",
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
    category: "videographer"
  },
  {
    id: "v4",
    username: "Ananya Patel",
    profileImage: "https://randomuser.me/api/portraits/women/39.jpg",
    location: "Hyderabad, TS",
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
    isVerified: true,
    availability: "Anytime",
    category: "videographer"
  },
  {
    id: "v5",
    username: "Alex Mercer",
    profileImage: "https://randomuser.me/api/portraits/men/50.jpg",
    location: "Pune, MH",
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
    category: "videographer"
  },

  // SINGERS
  {
    id: "s1",
    username: "Rohan Sharma",
    profileImage: "https://randomuser.me/api/portraits/men/82.jpg",
    location: "New Delhi, DL",
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
    isVerified: true,
    availability: "Weekends",
    category: "singer"
  },
  {
    id: "s2",
    username: "Aisha Khan",
    profileImage: "https://randomuser.me/api/portraits/women/14.jpg",
    location: "Mumbai, MH",
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
    isVerified: true,
    availability: "Anytime",
    category: "singer"
  },
  {
    id: "s3",
    username: "Chloe Bennett",
    profileImage: "https://randomuser.me/api/portraits/women/68.jpg",
    location: "Bangalore, KA",
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
    category: "singer"
  },
  {
    id: "s4",
    username: "Vikram Malhotra",
    profileImage: "https://randomuser.me/api/portraits/men/91.jpg",
    location: "Chennai, TN",
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
    isVerified: true,
    availability: "Anytime",
    category: "singer"
  },
  {
    id: "s5",
    username: "Sarah Jenkins",
    profileImage: "https://randomuser.me/api/portraits/women/79.jpg",
    location: "Mumbai, MH",
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
    category: "singer"
  },
  // LUCKNOW PROFESSIONALS
  {
    id: "l1",
    username: "Ravi Prakash",
    profileImage: "https://randomuser.me/api/portraits/men/15.jpg",
    location: "Gomti Nagar, Lucknow, UP",
    lat: 26.8528,
    lng: 81.0029,
    rating: 4.7,
    totalReviews: 89,
    experience: "5+ Years Exp.",
    experienceYears: 5,
    description: "Expert in candid wedding photography and pre-wedding shoots across scenic locations in Lucknow.",
    hourlyPricing: { oneHourPrice: 1500, twoHourPrice: 2800, threeHourPrice: 4000 },
    isVerified: true,
    availability: "Anytime",
    category: "photographer"
  },
  {
    id: "l2",
    username: "Snehil Verma",
    profileImage: "https://randomuser.me/api/portraits/women/25.jpg",
    location: "Indira Nagar, Lucknow, UP",
    lat: 26.8837,
    lng: 80.9859,
    rating: 4.5,
    totalReviews: 45,
    experience: "3+ Years Exp.",
    experienceYears: 3,
    description: "Creative videographer specializing in reel-style highlights for birthdays and engagements.",
    hourlyPricing: { oneHourPrice: 2000, twoHourPrice: 3800, threeHourPrice: 5000 },
    isVerified: true,
    availability: "Weekends",
    category: "videographer"
  },
  {
    id: "l3",
    username: "Amitabh Tiwari",
    profileImage: "https://randomuser.me/api/portraits/men/35.jpg",
    location: "Hazratganj, Lucknow, UP",
    lat: 26.8485,
    lng: 80.9419,
    rating: 4.9,
    totalReviews: 120,
    experience: "10+ Years Exp.",
    experienceYears: 10,
    description: "Renowned classical singer performing at prestigious cultural events and private baithaks.",
    hourlyPricing: { oneHourPrice: 4000, twoHourPrice: 7500, threeHourPrice: 10000 },
    isVerified: true,
    availability: "Anytime",
    category: "singer"
  },
  {
    id: "l4",
    username: "Pooja Yadav",
    profileImage: "https://randomuser.me/api/portraits/women/45.jpg",
    location: "Alambagh, Lucknow, UP",
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
    category: "videographer"
  },
  {
    id: "l5",
    username: "Nikhil Srivastava",
    profileImage: "https://randomuser.me/api/portraits/men/55.jpg",
    location: "Ashiyana, Lucknow, UP",
    lat: 26.7821,
    lng: 80.9161,
    rating: 4.6,
    totalReviews: 32,
    experience: "4+ Years Exp.",
    experienceYears: 4,
    description: "Specialist in outdoor portrait and fashion photography, utilizing natural light.",
    hourlyPricing: { oneHourPrice: 1200, twoHourPrice: 2200, threeHourPrice: 3200 },
    isVerified: true,
    availability: "Weekends",
    category: "photographer"
  },
  {
    id: "l6",
    username: "Sneha Kapoor",
    profileImage: "https://randomuser.me/api/portraits/women/55.jpg",
    location: "Mahanagar, Lucknow, UP",
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
    category: "singer"
  },
  {
    id: "l7",
    username: "Aditya Mishra",
    profileImage: "https://randomuser.me/api/portraits/men/65.jpg",
    location: "Aminabad, Lucknow, UP",
    lat: 26.8437,
    lng: 80.9250,
    rating: 4.7,
    totalReviews: 78,
    experience: "7+ Years Exp.",
    experienceYears: 7,
    description: "Street-style photographer bringing raw emotions into event highlights and cultural shoots.",
    hourlyPricing: { oneHourPrice: 1800, twoHourPrice: 3200, threeHourPrice: 4500 },
    isVerified: true,
    availability: "Anytime",
    category: "photographer"
  },
  {
    id: "l8",
    username: "Riya Sharma",
    profileImage: "https://randomuser.me/api/portraits/women/75.jpg",
    location: "Chowk, Lucknow, UP",
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
    category: "videographer"
  },
  {
    id: "l9",
    username: "Karan Singh",
    profileImage: "https://randomuser.me/api/portraits/men/75.jpg",
    location: "Vikas Nagar, Lucknow, UP",
    lat: 26.8925,
    lng: 80.9575,
    rating: 4.8,
    totalReviews: 104,
    experience: "8+ Years Exp.",
    experienceYears: 8,
    description: "Acoustic singer and guitarist perfect for small gatherings and private celebrations.",
    hourlyPricing: { oneHourPrice: 3000, twoHourPrice: 5500, threeHourPrice: 7500 },
    isVerified: true,
    availability: "Anytime",
    category: "singer"
  },
  {
    id: "l10",
    username: "Shreya Gupta",
    profileImage: "https://randomuser.me/api/portraits/women/85.jpg",
    location: "Omaxe City, Lucknow, UP",
    lat: 26.7584,
    lng: 80.9327,
    rating: 4.5,
    totalReviews: 38,
    experience: "4+ Years Exp.",
    experienceYears: 4,
    description: "Maternity and newborn photographer offering a comforting and premium photoshoot experience.",
    hourlyPricing: { oneHourPrice: 1600, twoHourPrice: 3000, threeHourPrice: 4200 },
    isVerified: true,
    availability: "Weekdays",
    category: "photographer"
  }
];
