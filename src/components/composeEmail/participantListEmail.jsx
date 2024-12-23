import React, { useEffect, useState } from "react";
import { IMAGES } from "../../constants/imagePath";
import XButton from "../button/XButton";
import { Checkbox } from "flowbite-react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ParticipantListEmail = ({ onClose, setToEmail, toEmail, meetModal ="" }) => {
  const { client, additionalClient } = useSelector((state) => state.client);
  const { organization, additionalOrganization } = useSelector(
    (state) => state.organization
  );

  const clientDetails = client?.data?.length > 0 ? client?.data : null;
  const organizationDetails =
    organization?.data?.length > 0 ? organization?.data : null;

  const { casesData } = useSelector((state) => state.case);

  const caseObj = casesData?.cases?.find(
    (item) => item.caseId === localStorage.getItem("c_id")
  );

  const attorneyDetails = useSelector((state) => state.contact.attorney);

  const [allResult, setAllResult] = useState([]);
  const [selectedParticipant, setSelectedParticipant] = useState([]);

  useEffect(() => {
    const isClientTypeIndividual = caseObj?.clientType === 0;
    const targetObj = isClientTypeIndividual
      ? clientDetails
      : organizationDetails;
    const additionalData = isClientTypeIndividual
      ? additionalClient
      : additionalOrganization;

    let emailArray = [];

    if (targetObj?.length > 0) {
      const mainEmail = targetObj[0];
      if (mainEmail) {
        emailArray.push(mainEmail);
      }

      if (attorneyDetails?.length > 0) {
        emailArray = [...emailArray, ...attorneyDetails];
      }

      if (additionalData?.length > 0) {
        emailArray = [...emailArray, ...additionalData];
      }

      if (emailArray.length > 0) {
        const filteredResults = emailArray.filter(
          (item) => !toEmail.some((email) => email === item.email)
        );

        setAllResult(filteredResults);
      } else {
        toast.error("Please update client email, No email exists!");
      }
    } else {
      toast.error("No primary client or organization found!");
    }
  }, [toEmail]);

  const getItemId = (item) =>
    item.contactId || item.clientId || item.organizationId;

  const handleCheckboxChange = (item) => {
    setSelectedParticipant((prevSelected) => {
      const itemId = getItemId(item);
      const isAlreadySelected = prevSelected.some(
        (participant) => getItemId(participant) === itemId
      );

      if (isAlreadySelected) {
        return prevSelected.filter(
          (participant) => getItemId(participant) !== itemId
        );
      } else {
        return [...prevSelected, item];
      }
    });
  };

  const handleAddButton = async () => {
    if(allResult.length === 0){
      onClose();
      return;
    }
    if (selectedParticipant.length === 0 ) {
      toast.error("No participants selected to add!");
      return;
    }

    const newEmails = selectedParticipant
      .filter((participant) => !toEmail.includes(participant.email))
      .map((participant) => participant.email);

    if (newEmails.length === 0) {
      toast.info("All selected emails are already added!");
      return;
    }

    setToEmail((prevEmails) => [...prevEmails, ...newEmails]);
    toast.success("Participants added successfully!");
    onClose();
  };

  return (
    <>
<div
  className={`card absolute w-full max-w-md shadow-shadow-light-2 ${meetModal ? 'right-[50px] top-[20vh] max-w-[249px]' : 'right-[25px] max-w-[249px]'}`}
  style={{
    background: "#fff",
    zIndex: "9",
  }}
>
        <div className="">
          <ul className="z-9999 overflow-hidden">
            {allResult?.length > 0 ? (
              allResult.map((item, index) => (
                <li
                  className="px-2 py-2 hover:bg-input-surface flex justify-between items-center"
                  key={getItemId(item)}
                >
                  <div className="flex items-center cursor-pointer">
                    <Checkbox
                      className="mr-6"
                      id={index}
                      checked={selectedParticipant.some(
                        (participant) =>
                          getItemId(participant) === getItemId(item)
                      )}
                      onChange={() => handleCheckboxChange(item)}
                    />
                    {caseObj?.clientType === 0 ? (
                      <div>
                        <p className="text-base text-secondary-800">
                          {item?.firstName} {item?.lastName}
                        </p>
                        <span className="text-text-gray-100 text-sm">
                          {item?.email}
                        </span>
                      </div>
                    ) : (
                      <div>
                        <p className="text-base text-secondary-800">
                          {item?.organizationName}
                        </p>
                        <span className="text-text-gray-100 text-sm">
                          {item?.email}
                        </span>
                      </div>
                    )}
                  </div>
                </li>
              ))
            ) : (
              <p className="text-center text-text-gray-100">
                No participants available to add!
              </p>
            )}
          </ul>
          <div className="flex justify-center items-center">
            <XButton
              type="button"
              text={`${allResult.length === 0 ? "Close" :"Add"}`}
              onClick={() => handleAddButton()}
              className="flex bg-primary text-sm text-white py-[10px] px-[70px] rounded-[100px] mt-2"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ParticipantListEmail;
