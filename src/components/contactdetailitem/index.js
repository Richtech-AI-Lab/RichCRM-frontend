import React from "react";
import SelectInput from "../selectinput";

const ContactDetailItem = ({ icon, label, content, isInput, className }) => {
  return (
    <li>
      <span className="left-txt flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        {label}
      </span>
      <div>
        {isInput ? (
          <SelectInput
            name="contactType"
            value=""
            onChange={(e) => console.log(e.target.value)}
            options={[
              { value: "Purchaser", label: "Purchaser(Client)" },
              { value: "Seller", label: "Seller" },
            ]}
            inputClassName="border-border rounded-full py-[10px] px-[16px] bg-transparent text-secondary-700 leading-5 font-semibold"
          />
        ) : (
          <span className={`text-right ${className || ""} text-title`}>
            {content}
          </span>
        )}
      </div>
    </li>
  );
};

export default ContactDetailItem;
