import mongoose from 'mongoose'
import { MONGODB_URL } from '../config/env.js'

export const connectDb = async() =>{
    try{
        await mongoose.connect(MONGODB_URL)
        console.log('Database is connected')

    } catch(error){
        console.log('error connecting', error)
    }
}