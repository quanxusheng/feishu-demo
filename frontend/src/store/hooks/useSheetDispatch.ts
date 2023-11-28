

import { useDispatch } from 'react-redux'
import { useCallback } from 'react'

import {  getOriginSheetsData } from '../slicers/sheetSlice'

export default function useSheetDispatch() {
    const dispatch = useDispatch()

     const getOriginSheetsDataDispatcher = useCallback((data) => {
        dispatch(getOriginSheetsData(data))
    }, [dispatch])

    return {
        getOriginSheetsDataDispatcher
    }
}