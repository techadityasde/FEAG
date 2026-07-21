"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store/store";
import { updateLocation, updateMobile, updateProfileImage } from "@/lib/store/authSlice";
import { ImageCropperModal } from "@/components/ui/ImageCropperModal";
import { LocationModal } from "@/components/LocationModal";
import { Pencil } from "lucide-react";

/**
 * Edit Profile page — converted from static HTML to a Next.js component.
 */

interface ChecklistItem {
  id: string;
  label: string;
  points: number;
  complete: boolean;
  current?: boolean;
  colorClass?: string;
}

// r = 40 -> circumference = 2 * PI * 40
const RING_CIRCUMFERENCE = 2 * Math.PI * 40;

const navSections: {
  heading: string;
  items: { icon: string; label: string; active?: boolean }[];
}[] = [
    {
      heading: "Profile",
      items: [
        { icon: "account_circle", label: "Edit Profile", active: true },
        { icon: "language", label: "Language" },
        { icon: "notifications", label: "Notifications" },
      ],
    },
    {
      heading: "Bank",
      items: [
        { icon: "payments", label: "Payments" },
        { icon: "account_balance", label: "Taxes" },
        { icon: "receipt_long", label: "Transactions" },
      ],
    },
    {
      heading: "Secure",
      items: [
        { icon: "lock", label: "Password" },
        { icon: "security", label: "Access" },
        { icon: "devices", label: "Sessions" },
      ],
    },
  ];

function ProfileHeaderCard() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isCropOpen, setIsCropOpen] = useState(false);
  const [tempImage, setTempImage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTempImage(e.target?.result as string);
        setIsCropOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedBase64: string) => {
    dispatch(updateProfileImage(croppedBase64));
    setIsCropOpen(false);
  };

  return (
    <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 md:gap-8 border-b border-outline-variant/30 bg-gradient-to-r from-primary/10 via-surface-container-lowest to-surface-container-lowest">
      <div className="relative group shrink-0">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-surface-container-high relative shadow-sm bg-surface-container">
          <Image
            src={user?.profileImage || "/images/default-profile.png"}
            alt={user?.name || "Profile Picture"}
            fill
            sizes="(max-width: 640px) 96px, 128px"
            className="object-cover"
          />
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-1 right-1 p-2 bg-white text-primary rounded-full shadow-md border border-border hover:bg-muted hover:scale-105 transition-all"
          aria-label="Change photo"
        >
          <Pencil className="size-4" />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      <div className="space-y-1 text-center sm:text-left flex-1 flex flex-col justify-center min-h-[96px] sm:min-h-[128px]">
        <h2 className="text-title-lg font-title-lg text-on-surface font-semibold">{user?.fullName}</h2>
        <span className="text-[10px] capitalize bg-primary text-white px-3 py-0.5 rounded-lg w-fit">@{user?.username}</span>
      </div>

      <ImageCropperModal
        isOpen={isCropOpen}
        onClose={() => setIsCropOpen(false)}
        imageSrc={tempImage}
        onCropComplete={handleCropComplete}
      />
    </div>
  );
}

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  username: string;
  gender: string;
}

