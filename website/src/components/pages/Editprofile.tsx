"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store/store";
import { updateLocation, updateMobile, updateProfileImage, updatePersonalInfo } from "@/lib/store/authSlice";
import { ImageCropperModal } from "@/components/ui/ImageCropperModal";
import { LocationModal } from "@/components/LocationModal";
import { Pencil, CheckCircle2, Circle, Sparkles, Trophy, Camera } from "lucide-react";
import {
  getNationalities,
  getStatesByNationality,
  getCitiesByState,
} from "@/app/join-us/data/locationData";
import { Button } from "@/components/ui/button";

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
    <div className="p-2 sm:p-3 flex flex-col sm:flex-row items-start gap-4 sm:gap-6 border-b border-outline-variant/30 bg-gradient-to-r from-primary/10 via-surface-container-lowest to-surface-container-lowest">
      {/* Square Profile Image on Far Left */}
      <div className="relative group shrink-0">
        <div className="size-24 sm:size-28 rounded-2xl overflow-hidden border-2 border-white shadow-md relative bg-slate-100">
          <Image
            src={user?.profileImage || "/images/default-profile.png"}
            alt={user?.fullName || "Profile Picture"}
            fill
            sizes="(max-width: 640px) 96px, 112px"
            className="object-cover"
          />
        </div>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      {/* User Info Column */}
      <div className="flex-1 flex flex-col items-start justify-center pt-0.5">
        {/* Change Image Button Just Above Full Name */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 px-2.5 py-1 bg-white hover:bg-slate-50 text-primary text-[11px] font-semibold rounded-lg border-primary/20 shadow-2xs hover:border-primary/40 transition-all cursor-pointer mb-2 h-7"
        >
          <Camera className="size-3.5 text-primary" />
          <span>Change Image</span>
        </Button>

        <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight mb-1">
          {user?.fullName}
        </h2>

        <span className="text-[10px] capitalize bg-primary text-white px-2.5 py-0.5 rounded-md font-semibold w-fit">
          @{user?.username}
        </span>
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
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  gender: string;
  dateOfBirth: string;
}

