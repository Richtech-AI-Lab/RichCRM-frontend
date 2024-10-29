import { Pagination, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { ROUTES } from "../../../constants/api";
import { useNavigate } from "react-router-dom";
import { IMAGES } from "../../../constants/imagePath";
import { addFromContactTab, addFromContactV1Tab, CONTACT_TYPE, ORGANIZATION_TYPE } from "../../../constants/constants";
import { getContactRequest, setSelectedContact } from "../../../redux/actions/contactActions";
import { useDispatch, useSelector } from "react-redux";
import XSpinnerLoader from "../../../components/spinnerLoader/XSpinnerLoader";
import ContactButtonWithModal from "../../../components/newContactButton";
import NewIndividualContactModalV1 from "../../../components/contactModal/newIndividualContactModalV1";
import NewOrganizationContactModalV1 from "../../../components/contactModal/newOrganizationContactModalV1";
import { fetchOrganizationByTypeRequest, setSelectedOrganization } from "../../../redux/actions/organizationActions";

const ContactListingV1 = ({ active, parent, activeFilter }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const contact = useSelector((state) => state?.contact?.contact)
  // const [currentPage, setCurrentPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const { loading: loadingContact } = useSelector((state) => state?.contact)

  const organization = useSelector((state) => state?.organization?.organization)

  const { loading: loadingOrg } = useSelector((state) => state?.organization)
  const itemsPerPage = 10;
  const totalPages = Math?.ceil((active == 0 ? contact?.length : organization?.length) / itemsPerPage);

  // console.log(organization,"organization")
  // Update displayed data based on pagination
  const paginatedData = (active == 0 ? contact : organization)?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  // console.log(paginatedData, "paginatedData", active, "contact", organization)


  const headers = {
    [addFromContactV1Tab.individuals]: ["Name", "Tag", "Organization", "Position", "Email", "Cell Phone"],
    [addFromContactV1Tab.organizations]: ["Name", "Tag", "Website", "Email", "Cell Phone"]
  };
  const onPageChange = (page) => setCurrentPage(page);
  const handleNavigation = (item) => {
    if (active == 0) {
      dispatch(setSelectedContact(item));
      localStorage.setItem("contact_id", item)
      navigate(ROUTES.CONTACT_PARTNER, { state: { active } });
    } else {
      dispatch(setSelectedOrganization(item));
      localStorage.setItem("organization_id", item)
      navigate(ROUTES.CONTACT_PARTNER, { state: { active } });
    }
  }
  const header = headers[active] ?? ["Name", "Position", "Company", "Email", "Cell Phone"];

  useEffect(() => {
    const fetchContactByType = async () => {
      try {
        const payload = {
          contactType: activeFilter
        };
        dispatch(getContactRequest(payload));
      } catch (error) {
        console.error("Error fetching conatct:", error);
      }
    };
    const fetchOrganizationByType = async () => {
      try {
        const payload = {
          organizationType: activeFilter
        };
        dispatch(fetchOrganizationByTypeRequest(payload));
      } catch (error) {
        console.error("Error fetching conatct:", error);
      }
    };

    if (active == 0) {
      fetchContactByType();
    } else {
      fetchOrganizationByType();
    }
    setCurrentPage(1)

  }, [active, activeFilter]);

  function getTaskLabelAndColor(status, name) {
    let label = '';
    let displayColor = '';

    switch (status) {
      case 0:
        label = 'Realtor';
        displayColor = 'blue';
        break;

      case 1:
        label = 'Attorney';
        displayColor = 'yellow';
        break;

      case 2:
        label = 'Title';
        displayColor = 'green';
        break;

      case 3:
        label = 'Lender';
        displayColor = 'yellow';
        break;
      case 4:
        label = 'Client';
        displayColor = 'yellow';
        break;
      case 5:
        label = 'Other';
        displayColor = 'yellow';
        break;


      default:
        label = 'Unknown';
        displayColor = 'black';
    }
    if (name === "label") {
      return label;
    } else {
      return displayColor
    }

  }

  return (
    <>

    <div className={`overflow-x-auto h-[68vh] ${parent === 'dashboard' ? '' : 'contacts-table db-contacts'}`}>
        <XSpinnerLoader loading={loadingContact || loadingOrg} size="lg" />
        <Table>
          {active === 0 && contact?.length > 0 ? (
            <>
              <Table.Head>
                {header.map((key, index) => (
                  <Table.HeadCell key={index}>{key}</Table.HeadCell>
                ))}
              </Table.Head>
              <Table.Body className="divide-y">
                {paginatedData?.map((user, index) => (
                  <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
                    onClick={() => handleNavigation(user)}
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      <div className="flex items-center">
                        <img src={IMAGES.contact_avtar} alt="Profile" className="mr-3 rounded-full" />
                        <span className="left-txt font-medium text-secondary-800">
                          {user.firstName} {user.lastName}
                        </span>
                      </div>
                    </Table.Cell>
                    {header.includes("Tag") && (
                      <Table.Cell>
                        <span className={`bg-badge-${getTaskLabelAndColor(user.contactType, "color")} text-secondary-100 text-sm font-semibold py-1 px-3 rounded-full inline-block`}>
                          {getTaskLabelAndColor(user.contactType, "label")}
                        </span>
                      </Table.Cell>
                    )}
                    {header.includes("Organization") && <Table.Cell>{user.company}</Table.Cell>}
                    {header.includes("Position") && <Table.Cell>{user.position}</Table.Cell>}
                    {header.includes("Email") && <Table.Cell>{user.email}</Table.Cell>}
                    {header.includes("Cell Phone") && <Table.Cell>{user.cellNumber}</Table.Cell>}
                  </Table.Row>
                ))}
              </Table.Body>
            </>
          ) : active === 1 && organization?.length > 0 ? (
            <>
              <Table.Head>
                {header.map((key, index) => (
                  <Table.HeadCell key={index}>{key}</Table.HeadCell>
                ))}
              </Table.Head>
              <Table.Body className="divide-y">
                {organization?.map((org, index) => (
                  <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
                    onClick={() => handleNavigation(org)}
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      <div className="flex items-center">
                        <img src={IMAGES.contact_avtar} alt="Profile" className="mr-3 rounded-full" />
                        <span className="left-txt font-medium text-secondary-800">
                          {org?.organizationName}
                        </span>
                      </div>
                    </Table.Cell>
                    {header.includes("Tag") && (
                      <Table.Cell>
                        <span className="bg-badge-yellow text-secondary-100 text-sm font-semibold py-1 px-3 rounded-full inline-block">
                          {ORGANIZATION_TYPE[org?.organizationType]}
                        </span>
                      </Table.Cell>
                    )}
                    {header.includes("Website") && <Table.Cell>{org?.website}</Table.Cell>}
                    {header.includes("Email") && <Table.Cell>{org?.email}</Table.Cell>}
                    {header.includes("Cell Phone") && <Table.Cell>{org?.cellNumber}</Table.Cell>}
                  </Table.Row>
                ))}
              </Table.Body>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-[60vh] w-full">
              <p className="text-center text-gray-500">
                No {active === 0 ? CONTACT_TYPE[activeFilter] : ORGANIZATION_TYPE[activeFilter]} Contact Available
              </p>
              <ContactButtonWithModal
                buttonClass="bg-active-blue shadow-shadow-light text-sm text-active-blue-text py-[10px] px-6 rounded-[100px] font-medium mt-4"
                modalContent={active === 0 ? <NewIndividualContactModalV1 /> : <NewOrganizationContactModalV1 />}
              />
            </div>
          )}
        </Table>
    </div>
          {paginatedData?.length > 0 && <div className="flex overflow-x-auto sm:justify-center">
            <Pagination
              layout="pagination"
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              previousLabel="Go back"
              nextLabel="Go forward"
              showIcons
            />
          </div>}
          </>
  );
};

export default ContactListingV1;
