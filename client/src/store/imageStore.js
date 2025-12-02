import {create} from "zustand";

export const useImageStore = create((set) =>({
    cachedPages:{},
    totalHashes:0,


    setCache: (page,images) => 
        set((state) => ({
        cachedPages: {...state.cachedPages,[page]:images}
    })),

    setTotalHashes: (count) => set({totalHashes:count}),

    clearCache:() => set({cachedPages:{},totalHashes:0}),
}));