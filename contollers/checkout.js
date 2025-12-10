import axios from "axios"
import { PAYSTACK_SECRET } from "../config/env.js"

export const initiateCheckout=async(_,res)=>{
    const DECRate = 500

const PAYSTACK_ENDPIOINT="https://api.paystack.co/transaction/initialize"

try{
const response =await axios.post(PAYSTACK_ENDPIOINT,{
    email:"demo@example.com", // Customer's Email
    amount: DECRate * 100,
    callback_url: "https://fffads/verify", // Url to verify transaction status (Might be on the Backend or the frontend)
    metadata:{
        timae: Date.now()   
    }

},{headers:{
    Authorization: `Bearer ${PAYSTACK_SECRET}`
}})

console.log(response)

return res.status(200).json({data:response.data})
}catch(err){
    console.error(err)
    return res.status(500).send("Something wen wrong")
}

}

export const verifyStatus=async(req,res)=>{
const {reference} = req.query;

if(!reference){
    return res.status(400).send("Please pass in your refernce number")
}

try {
    const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`,{headers:{
        Authorization: `Bearer ${PAYSTACK_SECRET}`
    }})

    console.log(response)

    if(response.data.status!=="success"){
        return res.status(400).send("Payment not successful")
    }


    // Do somthing with your data
    return res.status(200).json(response.data)
} catch (error) {
    console.log(error)
    return res.status(500).send("Something went wrong")
}

}