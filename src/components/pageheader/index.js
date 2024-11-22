import React from 'react';
import { useNavigate } from 'react-router-dom';
import Label from '../label';

const PageHeader = ({ items }) => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleNav = (link) => {
    if (link) { // Only navigate if the link exists
      navigate(link);
    }
  }

  return (
    <div className="mb-2">
      <div
        style={{
          display: "flex",
          flexShrink: "0",
          opacity: 0.5,
        }}
        
      >
        <span style={{display:"flex", gap: "8px", alignItems: "center", cursor:"pointer"}} onClick={() => navigate(-1)}>

        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M14.25 9H3.75M3.75 9L9 14.25M3.75 9L9 3.75"
            stroke="#1A1C1F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            />
        </svg>
        <span style={{ color: "#1A1C1F", fontSize: "14px" }}>Back</span>
            </span>
      </div>

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
