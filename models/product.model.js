import mongoose from 'mongoose'


const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Category",
        required: true
    },
    images: [String],
    rating: { 
        type: Number,
        default: 0
    },
    stock:{
        type: Number,
        required: true,
        min: 0,
        max: 20
    }
},
{timestamps: true}
)

const Product = mongoose.model('Product', productSchema)

export default Product