import { Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import dummyData from "../../../utils/dummyData.json";
import { ROUTES } from "../../../constants/api";
import { useNavigate } from "react-router-dom";
import { IMAGES } from "../../../constants/imagePath";
import { addFromContactTab, addFromContactV1Tab } from "../../../constants/constants";
import { getContactRequest, setSelectedContact } from "../../../redux/actions/contactActions";
import { useDispatch, useSelector } from "react-redux";
import XSpinnerLoader from "../../../components/spinnerLoader/XSpinnerLoader";
import { FiPlus } from "react-icons/fi";
import { XButton } from "../../../components";
import NewContactModal from "../../../components/contactModal/newContactModal";
import ContactButtonWithModal from "../../../components/newContactButton";

const ContactListingV1 = ({ active, parent }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const contact = useSelector((state) => state?.contact?.contact)
  const { loading } = useSelector((state) => state?.contact)

  const headers = {
    [addFromContactV1Tab.individuals]: ["Name", "Tag", "Organization", "Position", "Email", "Cell Phone"],
    [addFromContactV1Tab.organizations]: ["Name", "Tag", "Primary Contact", "Email", "Cell Phone"]
  };

  const handleNavigation = (item) => {
    dispatch(setSelectedContact(item));
    localStorage.setItem("contact_id", item)
    navigate(ROUTES.CONTACT_PARTNER);
  }
  const header = headers[active] ?? ["Name", "Position", "Company", "Email", "Cell Phone"];

  useEffect(() => {
    const fetchContactByType = async () => {
      try {
        const payload = {
          contactType: 4
        };
        dispatch(getContactRequest(payload));
      } catch (error) {
        console.error("Error fetching conatct:", error);
      }
    };

    fetchContactByType();
  }, [active]);


  return (
    <div className={`overflow-x-auto h-[68vh]  ${parent === `dashboard` ? `` : `contacts-table`}`}>
      <XSpinnerLoader loading={loading} size="lg" />
      <Table className="">

        {contact?.length > 0
          ?
          <>
             <Table.Head>
              {header.map(key => {
                return (
                  <Table.HeadCell>{key}</Table.HeadCell>
                )
              })}
            </Table.Head>
            <Table.Body className="divide-y">
              {contact?.map((user, index) => {
                return (
                  <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
                    onClick={() => { handleNavigation(user) }}
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      <div className="flex items-center">
                        <img
                          src={IMAGES.contact_avtar}
                          alt="Profile"
                          className="mr-3 rounded-full"
                        />
                        <span className="left-txt font-medium text-secondary-800">{user.firstName} {user.lastName}</span>
                      </div>
                    </Table.Cell>
                    {header.includes("Tag") && <Table.Cell>{user.contactType}</Table.Cell>}
                    {header.includes("Organization") && <Table.Cell>{user.company}</Table.Cell>}
                    {header.includes("Position") && <Table.Cell>{user.position}</Table.Cell>}
                    {header.includes("Email") && <Table.Cell>{user.email}</Table.Cell>}
                    {header.includes("Cell Phone") && <Table.Cell>{user.cellNumber}</Table.Cell>}
                    {/* {header.includes("Lender Company") && <Table.Cell>{user.position}</Table.Cell>}
                    {header.includes("Company") && <Table.Cell>{user.company}</Table.Cell>}
                    {header.includes("Note") && <Table.Cell> <input className="border-none focus:ring-transparent" name="note" placeholder="Add a note" value={user.note} /></Table.Cell>} */}
                  </Table.Row>
                )
              })}
            </Table.Body> </> :
          <>
            <div className="flex flex-col items-center justify-center h-[60vh] w-full">
              <p className="text-center text-gray-500">No contact available</p>
              <ContactButtonWithModal
                buttonClass="bg-active-blue shadow-shadow-light text-sm text-active-blue-text py-[10px] px-6 rounded-[100px] font-medium mt-4" 
                modalContent={<NewContactModal />} 
              />
              {/* <XButton
                text="New Contact"
                icon={<FiPlus className="text-base mr-2 inline-block" />}
                className="bg-active-blue shadow-shadow-light text-sm text-active-blue-text py-[10px] px-6 rounded-[100px] font-medium mt-4" // Added mt-4 for spacing
              /> */}
            </div>

          </>
        }
      </Table>
    </div>
  );
};

export default ContactListingV1;
