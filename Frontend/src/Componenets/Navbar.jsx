import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LuUserCog } from "react-icons/lu";
import { FaRegHeart, FaBookmark, FaPlus, FaSignInAlt } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { motion } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const navLinks = [
        { id: 1, title: 'Blogs', url: '/Blogs', icon: <LuUserCog /> },
        { id: 2, title: 'Favorite', url: '/favorites', icon: <FaRegHeart /> },
        { id: 3, title: 'Bookmark', url: '/bookmarks', icon: <FaBookmark /> },
        { id: 4, title: 'Create', url: '/create-post', icon: <FaPlus /> },
        { id: 5, title: 'Login', url: '/login', icon: <FaSignInAlt /> },
    ];

    return (
        <div className='w-full flex flex-col bg-gradient-to-r from-pink-50 to-blue-50 shadow-md'>
            {/* Top Navbar */}
            <div className='flex justify-between items-center gap-4 w-full py-2 px-4 lg:px-16'>
                
                {/* Logo */}
                <div 
                    className='cursor-pointer' 
                    onClick={() => navigate("/")}
                >
                    <h1 className='text-[24px] font-bold bg-gradient-to-r from-pink-400 to-blue-700 bg-clip-text text-transparent'>
                        VoxHive
                    </h1>
                </div>

                {/* Search Input */}
                <div className='hidden md:flex items-center bg-white shadow-md px-3 rounded-full w-1/3'>
                    <input 
                        type='search' 
                        placeholder='Search posts...' 
                        className='w-full px-3 py-2 focus:outline-none rounded-full bg-transparent'
                    />
                    <CiSearch className='text-purple-600' size={24} />
                </div>

                {/* Menu Links - Desktop */}
                <div className='hidden md:flex items-center gap-5 text-purple-700 font-medium'>
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.id}
                            to={link.url}
                            className={({ isActive }) =>
                                isActive 
                                ? 'flex items-center gap-2 text-pink-400 transition duration-300'
                                : 'flex items-center gap-2 hover:text-blue-600 transition duration-300'
                            }
                        >
                            {link.icon} {link.title}
                        </NavLink>
                    ))}
                </div>

                {/* Hamburger Icon for Mobile */}
                <div className='md:hidden flex items-center text-purple-800'>
                    <button onClick={() => setIsOpen(true)}>
                        <GiHamburgerMenu size={30} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div 
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "tween", duration: 0.5 }}
                    className='fixed top-0 right-0 w-full h-screen bg-gradient-to-r from-pink-50 to-blue-50 flex flex-col justify-between z-50 text-purple-700 font-medium p-6'
                >
                    {/* Top Logo and Close Button */}
                    <div className="flex justify-between items-center">
                        {/* Logo inside mobile menu */}
                        <div 
                            className='cursor-pointer' 
                            onClick={() => {
                                navigate("/");
                                setIsOpen(false);
                            }}
                        >
                            <h1 className='text-[24px] font-bold bg-gradient-to-r from-pink-400 to-blue-700 bg-clip-text text-transparent'>
                                VoxHive
                            </h1>
                        </div>

                        {/* Close Button */}
                        <button onClick={() => setIsOpen(false)} className="text-purple-800">
                            <IoClose size={36} />
                        </button>
                    </div>

                    {/* Nav Links */}
                    <div className='flex flex-col items-start gap-6 mt-10'>
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.id}
                                to={link.url}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) =>
                                    isActive 
                                    ? 'flex items-center gap-2 text-pink-400 text-xl transition duration-300'
                                    : 'flex items-center gap-2 hover:text-blue-600 text-xl transition duration-300'
                                }
                            >
                                {link.icon} {link.title}
                            </NavLink>
                        ))}
                    </div>

                    {/* Search at bottom */}
                    <div className='w-full'>
                        <div className='flex items-center bg-white shadow-md px-3 rounded-full w-full'>
                            <input 
                                type='search' 
                                placeholder='Search posts...' 
                                className='w-full px-3 py-2 focus:outline-none rounded-full bg-transparent'
                            />
                            <CiSearch className='text-purple-600' size={24} />
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default Navbar;
