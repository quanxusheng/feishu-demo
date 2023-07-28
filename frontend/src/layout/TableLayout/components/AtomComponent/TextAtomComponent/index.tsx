import { Textarea } from "@mantine/core";
import { WorkInProgressCellType } from "@/pages/Sheet/components/TableView";
import { useCallback, useEffect, useRef } from "react";
import useSheets from '@/hooks/useSheets'

interface AtomComponentType extends WorkInProgressCellType {
    destroyAtomComponent: VoidFunction
}

export default function TextAtomComponent(props: AtomComponentType) {
    console.log('=>props', props)
    const { width } = props

    const { updataSheetDispather } = useSheets()
    const TextAtomComponentRef = useRef<HTMLTextAreaElement>()

    useEffect(() => {
        const textarea = TextAtomComponentRef.current
        textarea.focus()
        textarea.selectionStart = textarea.selectionEnd = textarea.value.length
    }, [])


    const handleBlur = useCallback((event) => {
        console.log('=>失去焦点了',)
        updataSheetDispather({
            ...props,
            value: event.target.value
        })
        props.destroyAtomComponent()
    }, [props, updataSheetDispather])


    return (
        <Textarea
            ref={TextAtomComponentRef}
            // autoFocus
            onBlur={handleBlur}
            defaultValue={props.value}
            autosize
            minRows={1}
            className="rounded-none"
            style={{
                width,
                border: '2px solid #336df4',
                fontSize: '14px',
                minHeight: '35px',
            }}
            styles={{
                input: {
                    borderRadius: '0px',
                }
            }}
        />
    )
}