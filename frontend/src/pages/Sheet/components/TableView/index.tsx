import { Box, Text, Textarea } from '@mantine/core'
import { Fragment, useCallback, useState, useRef, Key } from 'react'
import { KonvaEventObject } from 'konva/lib/Node'
import { map } from 'lodash-es'
import { Stage, Layer, Rect, Text as CanvasText } from 'react-konva'
import { Html } from 'react-konva-utils'

import { ColumnMap } from '@/store/types'

import getSheet from '@/hooks/useSheets'

import TextAtomComponent from '@/layout/TableLayout/components/AtomComponent/TextAtomComponent'

export interface WorkInProgressCellType {
    x: Key,
    y: Key,
    colId: Key,
    columnType: keyof ColumnMap,
    width: Key,
    rowId: Key,
    value: Key
}

export default function TableView() {
    const { getTargetSheetViewsArr, sheetUrlParams, getTargetViewRows, getTargetViewColumns } = getSheet()
    // console.log('=>getTargetSheetViewsArr', getTargetSheetViewsArr(sheetUrlParams.sheetId))

    const viewsArr = getTargetSheetViewsArr(sheetUrlParams.sheetId)
    // console.log('=viewsArr>', viewsArr)
    const { rowsArr } = getTargetViewRows
    const { columnsArr, columnsConfig } = getTargetViewColumns
    // console.log('=>columnsArr', columnsArr)
    // console.log('=>getTargetViewRows', getTargetViewRows)
    // console.log('=>getTargetViewColumns', getTargetViewColumns)


    const [workInProgressCell, setWorkInProgressCell] = useState<WorkInProgressCellType | null>(null)
    const fasterOverlayRef = useRef<HTMLDivElement>()


    const handleEditCell = useCallback((event: KonvaEventObject<MouseEvent>, cellPayload: WorkInProgressCellType) => {
        // console.log('=>', event)
        fasterOverlayRef.current.style.left = cellPayload.x + 'px'
        fasterOverlayRef.current.style.top = cellPayload.y + 'px'
        setWorkInProgressCell(cellPayload)
    }, [])
    console.log('=>workInProgressCell', workInProgressCell)
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

            <Box className='relative'>
                <Stage width={window.innerWidth} height={window.innerHeight}>
                    <Layer>
                        {/* <Html>
                        </Html> */}
                        {
                            map(rowsArr, (row, rowIndex) => {
                                return map(columnsArr, ({ id, columnType }) => {
                                    const colId = id
                                    const currntCol = row[colId]
                                    const { width } = columnsConfig[colId]
                                    const x = 0
                                    const y = 0
                                    return (
                                        <Fragment key={colId}>
                                            <CanvasText
                                                width={width}
                                                fontSize={15}
                                                text={currntCol}
                                                padding={10}
                                                wrap="none"
                                                ellipsis
                                                // x={x + 10}
                                                y={rowIndex * 30}
                                            />
                                            <Rect
                                                width={width}
                                                height={30}
                                                x={x}
                                                y={rowIndex * 30}
                                                stroke='#ddd'
                                                strokeWidth={1}
                                                onDblClick={(event) => handleEditCell(event, {
                                                    x,
                                                    y: rowIndex * 30,
                                                    colId,
                                                    columnType,
                                                    width,
                                                    rowId: row.id,
                                                    value: currntCol
                                                })}
                                            />
                                        </Fragment>
                                    )
                                })
                            })
                        }
                    </Layer>
                </Stage>

                <Box ref={fasterOverlayRef} className='absolute faster-overlay'>
                    {
                        workInProgressCell && (
                            workInProgressCell.columnType === 'TEXT' &&
                            <TextAtomComponent
                                {...workInProgressCell}
                                destroyAtomComponent={() => setWorkInProgressCell(null)}
                            />
                        )
                    }
                </Box>

            </Box>
        </Box>
    )
}