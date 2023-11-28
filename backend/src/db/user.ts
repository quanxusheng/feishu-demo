import { Schema, model }  from 'mongoose'


const user = new Schema(
    {
        id: {
            type: String,
            require: true,
            unique: true,
            index: true
        },
        username: {
            type: String,
            require: true,
            trim: true
        },
        email: {
            type: String,
            require: true,
            unique: true,
            trim: true
        },
        avatar: {
            type: String    
        },
        registerTime: {
            type: Date,
            default: Date.now()
        },
        sheetData: [
            {
                type: Schema.Types.ObjectId,
                ref: 'sheet'
            }
        ]
    }, 
    { 
        strict: false,
     }
)
user.index({id: 1, username: 1, email: 1}, {unique: true})

export default model('user', user)