function PersonalInfoSection() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState<PersonalInfo>({
    fullName: user?.fullName || "N/A",
    email: user?.email || "N/A",
    phone: user?.mobile || "N/A",
    username: user?.username || "N/A",
    gender: user?.gender || "",
  });
  const [draft, setDraft] = useState<PersonalInfo>(saved);
  console.log("user", user)
  useEffect(() => {
    setSaved({
      fullName: user?.fullName || "N/A",
      email: user?.email || "N/A",
      phone: user?.mobile || "N/A",
      username: user?.username || "N/A",
      gender: user?.gender || "",
    });
  }, [user]);

  const startEditing = () => {
    setDraft(saved);
    setEditing(true);
  };

  const cancel = () => setEditing(false);

  const save = () => {
    if (draft.phone !== saved.phone) {
      dispatch(updateMobile(draft.phone));
    }
    setSaved(draft);
    setEditing(false);
  };

  if (!editing) {
    return (
      <div className="p-4 sm:p-6 rounded-xl border border-outline-variant/30 relative group hover:border-primary/20 transition-colors bg-white shadow-sm">
        <div className="flex justify-between items-start mb-6">
          <h4 className="text-[13px] font-semibold bg-primary/10 text-primary px-3 rounded-full border border-primary/20 shadow-sm w-fit">
            Personal Info
          </h4>
          <button
            onClick={startEditing}
            className="px-2 text-[13px] border border-outline-variant/30 rounded-lg hover:bg-surface-container-lowest transition-colors"
          >
            Edit
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="min-w-0">
            <span className="block text-body-sm text-outline mb-1">
              Full Name
            </span>
            <span className="text-sm  text-on-surface block truncate">{saved.fullName}</span>
          </div>
          <div className="min-w-0">
            <span className="block text-body-sm text-outline mb-1">Gender</span>
            <span className="text-sm  text-on-surface block truncate capitalize">{saved.gender || "Not set"}</span>
          </div>
          <div className="min-w-0">
            <span className="block text-body-sm text-outline mb-1">Email</span>
            <span className="text-sm  text-on-surface block truncate">{saved.email}</span>
          </div>
          <div className="min-w-0">
            <span className="block text-body-sm text-outline mb-1">Phone</span>
            <span className="text-sm  text-on-surface block truncate">{saved.phone}</span>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 rounded-xl border border-primary/40 bg-surface-container-low/30 relative shadow-inner">
      <div className="flex justify-between items-start mb-6">
        <h4 className="text-[13px] font-semibold bg-primary/10 text-primary px-3 rounded-full border border-primary/20 shadow-sm w-fit">
          Personal Info
        </h4>
        <div className="flex items-center gap-3">
          <button
            onClick={cancel}
            className="px-2 text-[13px] font-semibold text-outline hover:text-on-surface-variant transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={save}
            className="px-2 py-1 text-[13px] bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all shadow-sm active:scale-[0.98]"
          >
            Save changes
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-[13px] text-outline mb-1">
            Full Name
          </label>
          <input
            className="w-full px-2 py-1.5 bg-white border border-outline-variant/50 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
            value={draft.fullName}
            onChange={(e) =>
              setDraft((d) => ({ ...d, fullName: e.target.value }))
            }
          />
        </div>
        <div>
          <label className="block text-[13px] text-outline mb-1">Gender</label>
          <select
            className="w-full px-2 py-1.5 bg-white border border-outline-variant/50 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
            value={draft.gender}
            onChange={(e) => setDraft((d) => ({ ...d, gender: e.target.value }))}
          >
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div>
          <label className="block text-[13px] text-outline mb-1">Email</label>
          <input
            className="w-full px-2 py-1.5 bg-white border border-outline-variant/50 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
            value={draft.email}
            onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))}
          />
        </div>
        <div>
          <label className="block text-[13px] text-outline mb-1">Phone</label>
          <input
            className="w-full px-2 py-1.5 bg-white border border-outline-variant/50 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
            value={draft.phone}
            onChange={(e) => setDraft((d) => ({ ...d, phone: e.target.value }))}
          />
        </div>

      </div>
    </div>
  );
}

