import { Box, Text } from '@mantine/core'
import { map } from 'lodash-es'
import { Stage, Layer, Rect, Text as CanvasText } from 'react-konva'
import { Html } from 'react-konva-utils'

import { ColumnMap } from '@/store/types'


import getSheet from '@/hooks/useSheets'
import { useCallback } from 'react'
import { KonvaEventObject } from 'konva/lib/Node'


export default function TableView() {
    const { getTargetSheetViewsArr, sheetUrlParams, getTargetViewRows, getTargetViewColumns } = getSheet()
    // console.log('=>getTargetSheetViewsArr', getTargetSheetViewsArr(sheetUrlParams.sheetId))

    const viewsArr = getTargetSheetViewsArr(sheetUrlParams.sheetId)
    const { rowsArr } = getTargetViewRows
    const { columnsArr, columnsConfig } = getTargetViewColumns
    console.log('=>getTargetViewRows', getTargetViewRows)
    console.log('=>getTargetViewColumns', getTargetViewColumns)

    const handleEditCell = useCallback((event: KonvaEventObject<MouseEvent>, cellPayload: {
        columnType: keyof ColumnMap,
        colId: string
    }) => {

    }, [])
    return (
        <Box>
            {/* 头部视图列表 */}
            <Box>
                {
                    map(viewsArr, view => {
                        return <Box key={view.id}>{view.name}</Box>
                    })
                }
            </Box>

            <Box>
                {/* <Stage width={window.innerWidth} height={window.innerHeight}>
                    <Layer>
                        <Rect
                            x={20}
                            y={20}
                            width={50}
                            height={50}
                            fill='red'
                            shadowBlur={10}
                        >

                        </Rect>
                    </Layer>
                </Stage> */}
                <Stage width={window.innerWidth} height={window.innerHeight}>
                    <Layer>
                        {/* <Html>
                        </Html> */}
                        {
                            map(rowsArr, row => {
                                return map(columnsArr, ({ id, columnType }) => {
                                    const colId = id
                                    const currntCol = row[colId]
                                    const { width } = columnsConfig[colId]
                                    const x = 0
                                    const y = 0
                                    return (
                                        <>
                                            <Rect
                                                width={width}
                                                height={30}
                                                x={x}
                                                y={y}
                                                stroke='#ddd'
                                                strokeWidth={1}
                                                onDblClick={(event) => handleEditCell(event, {
                                                    colId,
                                                    columnType
                                                })}
                                            />
                                            <CanvasText
                                                fontSize={15}
                                                text={currntCol}
                                                x={x + 10}
                                                y={10}
                                            />
                                        </>
                                    )


                                })

                            })
                        }
                    </Layer>
                </Stage>


            </Box>
        </Box>
    )
}