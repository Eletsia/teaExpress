import { create } from "zustand";

const useBearsStore = create(set => {
  return {
    bears: 0,
    increse: () => {
      set(state => {
        return {
          bears: state.bears + 1,
        };
      });
    },
    init: () => {
      set({
        bears: 0,
      });
    },
  };
});

export default useBearsStore;
