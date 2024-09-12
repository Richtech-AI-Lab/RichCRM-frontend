import React, { useState } from 'react';
import { IMAGES } from '../../constants/imagePath';

const Search = ({searchResults}) => {
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

    // Search results based on the active tab

    return (
        <div className="card absolute w-full max-w-md p-4 mt-4 shadow-shadow-light-2">
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
                {/* <p className="text-xs text-gray-500">Recently Viewed</p> */}
                <ul 
                // className="mt-2 bg-white z-50 search-list-dropdown overflow-hidden rounded-2xl shadow-shadow-light-2"
                >
                    {searchResults?.map((item) => (
                        <li
                            className="px-4 py-2 hover:bg-input-surface flex justify-between items-center"
                            key={item.id}
                        >
                            <div className="flex items-center">
                                <img src={IMAGES.contact_avtar} className="w-8 h-8 mr-3 rounded-full" alt="Avatar" />
                                <div>
                                    <p className="text-base text-secondary-800">
                                        {item.firstName} {item.lastName}
                                    </p>
                                        <span className="text-text-gray-100 text-sm">
                                            {contactTypeLabels[item.contactType] || ''}
                                        </span>
                                </div>
                            </div>
                            {/* <button className="text-red-500 hover:text-red-700">X</button> */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    //     <ul className={'absolute left-0 right-0 mt-2 bg-white z-50 search-list-dropdown overflow-hidden rounded-2xl shadow-shadow-light-2'}>
    //     {caseData?.map((item) => (
    //       <li
    //         className={'px-4 py-2 hover:bg-input-surface'}
    //         // onClick={() => handleItemClick(item)} // Use the new handler
    //         key={item.id} // Adding a key for each list item for better performance
    //       >
    //         <div className="flex items-center">
    //           {/* <img src={IMAGES.contact_avtar} className="w-8 mr-3" /> */}
    //           <div>
    //             <p className="text-base text-secondary-800">{item?.firstName} {item?.lastName}</p>
    //             <span className="text-text-gray-100 text-sm">{contactTypeLabels[item?.contactType] || ""}</span>
    //           </div>
    //         </div>
    //       </li>
    //     ))}
    //   </ul>
    );
};

export default Search;