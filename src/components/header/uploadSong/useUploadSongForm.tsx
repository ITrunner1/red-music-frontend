'use client';

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ISongDto } from "@/interfaces/song.interface";
import { songApi } from "@/store/api/api.song";
import { IFileResponse } from "@/interfaces/file.interface";

interface IUseUploadSongForm {
  songId: number
}

const useUploadSongForm = ({ songId }: IUseUploadSongForm) => {
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    watch,
    setValue,
    reset
  } = useForm<ISongDto>({
    mode: 'onChange'
  })

  const [updateSong, { isSuccess }] = songApi.useUpdateSongMutation()

  const onSubmit: SubmitHandler<ISongDto> = data => {
    updateSong({ ...data, id: songId })
      .unwrap()
      .then(() => {
        reset()
      })
  }

  const audioPath = watch('audioPath')
  const thumbnailPath = watch('thumbnailPath')
  const [songFileName, setSongFileName] = useState('')

  const handleUploadSong = (value: IFileResponse) => {
    setValue('audioPath', value.url)
    setValue('name', value.name)
    setSongFileName(value.name)
  }

  const [isChosen, setIsChosen] = useState(false)

  const [percent, setPercent] = useState(0)
  const [isUploaded, setIsUploaded] = useState(false)
  const setProgressPercentage = (val: number) => {
    setPercent(val)
    if (val === 100) setIsUploaded(true)
  }

  return {
    form: {
      register,
      errors,
      control,
      handleSubmit,
      onSubmit
    },
    file: {
      audioPath,
      thumbnailPath,
      songFileName,
      handleUploadSong
    },
    status: {
      isSuccess,
      isChosen,
      setIsChosen,
      percent,
      isUploaded,
      setProgressPercentage
    }
  }
}

export default useUploadSongForm;