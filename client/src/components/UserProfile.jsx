import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { registerValidation } from "../utils/validate";
import convertToBase64 from "../utils/convert";

import profilePrview from "../assets/profile.png";
import styles from "../styles/UserName.module.css";
import extend from "../styles/Profile.module.css";

const UserProfile = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      userName: "",
      password: "",
    },

    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = Object.assign(values, { profile: file || "" });
      navigate("/");
    },
  });

  // Formik does not support file upload so doing it manually

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  return (
    <div className="container  mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={`${styles.glass} ${extend.glass}`}>
          <div className="title flex flex-col items-center">
            <h4 className="text-3xl font-bold">Profile</h4>
            <span className="py-2 text-md w-3/4 text-center text-gray-500">
              You can update the details!
            </span>
          </div>

          <form className="form" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center pt-0 pb-4">
              <label htmlFor="profile">
                <img
                  src={file || profilePrview}
                  alt="profile"
                  className={`${styles.profile_img} ${extend.profile_img}`}
                />
              </label>

              <input
                type="file"
                name="profile"
                id="profile"
                onChange={onUpload}
              />
            </div>

            <div className="textbox flex flex-col items-center gap-3">
              <div className="name flex w-3/4 gap-10">
                <input
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="First Name"
                  {...formik.getFieldProps("firstName")}
                />
                <input
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="Last Name"
                  {...formik.getFieldProps("lastName")}
                />
              </div>

              <div className="name flex w-3/4 gap-10">
                <input
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="number"
                  placeholder="Mobile No."
                  {...formik.getFieldProps("mobileNumber")}
                />
                <input
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="email"
                  placeholder="email"
                  {...formik.getFieldProps("email")}
                />
              </div>

              
              <input
                //   className={`${styles.textbox} ${extend.textbox}`}
                className=" w-3/4 px-5 py-2 rounded-lg text-xl focus:outline-none"
                  type="address"
                  placeholder="Address"
                  {...formik.getFieldProps("address")}
                />
              

              
              <button
                className={
                  "border bg-indigo-500 hover:bg-[#ff6a6a] w-3/4 py-2 rounded-lg text-gray-50 text-xl shadow-sm text-center cursor-pointer"
                }
                type="submit"
              >
                Register
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Already registered?{" "}
                <Link className="text-red-500" to="/">
                  Login
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
