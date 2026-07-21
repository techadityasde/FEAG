import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { professionals, Professional } from '@/lib/data/professionals';
import { getDistance } from '@/lib/utils';

interface UseFilteredProfessionalsProps {
    categoryOverride?: string; 
}

export function useFilteredProfessionals({ categoryOverride }: UseFilteredProfessionalsProps = {}) {
    const { lat, lng } = useSelector((state: any) => state.location);
    const { selectedDate, selectedSlot, isCustomSlot } = useSelector((state: any) => state.booking);
    const activeTab = useSelector((state: any) => state.tab.activeTab);

    // If categoryOverride is provided, use it; otherwise fallback to the global activeTab
    const categoryToFilter = categoryOverride || activeTab;

    const filteredData = useMemo(() => {
        let filtered: Professional[] = professionals;
        if (categoryToFilter && categoryToFilter !== "All") {
            filtered = professionals.filter(prof => prof.category === categoryToFilter);
        }

        // 1. Filter by Booking (Date/Slot) if needed
        if (selectedDate) {
            const dateObj = new Date(selectedDate);
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const day = String(dateObj.getDate()).padStart(2, '0');
            const dateString = `${year}-${month}-${day}`;

            filtered = filtered.filter(prof => {
                if (!prof.availableDates) return false;
                const availableDate = prof.availableDates.find(d => d.date === dateString);
                if (!availableDate) return false;

                if (selectedSlot) {
                    // If the day has a custom booking, block ALL slots (both custom and standard)
                    if (availableDate.isSlotBooked) return false;

                    if (isCustomSlot) {
                        return true; // We already know isSlotBooked is false from the check above
                    }
                    return availableDate.slots.some(s => s.startTime === selectedSlot && !s.isBooked);
                }
                return true;
            });
        }

        // 2. Add distance and sort if location is available
        if (lat && lng) {
            filtered = filtered.map(prof => {
                let distance: number | undefined;
                if (prof.lat !== undefined && prof.lng !== undefined) {
                    distance = getDistance(lat, lng, prof.lat, prof.lng);
                }
                return { ...prof, distance };
            });

            // Sort by closest distance
            filtered.sort((a, b) => {
                if (a.distance === undefined) return 1;
                if (b.distance === undefined) return -1;
                return a.distance - b.distance;
            });
        }

        return filtered;
    }, [lat, lng, selectedDate, selectedSlot, isCustomSlot, categoryToFilter]);

    return filteredData;
}
