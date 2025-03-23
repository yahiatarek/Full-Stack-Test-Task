import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface storeState {
  data: string;
  setData: (data: string) => void;
}

export const useUserStore = create<storeState>()(
  persist(
    immer(set => ({
      data: '',
      setData: (data: string) =>
        set(state => {
          state.data = data;
        }),
    })),
    {
      name: 'store',
      storage: createJSONStorage(() => localStorage), // persist in localStorage
    }
  )
);
