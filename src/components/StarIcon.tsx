
import React from 'react';

interface StarIconProps {
  className?: string;
}

const StarIcon: React.FC<StarIconProps> = ({ className }) => {
  return (
    <div className={`${className} animate-pulse`}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L14.2451 8.90983H21.5106L15.6327 13.1803L17.8779 20.0902L12 15.82L6.12215 20.0902L8.36729 13.1803L2.48944 8.90983H9.75486L12 2Z" fill="white" fillOpacity="0.8" />
      </svg>
    </div>
  );
};

export default StarIcon;
