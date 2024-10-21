import React, { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import DetailItem from "../detailitem";
import SelectInput from "../selectinput";
import { BsThreeDotsVertical } from "react-icons/bs";
import MenuPopup from "../menupopup";
import DeleteModal from "../deleteModal";
import { deleteCaseRequest } from "../../redux/actions/caseAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CaseDetailsCard = ({
  title,
  clientName,
  caseType,
  premisesType,
  address,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const menuOption = [
    'Edit', 'Share case', 'Delete case'
  ];


  const handleOptionSubmit = (id, label) => {
    if (label === "Delete case") {
      setShowDeletePopup(true)
    }
  };

  const handleDelete = async () => {

    if (localStorage.getItem("c_id")) {
      let data = {
        caseId: localStorage.getItem("c_id")
      }
      dispatch(deleteCaseRequest(data, navigate))
      setShowDeletePopup(false);
    }
    
  };
  return (
    <div className="bg-white p-4 rounded-2xl mb-5">
      <div className="flex justify-between items-center mb-6 ">
        <div>
          <span className="md:text-[22px] lg:text-lg block mb-2 leading-7 text-secondary-800 font-medium">{title}</span>
          <p className="text-base leading-6 text-secondary-800 font-medium">{address}</p>
        </div>
        <MenuPopup
          // dropdownItems={menuOption} 
          handleOptionSubmit={handleOptionSubmit}
          dropdownItems={menuOption}
          icon={<BsThreeDotsVertical className="text-secondary-800 opacity-40" />} />
      </div>
      <ul className="card-details">
        <DetailItem label="Case Type" value={caseType} />
        <DetailItem label="Client Name" value={clientName} />
        <DetailItem label="Premises Type" value={premisesType} />
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
      <DeleteModal
        isOpen={showDeletePopup}
        onConfirm={() => handleDelete()}
        onCancel={() => setShowDeletePopup(false)}
        title="Confirm Deletion"
        message="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  )
};

export default CaseDetailsCard;
