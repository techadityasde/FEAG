"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEvent } from "@/lib/store/eventSlice";
import { Modal } from "@/components/ui/Modal";
import { eventTypes } from "@/lib/data/event";
import { ChevronRight, X, PartyPopper } from "lucide-react";
import { RootState } from "@/lib/store/store";

interface EventSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EventSelectionModal({ isOpen, onClose }: EventSelectionModalProps) {
  const dispatch = useDispatch();
  const currentEvent = useSelector((state: RootState) => state.event);

  const [selectedEventTypeId, setSelectedEventTypeId] = useState<string | null>(null);
  const [otherEventValue, setOtherEventValue] = useState("");

  // Reset local state when modal opens
  useEffect(() => {
    if (isOpen) {
      if (currentEvent.eventType) {
        if (currentEvent.eventType === "Others") {
          setSelectedEventTypeId("others");
          setOtherEventValue(currentEvent.eventFunction || "");
        } else {
          // Find the event type ID based on the stored name
          const foundEventType = eventTypes.find(et => et.eventType === currentEvent.eventType);
          if (foundEventType) {
            setSelectedEventTypeId(foundEventType.id);
          } else {
            setSelectedEventTypeId(null);
          }
          setOtherEventValue("");
        }
      } else {
        setSelectedEventTypeId(null);
        setOtherEventValue("");
      }
    }
  }, [isOpen, currentEvent.eventType, currentEvent.eventFunction]);

  const handleClose = () => {
    onClose();
  };

  const handleEventTypeSelect = (eventTypeId: string) => {
    if (selectedEventTypeId === eventTypeId) {
      setSelectedEventTypeId(null); // Toggle off
    } else {
      setSelectedEventTypeId(eventTypeId);
    }
  };

  const handleEventFunctionSelect = (eventTypeName: string, eventFunctionName: string) => {
    dispatch(setEvent({ eventType: eventTypeName, eventFunction: eventFunctionName }));
    handleClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} hideCloseButton={true} title={undefined} disableOutsideClick={true}>
      <div className="flex flex-col gap-0 -m-4 sm:-m-6 h-[70vh] max-h-[600px]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-border/50 flex items-center justify-between sticky top-0 bg-white z-10 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-[17px] text-foreground flex items-center gap-2">
              <PartyPopper className="size-5 text-primary" />
              Select Event
            </h3>
          </div>
          <button onClick={handleClose} className="p-2 bg-muted/50 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer shrink-0">
            <X className="size-5" />
          </button>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50 mt-2">
          <div className="flex flex-col gap-3 pb-4">
            {eventTypes.map((et) => {
              const isExpanded = selectedEventTypeId === et.id;
              return (
                <div key={et.id} className="flex flex-col gap-2">
                  <button
                    onClick={() => handleEventTypeSelect(et.id)}
                    className={`flex items-center justify-between p-2 rounded-xl border transition-all text-left bg-white ${isExpanded
                      ? 'border-primary/60 shadow-sm ring-1 ring-primary/10'
                      : 'border-border/60 hover:border-primary/40 hover:shadow-sm'
                      }`}
                  >
                    <span className={`font-semibold text-[15px] ${isExpanded ? 'text-primary' : 'text-foreground'}`}>
                      {et.eventType}
                    </span>
                    <ChevronRight className={`size-5 transition-transform duration-200 ${isExpanded ? 'rotate-90 text-primary' : 'text-muted-foreground'}`} />
                  </button>

                  {/* Functions List */}
                  {isExpanded && (
                    <div className="flex flex-col gap-1.5 pl-2 sm:pl-4 pr-1 mb-2 animate-in slide-in-from-top-2 fade-in duration-200">
                      {et.functions.map((func) => {
                        const isSelected = currentEvent.eventFunction === func.name;
                        return (
                          <button
                            key={func.id}
                            onClick={() => handleEventFunctionSelect(et.eventType, func.name)}
                            className={`flex items-center p-2 rounded-xl border transition-all text-left ${isSelected
                              ? "border-primary bg-primary/10 shadow-sm"
                              : "border-transparent hover:border-primary/30 hover:bg-white bg-black/[0.02]"
                              }`}
                          >
                            <span className={`font-medium text-[14.5px] ${isSelected ? "text-primary font-bold" : "text-foreground/90"}`}>
                              {func.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Others Option */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleEventTypeSelect('others')}
                className={`flex items-center justify-between p-2 rounded-xl border transition-all text-left bg-white ${selectedEventTypeId === 'others'
                  ? 'border-primary/60 shadow-sm ring-1 ring-primary/10'
                  : 'border-border/60 hover:border-primary/40 hover:shadow-sm'
                  }`}
              >
                <span className={`font-semibold text-[15px] ${selectedEventTypeId === 'others' ? 'text-primary' : 'text-foreground'}`}>
                  Others
                </span>
                <ChevronRight className={`size-5 transition-transform duration-200 ${selectedEventTypeId === 'others' ? 'rotate-90 text-primary' : 'text-muted-foreground'}`} />
              </button>

              {/* Input for Others */}
              {selectedEventTypeId === 'others' && (
                <div className="flex flex-col gap-3 pl-2 sm:pl-4 pr-1 mb-2 animate-in slide-in-from-top-2 fade-in duration-200">
                  <input
                    type="text"
                    value={otherEventValue}
                    onChange={(e) => setOtherEventValue(e.target.value)}
                    placeholder="Enter custom event type..."
                    className="p-2.5 rounded-xl border border-border/60 text-[14.5px] outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/10 transition-all bg-white"
                  />
                  <button
                    onClick={() => {
                      if (otherEventValue.trim()) {
                        dispatch(setEvent({ eventType: 'Others', eventFunction: otherEventValue.trim() }));
                        handleClose();
                      }
                    }}
                    disabled={!otherEventValue.trim()}
                    className="bg-primary text-primary-foreground p-2 rounded-xl font-medium text-[14.5px] disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-primary/90"
                  >
                    Save & Continue
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
