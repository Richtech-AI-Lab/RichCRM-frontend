import { Checkbox, Table } from "flowbite-react";
import React, { useState } from "react";
import dummyData from "../../../utils/dummyData.json";
import { ROUTES } from "../../../constants/api";
import { useNavigate } from "react-router-dom";
import { IMAGES } from "../../../constants/imagePath";

const AddFromContactListing = ({ active }) => {
  const navigate = useNavigate();
  const [selectedUsers, setSelectedUsers] = useState([]);
  // console.log(selectedUsers, "what is selected user");
  const header = ["Name", "Position", "Company"];

  // Handle navigation
  const handleNavigation = () => {
    // navigate(ROUTES.CONTACT_PARTNER);
  };

  const toggleUserSelection = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const toggleAllSelection = () => {
    if (
      selectedUsers.length ===
      dummyData.filter((user) => user.type === active).length
    ) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(
        dummyData.filter((user) => user.type === active).map((user) => user._id)
      );
    }
  };

  return (
    <div className="overflow-x-auto contacts-table addFromContactModal">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>
            <Checkbox
              checked={
                selectedUsers.length ===
                dummyData.filter((user) => user.type === active).length
              }
              onChange={toggleAllSelection}
            />
          </Table.HeadCell>
          {header.map((key, index) => (
            <Table.HeadCell key={index}>{key}</Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {dummyData
            .filter((user) => user.type === active)
            .map((user) => (
              <Table.Row
                key={user.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
                onClick={handleNavigation}
              >
                <Table.Cell className="p-4">
                  <Checkbox
                    checked={selectedUsers.includes(user._id)}
                    onChange={() => toggleUserSelection(user._id)}
                  />
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  <div className="flex items-center">
                    <img
                      src={IMAGES.contact_avtar}
                      alt="Profile"
                      className="mr-3 rounded-full"
                    />
                    <span className="left-txt font-medium text-secondary-800">
                      {user.name}
                    </span>
                  </div>
                </Table.Cell>
                <Table.Cell>{user.position}</Table.Cell>
                <Table.Cell>{user.company}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default AddFromContactListing;
