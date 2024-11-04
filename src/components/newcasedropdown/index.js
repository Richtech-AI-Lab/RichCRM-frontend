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
    contactBadge = false,
    className
}) => {
    function getContactLabelAndColor(status, name) {
        let label = '';
        let displayColor = '';
        if (contactBadge == "individual") {
          switch (status) {
            case 0:
              label = 'Realtor';
              displayColor = 'blue';
              break;
            case 1:
              label = 'Attorney';
              displayColor = 'yellow';
              break;
            case 2:
              label = 'Title';
              displayColor = 'green';
              break;
            case 3:
              label = 'Lender';
              displayColor = 'yellow';
              break;
            case 4:
              label = 'Client';
              displayColor = 'yellow';
              break;
            case 5:
              label = 'Other';
              displayColor = 'yellow';
              break;
            default:
              label = 'Unknown';
              displayColor = 'black';
          }
        } else {
          switch (status) {
            case 1:
              label = 'Company';
              displayColor = 'green';
              break;
            case 2:
              label = 'Trust';
              displayColor = 'yellow';
              break;
            default:
              label = 'Unknown';
              displayColor = 'black';
          }
        }
    
        if (name === "label") {
          return label;
        } else {
          return displayColor
        }
    
      }
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
            {(contactBadge == "individual" || contactBadge == "organization") &&
                options?.map((option) => (
                    <Dropdown.Item className="py-3" key={option.value} onClick={() => onChange({ target: { name, value: option.value } })
                    }>
                      <span className={`bg-badge-${getContactLabelAndColor(option.value, "color")} text-secondary-100 text-sm font-semibold py-1 px-3 rounded-full inline-block`}>
                        {getContactLabelAndColor(option.value, "label")}
                      </span>
                    </Dropdown.Item>
                ))
            }
            {contactBadge == false && options?.map((option) => (
                <Dropdown.Item className="py-3" key={option.value} onClick={() => onChange({ target: { name, value: option.value } })
                }>
                    <span htmlFor="remember" className="text-secondary-800">{option.label}</span>
                </Dropdown.Item>

            ))}
        </Dropdown>

    );
};

export default NewCaseDropdown;