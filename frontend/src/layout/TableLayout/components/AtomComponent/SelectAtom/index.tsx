import { Select } from "@mantine/core"

import { WorkInProgressCellType } from '@/pages/Sheet/components/TableView'

interface Props extends WorkInProgressCellType {
    destroyAtomComponent: VoidFunction
}

export default function SelectAtom(props: Props) {
    const { config, width } = props
    console.log('=>props', props)
    return (
        <Select
            data={config.options}
            width={width}
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
                    // boxSizing: 'border-box',
                }
            }}
        />
    )
}