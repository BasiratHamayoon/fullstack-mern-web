import React from 'react'
import { NavLink } from 'react-router-dom';
import { LuUserCog } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
    const navLinks = [
        {
            id: 1,
            title: 'Home',
            url: "/"
        },
        {
            id: 2,
            title: "All Posts",
            url: '/AllPosts'
        },
        {
            id: 3,
            title: "About Us",
            url: '/AboutUs'
        },
        {
            id: 4,
            title: "Contact US",
            url: '/ContactUs'
        }
    ];
  return (
    <div className='flex flex-col'>
        <div className='grid grid-cols-3 lg:gap-10 gap-2'>
            <div className=''>
                <h1 className='lg:text-4xl text-[24px] font-bold bg-gradient-to-r from-pink-400 to-blue-700 bg-clip-text text-transparent'>VoxHive</h1>
            </div>
            <div className=' flex gap-2 justify-between items-center bg-gradient-to-r from-pink-100 to-blue-50 px-2 rounded-md'>
                <input type='Search' placeholder='Search' className='focus:outline-none'></input>
                <CiSearch className='text-purple-600' />    
            </div>
            <div className='flex justify-center items-center gap-3 text-[28px] text-purple-600'>
                <LuUserCog />
                <FaRegHeart />
            </div>
        </div>
        <div className="flex justify-center items-center list-none gap-2 py-10">
            {navLinks.map((link) => (
            <li
                key={link.id}
                className=""
            >
                <NavLink
                    to={link.url}
                    className={({ isActive }) =>
                    isActive
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white py-1 px-4 rounded-full'
                    : 'px-2 rounded-full border-2 text-purple-600 border-purple-600'
            }
            >
                    {link.title}
                 </NavLink>
            </li>
        ))}
    </div>
      
    </div>
  )
}

export default Navbar
