import React, { useEffect, useState } from "react";
import { SlArrowRight } from "react-icons/sl";
import {
  CaseDetailsCard,
  ContactCard,
  PageHeader,
  XButton,
  XSpinnerLoader,
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
import { fetchClientByIdRequest } from "../../../redux/actions/clientActions";
import { fetchAddressByIdRequest } from "../../../redux/actions/utilsActions";
import { fetchOrganizationByIdRequest } from "../../../redux/actions/organizationActions";
import { fetchAttorneyByIdsRequest, fetchRealtorByIdsRequest } from "../../../redux/actions/contactActions";

const CaseCardData = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { casedetails } = location.state || {};
  const caseTypeLabel = caseTypeOptions.find(option => option.value === casedetails?.caseType)?.label || "Unknown";
  const { premises, loading } = useSelector((state) => state.premises);
  const { client } = useSelector((state) => state.client);
  const { organization } = useSelector((state) => state.organization);
  const utilData = useSelector((state) => state?.utils);
  const clientDetails = client?.data?.length > 0 ? client?.data : null;
  const organizationDetails = organization?.data?.length > 0 ? organization?.data : null;
  const premisesDetails = premises?.data?.length > 0 ? premises?.data[0] : null;
  const premisesTypeLabel = premisesTypes?.find(option => option.value == premisesDetails?.propertyType)?.label || "Unknown";

  const handleCaseDetails = () => {
    navigate(ROUTES.CASES_DETAILS)
  }
  // let premisesLoading= loading
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

  // useEffect(() => {
  //   const fetchAttorneyById = async () => {
  //     try {
  //       const payload = {
  //         contacts: casedetails && casedetails.contacts
  //       };
  //       dispatch(fetchAttorneyByIdsRequest(payload));
  //     } catch (error) {
  //       console.error("failed to fetch attorney", error);
  //     }
  //   };
  //   fetchAttorneyById()
  // }, [casedetails.contacts]);

  useEffect(() => {
    const fetchAttorneyById = async () => {
      try {
        const payload = {
          caseId: localStorage.getItem('c_id'),
          contactType: 1
        };
        dispatch(fetchAttorneyByIdsRequest(payload));
      } catch (error) {
        console.error("failed to fetch attorney", error);
      }
    };
    const fetchRealtorById = async () => {
      try {
        const payload = {
          caseId: localStorage.getItem('c_id'),
          contactType: 0
        };
        dispatch(fetchRealtorByIdsRequest(payload));
      } catch (error) {
        console.error("failed to fetch attorney", error);
      }
    };
    fetchRealtorById()
    fetchAttorneyById()
  }, [casedetails]);

  // useEffect(() => {
  //   const fetchRealtorById = async () => {
  //     try {
  //       const payload = {
  //         caseId: localStorage.getItem('c_id'),
  //         contactType: 1
  //       };
  //       dispatch(fetchAttorneyByIdsRequest(payload));
  //     } catch (error) {
  //       console.error("failed to fetch attorney", error);
  //     }
  //   };
  //   fetchRealtorById()
  // }, [casedetails]);

  useEffect(() => {
    if (premisesDetails && premisesDetails?.addressId) {
      let data = {
        addressId: premisesDetails?.addressId
      }
      dispatch(fetchAddressByIdRequest(data))
    }

  }, [premisesDetails])

  useEffect(() => {

    const fetchClientByQueryId = async (id) => {
      try {
        const payload = {
          clientId: id
        };
        dispatch(fetchClientByIdRequest(payload.clientId));
      } catch (error) {
        console.error("failed to fetch client", error);
      }
    };

    const fetchOrganizationByQueryId = async (id) => {
      try {
        const payload = {
          organizationId: id
        };
        dispatch(fetchOrganizationByIdRequest(payload.organizationId));
      } catch (error) {
        console.error("failed to fetch client", error);
      }
    };


    if (casedetails?.clientType == 0) {
      let id = casedetails?.clientId
      fetchClientByQueryId(id);
    } else {
      let id = casedetails?.organizationId
      fetchOrganizationByQueryId(id);
    }
  }, [casedetails]);

  const headerItems = [
    { text: "Cases", link: ROUTES.CASES, className: "mr-8" },
    { text: `${casedetails?.clientName} - ${premisesDetails?.name}`, separator: <SlArrowRight className="inline mr-10" /> },
  ];

  const [isUploadFileModalOpen, setIsUploadFileModalOpen] = useState(false);
  const toggleUploadFileModal = () => {
    setIsUploadFileModalOpen(!isUploadFileModalOpen);
  };

  const handleNav = () => {
    navigate(ROUTES.DOCUMENTS)
  };
  return (
    <div>
      <XSpinnerLoader loading={loading} size="lg" />
      <PageHeader items={headerItems} />
      <div className="flex justify-end justify-content:flex-end mb-6">
        <div className="grid gap-4 grid-cols-2 ">
          <XButton
            text="One Drive"
            onClick={() => handleNav()}
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
        <div className="md:col-span-12 lg:col-span-4">
          <CaseDetailsCard
            title={premisesDetails?.name}
            clientName={casedetails?.clientName}
            caseType={caseTypeLabel}
            premisesType={premisesTypeLabel}
            // address="1500 Skyline Avenue Apt 2503 New York, NY 10019"
            address={premisesDetails?.addressId
            }
          />
          {/* } */}
          {utilData?.loading ?
            <XButton
              text="Case Details"
              // icon={<FaRegEdit className="text-base mr-2 inline-block" />}
              className="bg-badge-gray text-secondary-800  rounded-full text-sm font-medium w-full py-3 px-3 mb-7 flex items-center justify-center"
            // onClick={handleCaseDetails}
            />
            :
            <XButton
              text="Case Details"
              // icon={<FaRegEdit className="text-base mr-2 inline-block" />}
              className="bg-badge-gray text-secondary-800  rounded-full text-sm font-medium w-full py-3 px-3 mb-7 flex items-center justify-center"
              onClick={handleCaseDetails}
            />
          }
          <ContactCard
            clientDetails={casedetails?.clientType == 0 ? clientDetails : organizationDetails}
            casedetails={casedetails}

          />
          {/* {casedetails?.clientType == 0 && <ContactCard
            clientDetails={clientDetails}
            casedetails={casedetails}
          />} */}
          {/* } */}
        </div>
        <StagesChecklist />
      </div>
      {isUploadFileModalOpen && <UploadFileModal fileName={`${casedetails?.clientName}-${casedetails?.premisesName}`} generalUpload={true} onClose={toggleUploadFileModal} />}
    </div>
  );
};

export default CaseCardData;
