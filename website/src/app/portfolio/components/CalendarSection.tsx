import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enableCustomSlot } from "@/lib/store/bookingSlice";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CalendarSectionProps } from "../types";
import SlotSelectionModal from "./SlotSelectionModal";
export default function CalendarSection({
  selectedDate,
  onSelectDate,
  bookedDates,
  limitedDates,
  availableDates,
  selectedSlot,
  onSelectSlot,
}: CalendarSectionProps) {
  const dispatch = useDispatch();
  const booking = useSelector((state: any) => state.booking);
  const { isCustomSlot, customStartTime, customEndTime } = booking || {};
  const [isModalOpen, setIsModalOpen] = useState(false);

  const normalizedSelectedDate = React.useMemo(() => {
    if (!selectedDate) return null;
    const dateObj = new Date(selectedDate);
    if (isNaN(dateObj.getTime())) return selectedDate;
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, [selectedDate]);

  // Calendar state initialized to current month/year
  const [currentMonthDate, setCurrentMonthDate] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  const nextMonth = () => {
    setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() - 1, 1));
  };

  // Calendar math
  const daysInMonth = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth(), 1).getDay();

  // Create padding for previous month
  const prevMonthDays = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth(), 0).getDate();
  const paddingDays = Array.from({ length: firstDayOfMonth }).map((_, i) => prevMonthDays - firstDayOfMonth + i + 1);

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  // Helper to check if a date is in the past
  const isDateInPast = (y: number, m: number, d: number) => {
    const dateToCheck = new Date(y, m, d);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dateToCheck < today;
  };

  // Helper to check if a specific time slot is in the past on a specific date
  const isSlotInPast = (timeStr: string, dateStr: string) => {
    const [y, m, d] = dateStr.split("-").map(Number);
    const slotDate = new Date(y, m - 1, d);

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (slotDate.getTime() !== today.getTime()) {
      return slotDate < today;
    }

    // It's today, check time
    const [time, period] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (period.toUpperCase() === "PM" && hours !== 12) hours += 12;
    if (period.toUpperCase() === "AM" && hours === 12) hours = 0;

    const slotDateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
    return slotDateTime < now;
  };

  return (
    <section className="bg-white border border-border/50 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
      <h2 className="text-xl font-extrabold text-foreground tracking-tight">Availability Calendar</h2>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Calendar Layout */}
        <div className="w-full max-w-sm rounded-xl border border-border p-4 shadow-sm bg-[#FDFBF7]">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-extrabold text-[#2E2215]">
              {monthNames[currentMonthDate.getMonth()]} {currentMonthDate.getFullYear()}
            </span>
            <div className="flex gap-1.5">
              <Button type="button" variant="outline" size="icon-xs" onClick={prevMonth} className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground border border-border cursor-pointer"><ChevronLeft className="size-3.5" /></Button>
              <Button type="button" variant="outline" size="icon-xs" onClick={nextMonth} className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground border border-border cursor-pointer"><ChevronRight className="size-3.5" /></Button>
            </div>
          </div>

          {/* Weekday Row */}
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
            <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold">
            {/* Padding columns for start of month */}
            {paddingDays.map((day, i) => (
              <span key={`pad-${i}`} className="py-1 opacity-25">{day}</span>
            ))}

            {/* Active Days */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const dayNum = idx + 1;
              const dateStr = `${currentMonthDate.getFullYear()}-${(currentMonthDate.getMonth() + 1).toString().padStart(2, "0")}-${dayNum.toString().padStart(2, "0")}`;

              const isPast = isDateInPast(currentMonthDate.getFullYear(), currentMonthDate.getMonth(), dayNum);
              // Make all non-past days available as requested
              const isBooked = isPast;
              const isSelected = normalizedSelectedDate === dateStr;
              const currentDayData = availableDates?.find((d: any) => d.date === dateStr);
              const isCurrentDayBooked = currentDayData?.isSlotBooked || false;

              return (
                <Button
                  key={idx}
                  type="button"
                  onClick={() => onSelectDate(dateStr)}
                  disabled={isBooked}
                  variant={isSelected ? "default" : "outline"}
                  className={`h-auto py-1.5 rounded-md transition-all font-bold relative flex flex-col items-center justify-center ${isSelected && isCustomSlot && !isCurrentDayBooked
                    ? "bg-emerald-700 text-white shadow-sm ring-1 ring-emerald-700 hover:bg-emerald-800"
                    : isSelected
                      ? "bg-primary text-white shadow-sm ring-1 ring-primary hover:bg-primary/90"
                      : isPast
                        ? "bg-gray-50 text-gray-400 cursor-not-allowed opacity-50 border-gray-100"
                        : "bg-green-50 text-green-700 hover:bg-green-100 border-green-200 cursor-pointer"
                    }`}
                >
                  {dayNum}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="flex-1 space-y-4">
          {normalizedSelectedDate ? (
            (() => {
              const selectedDateData = availableDates?.find((d: any) => d.date === normalizedSelectedDate);
              const isSelectedDateBooked = selectedDateData?.isSlotBooked || false;

              const todayObj = new Date();
              const todayStr = `${todayObj.getFullYear()}-${(todayObj.getMonth() + 1).toString().padStart(2, '0')}-${todayObj.getDate().toString().padStart(2, '0')}`;
              const isSelectedDateToday = normalizedSelectedDate === todayStr;

              const hasCustomTimes = customStartTime !== null && customEndTime !== null && !isSelectedDateToday;

              return (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-extrabold text-foreground">Time Slot</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Select a preferred time slot for your booking on {new Date(selectedDate!).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}.
                    </p>

                    <div className="pt-4">
                      {isCustomSlot && customStartTime && customEndTime ? (
                        <div className="border p-4 rounded-xl shadow-sm flex flex-col items-center justify-center gap-1.5 bg-emerald-50 border-emerald-200 ring-2 ring-emerald-500/20 mb-4">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-center text-emerald-600">Custom Time Selected</span>
                          <span className="text-lg sm:text-xl font-black text-center text-emerald-800">{customStartTime} - {customEndTime}</span>
                        </div>
                      ) : selectedSlot ? (
                        <div className="border p-4 rounded-xl shadow-sm flex flex-col items-center justify-center gap-1.5 bg-primary/5 border-primary/20 ring-2 ring-primary/20 mb-4">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-center text-primary">Standard Time Selected</span>
                          <span className="text-lg sm:text-xl font-black text-center text-foreground">{selectedSlot}</span>
                        </div>
                      ) : (
                        <div className="border border-dashed p-6 rounded-xl text-center mb-4 text-gray-500 text-sm">
                          No time slot selected yet.
                        </div>
                      )}

                      <Button onClick={() => setIsModalOpen(true)} className="w-full font-bold">
                        {isCustomSlot || selectedSlot ? "Change Time Slot" : "Select Time Slot"}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })()
          ) : (
            <>
              <h3 className="text-sm font-extrabold text-foreground">Select an Available Date</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Check standard availability before scheduling booking queries. Active green/primary indicators indicate selections.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                  <span className="size-4 rounded border border-green-200 bg-green-50" />
                  <span>Available Day</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <SlotSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={normalizedSelectedDate!}
        availableDates={availableDates}
        selectedSlot={selectedSlot}
        onSelectSlot={onSelectSlot}
      />
    </section>
  );
}
