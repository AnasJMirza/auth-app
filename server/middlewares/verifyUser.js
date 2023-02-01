import User from '../models/user.js';


export const verifyUser = async (req, res, next) => {
    try {
        const { userName } = req.method == "GET" ? req.query : req.body;

    // check if the user exist?
    const isUserExist = await User.findOne({ userName });
    if(!isUserExist) {
        return res.status(404).send({success: false, message: "Can't find user!"});
    }
    next();
    } catch (error) {
        return res.status(500).send({success: false, message: error});
    }
};