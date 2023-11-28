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
                                    type: String
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
                        name: {
                            type: String,
                        },
                        type: {
                            type: String
                        },
                        width: {
                                type: Number,
                                default: 200
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
                // columnsConfig: [
                //     {
                //         width: {
                //             type: Number,
                //             default: 200
                //         },
                //         desc: {
                //             type: String
                //         }
                //     }
                // ]
            }
        ],
        creator: {
            type: String,
            require: true
        },
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