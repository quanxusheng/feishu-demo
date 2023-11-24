import { Schema, model } from 'mongoose'

const sheetSchema = new Schema(
    {
        id: {
            type: String,
            require: true,
            unique: true,
        },
        sheetName: {
            type: String,
            require: true,
            unique: true
        },
        tableList: [
            {
                
                id:{
                    type: String
                },
                tableName:{
                    type: String
                },
            }
        ],
        creator: {
            type: String,
            require: true
        },
        createTime: {
            type: Date,
            default: Date.now()
        }
    }
)

const sheet = model('sheet', sheetSchema)

export default sheet