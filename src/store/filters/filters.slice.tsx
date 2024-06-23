import { TypeSongDataFilters } from "@/interfaces/song.interface"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface IFiltersState {
    queryParams: TypeSongDataFilters
    isFilterUpdate: boolean
}

export interface IFiltersActionsPayload {
    key: keyof TypeSongDataFilters
    value: string
}

const initialState: IFiltersState = {
    queryParams: {
        page: 1,
        perPage: 6
    },
    isFilterUpdate: false
}

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        updateQueryParam: (state, action: PayloadAction<IFiltersActionsPayload>) => {
            const { key, value } = action.payload
            state.queryParams[key] = value
            state.isFilterUpdate = true
        },
        resetFilterUpdate: state => { state.isFilterUpdate = false }
    },
})