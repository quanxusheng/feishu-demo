import { Select } from "@mantine/core"
import { useCallback } from "react"

import { WorkInProgressCellType } from '@/pages/Sheet/components/TableView'

import useSheet from '@/hooks/useSheet'
interface Props extends WorkInProgressCellType {
    destroyAtomComponent: VoidFunction
}

export default function SelectAtom(props: Props) {
    const { config, width, rowId, colId, value } = props
    console.log('=>props', props)

    const { setCellValue } = useSheet()
    const handleBlur = useCallback((e) => {
        setCellValue({
            oi: e.target.value,
            od: value,
            path: [rowId, colId],
            operation: 'updataTable'
        })
        props.destroyAtomComponent()
    }, [colId, props, rowId, setCellValue, value])

    return (
        <Select
            data={config.options}
            width={width}
            onBlur={(e) => handleBlur(e)}
            style={{
                // width,
                // boxSizing: 'border-box',
                // fontSize: '14px',
            }}
            styles={{
                input: {
                    width,
                    border: 'none',
                    borderRadius: 0,
                }
            }}
        />
    )
}