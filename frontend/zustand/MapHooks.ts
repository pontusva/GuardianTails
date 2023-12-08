import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Location {
  location: any;
  updateLocation: (userid: any | null) => void;
  removeLocation: () => void;
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
