import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import { passwordValidate } from "../utils/validate";

import profilePrview from "../assets/profile.png";
import styles from "../styles/UserName.module.css";
import axios from "axios";
import { verifyPassword } from "../utils/requests";
import { useAuthStore } from "../store/store";

const Password = () => {

    const navigate = useNavigate();
    const { userName } = useAuthStore(state => state.auth);
    const [user, setUser] = useState({});

    // useEffect to get data of the user 

    useEffect(() => {
      const fetchUser = async () => {
          const result = await axios.get(`/api/user/getuser/${userName}`)
          setUser(result.data);
      }
      fetchUser();
    }, [])
    

    const formik = useFormik({
        initialValues: {
            password: '',
        },

        validate: passwordValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
          const response = await verifyPassword(userName, values.password);
          const { token } = response.data;
          localStorage.setItem('token', token);
          navigate('/user-profile');
        }
    })


  return (
    <div className="container  mx-auto">

        <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">

        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className="text-3xl font-bold">Hello {user?.userName}</h4>
            <span className="py-4 text-md w-3/4 text-center text-gray-500">
              Explore More by connecting with us.
            </span>
          </div>

          <form className="form" onSubmit={formik.handleSubmit}>

            <div className="profile flex justify-center pt-2 pb-4">
              <img
                src={user?.profile || profilePrview}
                alt="profile"
                className={styles.profile_img}
              />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                className={styles.textbox}
                type="password"
                placeholder="password"
                {...formik.getFieldProps('password')}
              />
              <button className={'border bg-indigo-500 hover:bg-[#ff6a6a] w-3/4 py-2 rounded-lg text-gray-50 text-xl shadow-sm text-center cursor-pointer'} type="submit">
                Sign In
              </button>
            </div>

            <div className="text-center py-4">
                <span className='text-gray-500'>Forgot Password? <Link className='text-red-500' to="/recovery">Recover Now</Link></span>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Password;
