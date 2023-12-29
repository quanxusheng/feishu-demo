import { Textarea, Input } from "@mantine/core";
import { WorkInProgressCellType } from "@/pages/Sheet/components/TableView";
import { useCallback, useEffect, useRef } from "react";
import useSheets from '@/hooks/useSheet'

interface AtomComponentType extends WorkInProgressCellType {
    destroyAtomComponent: VoidFunction
}

export default function TextAtomComponent(props: AtomComponentType) {
    console.log('=>props', props)
    const { width, dblClick } = props

    const { setCellValue } = useSheets()
    const TextAtomComponentRef = useRef<HTMLInputElement>()
    // const TextAtomComponentRef = useRef<HTMLTextAreaElement>()

    useEffect(() => {
        const textarea = TextAtomComponentRef.current
        textarea.focus()
        textarea.selectionStart = textarea.selectionEnd = textarea.value.length
    }, [])


    const handleBlur = useCallback((event) => {
        // console.log('=>失去焦点了',)
        const { rowId, colId, value } = props
        setCellValue({
            oi: event.target.value,
            od: value,
            path: [rowId, colId],
            operation: 'updataTable'
        })
        props.destroyAtomComponent()
    }, [props, setCellValue])


    return (
        <Input
            ref={TextAtomComponentRef}
            size="xs"
            // autoFocus
            onBlur={handleBlur}
            defaultValue={props.value}
            className="rounded-none"
            readOnly={!dblClick}
            style={{
                width,
                // fontSize: '14px',
                // minHeight: '32px',
            }}
            styles={{
                input: {
                    borderRadius: '0px',
                    border: 'none',
                    fontSize: '15px',
                    paddingLeft: '20px',

                    // paddingBottom: '0.5px',
                    fontFamily: 'Calibri'
                }
            }}
        />
        // <Textarea
        //     ref={TextAtomComponentRef}
        //     // autoFocus
        //     // onBlur={handleBlur}
        //     defaultValue={props.value}
        //     autosize
        //     minRows={1}
        //     className="rounded-none"
        //     style={{
        //         width,
        //         border: '2px solid #336df4',
        //         fontSize: '14px',
        //         minHeight: '30px',
        //     }}
        //     styles={{
        //         input: {
        //             borderRadius: '0px',
        //         }
        //     }}
        // />
    )
}