function PersonalInfoSection() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);

  const getNames = () => {
    const fn = user?.firstName || "";
    const ln = user?.lastName || "";
    if (fn || ln) return { firstName: fn, lastName: ln };
    const full = user?.fullName || user?.name || "";
    const parts = full.trim().split(" ");
    return {
      firstName: parts[0] || "",
      lastName: parts.slice(1).join(" ") || "",
    };
  };

  const { firstName: initialFirst, lastName: initialLast } = getNames();

  const [saved, setSaved] = useState<PersonalInfo>({
    firstName: initialFirst,
    lastName: initialLast,
    email: user?.email || "N/A",
    phone: user?.mobile || "N/A",
    username: user?.username || "N/A",
    gender: user?.gender || "",
    dateOfBirth: user?.dateOfBirth || "",
  });
  const [draft, setDraft] = useState<PersonalInfo>(saved);

  useEffect(() => {
    const fn = user?.firstName || "";
    const ln = user?.lastName || "";
    let first = fn;
    let last = ln;
    if (!fn && !ln) {
      const full = user?.fullName || user?.name || "";
      const parts = full.trim().split(" ");
      first = parts[0] || "";
      last = parts.slice(1).join(" ") || "";
    }
    setSaved({
      firstName: first,
      lastName: last,
      email: user?.email || "N/A",
      phone: user?.mobile || "N/A",
      username: user?.username || "N/A",
      gender: user?.gender || "",
      dateOfBirth: user?.dateOfBirth || "",
    });
  }, [user]);

  const startEditing = () => {
    setDraft(saved);
    setEditing(true);
  };

  const cancel = () => setEditing(false);

  const save = () => {
    const combinedFullName = `${draft.firstName.trim()} ${draft.lastName.trim()}`.trim();
    dispatch(
      updatePersonalInfo({
        firstName: draft.firstName,
        lastName: draft.lastName,
        fullName: combinedFullName,
        gender: draft.gender,
        email: draft.email,
        mobile: draft.phone,
        dateOfBirth: draft.dateOfBirth,
      })
    );
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
          <Button
            variant="outline"
            size="sm"
            onClick={startEditing}
            className="px-2.5 h-7 text-[13px] border-outline-variant/30 rounded-lg hover:bg-surface-container-lowest transition-colors"
          >
            Edit
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
          <div className="min-w-0">
            <span className="block text-xs font-semibold text-slate-900 mb-0.5">
              First Name
            </span>
            <span className="text-[11px] sm:text-xs font-normal text-slate-500 block truncate">{saved.firstName || "Not set"}</span>
          </div>

          <div className="min-w-0">
            <span className="block text-xs font-semibold text-slate-900 mb-0.5">
              Last Name
            </span>
            <span className="text-[11px] sm:text-xs font-normal text-slate-500 block truncate">{saved.lastName || "Not set"}</span>
          </div>

          <div className="min-w-0">
            <span className="block text-xs font-semibold text-slate-900 mb-0.5">
              Gender
            </span>
            <span className="text-[11px] sm:text-xs font-normal text-slate-500 block truncate capitalize">{saved.gender || "Not set"}</span>
          </div>

          <div className="min-w-0">
            <span className="block text-xs font-semibold text-slate-900 mb-0.5">
              Date of Birth
            </span>
            <span className="text-[11px] sm:text-xs font-normal text-slate-500 block truncate">{saved.dateOfBirth || "Not set"}</span>
          </div>

          <div className="min-w-0">
            <span className="block text-xs font-semibold text-slate-900 mb-0.5">
              Email
            </span>
            <span className="text-[11px] sm:text-xs font-normal text-slate-500 block truncate">{saved.email}</span>
          </div>

          <div className="min-w-0">
            <span className="block text-xs font-semibold text-slate-900 mb-0.5">
              Phone
            </span>
            <span className="text-[11px] sm:text-xs font-normal text-slate-500 block truncate">{saved.phone}</span>
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
          <Button
            variant="ghost"
            size="sm"
            onClick={cancel}
            className="px-2 h-7 text-[13px] font-semibold text-outline hover:text-on-surface-variant transition-colors"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={save}
            className="px-3 h-7 text-[13px] bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all shadow-sm active:scale-[0.98]"
          >
            Save changes
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-900 mb-1">
            First Name
          </label>
          <input
            className="w-full px-2 py-1.5 bg-white border border-outline-variant/50 rounded-lg text-xs font-normal text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
            value={draft.firstName}
            onChange={(e) =>
              setDraft((d) => ({ ...d, firstName: e.target.value }))
            }
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-900 mb-1">
            Last Name
          </label>
          <input
            className="w-full px-2 py-1.5 bg-white border border-outline-variant/50 rounded-lg text-xs font-normal text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
            value={draft.lastName}
            onChange={(e) =>
              setDraft((d) => ({ ...d, lastName: e.target.value }))
            }
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-900 mb-1">Gender</label>
          <select
            className="w-full px-2 py-1.5 bg-white border border-outline-variant/50 rounded-lg text-xs font-normal text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
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
          <label className="block text-xs font-semibold text-slate-900 mb-1">Date of Birth</label>
          <input
            type="date"
            className="w-full px-2 py-1.5 bg-white border border-outline-variant/50 rounded-lg text-xs font-normal text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
            value={draft.dateOfBirth}
            onChange={(e) => setDraft((d) => ({ ...d, dateOfBirth: e.target.value }))}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-900 mb-1">Email</label>
          <input
            className="w-full px-2 py-1.5 bg-white border border-outline-variant/50 rounded-lg text-xs font-normal text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
            value={draft.email}
            onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-900 mb-1">Phone</label>
          <input
            className="w-full px-2 py-1.5 bg-white border border-outline-variant/50 rounded-lg text-xs font-normal text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
            value={draft.phone}
            onChange={(e) => setDraft((d) => ({ ...d, phone: e.target.value }))}
          />
        </div>
      </div>
    </div>
  );
}

