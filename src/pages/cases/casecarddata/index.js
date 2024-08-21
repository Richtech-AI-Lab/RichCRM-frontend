import React, { useEffect, useState } from "react";
import { SlArrowRight } from "react-icons/sl";
import {
  CaseDetailsCard,
  ContactCard,
  PageHeader,
  XButton,
} from "../../../components";
import { IMAGES } from "../../../constants/imagePath";
import StagesChecklist from "../../../components/stageschecklist";
import { useLocation, useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { ROUTES } from "../../../constants/api";
import { CgFolder } from "react-icons/cg";
import { LuUpload } from "react-icons/lu";
import UploadFileModal from "../../../components/caseModal/uploadFileModal";
import { caseTypeOptions, premisesTypes } from "../../../utils/formItem";
import { fetchPremisesByQueryIdRequest } from "../../../redux/actions/premisesActions";
import { useDispatch, useSelector } from "react-redux";

const CaseCardData = () => {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const {casedetails }= location.state || {};
  const caseTypeLabel = caseTypeOptions.find(option => option.value === casedetails.caseType)?.label || "Unknown";
  const {premises}= useSelector((state) => state.premises);
  const premisesDetails = premises?.data?.length > 0 ? premises?.data[0] : null;
  const premisesTypeLabel = premisesTypes.find(option => option.value === premisesDetails?.propertyType)?.label || "Unknown";

const handleCaseDetails=()=>{
    navigate(ROUTES.CASES_DETAILS)
  }

  useEffect(() => {
    const fetchPremisesByQueryId = async () => {
      try {
        const payload = {
          premisesId: casedetails && casedetails?.premisesId,
        };
        dispatch(fetchPremisesByQueryIdRequest(payload));
      } catch (error) {
        console.error("Failed to fetch premises data:", error);
      }
    };

    fetchPremisesByQueryId();
  }, [casedetails.premisesId]);

  const headerItems = [
    { text: "Cases", className: "mr-8" },
    { text: "Fu, Jack - 1500 Skyline Avenue ", separator: <SlArrowRight className="inline mr-10" />},
  ];
  const contactData = [
    {
      profileImage: IMAGES.profile,
      name: "Jack Fu",
      email: "xxxxxx@xxx.xxx",
      phone: "1(+1) xxx xxx xxxx",
      weChat: "(+1) xxx xxx xxxx",
      address: "2000 Panorama Blvd Apt 3605 New York, NY 10022",
    },
    {
      profileImage: IMAGES.profile,
      name: "Alexander Reed",
      email: "xxxxxx@xxx.xxx",
      phone: "(+1) xxx xxx xxxx",
      weChat: "(+1) xxx xxx xxxx",
    address: "137 Maple Avenue Brooklyn, NY 11215",
    },
    {
      profileImage: IMAGES.profile,
      name: "ABC Attorney",
      email: "xxxxxx@xxx.xxx",
      phone: "(+1) xxx xxx xxxx",
      weChat: "(+1) xxx xxx xxxx",
    address: "137 Maple Avenue Brooklyn, NY 11215",
    },
  ];

  const [isUploadFileModalOpen, setIsUploadFileModalOpen] = useState(false);
  const toggleUploadFileModal = () => {
    setIsUploadFileModalOpen(!isUploadFileModalOpen);
  };

  return (
    <div>
      <PageHeader items={headerItems} />
      <div className="flex justify-end justify-content:flex-end mb-6">
        <div className="grid gap-4 grid-cols-2 ">
          <XButton
            text="One Drive"
            icon={<CgFolder className="text-base mr-2 inline-block font-medium" />}
            className="bg-white shadow-shadow-light text-secondary-800 py-3 px-6 rounded-full font-medium"
          />
          <XButton
            onClick={toggleUploadFileModal}
            text="Upload File"
            icon={<LuUpload className="text-base mr-2 inline-block font-medium" />}
            className="bg-white shadow-shadow-light text-secondary-800 py-3 px-6 rounded-full font-medium"
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-4">
          <CaseDetailsCard
            title={premisesDetails?.name}
            clientName={casedetails?.clientName}
            caseType={caseTypeLabel}
            premisesType={premisesTypeLabel}
            // address="1500 Skyline Avenue Apt 2503 New York, NY 10019"
            address={premisesDetails?.addressId
            }
          />
          <XButton
            text="Case Details"
            // icon={<FaRegEdit className="text-base mr-2 inline-block" />}
            className="bg-badge-gray text-secondary-800  rounded-full text-sm font-medium w-full py-3 px-3 mb-7 flex items-center justify-center"
            onClick={handleCaseDetails}
          />
          {/* <ContactCard
            profileImage={IMAGES.profile}
            name="Jack Fu"
            // notes="Notes"
            email="xxxxxx@xxx.xxx"
            phone="(+1) xxx xxx xxxx"
            weChat="(+1) xxx xxx xxxx"
            address="2000 Panorama Blvd Apt 3605 New York, NY 10022"
          /> */}
           <ContactCard contactData={contactData} />
        </div>
        <StagesChecklist />
      </div>
      {isUploadFileModalOpen && <UploadFileModal onClose={toggleUploadFileModal} />}
    </div>
  );
};

export default CaseCardData;
