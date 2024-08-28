import { Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import dummyData from "../../../utils/dummyData.json";
import { ROUTES } from "../../../constants/api";
import { useNavigate } from "react-router-dom";
import { IMAGES } from "../../../constants/imagePath";
import { addFromContactTab } from "../../../constants/constants";
import { getContactRequest, setSelectedContact } from "../../../redux/actions/contactActions";
import { useDispatch, useSelector } from "react-redux";
import XSpinnerLoader from "../../../components/spinnerLoader/XSpinnerLoader";

const ContactListing = ({ active }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const contact = useSelector((state) => state?.contact?.contact?.data)
  const {loading} = useSelector((state) => state?.contact)

  const headers = {
    [addFromContactTab.BROKERS]: ["Name", "Position", "Company", "Email", "Cell Phone"],
    [addFromContactTab.ATTORNEY]: ["Name", "Position", "Law Office", "Email", "Cell Phone"],
    [addFromContactTab.TITLE]: ["Name", "Position", "Title Company", "Email", "Cell Phone"],
    [addFromContactTab.LENDER]: ["Name", "Position", "Lender Company", "Email", "Cell Phone"],
    [addFromContactTab.CLIENTS]: ["Name", "Email", "Cell Phone", "Note"],
    [addFromContactTab.OTHER]: ["Name", "Position", "Company", "Email", "Cell Phone"],
  };

  const handleNavigation = (item) => {
    dispatch(setSelectedContact(item));
    localStorage.setItem("contact_id",item)
    navigate(ROUTES.CONTACT_PARTNER);
  }
  const header = headers[active] ?? ["Name", "Position", "Company", "Email", "Cell Phone"];

  useEffect(() => {
    const fetchContactByType = async () => {
      try {
        const payload = {
          contactType: active
        };
        dispatch(getContactRequest(payload));
      } catch (error) {
        console.error("Error fetching conatct:", error);
      }
    };

    fetchContactByType();
  }, [active]);


  return (
    <div className="overflow-x-auto contacts-table">
      <XSpinnerLoader loading={loading} size="lg" />
      <Table>
        <Table.Head>
          {header.map(key => {
            return (
              <Table.HeadCell>{key}</Table.HeadCell>
            )
          })}
        </Table.Head>
        {contact?.length > 0
          ?
          <Table.Body className="divide-y">
            {contact?.filter(item => item.contactType === active).map((user, index) => {
              return (
                <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
                  onClick={()=>{handleNavigation(user)}}
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
                  {header.includes("Position") && <Table.Cell>{user.position}</Table.Cell>}
                  {header.includes("Title Company") && <Table.Cell>{user.position}</Table.Cell>}
                  {header.includes("Law Office") && <Table.Cell>{user.position}</Table.Cell>}
                  {header.includes("Lender Company") && <Table.Cell>{user.position}</Table.Cell>}
                  {header.includes("Company") && <Table.Cell>{user.company}</Table.Cell>}
                  {header.includes("Email") && <Table.Cell>{user.email}</Table.Cell>}
                  {header.includes("Cell Phone") && <Table.Cell>{user.cellNumber}</Table.Cell>}
                  {header.includes("Note") && <Table.Cell> <input className="border-none focus:ring-transparent" name="note" placeholder="Add a note" value={user.note} /></Table.Cell>}
                </Table.Row>
              )
            })}
          </Table.Body> :
          <div className="text-center text-gray-500 ">
            No contact available
          </div>
        }
      </Table>
    </div>
  );
};

export default ContactListing;
