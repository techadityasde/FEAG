"use client";

import React, { useState, useRef } from "react";
import {
  UploadCloud,
  Image as ImageIcon,
  Film,
  Trash2,
  CheckCircle2,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

interface MediaItem {
  id: string;
  type: "image" | "video";
  url: string;
  file: File;
  name: string;
  size: number;
  published: boolean;
}

const Toggle = ({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: () => void;
}) => (
  <button
    type="button"
    onClick={onChange}
    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${enabled ? "bg-green-500" : "bg-muted-foreground/30"}`}
  >
    <span
      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? "translate-x-4" : "translate-x-0"}`}
    />
  </button>
);

export default function PortfolioPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [previewMedia, setPreviewMedia] = useState<MediaItem | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "image" | "video">("all");
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(Array.from(e.target.files), "image");
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(Array.from(e.target.files), "video");
    }
  };

  const processFiles = (files: File[], expectedType: "image" | "video") => {
    let validFiles = [];
    for (const file of files) {
      const isVideo = file.type.startsWith("video/");
      const actualType = isVideo ? "video" : "image";
      
      if (actualType !== expectedType) {
        toast.error(`Please upload only ${expectedType}s in this area.`);
        continue;
      }

      const sizeMB = file.size / (1024 * 1024);
      if (actualType === "image" && sizeMB > 4) {
        toast.error(`${file.name} exceeds 4MB image limit`);
        continue;
      }
      if (actualType === "video" && sizeMB > 10) {
        toast.error(`${file.name} exceeds 10MB video limit`);
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    const newMedia = validFiles.map((file) => {
      return {
        id: Math.random().toString(36).substring(7),
        type: expectedType,
        url: URL.createObjectURL(file),
        file,
        name: file.name,
        size: file.size,
        published: false,
      } as MediaItem;
    });
    setMedia((prev) => [...prev, ...newMedia]);
    setActiveTab(expectedType);
    toast.success(`${validFiles.length} file(s) added as Draft`);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onImageDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files), "image");
    }
  };

  const onVideoDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files), "video");
    }
  };

  const removeMedia = (id: string) => {
    setMedia((prev) => prev.filter((item) => item.id !== id));
  };

  const togglePublish = (id: string) => {
    const targetItem = media.find((m) => m.id === id);
    if (targetItem && !targetItem.published) {
      toast.success("Item published!");
    }

    setMedia((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, published: !item.published } : item
      )
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto pb-6 pt-2 px-2 sm:px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3 bg-secondary/10 px-4 py-3 rounded-xl border border-border">
        <div>
          <h1 className="text-lg font-bold text-foreground flex items-center gap-2">
            Portfolio Media Manager
          </h1>
          <p className="text-[12.5px] text-muted-foreground mt-0.5 font-medium">
            Upload images and reels, and toggle them to publish.
          </p>
        </div>
      </div>

      {/* Upload Zone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Image Upload */}
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onImageDrop}
          onClick={() => imageInputRef.current?.click()}
          className={`relative h-32 rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-300 overflow-hidden group bg-card ${
            isDragging
              ? "border-primary bg-primary/5 scale-[1.01]"
              : "border-border/70 hover:border-primary/50 hover:bg-primary/5"
          }`}
        >
          <div
            className={`p-2.5 rounded-xl mb-2 transition-colors ${isDragging ? "bg-primary/20 text-primary" : "bg-primary/10 text-primary group-hover:bg-primary/20"}`}
          >
            <ImageIcon className="size-5" />
          </div>
          <p className="text-[13px] font-bold text-foreground">
            Upload Images
          </p>
          <p className="text-[11px] font-semibold text-muted-foreground mt-1 uppercase tracking-wider">
            Supports JPG, PNG (Max 4MB)
          </p>
          <input
            type="file"
            ref={imageInputRef}
            className="hidden"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {/* Video Upload */}
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onVideoDrop}
          onClick={() => videoInputRef.current?.click()}
          className={`relative h-32 rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-300 overflow-hidden group bg-card ${
            isDragging
              ? "border-primary bg-primary/5 scale-[1.01]"
              : "border-border/70 hover:border-primary/50 hover:bg-primary/5"
          }`}
        >
          <div
            className={`p-2.5 rounded-xl mb-2 transition-colors ${isDragging ? "bg-primary/20 text-primary" : "bg-primary/10 text-primary group-hover:bg-primary/20"}`}
          >
            <Film className="size-5" />
          </div>
          <p className="text-[13px] font-bold text-foreground">
            Upload Videos
          </p>
          <p className="text-[11px] font-semibold text-muted-foreground mt-1 uppercase tracking-wider">
            Supports MP4 (Max 10MB)
          </p>
          <input
            type="file"
            ref={videoInputRef}
            className="hidden"
            multiple
            accept="video/*"
            onChange={handleVideoChange}
          />
        </div>
      </div>

      {/* Table Section */}
      {media.length > 0 ? (
        <div className="mt-5 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
            <h3 className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <UploadCloud className="size-3.5 text-primary" />
              Uploaded Files
              <span className="bg-primary/10 text-primary text-[10px] px-1.5 py-0.5 rounded-md">
                {media.length} items
              </span>
            </h3>
            
            <div className="flex items-center gap-1 bg-secondary/30 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${activeTab === "all" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab("image")}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${activeTab === "image" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                Images
              </button>
              <button
                onClick={() => setActiveTab("video")}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${activeTab === "video" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                Videos
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-border/50 bg-card overflow-hidden shadow-sm">
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-secondary/30 text-muted-foreground text-[11px] uppercase tracking-wider border-b border-border/50">
                  <tr>
                    <th className="px-4 py-3 font-bold w-16">Preview</th>
                    <th className="px-4 py-3 font-bold">File Details</th>
                    <th className="px-4 py-3 font-bold w-28">Status</th>
                    <th className="px-4 py-3 font-bold text-center w-24">
                      Visibility
                    </th>
                    <th className="px-4 py-3 font-bold text-right w-16">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {media.filter(item => activeTab === "all" || item.type === activeTab).map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-secondary/10 transition-colors group"
                    >
                      <td className="px-4 py-2">
                        <div
                          className="w-12 h-12 rounded-lg overflow-hidden border border-border/50 relative bg-muted/20 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => setPreviewMedia(item)}
                          title="Click to preview"
                        >
                          {item.type === "image" ? (
                            <img
                              src={item.url}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full relative">
                              <video
                                src={item.url}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                <Film className="size-4 text-white drop-shadow-md" />
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-2 max-w-[200px]">
                        <div
                          className="font-bold text-[13px] text-foreground truncate"
                          title={item.name}
                        >
                          {item.name}
                        </div>
                        <div className="text-[11.5px] font-medium text-muted-foreground mt-0.5 uppercase tracking-wider">
                          {(item.size / 1024 / 1024).toFixed(2)} MB •{" "}
                          {item.type}
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        {item.published ? (
                          <div className="inline-flex items-center justify-center w-[90px] gap-1.5 bg-green-500/10 text-green-600 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-green-500/20">
                            <CheckCircle2 className="size-3 shrink-0" />{" "}
                            Published
                          </div>
                        ) : (
                          <div className="inline-flex items-center justify-center w-[90px] gap-1.5 bg-yellow-500/10 text-yellow-600 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-yellow-500/20">
                            <span className="size-1.5 shrink-0 rounded-full bg-yellow-500 animate-pulse" />{" "}
                            Draft
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <div className="flex justify-center">
                          <Toggle
                            enabled={item.published}
                            onChange={() => togglePublish(item.id)}
                          />
                        </div>
                      </td>
                      <td className="px-4 py-2 text-right">
                        <button
                          onClick={() => removeMedia(item.id)}
                          className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors inline-flex"
                          title="Delete file"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-8 flex flex-col items-center justify-center text-center opacity-40 select-none pointer-events-none">
          <ImageIcon className="size-10 text-muted-foreground mb-2 stroke-[1.5]" />
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Your table is empty
          </p>
        </div>
      )}
      {/* Preview Modal */}
      {previewMedia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setPreviewMedia(null)}
        >
          <button
            onClick={() => setPreviewMedia(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 bg-black/40 text-white rounded-full hover:bg-black/60 transition-colors"
          >
            <X className="size-6" />
          </button>
          <div
            className="relative max-w-4xl w-full max-h-[85vh] flex items-center justify-center rounded-xl overflow-hidden animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {previewMedia.type === "image" ? (
              <img
                src={previewMedia.url}
                alt={previewMedia.name}
                className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
              />
            ) : (
              <video
                src={previewMedia.url}
                controls
                autoPlay
                className="max-w-full max-h-[85vh] rounded-xl shadow-2xl bg-black"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
