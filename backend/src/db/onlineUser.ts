import mongoose from "mongoose";


const onlineUserSchema = new mongoose.Schema({
        username: {
            type: String,
            require: true
        },
        userId: {
            type: String,
            require: true
        },
        avatar: {
            type: String,
            require: true
        },
    })
onlineUserSchema.index({userId: 1}, {unique: true})
export default mongoose.model('onlineUserSchema', onlineUserSchema)