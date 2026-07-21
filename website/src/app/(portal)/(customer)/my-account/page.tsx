"use client";
import React, { useState, useRef } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store/store";
import { updateProfileImage, updateLocation, updateMobile } from "@/lib/store/authSlice";
import { User, Mail, Phone, MapPin, Camera, Loader2, Edit2, X, Check } from "lucide-react";
import { ImageCropperModal } from "@/components/ui/ImageCropperModal";

const MyAccountContent = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [editLocation, setEditLocation] = useState(user?.location || "");
  const [editPincode, setEditPincode] = useState(user?.pincode || "");

  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [editPhone, setEditPhone] = useState(user?.mobile || "");

  if (!user) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      // 5MB limit
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImageToCrop(reader.result?.toString() || null);
        setIsCropperOpen(true);
      });
      reader.readAsDataURL(file);

      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleCropComplete = async (croppedBase64: string) => {
    try {
      setIsCropperOpen(false);
      setIsUploading(true);

      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: croppedBase64 }),
      });

      if (!res.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await res.json();

      // Update redux state
      dispatch(updateProfileImage(data.url));

      // Optionally show a toast here if a toast library is available
      // alert("Profile image updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background/50 py-10 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">My Account</h1>
          <p className="text-muted-foreground">
            Manage your personal information and preferences.
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-6 mb-8">
            <div className="relative group">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold overflow-hidden border-2 border-primary/20">
                {user.profileImage ? (
                  <img src={user.profileImage} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  user.name?.charAt(0) || "U"
                )}
              </div>

              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white"
                aria-label="Upload new profile picture"
              >
                {isUploading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <Camera className="h-6 w-6" />
                )}
              </button>

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/jpeg, image/png, image/webp"
                onChange={handleFileChange}
              />
            </div>

            <div>
              <h2 className="text-2xl font-semibold">{user.name || "User"}</h2>

            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Mail className="h-4 w-4" /> Email
              </label>
              <p className="text-foreground p-3 bg-muted/50 rounded-lg border border-border/50">
                {user.email || "Not provided"}
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Phone className="h-4 w-4" /> Phone
                </label>
                {!isEditingPhone && (
                  <button onClick={() => {
                    setEditPhone(user.mobile || "");
                    setIsEditingPhone(true);
                  }} className="text-primary hover:text-primary/80 transition-colors p-1" aria-label="Edit Phone">
                    <Edit2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              {isEditingPhone ? (
                <div className="space-y-3 p-3 bg-muted/50 rounded-lg border border-border/50">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Mobile Number</label>
                    <input
                      type="tel"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full text-sm p-2 rounded border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Enter mobile number"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      onClick={() => setIsEditingPhone(false)}
                      className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-md hover:bg-muted text-muted-foreground transition-colors"
                    >
                      <X className="h-3 w-3" /> Cancel
                    </button>
                    <button
                      onClick={() => {
                        dispatch(updateMobile(editPhone));
                        setIsEditingPhone(false);
                      }}
                      className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      <Check className="h-3 w-3" /> Save
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-foreground p-3 bg-muted/50 rounded-lg border border-border/50">
                  {user.mobile || "Not provided"}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> Location
                </label>
                {!isEditingLocation && (
                  <button onClick={() => {
                    setEditLocation(user.location || "");
                    setEditPincode(user.pincode || "");
                    setIsEditingLocation(true);
                  }} className="text-primary hover:text-primary/80 transition-colors p-1" aria-label="Edit Location">
                    <Edit2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              {isEditingLocation ? (
                <div className="space-y-3 p-3 bg-muted/50 rounded-lg border border-border/50">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">City/Address</label>
                    <input
                      type="text"
                      value={editLocation}
                      onChange={(e) => setEditLocation(e.target.value)}
                      className="w-full text-sm p-2 rounded border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Enter location"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Pincode</label>
                    <input
                      type="text"
                      value={editPincode}
                      onChange={(e) => setEditPincode(e.target.value)}
                      className="w-full text-sm p-2 rounded border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Enter pincode"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      onClick={() => setIsEditingLocation(false)}
                      className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-md hover:bg-muted text-muted-foreground transition-colors"
                    >
                      <X className="h-3 w-3" /> Cancel
                    </button>
                    <button
                      onClick={() => {
                        dispatch(updateLocation({ location: editLocation, pincode: editPincode }));
                        setIsEditingLocation(false);
                      }}
                      className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      <Check className="h-3 w-3" /> Save
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-foreground p-3 bg-muted/50 rounded-lg border border-border/50">
                  {user.location || "Not provided"} {user.pincode ? `- ${user.pincode}` : ""}
                </p>
              )}
            </div>


          </div>
        </div>
      </div>

      {imageToCrop && (
        <ImageCropperModal
          isOpen={isCropperOpen}
          onClose={() => {
            setIsCropperOpen(false);
            setImageToCrop(null);
          }}
          imageSrc={imageToCrop}
          onCropComplete={handleCropComplete}
        />
      )}
    </div>
  );
};

export default function MyAccountPage() {
  return (
    <ProtectedRoute allowedRoles={["customer"]}>
      <MyAccountContent />
    </ProtectedRoute>
  );
}
