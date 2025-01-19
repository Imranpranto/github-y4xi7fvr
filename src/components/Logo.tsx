import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Images } from '../config/images';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "h-8 w-auto" }: LogoProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div
      className="flex items-center cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={Images.favicon}
        alt="COLDICP Logo"
        className="w-8 h-8 mr-2 flex-shrink-0"
      />
      <span className="text-2xl font-bold tracking-wide bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">COLDICP.EMAIL</span>
    </div>
  );
}
