'use client'

import useStore from "@/hooks/use-store";
import { FaPlay, FaPause } from "react-icons/fa";
import { useEffect } from "react";
import { MuteIcon, VolumeHighIcon, VolumeLowIcon, PreviousIcon } from '@vidstack/react/icons';
import { songApi } from "@/store/api/api.song";
import { usePlayerToggle } from "@/hooks/usePlayer";
import { cn } from "@/lib/utils";
import { NextIcon } from '@vidstack/react/icons';
import { Button } from "../ui/button";
import {
  MediaPlayer,
  MediaProvider,
  PlayButton,
  Time,
  TimeSlider,
  VolumeSlider,
  MuteButton,
} from '@vidstack/react';

const MusicPlayerContent = () => {
  const player = useStore(usePlayerToggle, (state) => state);

  const onPlayNext = () => {
    if (player?.ids?.length === 0) {
      return;
    }

    const currentIndex = player?.ids?.findIndex((id) => id === player?.activeId);
    const nextSong = player?.ids[currentIndex! + 1];

    if (!nextSong) {
      return player?.setId(player?.ids[0]);
    }

    player.setId(nextSong);
  }

  const onPlayPrevious = () => {
    if (player?.ids?.length === 0) {
      return;
    }

    const currentIndex = player?.ids?.findIndex((id) => id === player?.activeId);
    const previousSong = player?.ids[currentIndex! - 1];

    if (!previousSong) {
      return player?.setId(player?.ids[player?.ids.length - 1]);
    }

    player.setId(previousSong);
  }

  const { data: song } = songApi.useGetSongByIdQuery(Number(player?.activeId), {
    skip: !player?.activeId
  })

  const [updateListens] = songApi.useUpdateListensMutation()

  useEffect(() => {
    if (player?.activeId) updateListens(Number(player?.activeId))
  }, [player?.activeId])

  return (
    <MediaPlayer
      className={cn("max-sm:gap-2 max-sm:p-2 max-sm:h-[80px] max-sm: fixed flex justify-between gap-8 h-[100px] px-10 z-20 bottom-0 bg-background overflow-y-auto dark:shadow-zinc-100 shadow-md transition-[width] ease-in-out duration-300",
        player?.isOpen === true ? "w-full" : "hidden")}
      src={{ src: song!?.audioPath, type: 'audio/flac' }}>
      <MediaProvider />

      <PlayButton className="group ring-primary relative inline-flex max-sm:h-3 max-sm:w-3 h-4 w-4 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4">
        <FaPlay className="w-8 h-8 hidden group-data-[paused]:block" />
        <FaPause className="w-8 h-8 group-data-[paused]:hidden" />
      </PlayButton>

      <Button
        variant='link'
        size='icon'
        className="max-sm:h-6 max-sm:w-6"
        onClick={onPlayPrevious}
      >
        <PreviousIcon
          className="cursor-pointer w-8 h-8 text-white"
          size={30}
        />
      </Button>

      <Time className="vds-time text-sm" />
      <TimeSlider.Root className="relative inline-flex h-10 w-full cursor-pointer touch-none select-none items-center outline-none aria-hidden:hidden">
        <TimeSlider.Track className="relative ring-primary z-0 h-[5px] w-full rounded-sm bg-white/10 group-data-[focus]:ring-[3px]">
          <TimeSlider.TrackFill className="bg-red-700 absolute h-full w-[var(--slider-fill)] rounded-sm will-change-[width]" />
          <TimeSlider.Progress className="absolute z-10 h-full w-[var(--slider-progress)] rounded-sm bg-white/5 will-change-[width]" />
        </TimeSlider.Track>
        <TimeSlider.Preview
          className="flex flex-col items-center opacity-0 transition-opacity duration-200 data-[visible]:opacity-100 pointer-events-none"
          noClamp
        >
          <TimeSlider.Value className="rounded-sm px-2 py-px text-[13px] font-medium text-white" />
        </TimeSlider.Preview>
        <TimeSlider.Thumb className="absolute left-[var(--slider-fill)] top-1/2 z-20 h-[15px] w-[15px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#cacaca] bg-white opacity-0 ring-white/40 transition-opacity group-data-[active]:opacity-100 group-data-[dragging]:ring-4 will-change-[left]" />
      </TimeSlider.Root>
      <Time type="duration" className="text-sm" />

      <Button
        variant='link'
        size='icon'
        className="max-sm:h-6 max-sm:w-6"
        onClick={onPlayNext}
      >
        <NextIcon
          className="cursor-pointer w-8 h-8 text-white"
          size={30}
        />
      </Button>

      <MuteButton className="group max-sm:h-6 max-sm:w-6 ring-sky-400 relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4">
        <MuteIcon className="w-8 h-8 hidden group-data-[state='muted']:block" />
        <VolumeLowIcon className="w-8 h-8 hidden group-data-[state='low']:block" />
        <VolumeHighIcon className="w-8 h-8 hidden group-data-[state='high']:block" />
      </MuteButton>

      <VolumeSlider.Root className="group relative mx-[7.5px] inline-flex h-10 w-full max-w-[80px] cursor-pointer touch-none select-none items-center outline-none aria-hidden:hidden">
        <VolumeSlider.Track className="relative ring-sky-400 z-0 h-[5px] w-full rounded-sm bg-white/30 group-data-[focus]:ring-[3px]">
          <VolumeSlider.TrackFill className="bg-red-700 absolute h-full w-[var(--slider-fill)] rounded-sm will-change-[width]" />
        </VolumeSlider.Track>

        <VolumeSlider.Preview
          className="flex flex-col items-center opacity-0 transition-opacity duration-200 data-[visible]:opacity-100 pointer-events-none"
          noClamp
        >
          <VolumeSlider.Value className="rounded-sm bg-black px-2 py-px text-[13px] font-medium text-white" />
        </VolumeSlider.Preview>

        <VolumeSlider.Thumb className="absolute left-[var(--slider-fill)] top-1/2 z-20 h-[15px] w-[15px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#cacaca] bg-white opacity-0 ring-white/40 transition-opacity group-data-[active]:opacity-100 group-data-[dragging]:ring-4 will-change-[left]" />
      </VolumeSlider.Root>
    </MediaPlayer>
  )
}

export default MusicPlayerContent

