import User from "../user/user.model.js"

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

export const emailFound = async (email = "") => {
    const found = await User.findOne({email})
    if(!found){
        throw new Error(`The email provided: ${email} does not exists nor it could be found`)
    }
}



