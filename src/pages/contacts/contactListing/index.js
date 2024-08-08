import { Table } from "flowbite-react";
import React, { useState } from "react";
import dummyData from "../../../utils/dummyData.json";
import { ROUTES } from "../../../constants/api";
import { useNavigate } from "react-router-dom";

const ContactListing = ({ active }) => {
  const navigate = useNavigate()
  const header=["Name", "Position", "Company", "Email", "Cell Phone", "Work Phone"]
  
  const handleNavigation = () =>{
    navigate(ROUTES.CONTACT_PARTNER);
  }
  return (
    <div className="overflow-x-auto contacts-table">
      <Table>
        <Table.Head>
          {header.map(key=>{
            return (
              <Table.HeadCell>{key}</Table.HeadCell>
            )
          })}
        </Table.Head>
        <Table.Body className="divide-y">
          {dummyData.filter(user => user.type === active).map((user, index) => {
            return (
              <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer" onClick={handleNavigation }>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  <div className="flex items-center">
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="mr-3 rounded-full"
                    />
                    <span className="left-txt font-medium text-secondary-800">{user.name}</span>
                  </div>
                </Table.Cell>
                <Table.Cell>{user.position}</Table.Cell>
                <Table.Cell>{user.company}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.cellphone}</Table.Cell>
                <Table.Cell>{user.workphone}</Table.Cell>
              </Table.Row>  
            )
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default ContactListing;
