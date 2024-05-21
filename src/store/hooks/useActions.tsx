'use client'

import * as userActions from '../../actions/user.actions'
import { bindActionCreators } from "@reduxjs/toolkit"
import { useMemo } from "react"
import { useDispatch } from 'react-redux'

const allActions = {
    ...userActions,    
}

export const useActions = () => {
    const dispatch = useDispatch()

    return useMemo(() => bindActionCreators(allActions, dispatch), [dispatch])
}