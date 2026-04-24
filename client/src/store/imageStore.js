import {create} from "zustand";

export const useImageStore = create((set) =>({
    cachedPages:{},
    ipfsHashes: [],
    hashOwner: null,
    totalHashes:0,


    setCache: (page,images) => 
        set((state) => ({
        cachedPages: {...state.cachedPages,[page]:images}
    })),

    setTotalHashes: (count) => set({totalHashes:count}),

    setHashesForAccount: (owner, hashes) =>
        set({
            hashOwner: owner,
            ipfsHashes: hashes,
            totalHashes: hashes.length,
            cachedPages: {},
        }),

    clearCache:() => set({cachedPages:{}, ipfsHashes: [], hashOwner: null, totalHashes:0}),
}));