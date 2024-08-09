import React from "react";
import { MdModeEdit } from "react-icons/md";
import DetailItem from "../detailitem";
import SelectInput from "../selectinput";
import { BsThreeDotsVertical } from "react-icons/bs";
import MenuPopup from "../menupopup";

const CaseDetailsCard = ({
  title,
  clientName,
  caseType,
  createdOn,
  address,
}) => {
  const menuOption = [
    'Edit', 'Share case', 'Delete case'
  ];
  return (
  <div className="bg-white p-4 rounded-2xl mb-5">
    <div className="flex justify-between items-center mb-6 ">
    <div>
        <span className="text-[22px] block mb-2 leading-7 text-secondary-800 font-medium">{title}</span>
        <p className="text-base leading-6 text-secondary-800 font-medium">1500 Skyline Avenue</p>
      </div>
      <MenuPopup dropdownItems={menuOption} icon={<BsThreeDotsVertical className="text-secondary-800 opacity-40" />}/>
    </div>
    <ul className="card-details">
      <DetailItem label="Client Name" value={clientName} />
      <DetailItem label="Case Type" value={caseType} />
      <DetailItem label="Created on" value={createdOn} />
      <DetailItem label="Premises Address" value={address} />
      {/* <li>
        <span className="left-txt">Stage</span>
        <SelectInput
          name="startEnd"
          value=""
          onChange={(e) => console.log(e.target.value)}
          options={[
            { value: "start", label: "Start" },
            { value: "end", label: "End" },
          ]}
          inputClassName="border-none rounded-lg py-[6px] px-[16px] bg-select text-select-text leading-5 font-semibold shadow-full"
        />
      </li>
      <li>
        <span className="left-txt">Status</span>
        <SelectInput
          name="setUp"
          value=""
          onChange={(e) => console.log(e.target.value)}
          onBlur={() => {}}
          options={[
            { value: "settingup", label: "Setting up" },
            { value: "settingup", label: "Setting up" },
          ]}
          inputClassName="border-none rounded-lg py-[6px] px-[16px] bg-select text-select-text leading-5 font-semibold shadow-full"
        />
      </li> */}
    </ul>
  </div>
)};

export default CaseDetailsCard;
