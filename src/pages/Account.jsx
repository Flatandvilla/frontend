import React, { useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

const AccountDetails = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4  rounded-lg shadow-lg
    relative  ">
      <h1 className="text-2xl text-darkblue font-bold mb-4 text-center">
        Account Details
      </h1>
      <div className={ `flex flex-col ${isOpen ? 'opacity-100 h-auto':'opacity-100 hidden' }`}>
        <div className={`mb-2 p-3 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex justify-between items-center">
            <label htmlFor="fullName" className="text-gray-600 mr-4">
              Full Name
            </label>
            <p id="fullName" className="text-gray-800">John Doe</p>
          </div>
        </div>

        <div className={`mb-2 p-3 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex justify-between items-center">
            <label htmlFor="email" className="text-gray-600 mr-4">
              Email
            </label>
            <p id="email" className="text-gray-800">johndoe@example.com</p>
          </div>
        </div>

        <div className={`mb-2 p-3 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex justify-between items-center">
            <label htmlFor="phoneNumber" className="text-gray-600 mr-4">
              Phone Number
            </label>
            <p id="phoneNumber" className="text-gray-800">123-456-7890</p>
          </div>
        </div>

        <div className={`mb-2 p-3 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex justify-between items-center">
            <label htmlFor="password" className="text-gray-600 mr-4">
              Password
            </label>
            <p id="password" className="text-gray-800">********</p>
          </div>
        </div>
      </div>
      
      <button
        className={`text-blue  cursor-pointer  flex items-center transition-all duration-300 ${
          isOpen ? 'bg-red-600 text-white p-3 rounded flex h-auto' :
           'bg-blue  text-white p-3 rounded  '
        }`}
        onClick={toggleAccordion}
      >
        {isOpen ? (
          <>
            <FaAngleUp className="mr-2" />
            Hide Details
          </>
        ) : (
          <>
            <FaAngleDown className="mr-2" />
            Show Details
          </>
        )}
      </button>
    </div>
  );
};

export default AccountDetails;
