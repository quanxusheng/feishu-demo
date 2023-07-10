import { useSelector, useDispatch } from 'react-redux'
import {useMemo} from 'react'

import { RootState } from '../store'
import { createSheet } from '../store/slicers/sheetsSlice'
import { Sheet } from '../store/types'

export default function useSheets() {
    const sheets = useSelector((state: RootState) => state.sheets)
    const sheetsArr = useMemo<Array<Sheet>>(() => Object.values(sheets), [sheets])
    const dispatch = useDispatch()

    const createSheetDispatcher = (sheetName?: string) => {
        dispatch(createSheet({
            name: sheetName
        }))
    }

    return {
        sheets,
        sheetsArr,
        createSheetDispatcher
    }
}