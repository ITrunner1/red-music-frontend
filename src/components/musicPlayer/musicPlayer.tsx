'use client'

import { FaPlay, FaPause, FaVolumeUp } from "react-icons/fa";
import { FC, useRef } from "react";
import { ISong } from "@/interfaces/song.interface";
import {
  MediaPlayer,
  MediaProvider,
  PlayButton,
  Time,
  TimeSlider,
  VolumeSlider,
  MuteButton,
  ToggleButton,
  type MediaPlayerInstance,
} from '@vidstack/react';

import { ThumbsDownIcon, ThumbsUpIcon, MuteIcon, VolumeHighIcon, VolumeLowIcon } from '@vidstack/react/icons';
import { songApi } from "@/store/api/api.song";
import { useParams } from "next/navigation";

const MusicPlayer: FC = () => {
  const params = useParams()

  const { data: song = {} as ISong } = songApi.useGetSongByIdQuery(Number(params.id), {
    skip: !params?.id
  })

  return (
    <MediaPlayer
      className="h-[100px] w-full px-10 bottom-0 flex justify-between gap-8 fixed z-20 bg-neutral-900 "
      src={{ src: song.audioPath, type: 'audio/flac' }}
    >
      <MediaProvider />

      <PlayButton className="group ring-sky-400 relative inline-flex h-4 w-4 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4">
        <FaPlay className="w-8 h-8 hidden group-data-[paused]:block" />
        <FaPause className="w-8 h-8 group-data-[paused]:hidden" />
      </PlayButton>

      <Time className="vds-time" />
      <TimeSlider.Root className="group relative mx-[7.5px] inline-flex h-10 w-full cursor-pointer touch-none select-none items-center outline-none aria-hidden:hidden">
        <TimeSlider.Track className="relative ring-sky-400 z-0 h-[5px] w-full rounded-sm bg-white/30 group-data-[focus]:ring-[3px]">
          <TimeSlider.TrackFill className="bg-indigo-400 absolute h-full w-[var(--slider-fill)] rounded-sm will-change-[width]" />
          <TimeSlider.Progress className="absolute z-10 h-full w-[var(--slider-progress)] rounded-sm bg-white/50 will-change-[width]" />
        </TimeSlider.Track>

        <TimeSlider.Preview
          className="flex flex-col items-center opacity-0 transition-opacity duration-200 data-[visible]:opacity-100 pointer-events-none"
          noClamp
        >
          <TimeSlider.Value className="rounded-sm bg-black px-2 py-px text-[13px] font-medium text-white" />
        </TimeSlider.Preview>

        <TimeSlider.Thumb className="absolute left-[var(--slider-fill)] top-1/2 z-20 h-[15px] w-[15px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#cacaca] bg-white opacity-0 ring-white/40 transition-opacity group-data-[active]:opacity-100 group-data-[dragging]:ring-4 will-change-[left]" />
      </TimeSlider.Root>
      <Time type="duration" />

      <ToggleButton
        className="group ring-sky-400 relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4"
        aria-label="Like video"
      >
        <ThumbsUpIcon className="w-8 h-8 hidden group-data-[pressed]:block" />
        <ThumbsDownIcon className="w-8 h-8 group-data-[pressed]:hidden" />
      </ToggleButton>

      <MuteButton className="group ring-sky-400 relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4">
        <MuteIcon className="w-8 h-8 hidden group-data-[state='muted']:block" />
        <VolumeLowIcon className="w-8 h-8 hidden group-data-[state='low']:block" />
        <VolumeHighIcon className="w-8 h-8 hidden group-data-[state='high']:block" />
      </MuteButton>

      <VolumeSlider.Root className="group relative mx-[7.5px] inline-flex h-10 w-full max-w-[80px] cursor-pointer touch-none select-none items-center outline-none aria-hidden:hidden">
        <VolumeSlider.Track className="relative ring-sky-400 z-0 h-[5px] w-full rounded-sm bg-white/30 group-data-[focus]:ring-[3px]">
          <VolumeSlider.TrackFill className="bg-indigo-400 absolute h-full w-[var(--slider-fill)] rounded-sm will-change-[width]" />
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

export default MusicPlayer