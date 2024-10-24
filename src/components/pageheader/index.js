import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageHeader = ({ items }) => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleNav = (link) => {
    if (link) { // Only navigate if the link exists
      navigate(link);
    }
  }

  return (
    <div className="mb-6">
      {items?.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span>{item.separator}</span>}
          <span
            onClick={() => handleNav(item.link)} 
            className={`text-xl text-secondary-800 font-medium ${item.className} ${item.link ? 'cursor-pointer' : ''}`} // Add cursor-pointer only if item.link exists
          >
            {item.text}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
};

export default PageHeader;
