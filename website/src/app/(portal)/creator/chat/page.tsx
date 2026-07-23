"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { Button } from "@/components/ui/button";
import {
  Search,
  Send,
  Paperclip,
  Phone,
  Video,
  Info,
  CheckCheck,
  ArrowLeft,
  Circle,
  Sparkles,
  MessageSquare,
  Image as ImageIcon,
  MoreVertical,
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "me" | "client";
  text: string;
  time: string;
  image?: string;
  status?: "sent" | "delivered" | "read";
}

interface Conversation {
  id: string;
  clientName: string;
  avatar: string;
  projectTitle: string;
  online: boolean;
  unreadCount: number;
  lastMessage: string;
  lastTime: string;
  category: "booked" | "inquiry";
  messages: ChatMessage[];
}

const initialConversations: Conversation[] = [
  {
    id: "1",
    clientName: "Aarav Sharma",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
    projectTitle: "Destination Wedding Shoot (Jaipur)",
    online: true,
    unreadCount: 2,
    lastMessage: "Looking forward to seeing the preliminary shot list!",
    lastTime: "10:45 AM",
    category: "booked",
    messages: [
      {
        id: "m1",
        sender: "client",
        text: "Hi! We're super excited for our wedding shoot in Jaipur next month.",
        time: "10:30 AM",
      },
      {
        id: "m2",
        sender: "me",
        text: "Hello Aarav! I'm thrilled to be capturing your special day. I've reviewed your venue details.",
        time: "10:35 AM",
        status: "read",
      },
      {
        id: "m3",
        sender: "client",
        text: "Great! Could you share the estimated timeline and camera crew details?",
        time: "10:40 AM",
      },
      {
        id: "m4",
        sender: "client",
        text: "Looking forward to seeing the preliminary shot list!",
        time: "10:45 AM",
      },
    ],
  },
  {
    id: "2",
    clientName: "Priya Patel",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300",
    projectTitle: "Fashion Brand Autumn Campaign",
    online: false,
    unreadCount: 0,
    lastMessage: "The moodboard looks incredible! Thanks again.",
    lastTime: "Yesterday",
    category: "booked",
    messages: [
      {
        id: "m2-1",
        sender: "me",
        text: "Hi Priya, here is the updated lighting setup for the outdoor studio shoot.",
        time: "Yesterday 3:15 PM",
        status: "read",
      },
      {
        id: "m2-2",
        sender: "client",
        text: "The moodboard looks incredible! Thanks again.",
        time: "Yesterday 4:02 PM",
      },
    ],
  },
  {
    id: "3",
    clientName: "Rohan Kapoor",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    projectTitle: "Corporate Commercial Video Shoot",
    online: true,
    unreadCount: 1,
    lastMessage: "Are you available for a quick prep call today?",
    lastTime: "Jul 21",
    category: "inquiry",
    messages: [
      {
        id: "m3-1",
        sender: "client",
        text: "Hi there! We are looking for a senior videographer for a 2-day tech summit in Bangalore.",
        time: "Jul 21 2:00 PM",
      },
      {
        id: "m3-2",
        sender: "me",
        text: "Hello Rohan! Yes, I specialize in corporate event coverage. I have packages tailored for 2-day summits.",
        time: "Jul 21 2:20 PM",
        status: "read",
      },
      {
        id: "m3-3",
        sender: "client",
        text: "Are you available for a quick prep call today?",
        time: "Jul 21 3:45 PM",
      },
    ],
  },
  {
    id: "4",
    clientName: "Sneha Verma",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300",
    projectTitle: "Music Video Production",
    online: false,
    unreadCount: 0,
    lastMessage: "Payment for the initial deposit has been processed.",
    lastTime: "Jul 19",
    category: "booked",
    messages: [
      {
        id: "m4-1",
        sender: "client",
        text: "Payment for the initial deposit has been processed.",
        time: "Jul 19 11:10 AM",
      },
      {
        id: "m4-2",
        sender: "me",
        text: "Received! Thank you Sneha. We are locked in for the August shoot dates.",
        time: "Jul 19 11:30 AM",
        status: "read",
      },
    ],
  },
];

