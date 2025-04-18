
import React from 'react';

interface CloudDecorationProps {
  className?: string;
}

const CloudDecoration: React.FC<CloudDecorationProps> = ({ className }) => {
  return (
    <div className={`${className} animate-float`}>
      <img 
        src="/lovable-uploads/7060ab0a-af7d-4618-8cc9-dac08ba36042.png" 
        alt="Cloud Decoration" 
        className="w-full h-auto opacity-80"
        onError={(e) => {
          // Fallback to this path if the first one fails
          const target = e.target as HTMLImageElement;
          target.onerror = null; // Prevent infinite loop
          target.src = "/images/logo.png";
        }}
      />
    </div>
  );
};

export default CloudDecoration;
