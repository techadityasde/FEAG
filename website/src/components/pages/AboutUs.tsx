"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowRight, BadgeCheck, Camera, Check, Clapperboard, Mic2, Play, Sparkles, Star, Video } from "lucide-react";
import { useEffect, useState } from "react";

const categories = [
  { name: "Photography", image: "/about/photography.jpg", icon: Camera, href: "/services/photographer" },
  { name: "Videography", image: "/about/filmmaker.jpg", icon: Video, href: "/services/videographer" },
  { name: "Music & performance", image: "/about/music.jpg", icon: Play, href: "/services/singer" },
];

const additionalCategories = [
  { name: "Cinematographers", image: "/about/cinematographers.jpg", icon: Clapperboard, href: "/services/Cinematic" },
  { name: "Dancers", image: "/about/dancers.jpg", icon: Sparkles, href: "/services/dancer" },
  { name: "Choreographers", image: "/about/choreographers.jpg", icon: Sparkles, href: "/services/choreographer" },
  { name: "Podcast studios", image: "/about/podcast.jpg", icon: Mic2, href: "/services/podcast" },
];

const steps = ["Discover talent", "Explore portfolios", "Book with confidence"];

const tickerWords = [
  "Photography",
  "Videography",
  "Cinematography",
  "Live music",
  "Dance & choreography",
  "Podcast studios",
  "Creative talent",
  "Real stories",
];

const creativeDomains = [
  "Photographer",
  "Videographer",
  "Singer",
  "Cinematographer",
  "Dancer",
  "Choreographer",
  "Podcast Creator",
];

const showcaseImages = [
  "/about/creative-team.jpg",
  "/about/creator-2.jpg",
  "/about/creator.jpg",
  "/about/dance-portrait.jpg",
  "/about/dance.jpg",
  "/about/event.jpg",
  "/about/filmmaker.jpg",
  "/about/music.jpg",
  "/about/production.jpg",
  "/about/studio.jpg",
];