export default function CreatorChatPage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [activeId, setActiveId] = useState<string>("1");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTab, setFilterTab] = useState<"all" | "unread" | "booked">("all");
  const [inputText, setInputText] = useState("");
  const [mobileShowChat, setMobileShowChat] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const activeConv = conversations.find((c) => c.id === activeId) || conversations[0];

  // Auto-scroll messages container to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConv?.messages]);

  // Filter conversations
  const filteredConversations = conversations.filter((c) => {
    const matchesSearch =
      c.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.projectTitle.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (filterTab === "unread") return c.unreadCount > 0;
    if (filterTab === "booked") return c.category === "booked";
    return true;
  });

  const handleSelectConv = (id: string) => {
    setActiveId(id);
    setMobileShowChat(true);
    // Mark as read
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c))
    );
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: ChatMessage = {
      id: "msg-" + Date.now(),
      sender: "me",
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
    };

    const updatedText = inputText.trim();
    setInputText("");

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeId) {
          return {
            ...c,
            lastMessage: updatedText,
            lastTime: "Just now",
            messages: [...c.messages, newMessage],
          };
        }
        return c;
      })
    );

    // Simulate auto-reply from client for interactive realism
    setTimeout(() => {
      const autoReply: ChatMessage = {
        id: "msg-reply-" + Date.now(),
        sender: "client",
        text: "Thanks for the update! Let me review this and get back to you shortly.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === activeId) {
            return {
              ...c,
              lastMessage: autoReply.text,
              lastTime: "Just now",
              messages: [...c.messages, autoReply],
            };
          }
          return c;
        })
      );
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-6.5rem)] sm:h-[calc(100vh-7rem)] lg:h-[calc(100vh-7.5rem)] flex flex-col">
      {/* Container Card */}
      <div className="flex-1 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col md:flex-row">
        {/* ================= LEFT SIDEBAR (CONVERSATIONS LIST) ================= */}
        <div
          className={`w-full md:w-80 lg:w-96 border-r border-slate-200/80 flex flex-col bg-slate-50/40 shrink-0 ${
            mobileShowChat ? "hidden md:flex" : "flex"
          }`}
        >
          {/* Sidebar Header */}
          <div className="p-4 border-b border-slate-200/80 space-y-3 bg-white">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare className="size-4.5 text-primary" />
                Client Messages
              </h2>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                {conversations.reduce((sum, c) => sum + c.unreadCount, 0)} New
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 size-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search clients or projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-100/80 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-1.5 p-1 bg-slate-100 rounded-xl">
              {(["all", "unread", "booked"] as const).map((tab) => (
                <Button
                  key={tab}
                  variant={filterTab === tab ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setFilterTab(tab)}
                  className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg capitalize transition-all cursor-pointer h-7 ${
                    filterTab === tab
                      ? "bg-white text-slate-900 shadow-xs hover:bg-white"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {tab}
                </Button>
              ))}
            </div>
          </div>

          {/* Conversations Scroll List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {filteredConversations.length === 0 ? (
              <div className="p-8 text-center text-slate-400 space-y-2">
                <MessageSquare className="size-8 mx-auto stroke-1" />
                <p className="text-xs font-medium">No conversation found</p>
              </div>
            ) : (
              filteredConversations.map((conv) => {
                const isSelected = conv.id === activeId;
                return (
                  <div
                    key={conv.id}
                    onClick={() => handleSelectConv(conv.id)}
                    className={`p-3.5 flex items-start gap-3 cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? "bg-primary/5 border-l-4 border-primary"
                        : "hover:bg-slate-100/60"
                    }`}
                  >
                    {/* Avatar with status indicator */}
                    <div className="relative shrink-0">
                      <img
                        src={conv.avatar}
                        alt={conv.clientName}
                        className="size-11 rounded-full object-cover border border-slate-200 shadow-2xs"
                      />
                      {conv.online && (
                        <span className="absolute bottom-0 right-0 size-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <h4
                          className={`text-xs sm:text-[13px] truncate ${
                            conv.unreadCount > 0 ? "font-bold text-slate-900" : "font-semibold text-slate-800"
                          }`}
                        >
                          {conv.clientName}
                        </h4>
                        <span className="text-[10px] text-slate-400 shrink-0 font-medium">
                          {conv.lastTime}
                        </span>
                      </div>

                      <p className="text-[11px] text-primary font-medium truncate mb-1">
                        {conv.projectTitle}
                      </p>

                      <div className="flex items-center justify-between">
                        <p className="text-[11px] text-slate-500 truncate max-w-[170px]">
                          {conv.lastMessage}
                        </p>
                        {conv.unreadCount > 0 && (
                          <span className="size-4.5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center shrink-0 shadow-xs">
                            {conv.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ================= RIGHT MAIN WINDOW (CHAT MESSAGES) ================= */}
        <div
          className={`flex-1 flex flex-col bg-white ${
            !mobileShowChat ? "hidden md:flex" : "flex"
          }`}
        >
          {/* Active Chat Header */}
          <div className="h-16 px-4 sm:px-6 border-b border-slate-200/80 flex items-center justify-between bg-white shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => setMobileShowChat(false)}
                className="md:hidden rounded-xl border-slate-200 text-slate-600"
              >
                <ArrowLeft className="size-4" />
              </Button>

              <div className="relative shrink-0">
                <img
                  src={activeConv.avatar}
                  alt={activeConv.clientName}
                  className="size-10 rounded-full object-cover border border-slate-200"
                />
                {activeConv.online && (
                  <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                )}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs sm:text-[13px] font-bold text-slate-900 truncate">
                    {activeConv.clientName}
                  </h3>
                  <span className="hidden sm:inline-block text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                    Booked Client
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium truncate">
                  {activeConv.projectTitle}
                </p>
              </div>
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <Button
                variant="outline"
                size="icon-sm"
                className="rounded-xl border-slate-200/80 text-slate-600"
                title="Booking Details"
              >
                <Info className="size-4" />
              </Button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/30 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {/* Date Badge */}
            <div className="flex items-center justify-center my-2">
              <span className="text-[10px] font-bold text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-200/60 shadow-xs uppercase tracking-wider">
                Today
              </span>
            </div>

            {activeConv.messages.map((msg) => {
              const isMe = msg.sender === "me";
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[70%] p-3.5 text-xs sm:text-[13px] leading-relaxed shadow-xs ${
                      isMe
                        ? "bg-primary text-white rounded-2xl rounded-tr-xs"
                        : "bg-white text-slate-800 rounded-2xl rounded-tl-xs border border-slate-200/80"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>
                  <div className="flex items-center gap-1 mt-1 px-1 text-[10px] text-slate-400">
                    <span>{msg.time}</span>
                    {isMe && (
                      <CheckCheck className="size-3 text-primary stroke-[2.5]" />
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-3 sm:p-4 bg-white border-t border-slate-200/80">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="rounded-xl text-slate-400 hover:text-slate-600"
                title="Attach file"
              >
                <Paperclip className="size-4.5" />
              </Button>

              <input
                type="text"
                placeholder={`Message ${activeConv.clientName}...`}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-slate-100/80 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />

              <Button
                type="submit"
                disabled={!inputText.trim()}
                size="icon"
                className="size-10 rounded-xl bg-primary hover:bg-primary/95 text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <Send className="size-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
