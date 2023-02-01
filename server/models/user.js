import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    
    userName: {
        type: String,
        required: [true, 'Username Required!'],
        unique: [true, 'Username already exist!'],
    }, 

    email: {
        type: String,
        required: [true, 'Email required!'],
        unique: [true, 'Email already exist'],
    },

    password: {
        type: String,
        required: [true, 'Password Required!'],
        unique: false,
    },

    firstName: {
        type: String,
    },

    lastName: {
        type: String,
    },

    mobileNumber: {
        type: String,
    },

    address: {
        type: String,
    },

    profile: {
        type: String,
    },


});


export default mongoose.model.Users || mongoose.model('User', UserSchema);