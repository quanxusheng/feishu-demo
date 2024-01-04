// import {sheetTemplateCreator} from '@/store/utils'
import {useCallback} from 'react'

import { AddTableParams } from '@/socket/types'

import { applyOriginAddSheet, updataTable } from '@/store/slicers/sheetSlice'

import { useDispatch } from 'react-redux'

import useUrlParams from '@/hooks/useUrlParams'


export default function useApplyAddSheet(){
    // const sheet = sheetTemplateCreator(params.name, params)
    const dispatch = useDispatch()
    const {sheetUrlParams} = useUrlParams()

    const applyOriginAddSheetOperation = useCallback((params:AddTableParams) => {
        dispatch(applyOriginAddSheet(params))
    }, [dispatch])

    const updataTableDispather = useCallback((payload) => {
        // console.log('=>updataTableDispather-sheet', sheet)
        // console.log('=>updataTableDispather-payload', payload)
        const data = {...payload, ...sheetUrlParams }
        console.log('=>updataTableDispather-uuuuu', data)
        dispatch(updataTable(data))
    }, [dispatch, sheetUrlParams])

    return {
        applyOriginAddSheetOperation,
        updataTableDispather
    }
}