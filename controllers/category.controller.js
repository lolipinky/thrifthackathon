import Category from "../models/category.model.js"

export const createCategory = async(req, res, next)=>{
    try{
        const newCategory = await Category.create(req.body);
        res.status(201).json(newCategory)

    }catch(error){
        next(error)
    }

}
export const getCategories= async(req, res, next)=>{
    try{
        const categories = await Category.find();
        res.json(categories)

    }catch(error){
        next(error)
    }

}