import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from "react-icons/fa";
import img1 from '../assets/Hero-Section-img/img-1.jpg'
import img2 from '../assets/Hero-Section-img/img2.jpg'
import img3 from '../assets/Hero-Section-img/img-3.jpg'
import img4 from '../assets/Hero-Section-img/img-4.jpg'
import img5 from '../assets/Hero-Section-img/img-5.jpg'

const HeroSection = () => {
  return (
    <div className="relative w-full h-[90vh] overflow-hidden bg-gradient-to-br from-pink-200 via-blue-200 to-purple-300 flex items-center justify-center">

      {/* Gradient Overlay */}
      <div className="absolute  w-full h-full bg-gradient-to-br from-white via-transparent to-white opacity-100 z-10" />

      {/* Background Images in Columns */}
      <div className="absolute top-0 left-0 w-full h-full grid grid-cols-5 gap-0 z-0 pointer-events-none">

        {/* Image 1 - Animated from Top */}
        <motion.div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${img1})` }}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ delay: 1, duration: 1, type: 'spring', stiffness: 100 }}
        />

        {/* Image 2 - Animated from Bottom */}
        <motion.div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${img2})` }}
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 1.2, duration: 1, type: 'spring', stiffness: 100 }}
        />

        {/* Image 3 - Animated from Top */}
        <motion.div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${img3})` }}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ delay: 1.4, duration: 1, type: 'spring', stiffness: 100 }}
        />

        {/* Image 4 - Animated from Bottom */}
        <motion.div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${img4})` }}
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 1.6, duration: 1, type: 'spring', stiffness: 100 }}
        />

        {/* Image 5 - Animated from Top */}
        <motion.div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${img5})` }}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ delay: 1.8, duration: 1, type: 'spring', stiffness: 100 }}
        />
      </div>

      {/* White Gradient Behind Text for Clarity */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white via-transparent to-white opacity-60 z-20" />

      {/* Hero Content */}
      <div className="relative z-30 flex flex-col items-center text-center px-4">
        
        {/* Hero Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 to-blue-700 bg-clip-text text-transparent"
        >
          Welcome to VoxHive
        </motion.h1>

        {/* Hero Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-4 text-gray-100 text-lg md:text-xl max-w-md"
        >
          Discover, Inspire, and Create your colorful world with us.
        </motion.p>

        {/* Hero Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-6 flex items-center gap-2 bg-gradient-to-r from-pink-500 to-blue-600 text-white px-6 py-3 rounded-full font-semibold transition-transform duration-300"
        >
          Get Started <FaArrowRight />
        </motion.button>

      </div>

    </div>
  );
};

export default HeroSection;
