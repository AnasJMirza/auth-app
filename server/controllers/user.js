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
    
};


export const getUser = async (req, res) => {
    try {
        
        const { userName } = req.params;
        const user = await User.findOne({ userName });
        if(!user){
            res.status(404).send({ success: false, message: 'username does not exist!' })    
        }

        const { password, ...rest } = Object.assign({}, user.toJSON());

        res.status(200).send(rest);



    } catch (error) {
        res.status(404).send({ success: false, message: error.message })
    }
};


export const updateUser = async (req, res) => {
    try {
        
        
        const { userId } = req.user;
        
        if(!userId) res.status(401).send({ success: false, message: 'invalid userid' });

        const body = req.body;
        const isUpdated = await User.updateOne({ _id: userId }, body);

        if(!isUpdated) res.status(401).send({ success: false, message: "Can't update user!" });
        res.status(200).send({ success: true, message: 'user updated successfully!' });



    } catch (error) {
        res.status(401).send({ success: false, message: error.message });
    }
};


export const resetPassword = async (req, res) => {

    if(!req.app.locals.resetSession) return res.status(500).send({ success: false, message: 'Session Expired!' });

    const { userName, password } = req.body;

    try {
        
        const user = await User.findOne({ userName });

        if(!user) return res.status(500).send({ success: false, message: 'username does not exist!' });

        const hashPassword = await bcrypt.hash(password, 10);
        if(!hashPassword) return res.status(500).json({ success: false, message: 'unable to hash password!' })

        User.updateOne({ userName: user.userName }, { password: hashPassword });
        req.app.locals.resetSession = false;
        
        return res.status(200).json({ success: true, message: 'Password Updated!' })
        


    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}