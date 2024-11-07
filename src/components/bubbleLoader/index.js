import React from 'react';

const BubbleLoader = ({ loading }) => {
    return (
        loading ? (
          <div className="flex space-x-1 items-center">
            <div className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-wave-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-wave-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-wave-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        ) : null
      );
};

export default BubbleLoader;
