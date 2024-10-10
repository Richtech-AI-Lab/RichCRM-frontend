import React, { useState } from 'react';
import { IMAGES } from '../../constants/imagePath';

const Search = ({ searchResults, onNavigation }) => {
    console.log(searchResults)
    // Sample data for case and contact tabs
    const caseData = [
        { id: 1, firstName: 'James', lastName: 'Wilson', address: '456 Oakwood Avenue' },
        { id: 2, firstName: 'Emma', lastName: 'Johnson', address: '890 Maple Drive' },
        { id: 3, firstName: 'Olivia', lastName: 'Davis', address: '789 Pine Lane' },
    ];

    const contactData = [
        { id: 4, firstName: 'John', lastName: 'Doe', contactType: 1 },
        { id: 5, firstName: 'Jane', lastName: 'Smith', contactType: 2 },
        { id: 6, firstName: 'Michael', lastName: 'Brown', contactType: 1 },
    ];

    // Mapping contact types
    const contactTypeLabels = {
        1: 'Personal',
        2: 'Business',
    };

    // State to control which tab is active
    const [activeTab, setActiveTab] = useState('case');

    // Handler for switching between tabs
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const dummyFunc = (item) => { console.log(item) }

    const handleClick = (item) => {
        if (activeTab=="case") {
          onNavigation(item); // If item is active, navigate
        } else {
            dummyFunc(item); // Otherwise, call another function
        }
      };
return (
    <div className="card absolute w-full max-w-md p-4 mt-4 shadow-shadow-light-2 z-[1]">
        <div className="flex border-b">
            <button
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'case' ? 'text-blue-500 border-b-2 border-blue-500' : ''
                    }`}
                onClick={() => handleTabChange('case')}
            >
                Case
            </button>
            <button
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'contact' ? 'text-blue-500 border-b-2 border-blue-500' : ''
                    }`}
                onClick={() => handleTabChange('contact')}
            >
                Contact
            </button>
        </div>

        <div className="mt-2">
            <ul
                className="z-50 overflow-hidden"
            >
                {searchResults[activeTab]?.map((item) => (

                    <li
                        className="px-4 py-2 hover:bg-input-surface flex justify-between items-center"
                        key={item.id}
                        onClick={() => handleClick(item)}
                    >
                        {activeTab === "case" &&
                            <div className="flex items-center cursor-pointer">
                                <img src={IMAGES.searchcase} className="w-8 h-8 mr-3 rounded-full" alt="Avatar" />
                                <div>
                                    <p className="text-base text-secondary-800">
                                        {item?.clientName} {item?.premisesName}
                                    </p>
                                </div>
                            </div>}
                        {activeTab === "contact" &&
                            <div className="flex items-center cursor-pointer">
                                <img src={IMAGES.searchuser} className="w-8 h-8 mr-3 rounded-full" alt="Avatar" />
                                <div>
                                    <p className="text-base text-secondary-800">
                                        {item.firstName} {item.lastName}
                                    </p>
                                    <span className="text-text-gray-100 text-sm">
                                        {contactTypeLabels[item.contactType] || ''}
                                    </span>
                                </div>

                            </div>}
                        {/* <button className="text-red-500 hover:text-red-700">X</button> */}
                    </li>
                ))}
            </ul>
        </div>
    </div>
);
};

export default Search;