function LocationSection() {
  const user = useSelector((state: RootState) => state.auth.user);
  const location = useSelector((state: RootState) => state.location as any);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  const [saved, setSaved] = useState({
    address: user?.location || "",
    landmark: user?.landmark || "",
    pincode: user?.pincode || "",
  });

  const [draft, setDraft] = useState(saved);

  useEffect(() => {
    if (location && location.address) {
      setDraft((prev) => ({
        ...prev,
        address: location.address,
        pincode: location.pincode || prev.pincode,
      }));
    }
  }, [location]);

  const startEditing = () => {
    setDraft(saved);
    setEditing(true);
  };

  const cancel = () => setEditing(false);

  const save = () => {
    setSaved(draft);
    setEditing(false);
  };

  if (!editing) {
    return (
      <div className="p-4 sm:p-6 rounded-xl border border-outline-variant/30 relative group hover:border-primary/20 transition-colors bg-white shadow-sm">
        <div className="flex justify-between items-start mb-6">
          <h4 className="text-[13px] font-semibold bg-primary/10 text-primary px-3 rounded-full border border-primary/20 shadow-sm w-fit">
            Location
          </h4>
          <button
            onClick={startEditing}
            className="px-2 text-[13px] border border-outline-variant/30 rounded-lg hover:bg-surface-container-lowest transition-colors"
          >
            Edit
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="min-w-0">
            <span className="block text-body-sm text-outline mb-1">Address</span>
            <span className="text-sm text-on-surface block truncate">{saved.address || "Not set"}</span>
          </div>
          <div className="min-w-0">
            <span className="block text-body-sm text-outline mb-1">Landmark / Locality</span>
            <span className="text-sm text-on-surface block truncate">{saved.landmark || "Not set"}</span>
          </div>
          <div className="min-w-0">
            <span className="block text-body-sm text-outline mb-1">Pincode</span>
            <span className="text-sm text-on-surface block truncate">{saved.pincode || "Not set"}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 rounded-xl border border-primary/40 bg-surface-container-low/30 relative shadow-inner">
      <div className="flex justify-between items-start mb-6">
        <h4 className="text-[13px] font-semibold bg-primary/10 text-primary px-3 rounded-full border border-primary/20 shadow-sm w-fit">
          Location
        </h4>
        <div className="flex items-center gap-3">
          <button
            onClick={cancel}
            className="px-2 text-[13px] font-semibold text-outline hover:text-on-surface-variant transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={save}
            className="px-2 py-1 text-[13px] bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all shadow-sm active:scale-[0.98]"
          >
            Save changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <div className="flex justify-between items-center mb-1">
            <label className="block text-[13px] text-outline">Address</label>
            <button
              type="button"
              onClick={() => setIsLocationModalOpen(true)}
              className="text-[12px] text-primary hover:underline font-medium"
            >
              Choose from map
            </button>
          </div>
          <input
            className="w-full px-2 py-1.5 bg-white border border-outline-variant/50 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
            value={draft.address}
            onChange={(e) => setDraft((d) => ({ ...d, address: e.target.value }))}
            placeholder="Enter your address"
          />
        </div>
        <div>
          <label className="block text-[13px] text-outline mb-1">Landmark / Locality</label>
          <input
            className="w-full px-2 py-1.5 bg-white border border-outline-variant/50 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
            value={draft.landmark}
            onChange={(e) => setDraft((d) => ({ ...d, landmark: e.target.value }))}
            placeholder="e.g. Near Apollo Hospital"
          />
        </div>
        <div>
          <label className="block text-[13px] text-outline mb-1">Pincode</label>
          <input
            className="w-full px-2 py-1.5 bg-white border border-outline-variant/50 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
            value={draft.pincode}
            onChange={(e) => setDraft((d) => ({ ...d, pincode: e.target.value }))}
            placeholder="e.g. 110001"
            maxLength={6}
          />
        </div>
      </div>

      {isLocationModalOpen && (
        <LocationModal
          isOpen={isLocationModalOpen}
          onClose={() => setIsLocationModalOpen(false)}
        />
      )}
    </div>
  );
}

function BioSection() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [editing, setEditing] = useState(false);

  const defaultBio = "Hi 👋, I'm a passionate professional. (Add your bio here to let people know more about you!)";
  const [saved, setSaved] = useState(user?.description || defaultBio);
  const [draft, setDraft] = useState(saved);

  useEffect(() => {
    setSaved(user?.description || defaultBio);
  }, [user]);

  const startEditing = () => {
    setDraft(saved);
    setEditing(true);
  };

  const cancel = () => setEditing(false);

  const save = () => {
    setSaved(draft);
    setEditing(false);
  };

  if (!editing) {
    return (
      <div className="p-4 sm:p-6 rounded-xl border border-outline-variant/30 relative group hover:border-primary/20 transition-colors bg-white shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <h4 className="text-[13px] font-semibold bg-primary/10 text-primary px-3 rounded-full border border-primary/20 shadow-sm w-fit">Bio</h4>
          <button
            onClick={startEditing}
            className="px-2 text-[13px] border border-outline-variant/30 rounded-lg hover:bg-surface-container-lowest transition-colors"
          >
            Edit
          </button>
        </div>
        <p className="text-body-md text-on-surface-variant leading-relaxed">
          {saved}
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 rounded-xl border border-primary/40 bg-surface-container-low/30 relative shadow-inner">
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-[13px] font-semibold bg-primary/10 text-primary px-3 rounded-full border border-primary/20 shadow-sm w-fit">Bio</h4>
        <div className="flex items-center gap-3">
          <button
            onClick={cancel}
            className="text-[13px] font-semibold text-outline hover:text-on-surface-variant transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={save}
            className="px-2 py-1 text-[13px] bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all shadow-sm active:scale-[0.98]"
          >
            Save changes
          </button>
        </div>
      </div>
      <textarea
        className="w-full px-3 py-2 bg-white border border-outline-variant/50 rounded-lg text-sm leading-relaxed focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
        rows={4}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
      />
    </div>
  );
}

function ProfileGaugeCard() {
  const user = useSelector((state: RootState) => state.auth.user);

  // Dynamic checklist based on user state
  const checklist: ChecklistItem[] = [
    { id: "account", label: "Setup account", points: 10, complete: true, colorClass: "text-emerald-500 bg-emerald-500/10" },
    { id: "photo", label: "Upload your photo", points: 15, complete: !!user?.profileImage, colorClass: "text-blue-500 bg-blue-500/10" },
    { id: "info", label: "Personal Info", points: 20, complete: !!(user?.fullName && user?.email && user?.mobile && user?.username), colorClass: "text-purple-500 bg-purple-500/10" },
    { id: "location", label: "Location", points: 15, complete: !!user?.location, colorClass: "text-amber-500 bg-amber-500/10", current: !user?.location },
    { id: "bio", label: "Biography", points: 15, complete: false, colorClass: "text-rose-500 bg-rose-500/10" },
    { id: "portfolio", label: "Portfolio", points: 10, complete: false, colorClass: "text-cyan-500 bg-cyan-500/10" },
    { id: "package", label: "Package", points: 15, complete: false, colorClass: "text-indigo-500 bg-indigo-500/10" },
  ];

  const completion = checklist
    .filter((item) => item.complete)
    .reduce((sum, item) => sum + item.points, 0);

  const ringOffset = RING_CIRCUMFERENCE * (1 - completion / 100);
  const [animatedOffset, setAnimatedOffset] = useState(RING_CIRCUMFERENCE);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedOffset(ringOffset);
    }, 100);
    return () => clearTimeout(timer);
  }, [ringOffset]);

  return (
    <div className="bg-white rounded-xl border border-outline-variant/30 shadow-sm p-4 sm:p-5">
      <h3 className="text-[13px] font-semibold mb-6 bg-primary/10 text-primary px-4 rounded-full w-fit mx-auto border border-primary/20 text-center shadow-sm">
        Complete your profile
      </h3>

      <div className="flex justify-center mb-6">
        <div className="relative w-40 h-40 group">
          <svg className="w-full h-full transform -rotate-90 drop-shadow-sm transition-transform duration-500 group-hover:scale-105" viewBox="0 0 100 100">
            <circle
              className="text-surface-container-high stroke-current"
              cx="50"
              cy="50"
              fill="transparent"
              r="40"
              strokeWidth="10"
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4F46E5" />
                <stop offset="50%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
            </defs>
            <circle
              className="stroke-[url(#progressGradient)] progress-ring__circle transition-all duration-1000 ease-out"
              cx="50"
              cy="50"
              fill="transparent"
              r="40"
              strokeLinecap="round"
              strokeWidth="10"
              style={{
                strokeDasharray: RING_CIRCUMFERENCE,
                strokeDashoffset: animatedOffset,
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-display-sm font-display-sm text-on-surface leading-none">
              {completion}%
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-0.5">
        {checklist.map((item) => (
          <div
            key={item.id}
            className={`flex items-center justify-between py-1.5 px-3 -mx-3 rounded-lg transition-colors ${item.current ? "bg-surface-container-low" : "hover:bg-surface-container-lowest"
              }`}
          >
            <div className="flex items-center gap-3">
              <div className={`flex items-center justify-center w-6 h-6 rounded-full ${item.complete ? item.colorClass : 'bg-surface-container-high text-outline-variant'}`}>
                <span className="material-symbols-outlined text-[14px]">
                  {item.complete ? "check" : "close"}
                </span>
              </div>
              <span
                className={
                  item.complete
                    ? "text-body-sm text-on-surface font-medium"
                    : "text-body-sm text-outline-variant"
                }
              >
                {item.label}
              </span>
            </div>
            <span
              className={
                item.complete
                  ? `text-metadata font-bold ${item.colorClass?.split(' ')[0]}`
                  : "text-metadata font-metadata text-outline"
              }
            >
              {item.complete ? `${item.points}%` : `+${item.points}%`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProBenefitsCard() {
  return (
    <div className="relative bg-primary-container rounded-xl p-6 text-white overflow-hidden shadow-lg mt-6 hidden lg:block">
      <div className="relative z-10">
        <span
          className="material-symbols-outlined text-[32px] mb-3"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          stars
        </span>
        <h4 className="text-title-sm font-title-sm mb-2">Pro Benefits</h4>
        <p className="text-body-sm mb-4 opacity-90">
          Unlock personalized career insights and higher visibility in search.
        </p>
        <button className="w-full py-2 bg-white text-primary rounded-lg text-body-sm font-bold hover:bg-surface-container-high transition-colors">
          Upgrade Now
        </button>
      </div>
    </div>
  );
}

export default function EditProfile() {
  return (
    <div className="max-w-[1200px] mx-auto p-2 md:p-2 lg:p-2">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="flex-1 space-y-4">
          <div className="bg-white rounded-xl border border-outline-variant/30 shadow-sm overflow-hidden">
            <ProfileHeaderCard />
            <div className="p-4 sm:p-5 space-y-4 bg-surface-container-lowest/50">
              <PersonalInfoSection />
              <LocationSection />
              <BioSection />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[340px] xl:w-[380px] shrink-0">
          <ProfileGaugeCard />
          {/* <ProBenefitsCard /> */}
        </div>
      </div>
    </div>
  );
}