interface LocationInfo {
  address: string;
  landmark: string;
  pincode: string;
  nationality: string;
  state: string;
  city: string;
}

function LocationSection() {
  const user = useSelector((state: RootState) => state.auth.user);
  const location = useSelector((state: RootState) => state.location as any);
  const dispatch = useDispatch();
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [isCustomCity, setIsCustomCity] = useState(false);

  const [saved, setSaved] = useState<LocationInfo>({
    address: user?.location || "",
    landmark: user?.landmark || "",
    pincode: user?.pincode || "",
    nationality: user?.nationality || "Indian",
    state: user?.state || "",
    city: user?.city || "",
  });

  const [draft, setDraft] = useState<LocationInfo>(saved);

  useEffect(() => {
    setSaved({
      address: user?.location || "",
      landmark: user?.landmark || "",
      pincode: user?.pincode || "",
      nationality: user?.nationality || "Indian",
      state: user?.state || "",
      city: user?.city || "",
    });
  }, [user]);

  useEffect(() => {
    if (location && location.address) {
      setDraft((prev) => ({
        ...prev,
        address: location.address || prev.address,
        pincode: location.pincode || prev.pincode,
        landmark: location.landmark || prev.landmark,
        city: location.city || prev.city,
        state: location.state || prev.state,
      }));
    }
  }, [location]);

  const nationalities = getNationalities();
  const availableStates = getStatesByNationality(draft.nationality || "Indian");
  const availableCities = draft.state
    ? getCitiesByState(draft.nationality || "Indian", draft.state)
    : [];

  const handleNationalityChange = (newNat: string) => {
    const statesForNat = getStatesByNationality(newNat);
    const isValidState = draft.state && statesForNat.includes(draft.state);
    setDraft((prev) => ({
      ...prev,
      nationality: newNat,
      state: isValidState ? prev.state : "",
      city: isValidState ? prev.city : "",
    }));
  };

  const handleStateChange = (newState: string) => {
    const citiesForState = getCitiesByState(draft.nationality || "Indian", newState);
    const isValidCity = draft.city && citiesForState.includes(draft.city);
    setDraft((prev) => ({
      ...prev,
      state: newState,
      city: isValidCity ? prev.city : "",
    }));
    setIsCustomCity(false);
  };

  const startEditing = () => {
    setDraft(saved);
    const cities = saved.state ? getCitiesByState(saved.nationality || "Indian", saved.state) : [];
    if (saved.city && cities.length > 0 && !cities.includes(saved.city)) {
      setIsCustomCity(true);
    } else {
      setIsCustomCity(false);
    }
    setEditing(true);
  };

  const cancel = () => setEditing(false);

  const save = () => {
    dispatch(
      updateLocation({
        location: draft.address,
        landmark: draft.landmark,
        pincode: draft.pincode,
        nationality: draft.nationality,
        state: draft.state,
        city: draft.city,
      })
    );
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
          <Button
            variant="outline"
            size="sm"
            onClick={startEditing}
            className="px-2.5 h-7 text-[13px] border-outline-variant/30 rounded-lg hover:bg-surface-container-lowest transition-colors"
          >
            Edit
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
          <div className="min-w-0">
            <span className="block text-xs font-semibold text-slate-900 mb-0.5">Nationality</span>
            <span className="text-[11px] sm:text-xs font-normal text-slate-500 block truncate">{saved.nationality || "Not set"}</span>
          </div>
          <div className="min-w-0">
            <span className="block text-xs font-semibold text-slate-900 mb-0.5">State / Region</span>
            <span className="text-[11px] sm:text-xs font-normal text-slate-500 block truncate">{saved.state || "Not set"}</span>
          </div>
          <div className="min-w-0">
            <span className="block text-xs font-semibold text-slate-900 mb-0.5">City / District</span>
            <span className="text-[11px] sm:text-xs font-normal text-slate-500 block truncate">{saved.city || "Not set"}</span>
          </div>
          <div className="min-w-0 sm:col-span-2 lg:col-span-1">
            <span className="block text-xs font-semibold text-slate-900 mb-0.5">Address</span>
            <span className="text-[11px] sm:text-xs font-normal text-slate-500 block truncate">{saved.address || "Not set"}</span>
          </div>
          <div className="min-w-0">
            <span className="block text-xs font-semibold text-slate-900 mb-0.5">Landmark / Locality</span>
            <span className="text-[11px] sm:text-xs font-normal text-slate-500 block truncate">{saved.landmark || "Not set"}</span>
          </div>
          <div className="min-w-0">
            <span className="block text-xs font-semibold text-slate-900 mb-0.5">Pincode</span>
            <span className="text-[11px] sm:text-xs font-normal text-slate-500 block truncate">{saved.pincode || "Not set"}</span>
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
          <Button
            variant="ghost"
            size="sm"
            onClick={cancel}
            className="px-2 h-7 text-[13px] font-semibold text-outline hover:text-on-surface-variant transition-colors"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={save}
            className="px-3 h-7 text-[13px] bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all shadow-sm active:scale-[0.98]"
          >
            Save changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-900 mb-1">Nationality</label>
          <select
            className="w-full px-2 py-1.5 bg-white border border-outline-variant/50 rounded-lg text-xs font-normal text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
            value={draft.nationality}
            onChange={(e) => handleNationalityChange(e.target.value)}
          >
            <option value="" disabled>Select Nationality</option>
            {nationalities.map((nat) => (
              <option key={nat} value={nat}>
                {nat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-900 mb-1">State / Region</label>
          <select
            className="w-full px-2 py-1.5 bg-white border border-outline-variant/50 rounded-lg text-xs font-normal text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
            value={draft.state}
            onChange={(e) => handleStateChange(e.target.value)}
            disabled={!draft.nationality}
          >
            <option value="">{draft.nationality ? "Select State / Region" : "Select Nationality First"}</option>
            {availableStates.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-xs font-semibold text-slate-900">City / District</label>
            {isCustomCity && (
              <Button
                type="button"
                variant="link"
                size="sm"
                onClick={() => setIsCustomCity(false)}
                className="text-[10px] text-primary hover:underline font-medium p-0 h-auto"
              >
                Select from list
              </Button>
            )}
          </div>
          {isCustomCity ? (
            <input
              className="w-full px-2 py-1.5 bg-white border border-outline-variant/50 rounded-lg text-xs font-normal text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
              value={draft.city}
              onChange={(e) => setDraft((d) => ({ ...d, city: e.target.value }))}
              placeholder="Enter city / district name"
            />
          ) : (
            <select
              className="w-full px-2 py-1.5 bg-white border border-outline-variant/50 rounded-lg text-xs font-normal text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
              value={draft.city}
              onChange={(e) => {
                if (e.target.value === "__OTHER__") {
                  setIsCustomCity(true);
                  setDraft((d) => ({ ...d, city: "" }));
                } else {
                  setDraft((d) => ({ ...d, city: e.target.value }));
                }
              }}
              disabled={!draft.state}
            >
              <option value="">{draft.state ? "Select City / District" : "Select State First"}</option>
              {availableCities.map((ct) => (
                <option key={ct} value={ct}>
                  {ct}
                </option>
              ))}
              <option value="__OTHER__">+ Enter Manually</option>
            </select>
          )}
        </div>

        <div className="sm:col-span-2 lg:col-span-3">
          <div className="flex justify-between items-center mb-1">
            <label className="block text-xs font-semibold text-slate-900">Address</label>
            <Button
              type="button"
              variant="link"
              size="sm"
              onClick={() => setIsLocationModalOpen(true)}
              className="text-[12px] text-primary hover:underline font-medium p-0 h-auto"
            >
              Choose from map
            </Button>
          </div>
          <input
            className="w-full px-2 py-1.5 bg-white border border-outline-variant/50 rounded-lg text-xs font-normal text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
            value={draft.address}
            onChange={(e) => setDraft((d) => ({ ...d, address: e.target.value }))}
            placeholder="Enter your address"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-900 mb-1">Landmark / Locality</label>
          <input
            className="w-full px-2 py-1.5 bg-white border border-outline-variant/50 rounded-lg text-xs font-normal text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
            value={draft.landmark}
            onChange={(e) => setDraft((d) => ({ ...d, landmark: e.target.value }))}
            placeholder="e.g. Near Apollo Hospital"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-900 mb-1">Pincode</label>
          <input
            className="w-full px-2 py-1.5 bg-white border border-outline-variant/50 rounded-lg text-xs font-normal text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
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
  const dispatch = useDispatch();
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
    dispatch(updatePersonalInfo({ description: draft }));
    setSaved(draft);
    setEditing(false);
  };

  if (!editing) {
    return (
      <div className="p-4 sm:p-6 rounded-xl border border-outline-variant/30 relative group hover:border-primary/20 transition-colors bg-white shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <h4 className="text-[13px] font-semibold bg-primary/10 text-primary px-3 rounded-full border border-primary/20 shadow-sm w-fit">
            Bio
          </h4>
          <Button
            variant="outline"
            size="sm"
            onClick={startEditing}
            className="px-2.5 h-7 text-[13px] border-outline-variant/30 rounded-lg hover:bg-surface-container-lowest transition-colors"
          >
            Edit
          </Button>
        </div>
        <div className="min-w-0">
          <span className="block text-xs font-semibold text-slate-900 mb-0.5">
            Biography
          </span>
          <span className="text-[11px] sm:text-xs font-normal text-slate-500 block leading-relaxed whitespace-pre-line">
            {saved}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 rounded-xl border border-primary/40 bg-surface-container-low/30 relative shadow-inner">
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-[13px] font-semibold bg-primary/10 text-primary px-3 rounded-full border border-primary/20 shadow-sm w-fit">
          Bio
        </h4>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={cancel}
            className="px-2 h-7 text-[13px] font-semibold text-outline hover:text-on-surface-variant transition-colors"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={save}
            className="px-3 h-7 text-[13px] bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all shadow-sm active:scale-[0.98]"
          >
            Save changes
          </Button>
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-900 mb-1">
          Biography
        </label>
        <textarea
          className="w-full px-2 py-1.5 bg-white border border-outline-variant/50 rounded-lg text-xs font-normal text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
          rows={4}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Write a short biography..."
        />
      </div>
    </div>
  );
}

function MiniCircularFiller({
  complete,
  current,
  points,
}: {
  complete: boolean;
  current?: boolean;
  points: number;
}) {
  const radius = 8;
  const circumference = 2 * Math.PI * radius;
  const targetRatio = complete ? 1 : current ? 0.5 : 0;
  const [animatedOffset, setAnimatedOffset] = useState(circumference);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedOffset(circumference * (1 - targetRatio));
    }, 200);
    return () => clearTimeout(timer);
  }, [targetRatio, circumference]);

  return (
    <div
      className="relative size-6 flex items-center justify-center shrink-0 ml-2"
      title={`${points} pts (${complete ? "Completed" : current ? "In progress" : "Pending"})`}
    >
      <svg className="size-full transform -rotate-90" viewBox="0 0 24 24">
        <circle
          cx="12"
          cy="12"
          r={radius}
          fill="transparent"
          className="stroke-slate-200/80"
          strokeWidth="2.5"
        />
        <circle
          cx="12"
          cy="12"
          r={radius}
          fill="transparent"
          className={`transition-all duration-700 ease-out ${complete
              ? "stroke-emerald-500"
              : current
                ? "stroke-amber-500"
                : "stroke-slate-300"
            }`}
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: animatedOffset,
          }}
        />
      </svg>
    </div>
  );
}

