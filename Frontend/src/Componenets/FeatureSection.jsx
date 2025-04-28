import React, { useState } from 'react';
import { FaHeart, FaBookmark, FaComment } from 'react-icons/fa';
import img1 from '../assets/Featured-img/img1.jpg';
import img2 from '../assets/Featured-img/img2.jpg';
import img3 from '../assets/Featured-img/img3.jpg';
import img4 from '../assets/Featured-img/img4.jpg';
import img5 from '../assets/Featured-img/img5.jpg';
import img6 from '../assets/Featured-img/img6.jpg';
import img7 from '../assets/Featured-img/img7.jpg';
import img8 from '../assets/Featured-img/img8.jpg';

// Dummy card data with images and placeholder for like and comment counts
const cardData = {
  all: [
    { id: 1, title: 'Feature One', description: 'Description for feature one.', image: img1, likes: 24, comments: 5 },
    { id: 2, title: 'Feature Two', description: 'Description for feature two.', image: img2, likes: 56, comments: 8 },
    { id: 3, title: 'Feature Three', description: 'Description for feature three.', image: img3, likes: 12, comments: 3 },
  ],
  featured: [
    { id: 1, title: 'Feature One', description: 'Description for feature one.', image: img4, likes: 34, comments: 7 },
    { id: 2, title: 'Feature Two', description: 'Description for feature two.', image: img5, likes: 18, comments: 1 },
  ],
  popular: [
    { id: 3, title: 'Feature Three', description: 'Description for feature three.', image: img6, likes: 75, comments: 12 },
    { id: 4, title: 'Feature Four', description: 'Description for feature four.', image: img7, likes: 60, comments: 10 },
  ],
  latest: [
    { id: 5, title: 'Feature Five', description: 'Description for feature five.', image: img8, likes: 22, comments: 4 },
  ],
};

const FeaturesSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Function to handle category change
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // Function to render cards based on selected category
  const renderCards = () => {
    const cards = cardData[selectedCategory];
    return cards.map((card) => (
      <div key={card.id} className="bg-white rounded-lg shadow-lg overflow-hidden p-4">
        <img src={card.image} alt={card.title} className="w-full h-42 object-cover rounded-md" />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-purple-700">{card.title}</h3>
          <p className="mt-2 text-gray-600 text-sm">{card.description}</p>
        </div>

        {/* Icon Buttons and Count Section */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 text-gray-500">
            <div className="flex items-center gap-1">
              <FaHeart className="cursor-pointer hover:text-red-500" />
              <span>{card.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaBookmark className="cursor-pointer hover:text-pink-600" />
            </div>
            <div className="flex items-center gap-1">
              <FaComment className="cursor-pointer hover:text-blue-500" />
              <span>{card.comments}</span>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="py-12 bg-gradient-to-br from-pink-200 via-blue-200 to-purple-300 text-center">
      {/* Section Heading */}
      <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-700">
        Our Features
      </h2>

      {/* Menu Options */}
      <div className="mt-8 flex justify-center gap-6">
        <button
          onClick={() => handleCategoryClick('all')}
          className="bg-white text-purple-700 py-2 px-4 rounded-full shadow-lg hover:bg-purple-700 hover:text-white transition duration-300"
        >
          All
        </button>
        <button
          onClick={() => handleCategoryClick('featured')}
          className="bg-white text-purple-700 py-2 px-4 rounded-full shadow-lg hover:bg-purple-700 hover:text-white transition duration-300"
        >
          Featured
        </button>
        <button
          onClick={() => handleCategoryClick('popular')}
          className="bg-white text-purple-700 py-2 px-4 rounded-full shadow-lg hover:bg-purple-700 hover:text-white transition duration-300"
        >
          Popular
        </button>
        <button
          onClick={() => handleCategoryClick('latest')}
          className="bg-white text-purple-700 py-2 px-4 rounded-full shadow-lg hover:bg-purple-700 hover:text-white transition duration-300"
        >
          Latest
        </button>
      </div>

      {/* Cards Section */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-30">
        {renderCards()}
      </div>
    </div>
  );
};

export default FeaturesSection;
