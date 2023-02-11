import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate } from "../utils/validate";
import { useAuthStore } from "../store/store";

import profilePrview from "../assets/profile.png";
import styles from "../styles/UserName.module.css";

const UserName = () => {

    const navigate = useNavigate();

    const setUserName = useAuthStore(state => state.setUserName);

    
    const formik = useFormik({
        initialValues: {
            userName:''
        },

        validate: usernameValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
          setUserName(values.userName);
          navigate('/password');
        }
    })


  return (
    <div className="container  mx-auto">

        <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">

        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className="text-3xl font-bold">Hello Again!</h4>
            <span className="py-4 text-md w-3/4 text-center text-gray-500">
              Explore More by connecting with us.
            </span>
          </div>

          <form className="form" onSubmit={formik.handleSubmit}>

            <div className="profile flex justify-center pt-2 pb-4">
              <img
                src={profilePrview}
                alt="profile"
                className={styles.profile_img}
              />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                className={styles.textbox}
                type="text"
                placeholder="username"
                {...formik.getFieldProps('userName')}
              />
              <button className={'border bg-indigo-500 hover:bg-[#ff6a6a] w-3/4 py-2 rounded-lg text-gray-50 text-xl shadow-sm text-center cursor-pointer'} type="submit">
                Let's go!
              </button>
            </div>

            <div className="text-center py-4">
                <span className='text-gray-500'>Not a Member <Link className='text-red-500' to="/register">Register Now</Link></span>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default UserName;
