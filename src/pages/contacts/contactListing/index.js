import { Table } from "flowbite-react";
import React, { useState } from "react";
import dummyData from "../../../utils/dummyData.json";
import { ROUTES } from "../../../constants/api";
import { useNavigate } from "react-router-dom";
import { IMAGES } from "../../../constants/imagePath";
import { addFromContactTab } from "../../../constants/constants";

const ContactListing = ({ active }) => {

  const navigate = useNavigate()
  const headers = {
    [addFromContactTab.BROKERS]: ["Name", "Position", "Company", "Email", "Cell Phone"],
    [addFromContactTab.ATTORNEY]: ["Name", "Position", "Law Office", "Email", "Cell Phone"],
    [addFromContactTab.TITLE]: ["Name", "Position", "Title Company", "Email", "Cell Phone"],
    [addFromContactTab.LENDER]: ["Name", "Position", "Lender Company", "Email", "Cell Phone"],
    [addFromContactTab.CLIENTS]: ["Name", "Email", "Cell Phone", "Note" ],
    [addFromContactTab.OTHER]: ["Name", "Position", "Company", "Email", "Cell Phone" ],
  };

  const handleNavigation = () => {
    navigate(ROUTES.CONTACT_PARTNER);
  }
  const header = headers[active] ?? ["Name", "Position", "Company", "Email", "Cell Phone"];

  return (
    <div className="overflow-x-auto contacts-table">
      <Table>
        <Table.Head>
          {header.map(key => {
            return (
              <Table.HeadCell>{key}</Table.HeadCell>
            )
          })}
        </Table.Head>
        <Table.Body className="divide-y">
          {dummyData.filter(user => user.type === active).map((user, index) => {
            return (
              <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"  
              onClick={handleNavigation}
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  <div className="flex items-center">
                    <img
                      src={IMAGES.contact_avtar}
                      alt="Profile"
                      className="mr-3 rounded-full"
                    />
                    <span className="left-txt font-medium text-secondary-800">{user.name}</span>
                  </div>
                </Table.Cell>
                {header.includes("Position") && <Table.Cell>{user.position}</Table.Cell>}
                {header.includes("Title Company") && <Table.Cell>{user.position}</Table.Cell>}
                {header.includes("Law Office") && <Table.Cell>{user.position}</Table.Cell>}
                {header.includes("Lender Company") && <Table.Cell>{user.position}</Table.Cell>}
                {header.includes("Company") && <Table.Cell>{user.company}</Table.Cell>}
                {header.includes("Email") && <Table.Cell>{user.email}</Table.Cell>}
                {header.includes("Cell Phone") && <Table.Cell>{user.cellphone}</Table.Cell>}
                {header.includes("Note") && <Table.Cell> <input className="border-none focus:ring-transparent" name="note" placeholder="Add a note" value={user.note}/></Table.Cell>}
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default ContactListing;
