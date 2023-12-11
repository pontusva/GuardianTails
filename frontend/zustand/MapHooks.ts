import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Location {
  location: any;
  updateLocation: (userid: any | null) => void;
  removeLocation: () => void;
}

interface PreciseLocation {
  preciseMapLocation: any;
  update: (userid: any | null) => void;
  remove: () => void;
}

export const mapLocationConfirmationStore = create<Location>()(
  persist(
    set => ({
      location: null,
      updateLocation: (location: any) => set(() => ({ location })),
      removeLocation: () => set(() => ({ location: null })),
    }),
    {
      name: 'userid-storage',
    }
  )
);

export const preciseMapLatLng = create<PreciseLocation>()(
  persist(
    set => ({
      preciseMapLocation: null,
      update: (preciseMapLocation: any) => set(() => ({ preciseMapLocation })),
      remove: () => set(() => ({ preciseMapLocation: null })),
    }),
    {
      name: 'userid-storage',
    }
  )
);
