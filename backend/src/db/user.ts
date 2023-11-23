import { Schema, model }  from 'mongoose'


const user = new Schema(
    {
        userId: {
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
    }, 
    { 
        // _id: false,
        strict: false,
     }
)
user.index({userId: 1, username: 1, email: 1}, {unique: true})

export default model('user', user)