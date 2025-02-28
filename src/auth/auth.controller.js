import { verify } from "argon2";
import User from "../user/user.model.js";
import { generateJWT } from "../helpers/generate-jwt.js";


export const login = async (req, res) => {
    const { username,email, password } = req.body
    try{
        const administrator = await User.findOne({$or:[{username: username},{email: email}]})

        if(!administrator){
            return res.status(400).json({
                message: "The email or username provided doesnt exists, try again",
                error:"The user could not be found or doesnt exists"
            })
        }

        const correctPassword = await verify(administrator.password, password)

        if(!correctPassword){
            return res.status(400).json({
                message: "Incorrect password",
                error: "the password you provided its incorrect,try again"
            })
        }
        const token = await generateJWT(user._id)
        
        return res.status(200).json({
            message: "Login successful",
            account_information: {
                completeName: administrator.completeName,
                username: administrator.username,
                email: administrator.email,
                createdAt: administrator.createdAt
            },
            token:token
        })
    }catch(err){
        return res.status(500).json({
            message: "login failed, server error",
            error: err.message
        })
    }
};
