import { fakerZH_CN } from '@faker-js/faker'
const { uuid } = fakerZH_CN.string
const { cat } = fakerZH_CN.animal
const { fullName } = fakerZH_CN.person
const { name } = fakerZH_CN.company
import { UserLoginParam } from '../userController/types'
import sheet from '../../db/sheet'

interface DefaultRows {
    id: string
    columns: [
        {
            id: string
            value: string
        }
    ]
}

const defaultColumns = [
    {
        id: uuid(),
        title: '姓名',
        type: 'text',
    },
    {
        id: uuid(),
        title: '宠物',
        type: 'selectSingle',
        config: {
            options: [
                {
                    label: '英国短毛猫',
                    value: '1'
                },
                {
                    label: '中国狸花猫',
                    value: '2'
                },
                {
                    label: '玄猫',
                    value: '3'
                },
                {
                    label: '布偶猫',
                    value: '4'
                },
                {
                    label: '阿比西尼亚猫',
                    value: '5'
                },
            ]
        }
    },
]


// default 3列10行
const defaultRows = () => {
    const rows = []
    const len = defaultColumns.length
    for(let i = 0; i < 10; i++) {
        const singleRowCols = []
        for(let j = 0; j < len; j++) {
            singleRowCols.push(
                {
                    id: defaultColumns[j].id,
                    value: defaultColumns[j].type === 'text' ?
                        fullName() :
                        cat()
                },
            )
        }
        rows[i] = {
            id: uuid(),
            columns: singleRowCols
        }
    }
    return rows
}

export const findOrCreateDefaultSheet = async (params: UserLoginParam) => {
    const initData = {
        id: uuid(),
        name: name(),
        tableList: [
            {
                id: uuid(),
                name: fullName(),
                rows: defaultRows(),
                columns: defaultColumns
            }
        ],
        creatorId: params.id,
        // creator: params.username,
        createTime: Date.now()
    }
    console.log('=>findOrCreateDefaultSheet-initData', initData)
    return await sheet.findOneAndUpdate(
        {
            creatorId: params.id
        },
        { $setOnInsert: initData },
        {new: true, upsert: true}
    ).select('-_id -__v')
}
