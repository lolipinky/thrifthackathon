import mongoose from 'mongoose'

const wishlistSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId
    }
})
