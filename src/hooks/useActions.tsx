'use client'

import { filtersSlice } from '@/store/filters/filters.slice'
import * as userActions from '../store/actions/user.actions'
import { bindActionCreators } from "@reduxjs/toolkit"
import { useMemo } from "react"
import { useDispatch } from 'react-redux'

const allActions = {
    ...userActions,  
    ...filtersSlice.actions,  
}

export const useActions = () => {
    const dispatch = useDispatch()

    return useMemo(() => bindActionCreators(allActions, dispatch), [dispatch])
}