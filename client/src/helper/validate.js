import { toast } from "react-hot-toast";



/** validate login page username */
export async function usernameValidate(values){
    const errors = usernameVerify({}, values); // formik automatically send form values to this function thats why i created another function to get error messages to show user on screen

    return errors;
}

/** validate username */
export function usernameVerify(error = {}, values){
    if(!values.userName){
        error.userName = toast.error('Username Required...!');
    }else if(values.userName.includes(" ")){
        error.userName = toast.error('Invalid Username...!')
    }

    return error;
}