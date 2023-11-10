import mongoose  from 'mongoose'


const user = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    }
})

export default mongoose.model('user', user)