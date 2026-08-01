"use client";

import React, { useState, useMemo } from "react";
import {
  ShoppingBag,
  MapPin,
  Calendar,
  Clock,
  Mail,
  Phone,
  MoreHorizontal,
  IndianRupee,
  CheckCircle2,
  Clock3,
  XCircle,
  Search,
  ChevronLeft,
  ChevronRight,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/Modal";

interface Booking {
  id: string;
  service: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  date: string;
  timeSlot: string;
  location: string;
  customer: {
    name: string;
    email: string;
    mobile: string;
    avatar: string;
  };
}

const dummyBookings: Booking[] = [
  {
    id: "BKG-2026-001",
    service: "Premium Wedding Photography",
    amount: 15000,
    status: "confirmed",
    date: "22 Jul 2026",
    timeSlot: "10:00 AM - 02:00 PM",
    location: "Grand Hyatt, Mumbai, MH",
    customer: {
      name: "Rajesh Kumar",
      email: "rajesh.kumar@example.com",
      mobile: "+91 9876543210",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg"
    }
  },
  {
    id: "BKG-2026-002",
    service: "Pre-wedding Cinematic Shoot",
    amount: 8000,
    status: "pending",
    date: "05 Aug 2026",
    timeSlot: "04:00 PM - 08:00 PM",
    location: "Lodhi Gardens, New Delhi, DL",
    customer: {
      name: "Sneha Gupta",
      email: "sneha.g@example.com",
      mobile: "+91 9123456789",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg"
    }
  },
  {
    id: "BKG-2026-003",
    service: "Corporate Event Coverage",
    amount: 18000,
    status: "completed",
    date: "20 Jul 2026",
    timeSlot: "09:00 AM - 06:00 PM",
    location: "JW Marriott, Pune, MH",
    customer: {
      name: "Vikram Singh",
      email: "vikram.singh@example.com",
      mobile: "+91 9012345678",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg"
    }
  },
  {
    id: "BKG-2026-004",
    service: "Maternity Photoshoot",
    amount: 5000,
    status: "cancelled",
    date: "10 Jul 2026",
    timeSlot: "10:00 AM - 12:00 PM",
    location: "Client's Residence, Bangalore, KA",
    customer: {
      name: "Pooja Reddy",
      email: "pooja.reddy@example.com",
      mobile: "+91 9871234567",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg"
    }
  },
  {
    id: "BKG-2026-005",
    service: "Birthday Party Coverage",
    amount: 7500,
    status: "pending",
    date: "12 Aug 2026",
    timeSlot: "05:00 PM - 09:00 PM",
    location: "The Orchid, Mumbai, MH",
    customer: {
      name: "Anil Desai",
      email: "anil.d@example.com",
      mobile: "+91 8877665544",
      avatar: "https://randomuser.me/api/portraits/men/11.jpg"
    }
  },
  {
    id: "BKG-2026-006",
    service: "Fashion Portfolio Shoot",
    amount: 12000,
    status: "confirmed",
    date: "15 Aug 2026",
    timeSlot: "08:00 AM - 04:00 PM",
    location: "Studio 11, Delhi, DL",
    customer: {
      name: "Simran Kaur",
      email: "simran.k@example.com",
      mobile: "+91 9988776655",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg"
    }
  },
  {
    id: "BKG-2026-007",
    service: "Product Photography",
    amount: 9000,
    status: "completed",
    date: "10 Jun 2026",
    timeSlot: "11:00 AM - 05:00 PM",
    location: "Client Office, Bangalore, KA",
    customer: {
      name: "Karan Johar",
      email: "karan.j@example.com",
      mobile: "+91 9988112233",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg"
    }
  },
  {
    id: "BKG-2026-008",
    service: "Real Estate Walkthrough",
    amount: 11000,
    status: "confirmed",
    date: "28 Jul 2026",
    timeSlot: "02:00 PM - 06:00 PM",
    location: "Skyline Apartments, Gurgaon, HR",
    customer: {
      name: "Ravi Shankar",
      email: "ravi.s@example.com",
      mobile: "+91 9122334455",
      avatar: "https://randomuser.me/api/portraits/men/33.jpg"
    }
  }
];

const getStatusConfig = (status: Booking['status']) => {
  switch (status) {
    case 'confirmed':
      return { color: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-900', icon: CheckCircle2, label: 'Confirmed' };
    case 'pending':
      return { color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900', icon: Clock3, label: 'Pending' };
    case 'completed':
      return { color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900', icon: CheckCircle2, label: 'Completed' };
    case 'cancelled':
      return { color: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900', icon: XCircle, label: 'Cancelled' };
    default:
      return { color: 'bg-gray-500/10 text-gray-600 border-gray-200', icon: CheckCircle2, label: 'Unknown' };
  }
};

const ITEMS_PER_PAGE = 5;
type TabOption = 'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled';

export default function CreatorBookings() {
  const [bookings, setBookings] = useState<Booking[]>(dummyBookings);
  const [activeTab, setActiveTab] = useState<TabOption>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  // Filter & Search Logic
  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      // 1. Status Filter
      if (activeTab !== 'all' && booking.status !== activeTab) {
        return false;
      }

      // 2. Search Filter (by ID, Service, or Customer Name)
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesId = booking.id.toLowerCase().includes(query);
        const matchesService = booking.service.toLowerCase().includes(query);
        const matchesCustomer = booking.customer.name.toLowerCase().includes(query);
        if (!matchesId && !matchesService && !matchesCustomer) {
          return false;
        }
      }
      return true;
    });
  }, [activeTab, searchQuery]);

  // Pagination Logic
  const totalPages = Math.max(1, Math.ceil(filteredBookings.length / ITEMS_PER_PAGE));
  const currentBookings = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBookings.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredBookings, currentPage]);

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery]);

  const handleTabChange = (tab: TabOption) => setActiveTab(tab);

  return (
    <div className="space-y-3 pb-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">Bookings</h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            View and manage your incoming customer bookings.
          </p>
        </div>
        <Button className="shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm">
          Export Report
        </Button>
      </div>

      {/* Tabs and Search section */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-3 bg-card border border-border p-3 rounded-xl shadow-sm">
        {/* Tabs */}
        <div className="flex overflow-x-auto w-full xl:w-auto scrollbar-hide pb-2 xl:pb-0 -mb-2 xl:mb-0 gap-2">
          {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const).map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "ghost"}
              size="sm"
              onClick={() => handleTabChange(tab as TabOption)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex items-center h-8 ${activeTab === tab
                  ? 'bg-primary text-primary-foreground shadow-sm hover:bg-primary'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === 'all' && <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${activeTab === tab ? 'bg-white/20 text-white' : 'bg-background text-muted-foreground'}`}>{bookings.length}</span>}
              {tab !== 'all' && (
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${activeTab === tab ? 'bg-white/20 text-white' : 'bg-background text-muted-foreground'}`}>
                  {bookings.filter(b => b.status === tab).length}
                </span>
              )}
            </Button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full xl:w-72 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search bookings or customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-background border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground shadow-sm"
          />
        </div>
      </div>

      {/* Data View */}
      {filteredBookings.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-12 shadow-sm flex flex-col items-center justify-center text-center space-y-4 min-h-[400px]">
          <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Search className="h-8 w-8 text-primary" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-semibold">No bookings found</h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              We couldn't find any bookings matching your filters or search query.
            </p>
          </div>
          <Button variant="outline" onClick={() => { setSearchQuery(''); setActiveTab('all'); }}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <>
          {/* Table View (Hidden on mobile/tablet, visible on lg and up) */}
          <div className="hidden lg:block bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/40 border-b border-border">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold tracking-wider">Booking Info</th>
                    <th scope="col" className="px-4 py-3 font-semibold tracking-wider">Customer</th>
                    <th scope="col" className="px-4 py-3 font-semibold tracking-wider whitespace-nowrap">Date & Time</th>
                    <th scope="col" className="px-4 py-3 font-semibold tracking-wider">Amount</th>
                    <th scope="col" className="px-4 py-3 font-semibold tracking-wider">Status</th>
                    <th scope="col" className="px-4 py-3 font-semibold tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {currentBookings.map((booking) => {
                    const StatusIcon = getStatusConfig(booking.status).icon;
                    const statusConfig = getStatusConfig(booking.status);

                    return (
                      <tr key={booking.id} className="hover:bg-muted/20 transition-colors group">
                        <td className="px-4 py-3">
                          <div className="space-y-1">
                            <p className="text-xs font-semibold text-foreground max-w-[250px] truncate" title={booking.service}>{booking.service}</p>
                            <p className="text-[11px] text-muted-foreground font-mono">{booking.id}</p>
                            <div className="flex items-center text-[11px] text-muted-foreground mt-1">
                              <MapPin className="w-3 h-3 mr-1 shrink-0" />
                              <span className="truncate max-w-[250px]" title={booking.location}>{booking.location}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img src={booking.customer.avatar} alt={booking.customer.name} className="w-10 h-10 rounded-full object-cover border border-border shrink-0" />
                            <div>
                              <p className="text-xs font-medium text-foreground whitespace-nowrap">{booking.customer.name}</p>
                              <p className="text-[11px] text-muted-foreground">{booking.customer.mobile}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="space-y-1.5">
                            <div className="flex items-center text-foreground text-xs whitespace-nowrap">
                              <Calendar className="w-3.5 h-3.5 mr-2 text-primary/70 shrink-0" />
                              <span className="font-medium">{booking.date}</span>
                            </div>
                            <div className="flex items-center text-muted-foreground text-[11px] whitespace-nowrap">
                              <Clock className="w-3.5 h-3.5 mr-2 shrink-0" />
                              {booking.timeSlot}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center font-bold text-foreground text-sm whitespace-nowrap">
                            <IndianRupee className="w-3.5 h-3.5 mr-0.5 text-muted-foreground" />
                            {booking.amount.toLocaleString('en-IN')}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold border whitespace-nowrap ${statusConfig.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            {statusConfig.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end items-center gap-2 transition-opacity">
                            {booking.status === 'pending' && (
                              <>
                                <Button size="sm" variant="outline" onClick={() => setSelectedBooking(booking)} className="text-xs h-8 px-3 bg-white">View</Button>
                                <Button size="sm" variant="outline" onClick={() => updateBookingStatus(booking.id, 'cancelled')} className="text-xs h-8 px-3 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 bg-white">Decline</Button>
                                <Button size="sm" onClick={() => updateBookingStatus(booking.id, 'confirmed')} className="text-xs h-8 px-3 bg-green-600 hover:bg-green-700 text-white shadow-sm">Accept</Button>
                              </>
                            )}
                            {booking.status === 'confirmed' && (
                              <Button size="sm" variant="outline" className="text-xs h-8 px-3 bg-white">Chat</Button>
                            )}
                            {booking.status === 'completed' && (
                              <span className="text-xs font-semibold text-muted-foreground bg-muted px-2 py-1 rounded-md">Delivered</span>
                            )}
                            {booking.status === 'cancelled' && (
                              <span className="text-xs font-semibold text-red-600/70 bg-red-50 px-2 py-1 rounded-md">Cancelled</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Card View (Visible on mobile/tablet, hidden on lg and up) */}
          <div className="grid lg:hidden grid-cols-1 gap-4">
            {currentBookings.map((booking) => {
              const StatusIcon = getStatusConfig(booking.status).icon;
              const statusConfig = getStatusConfig(booking.status);

              return (
                <div key={booking.id} className="bg-card border border-border rounded-xl shadow-sm p-5 space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="text-sm font-bold text-foreground line-clamp-1">{booking.service}</h3>
                      <p className="text-[11px] text-muted-foreground mt-0.5 font-mono">{booking.id}</p>
                    </div>
                    <span className={`shrink-0 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${statusConfig.color}`}>
                      <StatusIcon className="w-3 h-3" />
                      {statusConfig.label}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-y border-border py-3">
                    <div className="flex items-center gap-3">
                      <img src={booking.customer.avatar} alt={booking.customer.name} className="w-10 h-10 rounded-full object-cover border border-border shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-foreground">{booking.customer.name}</p>
                        <p className="text-[11px] text-muted-foreground">{booking.customer.mobile}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] text-muted-foreground">Amount</p>
                      <div className="flex items-center justify-end font-bold text-foreground text-xs">
                        <IndianRupee className="w-3 h-3 mr-0.5 text-muted-foreground" />
                        {booking.amount.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-2 text-foreground">
                      <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span className="truncate font-medium">{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-foreground">
                      <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span className="truncate text-[11px] text-muted-foreground">{booking.timeSlot}</span>
                    </div>
                    <div className="col-span-2 flex items-center gap-2 text-foreground">
                      <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span className="truncate text-[11px] text-muted-foreground">{booking.location}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    {booking.status === 'pending' && (
                      <>
                        <Button size="sm" variant="outline" onClick={() => setSelectedBooking(booking)} className="flex-1 text-[10px] sm:text-xs h-8 bg-white">View</Button>
                        <Button size="sm" variant="outline" onClick={() => updateBookingStatus(booking.id, 'cancelled')} className="flex-1 text-[10px] sm:text-xs h-8 text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-200 bg-white">Decline</Button>
                        <Button size="sm" onClick={() => updateBookingStatus(booking.id, 'confirmed')} className="flex-1 text-[10px] sm:text-xs h-8 bg-green-600 hover:bg-green-700 text-white shadow-sm">Accept</Button>
                      </>
                    )}
                    {booking.status === 'confirmed' && (
                      <Button size="sm" variant="outline" className="flex-1 text-xs h-8 bg-white">Chat</Button>
                    )}
                    {booking.status === 'completed' && (
                      <div className="flex-1 flex items-center justify-center text-xs font-semibold text-muted-foreground bg-muted h-8 rounded-md">Delivered</div>
                    )}
                    {booking.status === 'cancelled' && (
                      <div className="flex-1 flex items-center justify-center text-xs font-semibold text-red-600/70 bg-red-50 h-8 rounded-md">Cancelled</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between bg-card border border-border p-3 rounded-xl shadow-sm">
              <div className="text-sm text-muted-foreground hidden sm:block">
                Showing <span className="font-medium text-foreground">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="font-medium text-foreground">{Math.min(currentPage * ITEMS_PER_PAGE, filteredBookings.length)}</span> of <span className="font-medium text-foreground">{filteredBookings.length}</span> results
              </div>
              <div className="flex items-center justify-center sm:justify-end gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0 bg-white"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="sr-only">Previous Page</span>
                </Button>

                <div className="flex items-center gap-1 mx-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <Button
                      key={i}
                      variant={currentPage === i + 1 ? "default" : "ghost"}
                      size="icon-sm"
                      onClick={() => setCurrentPage(i + 1)}
                      className={`size-8 rounded-md text-sm font-semibold flex items-center justify-center transition-colors ${currentPage === i + 1
                          ? 'bg-primary text-primary-foreground shadow-sm hover:bg-primary'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 p-0 bg-white"
                >
                  <ChevronRight className="w-4 h-4" />
                  <span className="sr-only">Next Page</span>
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Booking Details Modal */}
      {selectedBooking && (
        <Modal 
          isOpen={!!selectedBooking} 
          onClose={() => setSelectedBooking(null)}
          title="Booking Details"
          maxWidth="max-w-2xl"
        >
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-muted/30 p-4 rounded-xl border border-border/50">
              <div>
                <h3 className="font-bold text-foreground text-lg">{selectedBooking.service}</h3>
                <p className="text-sm font-mono text-muted-foreground mt-1">ID: {selectedBooking.id}</p>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusConfig(selectedBooking.status).color}`}>
                {React.createElement(getStatusConfig(selectedBooking.status).icon, { className: "w-4 h-4" })}
                {getStatusConfig(selectedBooking.status).label}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-bold border-b pb-2 text-foreground text-sm uppercase tracking-wider">Schedule & Location</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg text-primary mt-0.5">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">Date</p>
                      <p className="text-sm font-bold text-foreground">{selectedBooking.date}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg text-primary mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">Time Slot</p>
                      <p className="text-sm font-bold text-foreground">{selectedBooking.timeSlot}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg text-primary mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">Location</p>
                      <p className="text-sm font-bold text-foreground leading-snug">{selectedBooking.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold border-b pb-2 text-foreground text-sm uppercase tracking-wider">Customer Details</h4>
                <div className="flex items-center gap-4 bg-muted/20 p-3 rounded-xl border border-border/50">
                  <img src={selectedBooking.customer.avatar} alt={selectedBooking.customer.name} className="w-12 h-12 rounded-full border-2 border-primary/20 object-cover" />
                  <div>
                    <p className="text-sm font-bold text-foreground">{selectedBooking.customer.name}</p>
                    <p className="text-xs text-muted-foreground font-medium flex items-center mt-1"><Phone className="w-3 h-3 mr-1" /> {selectedBooking.customer.mobile}</p>
                  </div>
                </div>
                
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl">
                  <p className="text-xs font-bold text-emerald-600 uppercase tracking-wide mb-1">Total Amount</p>
                  <div className="flex items-center text-2xl font-black text-emerald-600">
                    <IndianRupee className="w-5 h-5 mr-1" />
                    {selectedBooking.amount.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            </div>

            {selectedBooking.status === 'pending' && (
              <div className="flex justify-end gap-3 pt-4 border-t border-border/50 mt-4">
                <Button 
                  variant="outline" 
                  className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 font-semibold"
                  onClick={() => {
                    updateBookingStatus(selectedBooking.id, 'cancelled');
                    setSelectedBooking(null);
                  }}
                >
                  Decline Booking
                </Button>
                <Button 
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md"
                  onClick={() => {
                    updateBookingStatus(selectedBooking.id, 'confirmed');
                    setSelectedBooking(null);
                  }}
                >
                  Accept Booking
                </Button>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}

