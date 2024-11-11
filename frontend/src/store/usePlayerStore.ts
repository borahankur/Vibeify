import { Song } from "@/types/index";
import { create } from "zustand";
import { useChatStore } from "./useChatStore";

interface PlayerStore {
    currentSong: Song | null;
    isPlaying: boolean;
    queue: Song[];
    currentIndex: number;

    initializeQueue: (songs: Song[]) => void;
    playAlbum: (songs: Song[], startIndex?: number) => void;
    setCurrentSong: (song: Song | null) => void;
    togglePlay: () => void;
    playNext: () => void;
    playPrev: () => void;
    mixPlay: (songs: Song[]) => void
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({

    currentSong: null,
    isPlaying: false,
    queue: [],
    currentIndex: -1,

    initializeQueue: (songs: Song[]) => {
        set({
            queue: songs,
            currentSong: get().currentSong || songs[0],
            currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex
        });
    },
    playAlbum: (songs: Song[], startIndex = 0) => {
        if (songs.length === 0) return;

        const song = songs[startIndex]
        const socket = useChatStore.getState().socket
        if (socket.auth) {
            socket.emit("update_activity", { userId: socket.auth.userId, activity: `Playing ${song.title} by ${song.artist} ` })
        }
        set({
            queue: songs,
            currentSong: song,
            currentIndex: startIndex,
            isPlaying: true,
        })
    },
    setCurrentSong: (song: Song | null) => {
        if (!song) return;
        const socket = useChatStore.getState().socket
        if (socket.auth) {
            socket.emit("update_activity", { userId: socket.auth.userId, activity: `Playing ${song.title} by ${song.artist} ` })
        }
        const songIndex = get().queue.findIndex((s) => s._id === song._id)
        set({
            currentSong: song,
            isPlaying: true,
            currentIndex: songIndex !== -1 ? songIndex : get().currentIndex,
        })
    },
    togglePlay: () => {
        const willStartPlaying = !get().isPlaying;
        const currentSong = get().currentSong
        const socket = useChatStore.getState().socket
        if(socket.auth)
        {
            socket.emit("update_activity", {
                userId: socket.auth.userId,
                activity: willStartPlaying && currentSong ? `Playing ${currentSong.title} by ${currentSong.artist}` : "Idle"
            })
        }
        set({ isPlaying: willStartPlaying, });
    },

    playNext: () => {
        const { currentIndex, queue } = get()
        const nextIndex = currentIndex + 1
        if (nextIndex < queue.length) {
            const nextSong = queue[nextIndex]
            const socket = useChatStore.getState().socket
            if(socket.auth)
            {
                socket.emit("update_activity", {
                    userId: socket.auth.userId,
                    activity: `Playing ${nextSong.title} by ${nextSong.artist}`
                })
            }
            set({ currentSong: nextSong, currentIndex: nextIndex, isPlaying: true })
        }
        else {
            set({ isPlaying: false });
            const socket = useChatStore.getState().socket
            if(socket.auth)
            {
                socket.emit("update_activity", {
                    userId: socket.auth.userId,
                    activity: `Idle`
                })
            }
        }
    },
    playPrev: () => {
        const { currentIndex, queue } = get()
        const prevIndex = currentIndex - 1
        if (prevIndex >= 0) {
            const prevSong = queue[prevIndex]
            const socket = useChatStore.getState().socket
            if(socket.auth)
            {
                socket.emit("update_activity", {
                    userId: socket.auth.userId,
                    activity: `Playing ${prevSong.title} by ${prevSong.artist}`
                })
            }

            set({ currentIndex: prevIndex, currentSong: prevSong, isPlaying: true })
        }
        else {
            set({ isPlaying: false })
            const socket = useChatStore.getState().socket
            if(socket.auth)
            {
                socket.emit("update_activity", {
                    userId: socket.auth.userId,
                    activity: `Idle`
                })
            }
        }
    },
    mixPlay: (songs) => {
        const songsCopy = songs
        for(let i = songsCopy.length-1; i > 0; i--)
        {
            const j = Math.floor(Math.random() * (i+1));
            [songsCopy[i],songsCopy[j]] = [songsCopy[j],songsCopy[i]]
        }
        set({
            queue: songsCopy,
            currentSong: get().currentSong || songsCopy[0],
            currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex
        })
    }
}))