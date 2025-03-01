import User from "../user/user.model.js";
import Company from "../company/company.model.js";

export const emailExists = async (email = "") => {
    const exists = await User.findOne({email})
    if(exists){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const usernameExists = async (username = "") => {
    const exists = await User.findOne({username})
    if(exists){
        throw new Error(`The username ${username} is already registered`)
    }
}


export const userFound = async (uid = " ") => {
    const found = await User.findById(uid)
    if(!found){
        throw new Error(`The user provided does not exists nor it could be found`)
    }
}

export const usernameFound = async (username = "") => {
    const found = await User.findOne({username})
    if(!found){
        throw new Error(`The username provided: ${username} does not exists nor it could be found`)
    }
}

export const companyFound = async (name = "") => {
    const found = await Company.findOne({name})
    if(found){
        throw new Error(`The company provided: ${name} is already registered`)
    }
}

export const companyExists = async (cid = " ") => {
    const exists = await Company.findById(cid)
    if(!exists){
        throw new Error(`The id of company provided does not exists nor it could be found`)
    }
}

export const impactFound = async (impact = "") => {
    const found = await Company.findOne({impact})
    if(!found){
        throw new Error(`Companies with ${name} impact could not be found`)
    }
}

export const categoryFound = async (category = "") => {
    const found = await Company.findOne({category})
    if(!found){
        throw new Error(`Companies with category: ${category} could not be found`)
    }
}

export const yearsFound = async (yearsInBusiness = "") => {
    const found = await Company.findOne({yearsInBusiness})
    if(!found){
        throw new Error(`Companies with years of experience: ${yearsInBusiness} could not be found`)
    }
}

export const emailFound = async (email = "") => {
    const found = await User.findOne({email})
    if(!found){
        throw new Error(`The email provided: ${email} does not exists nor it could be found`)
    }
}



