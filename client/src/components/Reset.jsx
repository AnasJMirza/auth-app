import React from "react";
import { Link } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import { resetPasswordValidate } from "../utils/validate";

import profilePrview from "../assets/profile.png";
import styles from "../styles/UserName.module.css";

const Reset = () => {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },

        validate: resetPasswordValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            navigate('/')
        }
    })


  return (
    <div className="container  mx-auto">

        <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">

        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className="text-3xl font-bold">Reset Password</h4>
            <span className="py-4 text-md w-3/4 text-center text-gray-500">
              Enter new Password
            </span>
          </div>

          <form className="form pt-14" onSubmit={formik.handleSubmit}>

            

            <div className="textbox flex flex-col items-center gap-6">
              <input
                className={styles.textbox}
                type="password"
                placeholder="New Password"
                {...formik.getFieldProps('password')}
              />
              <input
                className={styles.textbox}
                type="password"
                placeholder="Confirm Password"
                {...formik.getFieldProps('confirmPassword')}
              />
              <button className={'border bg-indigo-500 hover:bg-[#ff6a6a] w-3/4 py-2 rounded-lg text-gray-50 text-xl shadow-sm text-center cursor-pointer'} type="submit">
                Reset
              </button>
            </div>

            

          </form>
        </div>
      </div>
    </div>
  );
};

export default Reset;
