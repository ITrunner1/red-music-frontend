import { useStore } from "zustand";
import { usePlayerToggle } from "./usePlayer";
import { useAuth } from "./useAuth";
import { ISong } from "@/interfaces/song.interface";

const useOnPlay = (songs: ISong[]) => {
    const player = useStore(usePlayerToggle, (state) => state);;
    const { user } = useAuth();

    const onPlay = (id: number) => {
        player.setId(id);
        player.setIds(songs.map((song) => song.id))        
    };

    return onPlay;
};

export default useOnPlay;