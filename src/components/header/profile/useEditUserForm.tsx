'use client';

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IUserDto } from "@/interfaces/user.interface";
import { IFileResponse } from "@/interfaces/file.interface";
import { api } from "@/store/api/api";

interface IUseEditUserForm {
  userId: number
}

const useEditUserForm = ({ userId }: IUseEditUserForm) => {
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    watch,
    setValue,
    reset
  } = useForm<IUserDto>({
    mode: 'onChange'
  })

  const [updateUser, { isSuccess }] = api.useUpdateProfileMutation()

  const onSubmit: SubmitHandler<IUserDto> = data => {
    updateUser({ ...data, id: userId })
      .unwrap()
      .then(() => {
        reset()
      })
  }

  const avatarPath = watch('avatarPath')
  const [userFileName, setUserFileName] = useState('')

  const handleEditUser = (value: IFileResponse) => {
    setValue('avatarPath', value.url)
    setValue('name', value.name)
    setUserFileName(value.name)
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
      avatarPath,
      userFileName,
      handleEditUser
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

export default useEditUserForm;