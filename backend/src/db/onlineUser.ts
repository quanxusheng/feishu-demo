import mongoose from "mongoose";


const onlineUserSchema = new mongoose.Schema({
    id: {
            type: String,
            require: true
        },
        name: {
            type: String,
            require: true
        },
        
        avatar: {
            type: String,
            require: true
        },
    })
// onlineUserSchema.index({userId: 1}, {unique: true})
export default mongoose.model('onlineUserSchema', onlineUserSchema)