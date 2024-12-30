import React, { useState } from "react";
import { IMAGES } from "../../constants/imagePath";
import { toast } from "react-toastify";

const SearchListEmail = ({ searchResults , setSearchResults, setToEmail, setInputValue, placeCss}) => {
    const handleItemClick = async (item) => {
        if(item?.email){
          setToEmail((prevEmails) => {
            if (prevEmails.includes(item.email)) {
                toast.warning("Email already added!");
                return prevEmails; // Return the existing array without changes
            }
            return [...prevEmails, item.email]; // Add the new email
        });
        }else{
            toast.error("Email not exist!")
        }
        setSearchResults([])
        setInputValue('')
    }
  return (
        <div
          className="card absolute w-full max-w-md shadow-shadow-light-2 over"
          style={placeCss}
        >
          <div className="">
            <ul className="z-9999 overflow-hidden">
              {searchResults?.map((item) => (
                <li
                  className="px-2 py-2 hover:bg-input-surface flex justify-between items-center"
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                >
                  <div className="flex items-center cursor-pointer">
                    <img
                      src={IMAGES.avatarpic}
                      className="w-8 h-8 mr-3 rounded-full"
                      alt="Avatar"
                    />
                    <div>
                      <p className="text-base text-secondary-800">
                        {item.firstName}
                        {item.lastName}
                      </p>
                      <span className="text-text-gray-100 text-sm">
                        {item.type}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

  );
};

export default SearchListEmail;
