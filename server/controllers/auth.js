import User from '../models/user.js';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();



export const loginUser = async (req, res) => {
    try {
        // get all the data from body to login user
        const { userName, password } = req.body;

        // find out if the user exist in the database or not?
        const user = await User.findOne({ userName });
        
        // if user does not exist then send error in response
        if(!user) {
            return res.status(400).send({ success: true, message: 'Username not exist!' });
        } 

        // compare the password to check if the user is valid
        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword) {
            return res.status(400).send({ success: false, message: 'Wrong password!' });
        }

        
        
        // Create JWT token to send to frontend.
        const token = JWT.sign({
            userId: user._id,
            username : user.username
        }, process.env.JWT_SECRET_KEY , { expiresIn : "24h"});
        


        // send the res to frontend.
        return res.status(200).send({
            success: true,
            message: 'login successfull',
            userName: user.userName,
            token,
        });
        
    } catch (error) {
        res.status(500).send({success: false, message: error});
    }
}