export default function AboutUs() {
  const [activeShowcaseImage, setActiveShowcaseImage] = useState(0);
  const [activeDomain, setActiveDomain] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveShowcaseImage((current) => (current + 1) % showcaseImages.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveDomain((current) => (current + 1) % creativeDomains.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <main className="w-full overflow-x-hidden bg-[#fdfbf7] text-[#2e2215]">
      <section className="relative mx-auto max-w-[1440px] px-4 pb-3 pt-5 max-[359px]:px-3 sm:px-8 sm:pb-5 sm:pt-8 lg:px-14 lg:pb-7">
        <div className="grid items-start gap-0 lg:min-h-[535px] lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] lg:gap-8">
          <div className="relative z-10 min-w-0 mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
            <h1 className="text-[clamp(2.85rem,12.5vw,6.15rem)] font-semibold leading-[.87] tracking-[-.07em] text-[#2e2215] max-[359px]:text-[2.6rem] sm:text-[clamp(3.2rem,6.1vw,6.15rem)]">Every great moment<br />starts with the <span className="mt-2 flex h-[1.08em] max-w-full items-center justify-center gap-x-[.12em] overflow-hidden lg:justify-start"><span className="shrink-0 text-[clamp(1.4rem,7.4vw,3.6rem)] leading-none tracking-[-.07em] text-[#2e2215] max-[359px]:text-[1.2rem] sm:text-[clamp(1.55rem,3.7vw,3.6rem)]">right</span><span className="h-[1.08em] min-w-0 overflow-hidden text-[#e29a26]"><span key={creativeDomains[activeDomain]} className="about-domain-roll inline-block whitespace-nowrap text-[clamp(1.4rem,7.4vw,3.6rem)] leading-none tracking-[-.07em] max-[359px]:text-[1.2rem] sm:text-[clamp(1.55rem,3.7vw,3.6rem)]">{creativeDomains[activeDomain]}.</span></span></span></h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#685b4e] max-[359px]:text-[15px] max-[359px]:leading-6 sm:text-lg lg:mx-0">FEAG helps you discover talented professionals, see their work, and book the people who turn your ideas into memories.</p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"><Link href="/discover" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#2e2215] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#2e2215]/15 transition hover:-translate-y-0.5 max-[359px]:px-4 max-[359px]:text-[13px] sm:w-auto"><span>Find your professional</span><ArrowRight className="size-4" /></Link><Link href="/join-us" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#a99b8a] bg-white/70 px-6 py-3 text-sm font-bold transition hover:border-[#e29a26] hover:text-[#bd7611] max-[359px]:px-4 max-[359px]:text-[13px] sm:w-auto">Join as professional</Link></div>
          </div>

        <div className="relative min-w-0 mx-auto mt-5 h-[430px] w-full max-w-2xl max-[359px]:h-[375px] sm:mt-4 sm:h-[500px] lg:mt-0 lg:h-[535px] lg:self-start">
          <div className="pointer-events-none absolute bottom-0 left-1/2 h-[340px] w-[340px] -translate-x-1/2 rounded-t-full border border-[#eadfce] bg-[radial-gradient(ellipse_at_center,rgba(255,214,80,.45),rgba(255,239,183,.45)_52%,transparent_74%)] max-[359px]:h-[300px] max-[359px]:w-[300px] sm:h-[455px] sm:w-[455px]" />
          <div className="absolute bottom-0 left-1/2 h-[355px] w-[355px] -translate-x-1/2 rounded-t-full border border-[#eadfce] bg-[#fff4c9] max-[359px]:h-[315px] max-[359px]:w-[315px] sm:h-[475px] sm:w-[475px]" />
          <div className="absolute bottom-0 left-[calc(50%-119px)] h-[400px] w-[238px] overflow-hidden rounded-t-[42px] border-[8px] border-[#2e2215] bg-[#2e2215] shadow-2xl max-[359px]:left-[calc(50%-105px)] max-[359px]:h-[350px] max-[359px]:w-[210px] sm:left-[calc(50%-150px)] sm:h-[505px] sm:w-[300px] sm:rounded-t-[52px]"><img key={showcaseImages[activeShowcaseImage]} src={showcaseImages[activeShowcaseImage]} alt="FEAG creative professional" className="about-showcase-image absolute inset-0 h-full w-full object-cover object-center"/><div className="absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-black/50 to-transparent p-3 text-[11px] font-bold text-white sm:p-4 sm:text-xs"><span>FEAG Showcase</span><span className="rounded-full bg-[#e29a26] px-2 py-1">Live</span></div><div className="absolute inset-x-3 bottom-3 rounded-2xl bg-white/90 p-3 backdrop-blur max-[359px]:p-2"><p className="text-xs font-bold max-[359px]:text-[11px]">The talent behind the moment</p><p className="mt-1 text-[10px] text-[#766859] max-[359px]:text-[9px]">Made visible. Made bookable.</p></div></div>
          <div className="about-float about-float-delay-2 absolute bottom-[64px] left-0 hidden rounded-2xl bg-[#ffdc66] p-4 shadow-xl sm:block"><p className="text-[10px] text-[#755609]">Perfect match</p><p className="mt-1 text-3xl font-bold tracking-[-.08em]">98%</p><div className="mt-2 flex gap-1">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-3 fill-[#2e2215]" />)}</div></div>
          <div className="about-float about-float-delay-1 absolute left-0 top-[80px] hidden w-36 overflow-hidden rounded-2xl bg-white p-2 shadow-xl sm:block"><img src="/about/event.jpg" alt="Event photography" className="h-24 w-full rounded-xl object-cover"/><p className="p-1.5 text-xs font-bold">Captured beautifully</p></div>
          <div className="about-float about-float-delay-3 absolute right-0 top-[78px] hidden rounded-2xl bg-[#c4f1c4] px-5 py-4 shadow-xl sm:block"><span className="text-4xl font-semibold">10k+</span><p className="mt-1 text-xs text-[#37633c]">creative moments<br />made possible</p></div>
          <div className="about-float about-float-delay-4 absolute bottom-[64px] right-0 hidden w-40 rounded-2xl bg-white p-2 shadow-xl sm:block"><img src="/about/creator.jpg" alt="FEAG professional" className="h-24 w-full rounded-xl object-cover"/><div className="flex items-center gap-1 px-1.5 pt-2 text-xs font-bold"><BadgeCheck className="size-3.5 text-[#e29a26]"/> Verified creative</div></div>
        </div>
        </div>
      </section>

      <section aria-label="FEAG creative services" className="overflow-hidden border-y border-[#eadfce] bg-white py-7"><div className="about-ticker flex w-max items-center gap-8 whitespace-nowrap text-xs font-bold uppercase tracking-[.14em] text-[#8a7a68]">{[...tickerWords, ...tickerWords].map((word, index) => <span key={`${word}-${index}`} className="flex items-center gap-8"><span>{word}</span><span className="size-1.5 shrink-0 rounded-full bg-[#e29a26]" /></span>)}</div></section>

      <section className="mx-auto grid max-w-[1320px] gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[.9fr_1.1fr] lg:px-12"><div><p className="text-[11px] font-black uppercase tracking-[.2em] text-[#d18713]">Why FEAG exists</p><h2 className="mt-5 text-[clamp(2.7rem,5vw,5.4rem)] font-semibold leading-[.9] tracking-[-.06em]">Creative talent should be easier to find.</h2></div><div className="lg:pt-12"><p className="max-w-xl text-lg leading-8 text-[#685b4e]">FEAG is an AI-Technology Based digital platform for service provider expert in field of Complete Solution for Cinematic Creative & Professional, Photographers, Videographer, Dancers, Choreographer, Singer, Musician, Podcasters, Influencer, Voice Artist, Standup Artist, Magician Actor, Director, Production House, Cine-lighting and many more</p><div className="mt-10 grid gap-3 sm:grid-cols-3">{steps.map((step, index) => <div key={step} className="rounded-2xl border border-[#eadfce] bg-[#fffdf9] p-4"><span className="text-xs font-black text-[#e29a26]">0{index + 1}</span><p className="mt-5 text-sm font-bold leading-5">{step}</p></div>)}</div></div></section>

      <section className="bg-[#2e2215] py-14 text-white sm:py-28"><div className="mx-auto max-w-[1320px] px-4 sm:px-8 lg:px-12"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-[10px] font-black uppercase tracking-[.2em] text-[#f5bb46] sm:text-[11px]">Made for every vision</p><h2 className="mt-5 max-w-2xl text-[clamp(2.4rem,12vw,5.8rem)] font-semibold leading-[.88] tracking-[-.06em] sm:text-[clamp(2.7rem,5.5vw,5.8rem)]">One platform. A whole creative world.</h2></div><Link href="/discover" className="inline-flex items-center gap-2 text-sm font-bold text-[#f5bb46] hover:text-white">Explore all services <ArrowRight className="size-4"/></Link></div><div className="mt-9 grid gap-4 md:mt-12 md:grid-cols-3">{categories.map(({ name, image, icon: Icon, href }) => <Link href={href} key={name} className="group relative h-64 overflow-hidden rounded-3xl sm:h-72"><img src={image} alt={name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/><div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent"/><div className="absolute bottom-0 p-5 sm:p-6"><span className="flex size-9 items-center justify-center rounded-full bg-[#f5bb46] text-[#2e2215]"><Icon className="size-4"/></span><h3 className="mt-4 text-2xl font-bold tracking-[-.04em]">{name}</h3></div></Link>)}</div><div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{additionalCategories.map(({ name, image, icon: Icon, href }) => <Link href={href} key={name} className="group relative h-56 overflow-hidden rounded-3xl sm:h-60"><img src={image} alt={name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/><div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent"/><div className="absolute bottom-0 p-5"><span className="flex size-8 items-center justify-center rounded-full bg-[#f5bb46] text-[#2e2215]"><Icon className="size-4"/></span><h3 className="mt-3 text-xl font-bold tracking-[-.04em]">{name}</h3></div></Link>)}</div></div></section>

      <section className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12"><div className="overflow-hidden rounded-[32px] bg-[#f6c24a] p-7 sm:rounded-[44px] sm:p-14"><div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><div className="flex size-11 items-center justify-center rounded-full bg-[#2e2215] text-[#f6c24a]"><Check className="size-5"/></div><h2 className="mt-7 max-w-3xl text-[clamp(2.8rem,6vw,6.5rem)] font-semibold leading-[.86] tracking-[-.07em]">Your next great memory starts here.</h2><p className="mt-5 max-w-xl text-base leading-7 text-[#624b18]">Whether you are planning a celebration or building a creative career, FEAG is ready for the next step.</p></div><Link href="/discover" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2e2215] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5">Discover FEAG <ArrowRight className="size-4"/></Link></div></div></section>
    </main>
  );
}
