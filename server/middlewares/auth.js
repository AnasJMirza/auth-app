import JWT from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();


export const Auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = JWT.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(500).send({ success: false, message: error.message })
    }
}