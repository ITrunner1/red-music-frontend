'use client';

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IPlaylistDto } from "@/interfaces/playlist.interface";
import { playlistApi } from "@/store/api/api.playlist";

interface IUseCreatePlaylistForm {
  playlistId: number
}

const useCreatePlaylistForm = ({ playlistId }: IUseCreatePlaylistForm) => {  
    const {
        register,
        formState: { errors },
        control, 
        handleSubmit,
        watch,
        setValue,
        reset
    } = useForm<IPlaylistDto>({
        mode: 'onChange'
    })

    const [ updatePlaylist, { isSuccess }] = playlistApi.useUpdatePlaylistMutation()

    const onSubmit: SubmitHandler<IPlaylistDto> = data => {
        updatePlaylist({ ...data, id: playlistId })
            .unwrap()
            .then(() => {
                reset()
            })
    }
   
    const picturePath = watch('picturePath')
    const [ playlistFileName, setPlaylistFileName ] = useState('')

    // const handleCreatePlaylist = ( value: IFileResponse ) => {
    //   setValue('audioPath', value.url)
    //   setValue('name', value.name)
    //   setPlaylistFileName(value.name)
    // }

    const [ isChosen, setIsChosen ] = useState(false)

    const [ percent, setPercent ] = useState(0)
    const [ isUploaded, setIsUploaded ] = useState(false)
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
        picturePath,
        playlistFileName,
        // handleCreatePlaylist
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

export default useCreatePlaylistForm;