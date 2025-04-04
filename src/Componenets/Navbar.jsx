import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LuUserCog } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { motion } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { id: 1, title: 'Home', url: "/" },
        { id: 2, title: "All Posts", url: '/AllPosts' },
        { id: 3, title: "About Us", url: '/AboutUs' },
        { id: 4, title: "Contact US", url: '/ContactUs' }
    ];

    return (
        <div className='flex flex-col w-[100%] justify-between'>
            <div className='flex justify-between lg:gap-10 gap-2 items-center lg:px-[100px]'>
                <div className=''>
                    <h1 className='lg:text-4xl text-[28px] font-bold bg-gradient-to-r from-pink-400 to-blue-700 bg-clip-text text-transparent'>VoxHive</h1>
                </div>
                
                {/* Search Input - Visible on Large Screens, Moves to Burger Menu on Medium and Small Screens */}
                <div className='hidden md:flex gap-2 justify-between items-center bg-gradient-to-r from-pink-100 to-blue-50 px-2 rounded-md w-[60%] '>
                    <input type='Search' placeholder='Search' className='focus:outline-none w-full px-2 py-1' />
                    <CiSearch className='text-purple-600' />    
                </div>
                
                {/* Icons and Burger Menu Button */}
                <div className='flex justify-end items-center gap-2 text-purple-600'>
                    <LuUserCog size={25}/>
                    <FaRegHeart size={25}/>
                    <button className='md:hidden' onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <IoClose size={30} /> : <GiHamburgerMenu size={30} />}
                    </button>
                </div>
            </div>
            
            {/* Desktop View - Hidden in Medium and Small Screens */}
            <div className='hidden md:flex justify-center items-center gap-6 py-4'>
                {navLinks.map((link) => (
                    <NavLink
                        key={link.id}
                        to={link.url}
                        className={({ isActive }) =>
                            isActive
                                ? 'bg-gradient-to-r from-pink-500 to-blue-500 text-white py-1 px-4 rounded-full transition-all duration-300 transform hover:scale-105'
                                : 'px-4 py-1 rounded-full border-2 text-purple-600 border-purple-600 transition-all duration-300 transform hover:scale-105'
                        }
                    >
                        {link.title}
                    </NavLink>
                ))}
            </div>
            
            {/* Mobile Menu */}
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -10 }} 
                    className='md:hidden flex flex-col items-center gap-4 py-5 bg-white shadow-lg rounded-md'>
                    <div className='flex gap-2 justify-between items-center bg-gradient-to-r from-pink-100 to-blue-50 px-2 rounded-md w-[90%]'>
                        <input type='Search' placeholder='Search' className='focus:outline-none w-full px-2 py-1' />
                        <CiSearch className='text-purple-600' />    
                    </div>
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.id}
                            to={link.url}
                            className={({ isActive }) =>
                                isActive
                                    ? 'bg-gradient-to-r from-pink-500 to-blue-500 text-white py-1 px-4 rounded-full transition-all duration-300 transform hover:scale-105'
                                    : 'px-4 py-1 rounded-full border-2 text-purple-600 border-purple-600 transition-all duration-300 transform hover:scale-105'
                            }
                            onClick={() => setIsOpen(false)}
                        >
                            {link.title}
                        </NavLink>
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default Navbar;