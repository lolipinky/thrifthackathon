import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import createUser from "../models/createAcc.js";

export const newUser = async(req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const{fullName, email, password }=req.body

        //to check if all fields are filled
         if (!fullName ||  !email || !password){
          return res.status(400).json({message: "please input all fields"})}
        //to check if user already exist
        const alreadyExists = await createUser.findOne({email}).session(session)
        if(alreadyExists){
            return res.status(400).json({message: "Account already exists!"})

        }
        
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const createNewUser = await createUser.create([{fullName, email, password:hashPassword}])

        const token = jwt.sign({userId: createNewUser[0]._id, email:createNewUser[0]},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN})

        await session.commitTransaction();
        session.endSession();

        return res.status(201).json({message: "User created successfully"})

    }catch(error){
        await session .abortTransaction();
        session.endSession();
         return res.status(400).json({message: "Something went wrong", error:error.message})

    }
}

export const signIn = async(req, res, next) =>{
    const session = await mongoose.startSession();
    session.startTransaction();
}
