import React from "react";
import { Dropdown } from "flowbite-react";
import { BsThreeDotsVertical } from "react-icons/bs";

const NewCaseDropdown = ({
    disabled = false,
    label,
    name,
    value,
    onChange,
    onBlur,
    options,
    error,
    touched,
    inputClassName,
    labelClassName,
    defaultLabel,
    className
}) => {
    const selectedLabel = options.find((option) => option.value === value)?.label;
    return (
        <Dropdown
        disabled={disabled}  
            label={selectedLabel || defaultLabel || "Select..."}
            name={name}
            value={value}
            onBlur={onBlur}
            inline
            className="rounded-2xl shadow-shadow-light-2 max-h-[400px] overflow-y-auto"
        >
            {options?.map((option) => (
                <Dropdown.Item className="py-3" key={option.value} onClick={() => onChange({ target: { name, value: option.value } })
                }>
                    <span htmlFor="remember" className="text-secondary-800">{option.label}</span>
                </Dropdown.Item>

            ))}
        </Dropdown>

    );
};

export default NewCaseDropdown;