import React from 'react';
import { useSelector } from 'react-redux';

const NewBadge = ({ label }) => {
  // Fetch tag details from Redux
  const tagDetails = useSelector((state) => state.tag.tag);

  // Find the tag that matches the provided label
  const tag = tagDetails.find((tag) => tag.label === label);


  // If no matching tag is found, return null or some default Newbadge
  if (!tag) return null;

  return (
    <span
      className="text-sm font-semibold py-1 px-3 rounded-full inline-block"
      style={{
        backgroundColor: tag.color1,
        color: tag.color2,
      }}
    >
      {label}
    </span>
  );
};

export default NewBadge;
