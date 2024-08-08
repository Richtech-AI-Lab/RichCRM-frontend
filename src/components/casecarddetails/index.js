import React, { useState } from "react";
import CardListItem from "../cardlistitem";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IMAGES } from "../../constants/imagePath";
import { useFormikContext } from "formik";

const CaseCardDetails = ({ title, items, handle,form }) => {
  const { setFieldValue } = useFormikContext();
  const [fields, setFields] = useState(items)

  const handleShowClick = (index) => {
    setFields(prevFields => {
      const newFields = [...prevFields];
      newFields[index].show = true;
      return newFields;
    });
  };

  const handleHideClick = (index, item) => {
    setFieldValue(item.name, "")
    setFields(prevFields => {
      const newFields = [...prevFields];
      newFields[index].show = false;
      return newFields;
    });
  };

  return (
    <div className="bg-white p-4 rounded-2xl mb-5">
      { title && <div className="flex justify-between items-center mb-5">
          <span className="text-base text-secondary-800 font-medium">{title}</span>
          <div className="flex items-center gap-2">
            <BsThreeDotsVertical className="text-lg opacity-40" />
          </div>
        </div>}
      
      <ul className="card-details">
        {fields?.map((item, index) => item.show === false ?
          (
            <li key={index}>
              <span className="left-txt flex items-center" onClick={() => handleShowClick(index)}>
                <span className="icon mr-2 cursor-pointer">          
                  <img
                  src={IMAGES.addIcon}
                  alt="icon"
                />
                </span>
                {item.buttonText}
              </span>
            </li>
          ) :
          (
            <>
              <CardListItem
                formerror={form}
                key={index}
                label={item.label}
                name={item.name}
                value={item.value}
                type={item.type ? item.type : "text"}
                options={
                  item.type === "checkboxes"
                    ? item.checkboxOptions
                    : item.type === "dropdown" || item.type === "inputdropdown"
                      ? item.dropDownOptions
                      : []
                }
                inputProps={{
                  type: "text",
                  onChange: handle,
                  placeholder: item.placeholder,
                }}
                icon={item.icon}
                optional={item.optional}
                funcHandleHideClick={() => handleHideClick(index,item)}
              />
            </>
          )
        )}
      </ul>
    </div>
  )
};

export default CaseCardDetails;
