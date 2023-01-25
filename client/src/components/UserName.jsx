import React from 'react';
import { Link } from 'react-router-dom';
import profilePrview from '../assets/profile.png';

const UserName = () => {
    return (
        <div className='flex flex-col justify-center items-center gap-2'>
            <div className='font-bold text-4xl'>Login</div>
            <div className='py-4 text-xl w-2/3 text-center text-gray-500'>Unlock new possibilities by connecting with us</div>
            <form className='form'>
                <div className='profile flex justify-center'>
                    <img src={profilePrview} alt="profile" className='w-28'/>
                </div>
                <div className='textbox flex flex-col gap-2'>
                    <input type="text" placeholder='username'/>
                    <button type='submit'>Let's go!</button>
                </div>
                <span className='flex gap-2'>
                    <p className='text-gray-500'>Not a Memeber</p>
                    <Link to='/register' className='text-red-500 font-medium'>Register Now</Link>
                </span>
            </form>
        </div>
    );
};

export default UserName;