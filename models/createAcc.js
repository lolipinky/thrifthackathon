import mongoose from 'mongoose'


const createAccSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: [ 'field is required'],
        trim:true,
        minLength:[3, 'field must be at least 3 characters']

    },
    email:{
        type: String,
        required: true,
        trim:true,
        unique:true,
        minLength:[10, 'field must be at least 10 characters'],
        lowercase:true,
        match: [/\S+@\S+\.\S+/, "Email is invalid"],
    },
    password:{
        type:String,
        required: true,
        minLength: [5, "Password must not be less than 5 characters"]

    }
},
{timestamps:true}
)

const createUser = mongoose.model('createUser', createAccSchema)

export default createUser