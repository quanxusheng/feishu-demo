/* eslint-disable no-unreachable */
import { Box, Text, Textarea } from '@mantine/core'
import { Fragment, useCallback, useState, useRef } from 'react'
import { KonvaEventObject } from 'konva/lib/Node'
import { map } from 'lodash-es'
import { Stage, Layer, Rect, Text as CanvasText } from 'react-konva'
import { Html } from 'react-konva-utils'

import { ColumnMap } from '@/store/types'

import getSheet from '@/hooks/useSheet'

import TextAtom from '@/layout/TableLayout/components/AtomComponent/TextAtom'
import SelectAtom from '@/layout/TableLayout/components/AtomComponent/SelectAtom'

export interface WorkInProgressCellType {
    x: number
    y: number
    colId: string
    type: keyof ColumnMap
    width: number
    rowId: string
    value: string
    dblClick?: boolean
    config?: any
}

export default function TableView() {
    const { sheetUrlParams, getCurrentTable, getTargetViewColumns } = getSheet()

    // const viewsArr = getTargetSheetViewsArr(sheetUrlParams.tableId)
    // console.log('=viewsArr>', viewsArr)
    // const { rowsArr } = getTargetViewRows
    const { table, rows, columns } = getCurrentTable
    console.log('=>getCurrentTable', getCurrentTable)
    // console.log('=>columnsArr', columnsArr)
    // console.log('=>getTargetViewRows', getTargetViewRows)
    // console.log('=>getTargetViewColumns', getTargetViewColumns)


    const [workInProgressCell, setWorkInProgressCell] = useState<WorkInProgressCellType | null>(null)
    const fasterOverlayBorderRef = useRef<HTMLDivElement>()
    const fasterOverlayRef = useRef<HTMLDivElement>()

    let clickTimer = null

    const clickCell = useCallback((e: KonvaEventObject<MouseEvent>, cellPayload: WorkInProgressCellType) => {
        clearTimeout(clickTimer)
        // eslint-disable-next-line react-hooks/exhaustive-deps
        clickTimer = setTimeout(() => {
            setCell(cellPayload)
        }, 200)
    }, [clickTimer])

    const dblClickCell = useCallback((e: KonvaEventObject<MouseEvent>, cellPayload: WorkInProgressCellType) => {
        clearTimeout(clickTimer)
        // console.log('=>', e)
        setCell(cellPayload)
    }, [clickTimer])

    function setCell(cellPayload: WorkInProgressCellType) {
        // console.log('=>setCell', 'setCell执行了')
        fasterOverlayRef.current.style.left = (Number(cellPayload.x - 2)) + 'px'
        fasterOverlayRef.current.style.top = (Number(cellPayload.y - 2)) + 'px'
        setWorkInProgressCell(cellPayload)
    }



    // console.log('=>workInProgressCell', workInProgressCell)
    return (
        <Box>
            {/* 头部视图列表 */}
            <Box>
                {
                    // map(viewsArr, view => {
                    //     return <Box key={view.id}>{view.name}</Box>
                    // })
                    <Box key={table.id}>{table.name}</Box>
                }
            </Box>

            <Box className='relative'>
                <Stage width={window.innerWidth} height={window.innerHeight}>
                    <Layer>
                        {/* <Html>
                        </Html> */}
                        {
                            map(rows, (row, index) => {
                                return map(columns, ({ id, type, width, height, title, config }, colIndex) => {
                                    const rowId = row.id
                                    const colId = id
                                    const rowIndex = Number(index) + 1
                                    const currntCol = row.columns.find(col => col.id === colId)
                                    const colVal = index ? currntCol.value : title
                                    // const { width } = columnsConfig[colId]
                                    const x = (Number(colIndex) * width)
                                    const y = (Number(height) * rowIndex)
                                    return (
                                        <Fragment key={colId}>
                                            <CanvasText
                                                width={width}
                                                fontSize={15}
                                                fontFamily='Calibri'
                                                text={colVal}
                                                padding={10}
                                                wrap="none"
                                                ellipsis
                                                x={x + 10}
                                                y={y}
                                            />
                                            <Rect
                                                width={width}
                                                height={height}
                                                x={x}
                                                y={y}
                                                stroke='#ddd'
                                                strokeWidth={1}
                                                onClick={(e) => clickCell(e, {
                                                    x,
                                                    y,
                                                    colId,
                                                    type,
                                                    width,
                                                    rowId,
                                                    value: colVal,
                                                    config
                                                })}
                                                onDblClick={(e) => dblClickCell(e, {
                                                    x,
                                                    y,
                                                    colId,
                                                    type,
                                                    width,
                                                    rowId,
                                                    value: colVal,
                                                    dblClick: true,
                                                    config
                                                })}
                                            />
                                        </Fragment>
                                    )
                                })
                            })
                        }
                    </Layer>
                </Stage>

                <Box
                    ref={fasterOverlayRef}
                    className='absolute faster-overlay'
                    onClick={() => setWorkInProgressCell({
                        ...workInProgressCell,
                        dblClick: true
                    })}
                >
                    {
                        workInProgressCell && (
                            <Box
                                style={{
                                    border: '2px solid #336df4',
                                    boxSizing: 'content-box',
                                    minHeight: '34px'
                                }}
                            >
                                {
                                    (
                                        workInProgressCell.type === 'text' &&
                                        <TextAtom
                                            {...workInProgressCell}
                                            destroyAtomComponent={() => setWorkInProgressCell(null)}
                                        />
                                    ) || (
                                        workInProgressCell.type === 'selectSingle' &&
                                        <SelectAtom
                                            {...workInProgressCell}
                                            destroyAtomComponent={() => setWorkInProgressCell(null)}
                                        />
                                    )
                                }
                            </Box>
                        )
                    }
                </Box>

            </Box>
        </Box>
    )
}