import React from "react";
import {
  BadgeCheck,
  Camera,
  Compass,
  HeartHandshake,
  MapPin,
  Mic2,
  SearchCheck,
  Sparkles,
  Target,
  Video,
} from "lucide-react";

const features = [
  {
    icon: BadgeCheck,
    label: "Verified Creative Talent",
    description:
      "Every photographer, videographer, and singer is reviewed to help ensure quality, authenticity, and trust.",
  },
  {
    icon: MapPin,
    label: "Book Talent Near You",
    description:
      "Find available professionals based on your city, event location, schedule, and service needs.",
  },
  {
    icon: HeartHandshake,
    label: "Simple Event Hiring",
    description:
      "Compare portfolios, connect with the right expert, and book with confidence from one platform.",
  },
];

const platformHighlights = [
  {
    icon: Camera,
    label: "Professional Photography",
    description: "Capture weddings, parties, portraits, brand shoots, and special celebrations with trusted photographers.",
  },
  {
    icon: Video,
    label: "Event Videography",
    description: "Hire videographers for cinematic event films, reels, business content, and social media-ready videos.",
  },
  {
    icon: Mic2,
    label: "Live Singers & Musicians",
    description: "Bring energy to events with singers and musicians for private parties, weddings, and stage moments.",
  },
];

export default function AboutUs() {
  return (
    <section id="about" className="w-full bg-[#FAF0E6] py-12 sm:py-16 border-y border-border/40 scroll-mt-16">
      <div className="max-w-[1400px] mx-auto px-3 min-[360px]:px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 text-primary text-[10px] min-[360px]:text-xs font-bold tracking-wider uppercase border border-primary/10 w-fit mb-5">
              <Sparkles className="size-3.5" />
              About FEAG
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2E2215] leading-tight tracking-tight">
              Where Creativity Meets Opportunity
            </h1>
            <div className="mt-5 space-y-4 text-xs min-[360px]:text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">
              <p>
                FEAG is a technology-driven creative marketplace built to connect photographers, videographers, singers, and musicians with people and businesses looking for reliable event talent. Whether it&apos;s capturing life&apos;s biggest celebrations, producing engaging video content, or bringing a live performance to the stage, FEAG makes discovering and hiring the right professional simple, transparent, and reliable.
              </p>
              <p>
                Our platform brings together skilled photographers, videographers, singers, and musicians in one place. Every profile is designed to showcase experience, portfolios, past work, and expertise, helping clients make confident decisions while giving creators the visibility they deserve.
              </p>
              <p>
                At FEAG, we believe creative talent should never go unnoticed. Our mission is to create opportunities for visual artists and performers to grow their careers while making it effortless for clients to find trusted experts for weddings, corporate events, personal celebrations, commercial projects, and content shoots.
              </p>
              <p>
                We&apos;re building more than a booking platform. We&apos;re building a focused creative community where moments are captured beautifully, stories are filmed professionally, performances feel memorable, and every successful project strengthens lasting relationships between clients and creators.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-[#2E2215] rounded-2xl p-5 sm:p-6 text-white overflow-hidden relative h-full min-h-[280px] flex flex-col justify-between">
              <div className="absolute inset-y-0 right-0 w-2/3 bg-[radial-gradient(circle_at_70%_35%,rgba(226,154,38,0.35),transparent_58%)]" />
              <div className="relative">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary">FEAG Vision</span>
                <h2 className="text-xl sm:text-2xl font-extrabold mt-3 leading-tight">
                  India&apos;s trusted home for event creatives.
                </h2>
                <p className="text-xs sm:text-sm text-white/70 mt-3 leading-relaxed">
                  Empowering photographers, videographers, and singers while making exceptional event services easier to hire.
                </p>
              </div>
              <div className="relative grid grid-cols-3 gap-4 mt-8">
                <div>
                  <span className="block text-xl sm:text-2xl font-extrabold text-primary">10k+</span>
                  <span className="text-[10px] sm:text-xs text-white/70">event clients</span>
                </div>
                <div>
                  <span className="block text-xl sm:text-2xl font-extrabold text-primary">3</span>
                  <span className="text-[10px] sm:text-xs text-white/70">core services</span>
                </div>
                <div>
                  <span className="block text-xl sm:text-2xl font-extrabold text-primary">1</span>
                  <span className="text-[10px] sm:text-xs text-white/70">simple hiring flow</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
          {features.map(({ icon: Icon, label, description }) => (
            <div key={label} className="bg-white rounded-2xl p-5 border border-border/60 shadow-sm hover:shadow-md transition-shadow">
              <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Icon className="size-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#2E2215]">{label}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10">
          <div className="bg-white rounded-2xl p-6 border border-border/60 shadow-sm">
            <div className="size-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
              <Compass className="size-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#2E2215] tracking-tight">
              Our Vision
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-3 leading-relaxed">
              To become India&apos;s most trusted platform for hiring photographers, videographers, and singers by empowering creative talent and making exceptional event services accessible to everyone.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-border/60 shadow-sm">
            <div className="size-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
              <Target className="size-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#2E2215] tracking-tight">
              Our Mission
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-3 leading-relaxed">
              To bridge the gap between clients and trusted event creatives through technology, transparency, and opportunity, helping professionals grow their careers while making every celebration, performance, and project unforgettable.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#2E2215] tracking-tight">
                Core Services
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-2xl">
                A focused way to discover the right photographer, videographer, or singer for your next event or project.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {platformHighlights.map(({ icon: Icon, label, description }) => (
              <div key={label} className="bg-white/80 rounded-2xl p-5 border border-border/60">
                <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-[#2E2215]">{label}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 bg-white rounded-2xl p-5 sm:p-6 border border-border/60 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="size-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <SearchCheck className="size-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-[#2E2215]">Simple Booking Journey</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                  Search by service, explore portfolios, check availability, share custom requests for your event, connect with professionals, and hire the creative talent that fits your vision.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
