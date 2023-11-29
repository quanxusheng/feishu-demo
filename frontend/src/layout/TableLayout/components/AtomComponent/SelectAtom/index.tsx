import { Select } from "@mantine/core"

export default function SelectAtom(props) {
    const { config } = props
    console.log('=>props', props)
    return (
        <>
            <Select
                data={config}
            />
        </>
    )
}