import mongoose from "mongoose";


const onlineUserSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    username: {
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