import { toast } from "react-hot-toast";
import { authenticate } from "./requests";

// Validations

export async function usernameValidate(values) {
  const error = usernameVerify({}, values); // formik automatically send form values to this function thats why i created another function to get error messages to show user on screen

  if (values.userName) {
    const { status } = await authenticate(values.userName);

    if (status != 200) {
      error.exist = toast.error("User does not exist!");
    }
  }

  return error;
}

export const passwordValidate = (values) => {
  const error = passwordVarify({}, values);
  return error;
};

export const resetPasswordValidate = (values) => {
  const error = passwordVarify({}, values);

  if (values.password !== values.confirmPassword) {
    error.exist = toast.error("Password not match!");
  }

  return error;
};

export const registerValidation = (values) => {
  const error = usernameVerify({}, values);
  passwordVarify(error, values);
  emailVarify(error, values);

  return error;
};

export const profileValidation = (values) => {
  const error = emailVarify({}, values);
  return error;
};

// ***************************************************

/** verifications */

function usernameVerify(error = {}, values) {
  if (!values.userName) {
    error.userName = toast.error("Username Required...!");
  } else if (values.userName.includes(" ")) {
    error.userName = toast.error("Invalid Username...!");
  }

  return error;
}

const passwordVarify = (error = {}, values) => {
  const specialChar = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!values.password) {
    error.password = toast.error("Password Required!");
  } else if (values.password.includes(" ")) {
    error.password = toast.error("Wrong Password!");
  } else if (values.password.length < 4) {
    error.password = toast.error(
      "Password must be more then 4 characters long!"
    );
  } else if (!specialChar.test(values.password)) {
    error.password = toast.error("Password must contain a special character!");
  }

  return error;
};

const emailVarify = (error = {}, values) => {
  const specialChar = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!values.email) {
    error.email = toast.error("Email Required!");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Wrong email!");
  } else if (!specialChar.test(values.email)) {
    error.password = toast.error("Invalid Email Address");
  }

  return error;
};
