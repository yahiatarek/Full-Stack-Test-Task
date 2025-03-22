import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface storeState {
  token: string;
  setToken: (token: string) => void;
  data: string;
  setData: (data: string) => void;
}

export const useUserStore = create<storeState>()(
  persist(
    immer(set => ({
      token: '',
      setToken: (token: string) =>
        set(state => {
          state.token = token;
        }),
      data: '',
      setData: (data: string) =>
        set(state => {
          state.data = data;
        }),
    })),
    {
      name: 'store',
      storage: createJSONStorage(() => sessionStorage), // persist in sessionStorage
    }
  )
);
