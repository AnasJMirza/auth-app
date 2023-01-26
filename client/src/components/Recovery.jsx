import React from "react";
import { Link } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import { passwordValidate } from "../utils/validate";

import profilePrview from "../assets/profile.png";
import styles from "../styles/UserName.module.css";

const Recovery = () => {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            password: '',
        },

        validate: passwordValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            navigate('/user-profile')
        }
    })


  return (
    <div className="container  mx-auto">

        <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">

        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className="text-3xl font-bold">Rocovery</h4>
            <span className="py-4 text-md w-3/4 text-center text-gray-500">
              Enter OTP to recover passowrd
            </span>
          </div>

          <form className="form pt-20">

            

            <div className="textbox flex flex-col items-center gap-6">
                <div className="text-sm text-center text-gray-500">
                Enter 6 digit OTP sent to your email
                </div>
              <input
                className={styles.textbox}
                type="text"
                placeholder="OTP"
                
              />
              <button className={'border bg-indigo-500 hover:bg-[#ff6a6a] w-3/4 py-2 rounded-lg text-gray-50 text-xl shadow-sm text-center cursor-pointer'} type="submit">
                Recover Now
              </button>
            </div>

            <div className="text-center py-4">
                <span className='text-gray-500'>Can't get OTP? <button className='text-red-500'>Resend</button></span>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Recovery;
