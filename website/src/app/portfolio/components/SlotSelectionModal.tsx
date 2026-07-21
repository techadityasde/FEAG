import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCustomBookingSlot } from "@/lib/store/bookingSlice";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface SlotSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string;
  availableDates: any[];
  selectedSlot: string | null;
  onSelectSlot: (slot: string) => void;
}

export default function SlotSelectionModal({
  isOpen,
  onClose,
  selectedDate,
  availableDates,
  selectedSlot,
  onSelectSlot,
}: SlotSelectionModalProps) {
  const dispatch = useDispatch();
  
  // Custom slot state
  const [customStartHour, setCustomStartHour] = useState('10');
  const [customStartMinute, setCustomStartMinute] = useState('00');
  const [customStartAmPm, setCustomStartAmPm] = useState('AM');
  const [customEndHour, setCustomEndHour] = useState('06');
  const [customEndMinute, setCustomEndMinute] = useState('00');
  const [customEndAmPm, setCustomEndAmPm] = useState('PM');

  if (!isOpen || !selectedDate) return null;

  const todayObj = new Date();
  const todayStr = `${todayObj.getFullYear()}-${(todayObj.getMonth() + 1).toString().padStart(2, '0')}-${todayObj.getDate().toString().padStart(2, '0')}`;
  const isSelectedDateToday = selectedDate === todayStr;

  const dateData = availableDates?.find(d => d.date === selectedDate);
  let slotsToRender = [];
  if (dateData && dateData.slots && dateData.slots.length > 0) {
    slotsToRender = dateData.slots.map((s: any) => ({ time: s.startTime, isBooked: s.isBooked, id: s.id }));
  }

  // Helper from CalendarSection to filter past slots if it's today
  const isSlotInPast = (timeStr: string, dateStr: string) => {
    const [y, m, d] = dateStr.split("-").map(Number);
    const slotDate = new Date(y, m - 1, d);

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (slotDate.getTime() !== today.getTime()) {
      return slotDate < today;
    }

    const [time, period] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (period.toUpperCase() === "PM" && hours !== 12) hours += 12;
    if (period.toUpperCase() === "AM" && hours === 12) hours = 0;

    const slotDateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
    return slotDateTime < now;
  };

  const validSlots = slotsToRender.filter((s: any) => !isSlotInPast(s.time, selectedDate));

  const handleCustomSlotSubmit = () => {
    const start = `${customStartHour}:${customStartMinute} ${customStartAmPm}`;
    const end = `${customEndHour}:${customEndMinute} ${customEndAmPm}`;
    const customSlotStr = `${start} - ${end}`;
    dispatch(setCustomBookingSlot({ slotStr: customSlotStr, start, end }));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Select Time Slot</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full h-8 w-8 text-gray-500 hover:text-gray-900">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-5 overflow-y-auto space-y-6">
          {/* Standard Slots */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Available Slots</h3>
            {validSlots.length === 0 ? (
               <div className="text-sm text-gray-500 bg-gray-50 py-4 px-3 rounded-lg text-center border border-gray-100">
                 No available slots remaining for this date.
               </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {validSlots.map((slot: any) => (
                  <Button
                    key={slot.id || slot.time}
                    type="button"
                    variant={selectedSlot === slot.time ? "default" : "outline"}
                    disabled={slot.isBooked}
                    onClick={() => {
                      onSelectSlot(slot.time);
                      onClose();
                    }}
                    className={`h-auto py-2 px-1 text-xs font-bold w-full cursor-pointer ${
                      selectedSlot === slot.time
                        ? "bg-primary text-white hover:bg-primary/90 shadow-sm"
                        : slot.isBooked
                        ? "opacity-50 cursor-not-allowed line-through"
                        : "bg-white hover:bg-gray-100 text-gray-700 border-gray-200"
                    }`}
                  >
                    {slot.time}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Custom Slot (Only if not today) */}
          {!isSelectedDateToday && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                 <div className="h-px bg-gray-200 flex-1"></div>
                 <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">OR</span>
                 <div className="h-px bg-gray-200 flex-1"></div>
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Request Custom Time</h3>
              <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold text-gray-600">Start Time</span>
                  <div className="flex gap-2">
                    <select value={customStartHour} onChange={e => setCustomStartHour(e.target.value)} className="flex-1 p-2 border border-gray-200 rounded-lg text-sm font-semibold bg-white focus:ring-2 focus:ring-primary/20 outline-none">
                      {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map(h => <option key={h} value={h}>{h}</option>)}
                    </select>
                    <span className="text-gray-400 font-bold self-center">:</span>
                    <select value={customStartMinute} onChange={e => setCustomStartMinute(e.target.value)} className="flex-1 p-2 border border-gray-200 rounded-lg text-sm font-semibold bg-white focus:ring-2 focus:ring-primary/20 outline-none">
                      {['00', '15', '30', '45'].map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <select value={customStartAmPm} onChange={e => setCustomStartAmPm(e.target.value)} className="flex-1 p-2 border border-gray-200 rounded-lg text-sm font-semibold bg-white focus:ring-2 focus:ring-primary/20 outline-none">
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold text-gray-600">End Time</span>
                  <div className="flex gap-2">
                    <select value={customEndHour} onChange={e => setCustomEndHour(e.target.value)} className="flex-1 p-2 border border-gray-200 rounded-lg text-sm font-semibold bg-white focus:ring-2 focus:ring-primary/20 outline-none">
                      {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map(h => <option key={h} value={h}>{h}</option>)}
                    </select>
                    <span className="text-gray-400 font-bold self-center">:</span>
                    <select value={customEndMinute} onChange={e => setCustomEndMinute(e.target.value)} className="flex-1 p-2 border border-gray-200 rounded-lg text-sm font-semibold bg-white focus:ring-2 focus:ring-primary/20 outline-none">
                      {['00', '15', '30', '45'].map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <select value={customEndAmPm} onChange={e => setCustomEndAmPm(e.target.value)} className="flex-1 p-2 border border-gray-200 rounded-lg text-sm font-semibold bg-white focus:ring-2 focus:ring-primary/20 outline-none">
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>

                <Button onClick={handleCustomSlotSubmit} className="w-full mt-2 font-bold">
                  Confirm Custom Time
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
