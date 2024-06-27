import { create } from "zustand";
import { apiRequest } from "../api/apiRequest";

export const useNotificationStore = create((set) => ({
  number: 0,
  fetch: async () => {
    try {
      const res = await apiRequest.get("/user/getNotificationNumber");
      set({ number: res.data });
    } catch (err) {
      console.log(err);
    }
  },
  decrease: () => {
    set((prev) => ({ number: prev.number - 1 }));
  },
  reset: () => {
    set({ number: 0 });
  },
}));
