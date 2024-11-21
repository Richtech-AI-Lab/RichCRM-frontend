import React, { useCallback, useState } from "react";
import { IMAGES } from "../../constants/imagePath";
import { GiHamburgerMenu } from "react-icons/gi";
import { Dropdown } from "flowbite-react";
import { IoIosLogOut, IoMdClose } from "react-icons/io";
import { logout } from "../../redux/actions/authActions";
import { deleteUserRequest } from "../../redux/actions/authActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS, ROUTES } from "../../constants/api";
import { postRequest } from "../../axios/interceptor";
import { debounce } from "lodash";
import { contactTypeLabels } from "../../constants/constants";
import {
  clearAttorney,
  clearBroker,
  clearRealtor,
  setSelectedContact,
} from "../../redux/actions/contactActions";
import Search from "../search";
import { persistor } from "../../redux/store";
import { clearStageData } from "../../redux/actions/stagesActions";
import { clearTaskData } from "../../redux/actions/taskActions";
import { clearClientData } from "../../redux/actions/clientActions";
import { setSelectedOrganization } from "../../redux/actions/organizationActions";
import { fetchAllCasesRequest } from "../../redux/actions/caseAction";

const Header = ({ toggleDrawer, title }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState({});
  const [searchValue, setSearchValue] = useState(""); // Add this state

  const debouncedFunction = useCallback(
    debounce(async (value, index) => {
      if (value != "" || value.length > 0) {
        const contactResponse = await postRequest(
          API_ENDPOINTS.GET_CONTACT_BY_KEYWORD,
          {
            keyword: value,
          }
        );
        const casesResponse = await postRequest(
          API_ENDPOINTS.GET_CASES_BY_KEYWORD,
          {
            keyword: value,
          }
        );
        const organizationResponse = await postRequest(
          API_ENDPOINTS.GET_ORGANIZATION_BY_KEYWORD,
          {
            keyword: value,
          }
        );
        const orgabiRe = organizationResponse?.data?.data;
        const contactResults = contactResponse?.data?.data;
        const caseResults = casesResponse?.data?.data;
        // Combine orgabiRe and contactResults
        const combinedContacts = [...contactResults, ...orgabiRe];
        setSearchResults((prevResults) => ({
          ...prevResults,
          contact: combinedContacts,
          case: caseResults,
        }));
        console.log(contactResults, caseResults, orgabiRe);
      } else {
        setSearchResults([]);
      }
    }, 100),
    []
  );
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedFunction(value);
  };

  const handleInputReset = () => {
    setSearchValue("");
    setSearchResults([]);
  };

  const handleClearAndLoader = async (casedetails) => {
    localStorage.setItem("c_id", casedetails?.caseId);
    fetchAllCases();
    await Promise.all([
      dispatch(clearClientData()),
      dispatch(clearStageData()),
      dispatch(clearTaskData()),
      dispatch(clearAttorney()),
      dispatch(clearRealtor()),
      dispatch(clearBroker())
    ]);
    console.log("State cleared and loader started");
  };

  const fetchAllCases = async () => {
    try {
      const payload = {
        creatorId: localStorage.getItem("authEmail"),
        closed: false,
      };
      dispatch(fetchAllCasesRequest(payload));
    } catch (error) {
      console.error("Error fetching cases:", error);
    }
  };

  const debouncedNavigation = useCallback(
    debounce(async (casedetails, route, state) => {
      if (casedetails && Object.keys(casedetails).length > 0) {
        navigate(route, { state });

        // Reset search state
        setSearchResults([]);
        setSearchValue("");
      } else {
        setSearchResults([]);
      }
    }, 1000),
    []
  );

  const handleItemClick = async (item) => {
    console.log(item);

    if (!item) return;
    if (item?.caseId) {
      await handleClearAndLoader(item);
      debouncedNavigation(item, ROUTES.CASES_DATA, { casedetails: item });
    } else if (item?.contactId) {
      dispatch(setSelectedContact(null));
      localStorage.removeItem("contact_id");
      setTimeout(() => {
        dispatch(setSelectedContact(item));
        localStorage.setItem("contact_id", item.contactId);
        debouncedNavigation(item, ROUTES.CONTACT_PARTNER, { active: 0 });
      }, 0);
    } else if (item?.organizationId) {
      dispatch(setSelectedOrganization(null));
      localStorage.removeItem("organization_id");

      setTimeout(() => {
        dispatch(setSelectedOrganization(item));
        localStorage.setItem("organization_id", item.organizationId);
        debouncedNavigation(item, ROUTES.CONTACT_PARTNER, { active: 1 });
      }, 0);
    }

    return;
  };

  const handleLogout = () => {
    persistor.purge().then(() => {
      console.log("Logged out and persisted state cleared");
    });
    dispatch(logout());
    localStorage.removeItem("authEmail");
    localStorage.setItem("headerTitle", "Dashboard");
    localStorage.clear();
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className="flex justify-between items-center">
      <h1 className="flex items-center text-[28px] text-title font-medium leading-9">
        <span onClick={toggleDrawer} className="cursor-pointer mr-1">
          <GiHamburgerMenu />
        </span>
        {title}
      </h1>
      <div className="flex items-center">
        <div className="relative">
          <input
            className="text-base text-secondary-700 font-normal leading-6 bg-bg-gray-100 py-2 px-6 rounded-[28px] w-[360px]"
            placeholder="Search case, contact or address"
            value={searchValue}
            onChange={handleInputChange}
          />
          {searchResults?.contact?.length > 0 ||
          searchResults?.case?.length > 0 ? (
            <IoMdClose
              className="absolute right-5 top-[10px] cursor-pointer"
              onClick={handleInputReset}
            />
          ) : (
            <img
              src={IMAGES.searchIcon}
              alt="icon"
              className="absolute right-5 top-[10px]"
            />
          )}
          {searchResults?.contact?.length > 0 ||
          searchResults?.case?.length > 0 ? (
            <Search
              onNavigation={handleItemClick}
              searchResults={searchResults}
            />
          ) : (
            ""
          )}
        </div>
        <Dropdown
          arrowIcon={false}
          label={<img src={IMAGES.profile} className="cursor-pointer ml-6" />}
          inline={true}
          dismissOnClick={false}
          className="shadow-none border-neutral-border"
        >
          <Dropdown.Item className="text-text-danger" onClick={handleLogout}>
            <IoIosLogOut className="mr-2" /> Log out
          </Dropdown.Item>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
