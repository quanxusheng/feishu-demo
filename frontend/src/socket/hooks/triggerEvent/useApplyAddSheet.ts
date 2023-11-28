// import {sheetTemplateCreator} from '@/store/utils'

import { AddSheetParams } from '@/socket/types'

import {applyOriginAddSheet} from '@/store/slicers/sheetSlice'

import { useDispatch } from 'react-redux'
export default function useApplyAddSheet(){
    // const sheet = sheetTemplateCreator(params.sheetName, params)
    const dispatch = useDispatch()

    const applyOriginAddSheetOperation = (params:AddSheetParams) => {
        dispatch(applyOriginAddSheet(params))
    }

    return {
        applyOriginAddSheetOperation
    }
}