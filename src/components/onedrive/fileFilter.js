import React, { useState } from 'react';
import { Dropdown } from 'flowbite-react';
import { IoCheckmarkSharp, IoFilter } from "react-icons/io5";

const FileFilter = ({ onFilterChange}) => {
    const [selectedFilter, setSelectedFilter] = useState("all");

    let formattedOptions = [
        { label: "All", value: "all" },
        { label: "Folder", value: "folder" },
        { label: "Document", value: "document" },
        { label: "Images", value: "images" },
        { label: "PDFs", value: "pdf" },
    ];

    
    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
        onFilterChange(filter); // Pass filter to parent
    };

    return (
        <div className={`items-dropdown single-select mr-4`}>
            <Dropdown
                label={<>
                    <IoFilter size={20} className="mr-2" /> Filter
                    {/* {formattedOptions.find((option) => option.value === activeFilterTag)?.label || 'Default Label'} */}
                </>}
                inline
                className="rounded-2xl w-64 shadow-shadow-light-2"
                dismissOnClick={true}
            >

                {formattedOptions.map((option) => (
                    <Dropdown.Item
                        key={option.value}
                        className="py-3"
                        onClick={() => handleFilterChange(option.value)}
                    >
                        <div className="flex items-center gap-2">
                            {/* {sortBy === option.value && ( */}
                            <IoCheckmarkSharp size={20} className={`inline-block mr-1 ${selectedFilter == option.value ? "" : "opacity-0"}`} />

                            {option?.label}
                        </div>
                    </Dropdown.Item>
                ))}
            </Dropdown>
        </div>
    );
};

export default FileFilter;