function ProfileGaugeCard() {
  const user = useSelector((state: RootState) => state.auth.user);

  // Dynamic checklist based on user state
  const checklist: ChecklistItem[] = [
    { id: "account", label: "Account Setup", points: 10, complete: true, colorClass: "text-emerald-500 bg-emerald-50" },
    { id: "photo", label: "Profile Photo", points: 15, complete: !!user?.profileImage, colorClass: "text-blue-500 bg-blue-50" },
    { id: "info", label: "Personal Information", points: 20, complete: !!(user?.fullName && user?.email && user?.mobile), colorClass: "text-indigo-500 bg-indigo-50" },
    { id: "location", label: "Location Details", points: 15, complete: !!(user?.location || user?.city), colorClass: "text-amber-500 bg-amber-50", current: !(user?.location || user?.city) },
    { id: "bio", label: "Biography", points: 15, complete: !!user?.description, colorClass: "text-rose-500 bg-rose-50" },
    { id: "portfolio", label: "Portfolio Samples", points: 10, complete: false, colorClass: "text-cyan-500 bg-cyan-50" },
    { id: "package", label: "Service Packages", points: 15, complete: false, colorClass: "text-purple-500 bg-purple-50" },
  ];

  const completion = checklist
    .filter((item) => item.complete)
    .reduce((sum, item) => sum + item.points, 0);

  const completedCount = checklist.filter((item) => item.complete).length;

  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressWidth(completion);
    }, 150);
    return () => clearTimeout(timer);
  }, [completion]);

  return (
    <div className="bg-white rounded-2xl border border-outline-variant/30 shadow-sm p-5 sm:p-6 space-y-6">
      {/* Card Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <Trophy className="size-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-[13px] font-bold text-slate-900">
              Profile Strength
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">
              {completedCount} of {checklist.length} items completed
            </p>
          </div>
        </div>
        <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
          {completion >= 80 ? "Excellent" : completion >= 50 ? "Intermediate" : "Starter"}
        </span>
      </div>

      {/* Modern Animated Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
          <span>Completion Progress</span>
          <span className="text-primary font-bold">{completedCount}/{checklist.length} Completed</span>
        </div>

        <div className="w-full h-3.5 bg-slate-100 rounded-full p-0.5 border border-slate-200/80 shadow-inner relative overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-500 via-primary to-emerald-500 shadow-sm transition-all duration-1000 ease-out relative overflow-hidden"
            style={{ width: `${progressWidth}%` }}
          >
            {/* Glossy shine line effect */}
            <div className="absolute inset-0 w-full h-full bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.4)_50%,transparent_100%)] animate-[shimmer_2s_infinite]" />
          </div>
        </div>
      </div>

      {/* Checklist items */}
      <div className="space-y-1.5 pt-1">
        {checklist.map((item) => (
          <div
            key={item.id}
            className={`flex items-center justify-between py-2 px-3 rounded-xl transition-all duration-200 ${item.complete
                ? "bg-slate-50/60 hover:bg-slate-50 hover:translate-x-0.5"
                : item.current
                  ? "bg-primary/5 border border-primary/20"
                  : "hover:bg-slate-50/40"
              }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`flex items-center justify-center size-5 rounded-full shrink-0 ${item.complete
                    ? "bg-emerald-500 text-white shadow-xs"
                    : "bg-slate-100 text-slate-400 border border-slate-200"
                  }`}
              >
                {item.complete ? (
                  <CheckCircle2 className="size-3.5 stroke-[2.5]" />
                ) : (
                  <Circle className="size-2.5 text-slate-400" />
                )}
              </div>
              <span
                className={`text-xs block truncate ${item.complete
                    ? "font-semibold text-slate-800"
                    : "font-normal text-slate-500"
                  }`}
              >
                {item.label}
              </span>
            </div>

            <MiniCircularFiller complete={item.complete} current={item.current} points={item.points} />
          </div>
        ))}
      </div>

      {/* Bottom Hint Banner */}
      <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50/80 border border-amber-200/60 text-amber-900">
        <Sparkles className="size-4 text-amber-600 shrink-0" />
        <p className="text-[11px] font-medium leading-tight">
          Complete all items to get featured on the FEAG homepage!
        </p>
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
