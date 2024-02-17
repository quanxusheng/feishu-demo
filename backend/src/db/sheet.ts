import { Schema, model } from 'mongoose'

const sheetSchema = new Schema(
    {
        id: {
            type: String,
            require: true,
            unique: true,
        },
        name: {
            type: String,
            require: true,
            unique: true
        },
        tableList: [
            {
                
                id:{
                    type: String
                },
                name:{
                    type: String
                },
                rows: [
                    {
                        id: {
                            type: String
                        },
                        columns: [
                            {
                                id: {
                                    type: String
                                },
                                value: {
                                    type: Schema.Types.Mixed
                                    // type: String
                                }
                            }
                        ]
                    }
                ],
                columns: [
                    {
                        id: {
                            type: String
                        },
                        title: {
                            type: String,
                        },
                        type: {
                            type: String
                        },
                        width: {
                            type: Number,
                            default: 200
                        },
                        height: {
                            type: Number,
                            default: 35
                        },
                        config: {
                            desc: {
                                type: String,
                                require: false
                            },
                            options: {
                                type: Array,
                                require: false
                            }
                        }
                    }
                ],
            }
        ],
        // creator: {
        //     type: String,
        //     require: true
        // },
        creatorId: {
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
