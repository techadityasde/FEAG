"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Calendar as CalendarIcon, Clock, ChevronDown, ChevronLeft, ChevronRight, MapPin, RotateCcw, PartyPopper, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { LocationModal } from '../LocationModal';
import { EventSelectionModal } from '../EventSelectionModal';
import { setBookingDate, setBookingSlot, setCustomBookingSlot } from '@/lib/store/bookingSlice';

const SLOTS = ['10:00 AM', '02:00 PM', '06:00 PM'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

interface SearchFormPlanProps {
  activeTab?: string;
  onSearch?: () => void;
  showSearchButton?: boolean;
}

export default function SearchFormPlan({
  activeTab,
  onSearch,
  showSearchButton = true,
}: SearchFormPlanProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const selectedDateStr = useSelector((state: any) => state.booking.selectedDate);
  const selectedSlot = useSelector((state: any) => state.booking.selectedSlot);
  const location = useSelector((state: any) => state.location);
  const event = useSelector((state: any) => state.event);

  const selectedDate = selectedDateStr ? new Date(selectedDateStr) : null;

  // Validation: Search button disabled until both location and date selection are not null/empty
  const isLocationSelected = Boolean(location?.address && location.address.trim() !== "");
  const isDateSelected = Boolean(selectedDateStr);
  const isSearchDisabled = !isLocationSelected || !isDateSelected;

  const handleSearchClick = () => {
    if (isSearchDisabled) return;
    if (onSearch) {
      onSearch();
    } else {
      const targetCategory = activeTab && activeTab !== "All" ? activeTab : "photographer";
      router.push(`/services/${targetCategory}`);
    }
  };

  const [showCalendar, setShowCalendar] = useState(false);
  const [showSlots, setShowSlots] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);

  // Custom Slot State
  const [isCustomSlotMode, setIsCustomSlotMode] = useState(false);
  const [customStartHour, setCustomStartHour] = useState("10");
  const [customStartMinute, setCustomStartMinute] = useState("00");
  const [customStartAmPm, setCustomStartAmPm] = useState("AM");

  const [customEndHour, setCustomEndHour] = useState("02");
  const [customEndMinute, setCustomEndMinute] = useState("00");
  const [customEndAmPm, setCustomEndAmPm] = useState("PM");

  // Reset custom slot mode when popover closes
  useEffect(() => {
    if (!showSlots) {
      setIsCustomSlotMode(false);
    }
  }, [showSlots]);

  // Calendar State
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const isSelectedDateToday = selectedDate?.getTime() === today.getTime();

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const containerRef = useRef<HTMLDivElement>(null);

  // Close popovers on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
        setShowSlots(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const prevMonth = () => {
    const prevM = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevY = currentMonth === 0 ? currentYear - 1 : currentYear;

    if (prevY > today.getFullYear() || (prevY === today.getFullYear() && prevM >= today.getMonth())) {
      setCurrentMonth(prevM);
      setCurrentYear(prevY);
    }
  };

  const getDaysArray = (year: number, month: number) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  };

  const isDateDisabled = (year: number, month: number, day: number) => {
    const date = new Date(year, month, day);
    return date < today;
  };

  const handleDateSelect = (year: number, month: number, day: number) => {
    if (isDateDisabled(year, month, day)) return;
    const newDate = new Date(year, month, day);
    dispatch(setBookingDate(newDate.toISOString()));
    setShowCalendar(false);
    setShowSlots(true);
  };

  const formatDateDisplay = (date: Date | null) => {
    if (!date) return 'Select Date';
    return `${date.getDate()} ${MONTHS[date.getMonth()].slice(0, 3)} '${date.getFullYear().toString().slice(2)}`;
  };

  const renderMonthGrid = (year: number, month: number) => (
    <div className="flex-1 w-full min-w-[240px]">
      <div className="flex items-center justify-center mb-3">
        <span className="font-extrabold text-[15px] text-foreground">
          {MONTHS[month]} <span className="font-medium">{year}</span>
        </span>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-1">
        {DAYS.map(day => (
          <div key={day} className="text-[10px] font-bold text-muted-foreground uppercase">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {getDaysArray(year, month).map((day, idx) => {
          if (day === null) return <div key={`empty-${idx}`} className="h-8" />;

          const disabled = isDateDisabled(year, month, day);
          const isSelected = selectedDate?.getDate() === day && selectedDate?.getMonth() === month && selectedDate?.getFullYear() === year;
          const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;

          return (
            <button
              key={day}
              disabled={disabled}
              onClick={() => handleDateSelect(year, month, day)}
              className={cn(
                "flex items-center justify-center h-8 w-full rounded-md text-xs font-bold transition-all relative",
                disabled ? "text-muted-foreground/30 cursor-not-allowed" : "hover:bg-blue-50 cursor-pointer text-foreground",
                isSelected && "bg-[#008cff] text-white hover:bg-[#0070cc]",
                isToday && !isSelected && "text-[#008cff]"
              )}
            >
              {day}
              {isToday && !isSelected && <div className="absolute bottom-0.5 w-1 h-1 rounded-full bg-[#008cff]" />}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-col gap-1.5">
      {/* Title */}
      <div className="flex items-center justify-between mb-0.5">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-black text-slate-800 capitalize tracking-tight">
            Book {activeTab || "Service"}
          </h3>
          <span className="text-[9px] bg-[#fff5e5] text-[#f5a623] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
            Fast Booking
          </span>
        </div>
        {(selectedDateStr || selectedSlot) && (
          <button
            onClick={() => {
              dispatch(setBookingDate(null));
              dispatch(setBookingSlot(null));
            }}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
            title="Reset Selection"
          >
            <RotateCcw className="size-4" strokeWidth={2.5} />
          </button>
        )}
      </div>

      <div className="relative w-full" ref={containerRef}>
        <div className="flex flex-col md:flex-row w-full border border-gray-300 rounded-xl bg-white shadow-sm divide-y md:divide-y-0 md:divide-x divide-gray-300">

          {/* Location Selector */}
          <div
            className={cn("flex-[1.2] p-2 sm:p-3 hover:bg-blue-50/30 transition-colors cursor-pointer rounded-t-xl md:rounded-l-xl md:rounded-tr-none")}
            onClick={() => { setShowLocationModal(true); setShowEventModal(false); setShowCalendar(false); setShowSlots(false); }}
          >
            <div className="w-full h-full flex flex-col justify-center">
              <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1 mb-0.5 tracking-wide">
                <MapPin className="size-3" />
                CITY <ChevronDown className="size-3 ml-0.5 text-[#008cff]" />
              </span>
              <div className="flex flex-col">
                <span className={cn("text-base sm:text-xl font-black truncate max-w-[150px] sm:max-w-[180px] leading-tight", !location.address ? "text-gray-400" : "text-black")}>
                  {location.address ? location.address.split(',')[0] : 'Select City'}
                </span>
                <p className="text-[10px] font-medium text-gray-600 mt-0.5 truncate max-w-[150px] sm:max-w-[180px]">
                  {location.address ? location.address : 'Any location'}
                </p>
              </div>
            </div>
          </div>

          {/* Event Selector */}
          <div
            className={cn("flex-[1.2] p-2 sm:p-3 hover:bg-blue-50/30 transition-colors cursor-pointer")}
            onClick={() => { setShowEventModal(true); setShowLocationModal(false); setShowCalendar(false); setShowSlots(false); }}
          >
            <div className="w-full h-full flex flex-col justify-center">
              <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1 mb-0.5 tracking-wide">
                <PartyPopper className="size-3" />
                EVENT <ChevronDown className="size-3 ml-0.5 text-[#008cff]" />
              </span>
              <div className="flex flex-col">
                <span className={cn("text-base sm:text-xl font-black truncate max-w-[150px] sm:max-w-[180px] leading-tight", !event.eventFunction ? "text-gray-400" : "text-black")}>
                  {event.eventFunction ? event.eventFunction : 'Select Event'}
                </span>
                <p className="text-[10px] font-medium text-gray-600 mt-0.5 truncate max-w-[150px] sm:max-w-[180px]">
                  {event.eventType ? event.eventType : 'Any event'}
                </p>
              </div>
            </div>
          </div>

          {/* Date Selector */}
          <div
            className={cn("flex-1 p-2 sm:p-3 hover:bg-blue-50/30 transition-colors cursor-pointer", showCalendar && "bg-blue-50/50")}
            onClick={() => { setShowCalendar(!showCalendar); setShowSlots(false); setShowEventModal(false); setShowLocationModal(false); }}
          >
            <div className="w-full h-full flex flex-col">
              <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1 mb-0.5 tracking-wide">
                <CalendarIcon className="size-3" />
                DATE <ChevronDown className="size-3 ml-0.5 text-[#008cff]" />
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className={cn("text-xl font-black leading-none", !selectedDate ? "text-gray-400" : "text-black")}>
                  {selectedDate ? selectedDate.getDate() : '--'}
                </span>
                <span className="text-sm font-bold text-black">
                  {selectedDate ? `${MONTHS[selectedDate.getMonth()].slice(0, 3)} '${selectedDate.getFullYear().toString().slice(2)}` : 'Date'}
                </span>
              </div>
              <p className="text-[10px] font-medium text-gray-600 mt-0.5">
                {selectedDate ? DAYS[selectedDate.getDay()] + 'day' : 'Any day'}
              </p>
            </div>
          </div>

          {/* Slot Selector */}
          <div
            className={cn("flex-1 p-2 sm:p-3 transition-colors rounded-b-xl md:rounded-r-xl md:rounded-bl-none", !selectedDate ? "opacity-60 bg-gray-50 cursor-not-allowed" : "hover:bg-blue-50/30 cursor-pointer", showSlots && "bg-blue-50/50")}
            onClick={() => { if (selectedDate) { setShowSlots(!showSlots); setShowCalendar(false); setShowEventModal(false); setShowLocationModal(false); } }}
          >
            <div className="w-full h-full flex flex-col">
              <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1 mb-0.5 tracking-wide">
                <Clock className="size-3" />
                TIME SLOT <ChevronDown className="size-3 ml-0.5 text-[#008cff]" />
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className={cn("text-xl font-black leading-none", !selectedSlot ? "text-gray-400" : "text-black", selectedSlot && selectedSlot.includes('-') && "text-sm")}>
                  {selectedSlot ? (selectedSlot.includes('-') ? selectedSlot : selectedSlot.split(' ')[0]) : '--:--'}
                </span>
                <span className="text-sm font-bold text-black">
                  {selectedSlot && !selectedSlot.includes('-') ? selectedSlot.split(' ')[1] : ''}
                </span>
              </div>
              <p className="text-[10px] font-medium text-gray-600 mt-0.5">
                {selectedDate ? (selectedSlot ? 'Slot Selected' : 'Select a slot') : 'Select date first'}
              </p>
            </div>
          </div>
        </div>

        {/* Single Calendar Popover */}
        <AnimatePresence>
          {showCalendar && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-[calc(100%-100px)] md:top-[calc(100%-8px)] left-0 md:left-[600px] bg-white rounded-xl border border-gray-200 shadow-[0_12px_40px_rgba(0,0,0,0.12)] p-4 z-50 w-[280px] overflow-hidden"
            >
              <div className="flex flex-col relative">
                {/* Global Nav Buttons */}
                <button onClick={prevMonth} className="absolute left-0 top-0 p-1 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-30 z-10"
                  disabled={currentYear === today.getFullYear() && currentMonth === today.getMonth()}>
                  <ChevronLeft className="size-4 text-gray-600" />
                </button>
                <button onClick={nextMonth} className="absolute right-0 top-0 p-1 hover:bg-gray-100 rounded-full transition-colors z-10">
                  <ChevronRight className="size-4 text-gray-600" />
                </button>

                {/* Single Calendar */}
                {renderMonthGrid(currentYear, currentMonth)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Improved Slots Popover */}
        <AnimatePresence>
          {showSlots && selectedDate && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-[calc(100%+8px)] left-0 md:left-auto md:right-50 bg-white rounded-xl border border-gray-200 shadow-[0_12px_40px_rgba(0,0,0,0.12)] p-4 z-50 w-full md:w-[280px]"
            >
              {!isCustomSlotMode ? (
                <>
                  <div className="mb-3">
                    <span className="text-sm font-black text-black">Available Time Slots</span>
                    <p className="text-[11px] text-gray-500 font-medium mt-0.5">Select a time for {formatDateDisplay(selectedDate)}</p>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {SLOTS.map((slot) => {
                      const isSelected = selectedSlot === slot;
                      return (
                        <button
                          key={slot}
                          onClick={() => {
                            dispatch(setBookingSlot(slot));
                            setShowSlots(false);
                          }}
                          className={cn(
                            "flex items-center justify-center gap-1.5 p-2 rounded-lg border-2 text-[13px] font-bold transition-all",
                            isSelected
                              ? "border-[#008cff] bg-[#f0f8ff] text-[#008cff] shadow-sm"
                              : "border-gray-200 hover:border-[#008cff]/40 hover:bg-gray-50 text-gray-700"
                          )}
                        >
                          <Clock className={cn("size-3.5", isSelected ? "text-[#008cff]" : "text-gray-400")} />
                          {slot}
                        </button>
                      );
                    })}
                    {!isSelectedDateToday && (
                      <button
                        onClick={() => setIsCustomSlotMode(true)}
                        className="flex items-center justify-center gap-1.5 p-2 rounded-lg border-2 border-dashed border-gray-300 text-[13px] font-bold text-gray-600 hover:border-[#008cff]/50 hover:bg-gray-50 hover:text-[#008cff] transition-all mt-1"
                      >
                        + Custom Slot
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-3 flex items-center gap-2">
                    <button onClick={() => setIsCustomSlotMode(false)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                      <ChevronLeft className="size-4 text-gray-600" />
                    </button>
                    <span className="text-sm font-black text-black">Custom Slot</span>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">Start Time</span>
                      <div className="flex gap-1.5">
                        <select value={customStartHour} onChange={e => setCustomStartHour(e.target.value)} className="flex-1 p-2 border border-gray-200 rounded-lg text-sm font-bold bg-gray-50 outline-none focus:border-[#008cff] focus:ring-1 focus:ring-[#008cff]/30 cursor-pointer">
                          {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map(h => <option key={h} value={h}>{h}</option>)}
                        </select>
                        <span className="text-gray-400 font-bold self-center">:</span>
                        <select value={customStartMinute} onChange={e => setCustomStartMinute(e.target.value)} className="flex-1 p-2 border border-gray-200 rounded-lg text-sm font-bold bg-gray-50 outline-none focus:border-[#008cff] focus:ring-1 focus:ring-[#008cff]/30 cursor-pointer">
                          {['00', '15', '30', '45'].map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                        <select value={customStartAmPm} onChange={e => setCustomStartAmPm(e.target.value)} className="flex-1 p-2 border border-gray-200 rounded-lg text-sm font-bold bg-gray-50 outline-none focus:border-[#008cff] focus:ring-1 focus:ring-[#008cff]/30 cursor-pointer">
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">End Time</span>
                      <div className="flex gap-1.5">
                        <select value={customEndHour} onChange={e => setCustomEndHour(e.target.value)} className="flex-1 p-2 border border-gray-200 rounded-lg text-sm font-bold bg-gray-50 outline-none focus:border-[#008cff] focus:ring-1 focus:ring-[#008cff]/30 cursor-pointer">
                          {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map(h => <option key={h} value={h}>{h}</option>)}
                        </select>
                        <span className="text-gray-400 font-bold self-center">:</span>
                        <select value={customEndMinute} onChange={e => setCustomEndMinute(e.target.value)} className="flex-1 p-2 border border-gray-200 rounded-lg text-sm font-bold bg-gray-50 outline-none focus:border-[#008cff] focus:ring-1 focus:ring-[#008cff]/30 cursor-pointer">
                          {['00', '15', '30', '45'].map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                        <select value={customEndAmPm} onChange={e => setCustomEndAmPm(e.target.value)} className="flex-1 p-2 border border-gray-200 rounded-lg text-sm font-bold bg-gray-50 outline-none focus:border-[#008cff] focus:ring-1 focus:ring-[#008cff]/30 cursor-pointer">
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        const start = `${customStartHour}:${customStartMinute} ${customStartAmPm}`;
                        const end = `${customEndHour}:${customEndMinute} ${customEndAmPm}`;
                        const customSlotStr = `${start} - ${end}`;
                        dispatch(setCustomBookingSlot({ slotStr: customSlotStr, start, end }));
                        setShowSlots(false);
                      }}
                      className="w-full bg-[#008cff] hover:bg-[#0070cc] text-white font-bold text-sm py-2.5 rounded-lg mt-1 transition-colors shadow-sm"
                    >
                      Confirm Time
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <LocationModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
      />

      <EventSelectionModal
        isOpen={showEventModal}
        onClose={() => setShowEventModal(false)}
      />

      {/* Search Button Container */}
      {showSearchButton && (
        <div className="flex flex-col items-center justify-center mt-3 sm:mt-4">
          <button
            type="button"
            disabled={isSearchDisabled}
            onClick={handleSearchClick}
            className={cn(
              "bg-primary text-white font-black text-xs sm:text-sm py-3 px-10 sm:px-14 rounded-full shadow-lg transition-all uppercase tracking-wide cursor-pointer flex items-center justify-center gap-2",
              isSearchDisabled
                ? "opacity-50 cursor-not-allowed shadow-none hover:bg-primary"
                : "hover:bg-primary/95 active:scale-95 hover:shadow-xl"
            )}
          >
            <Search className="size-4" />
            <span>Search</span>
          </button>

          {isSearchDisabled && (
            <p className="text-[11px] font-semibold text-muted-foreground mt-1.5 flex items-center gap-1">
              {!isLocationSelected && !isDateSelected
                ? "* Please select a location and date to enable search"
                : !isLocationSelected
                ? "* Please select a location to enable search"
                : "* Please select a booking date to enable search"}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
