import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLocation } from '@/lib/store/locationSlice';
import { Modal } from '@/components/ui/Modal';
import { MapPin, Search } from 'lucide-react';
import { Button } from './ui/button';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LocationModal({ isOpen, onClose }: LocationModalProps) {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');

  // Mocked locations for demonstration
  const mockLocations = [
    { address: 'Gomti Nagar, Lucknow', lat: 26.8528, lng: 81.0029 },
    { address: 'Indira Nagar, Lucknow', lat: 26.8837, lng: 80.9859 },
    { address: 'Alambagh, Lucknow', lat: 26.8142, lng: 80.9016 },
    { address: 'Hazratganj, Lucknow', lat: 26.8485, lng: 80.9419 },
  ];

  const filteredLocations = mockLocations.filter(loc =>
    loc.address.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleSelectLocation = (location: { address: string, lat: number, lng: number }) => {
    dispatch(setLocation(location));
    onClose();
  };

  const handleSetCustomLocation = () => {
    if (searchInput.trim()) {
      dispatch(setLocation({ address: searchInput, lat: 0, lng: 0 }));
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Select Address">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search for your address..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="flex flex-col gap-2 mt-2">
          <h3 className="text-sm font-bold text-muted-foreground mb-1">Suggested Addresses</h3>
          {filteredLocations.map((loc, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectLocation(loc)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted text-left transition-colors border border-transparent hover:border-border/50"
            >
              <div className="bg-primary/10 p-2 rounded-full">
                <MapPin className="size-4 text-primary" />
              </div>
              <span className="text-sm font-semibold">{loc.address}</span>
            </button>
          ))}
          {filteredLocations.length === 0 && searchInput.trim() !== '' && (
            <div className="text-center py-4 text-sm text-muted-foreground">
              No suggested addresses found.
              <Button 
                onClick={handleSetCustomLocation}
                className="w-full mt-3"
              >
                Use "{searchInput}"
              </Button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
