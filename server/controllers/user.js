import User from "../models/user.js";
import bcrypt from 'bcrypt';


export const registerUser = async (req, res) => {
    try {
        // get all the data from body to register a user
        const { email, userName, password, profile } = req.body;

        // check if the username already exist or not
        const isUserNameExist = await User.findOne({ userName });
        if(isUserNameExist){
            res.send({success: false, message: 'username already exist!'});
        }

        // check if the email already exist or not
        const isEmailExist = await User.findOne({ email });
        if(isEmailExist){
            res.send({success: false, message: 'email already exist!'});
        }

        // convert plain text password to hash password before storing to monogoDB
        if (password) {
            const hashPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                userName,
                email,
                password: hashPassword,
                profile: profile || '',
            });

            await newUser.save();
            res.status(200).send(newUser);
        }

        
    } catch (error) {
        res.status(500).send({success: false, messgae: error});
    }
    
}