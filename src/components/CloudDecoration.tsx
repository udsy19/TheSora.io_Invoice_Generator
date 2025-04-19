
import React from 'react';

interface CloudDecorationProps {
  className?: string;
}

const CloudDecoration: React.FC<CloudDecorationProps> = ({ className }) => {
  return (
    <div className={`${className} animate-float`}>
      <img 
        src="/images/Logo.png" 
        alt="Cloud Decoration" 
        className="w-full h-auto opacity-80"
      />
    </div>
  );
};

export default CloudDecoration;
