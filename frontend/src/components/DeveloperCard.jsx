import React from 'react';
import { FaTools, FaBriefcase, FaPhone, FaEnvelope } from 'react-icons/fa';

const DeveloperCard = ({ developer, onClick }) => (
  <div className="border border-lg border-gray-400 rounded-lg p-4 shadow-md cursor-pointer" onClick={() => onClick(developer)}>
    <img src={developer.image} alt={`${developer.name}'s avatar`} loading="lazy" className="w-full h-64 object-cover rounded-lg mb-4" />
    <h3 className="text-xl font-bold mb-2">{developer.name}</h3>
    
    <p className='flex items-center mb-2'>
      <FaTools className="text-blue-500 text-xl mr-2" />
      <strong className='mr-1'>Skills:</strong> {developer.skillsets.join(', ')}
    </p>
    
    <p className='flex items-center mb-2'>
      <FaBriefcase className="text-green-500 text-xl mr-2" />
      <strong className='mr-1'>Experience:</strong> {developer.experience} years
    </p>
    
    <p className='flex items-center mb-2'>
      <FaPhone className="text-yellow-500 text-xl mr-2" />
      <strong className='mr-1'>Phone:</strong> {developer.phoneVisibility ? developer.phone : 'Hidden'}
    </p>
    
    <p className='flex items-center  mb-2'>
      <FaEnvelope className="text-red-500 text-xl mr-2" />
      <strong className='mr-1'>Email:</strong> {developer.emailVisibility ? developer.email : 'Hidden'}
    </p>
  </div>
);

export default DeveloperCard;
