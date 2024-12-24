import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import {
  PiLayout,
  PiUsersThree,
  PiFolderSimple,
  PiLinkSimpleHorizontal,
} from "react-icons/pi";
import { BiCalendar } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { FiFileText } from "react-icons/fi";
import { ROUTES } from "../../constants/api";
import { IMAGES } from "../../constants/imagePath";

const SideNav = ({ isDrawerOpen, toggleDrawer, setTitle }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (path) => {
    const casesPaths = [
      ROUTES.CASES,
      ROUTES.CASES_DATA,
      ROUTES.CASES_DETAILS,
      ROUTES.CASES_CATEGORY,
      ROUTES.NEW_CASE_INFO,
    ];

    if (casesPaths.includes(currentPath)) {
      return path === ROUTES.CASES;
    }
    return currentPath === path;
  };

  useEffect(() => {
    const storedTitle = localStorage.getItem("headerTitle");
    if (storedTitle) {
      setTitle(storedTitle);
    }
  }, [setTitle]);

  const handleTitleChange = (title) => {
    setTitle(title);
    localStorage.setItem("headerTitle", title);
    // if (toggleDrawer) {
    //   toggleDrawer();
    // }
  };

  return (
    <Sidebar
      className={`w-[160px] xl:w-[264px] sidebar ${
        isDrawerOpen ? "" : "sidebar-toggle"
      } fixed bg-input-surface`}
    >
      {/* <h1 className="text-secondary-700 text-xl font-bold pt-5 pb-3 px-4 whitespace-nowrap">MG Law Group</h1> */}
      {/* <img src={logo}/> */}
      <img
        src={IMAGES.logo}
        alt="logo"
        className="mr-0 w-14 ml-2 mt-5 sidebar-logo"
      />
      <Sidebar.Items className="mt-10 sidebar-items flex flex-col justify-between h-[calc(100vh-140px)]">
        <Sidebar.ItemGroup>
          <Sidebar.Item
            as={Link}
            to={ROUTES.DASHBOARD}
            className={
              isActive(ROUTES.DASHBOARD)
                ? "sidebar-item active-item"
                : "sidebar-item"
            }
            onClick={() => handleTitleChange("Dashboard")}
          >
            <span className="flex items-center">
              <img src={IMAGES.dbIcon} alt="logo" className="" />
              <span className="item-title">Dashboard</span>
            </span>
          </Sidebar.Item>
          <Sidebar.Item
            as={Link}
            to={ROUTES.CASES}
            className={
              isActive(ROUTES.CASES)
                ? "sidebar-item active-item"
                : "sidebar-item"
            }
            onClick={() => handleTitleChange("Cases")}
          >
            <span className="flex items-center">
              <img src={IMAGES.cases} alt="logo" className="" />
              <span className="item-title">Cases</span>
            </span>
          </Sidebar.Item>
          <Sidebar.Item
            as={Link}
            to={ROUTES.CALENDAR}
            className={
              isActive(ROUTES.CALENDAR)
                ? "sidebar-item active-item"
                : "sidebar-item"
            }
            onClick={() => handleTitleChange("Calendar")}
          >
            <span className="flex items-center">
              <img src={IMAGES.calendar} alt="logo" className="" />
              <span className="item-title">Calendar</span>
            </span>
          </Sidebar.Item>
          <Sidebar.Item
            as={Link}
            to={ROUTES.CONTACTS}
            className={
              isActive(ROUTES.CONTACTS)
                ? "sidebar-item active-item"
                : "sidebar-item"
            }
            onClick={() => handleTitleChange("Contacts")}
          >
            <span className="flex items-center">
              <img src={IMAGES.contact} alt="logo" className="" />
              <span className="item-title">Contacts</span>
            </span>
          </Sidebar.Item>
          <Sidebar.Item
            as={Link}
            to={ROUTES.DOCUMENTS}
            className={
              isActive(ROUTES.DOCUMENTS)
                ? "sidebar-item active-item"
                : "sidebar-item"
            }
            onClick={() => handleTitleChange("Documents")}
          >
            <span className="flex items-center">
              <img src={IMAGES.document} alt="logo" className="" />
              <span className="item-title">Documents</span>
            </span>
          </Sidebar.Item>
          <Sidebar.Item
            as={Link}
            to={ROUTES.SETTINGS}
            // icon={IoSettingsOutline}
            className={
              isActive(ROUTES.SETTINGS)
                ? "sidebar-item active-item"
                : "sidebar-item"
            }
            onClick={() => handleTitleChange("Settings")}
          >
            <span className="flex items-center">
              <img src={IMAGES.setting} alt="logo" className="" />
              <span className="item-title">Setting</span>
            </span>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          {/* <Sidebar.Item as={Link} to="/rich-crm/links" icon={PiLinkSimpleHorizontal} className={isActive("/rich-crm/links") ? "active-item" : ""} onClick={() => handleTitleChange('External Links')}>
            External Links
          </Sidebar.Item> */}
          {/* <Sidebar.Item
            as={Link}
            to={ROUTES.SETTINGS}
            // icon={IoSettingsOutline}
            className={
              isActive(ROUTES.SETTINGS)
                ? "sidebar-item active-item"
                : "sidebar-item"
            }
            onClick={() => handleTitleChange("Settings")}
          >
            <span className="flex items-center">
              <img src={IMAGES.setting} alt="logo" className="" />
              <span className="item-title">Setting</span>
            </span>
          </Sidebar.Item> */}

          {isDrawerOpen ? (
            <div className="flex flex-col justify-center items-start gap-2 self-stretch">
              <p class="text-sm font-medium leading-[20px] tracking-[0.1px] opacity-40">
                Provided by
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="133"
                height="24"
                viewBox="0 0 133 24"
                fill="none"
              >
                <g opacity="0.4" clip-path="url(#clip0_2212_22903)">
                  <path
                    d="M34.7759 21.0307V6.19751H46.6025C47.1013 6.19751 47.5567 6.32508 47.9675 6.57892C48.3783 6.83406 48.7087 7.1699 48.9587 7.59036C49.2074 8.00952 49.3325 8.47424 49.3325 8.98321V13.068C49.3325 13.5627 49.2074 14.0235 48.9587 14.4505C48.7087 14.8774 48.3783 15.2133 47.9675 15.4619C47.5567 15.7093 47.1013 15.8329 46.6025 15.8329L37.2022 15.8537V21.032H34.7759V21.0307ZM37.5658 13.3349H46.5222C46.6166 13.3349 46.7008 13.3011 46.7748 13.2321C46.8488 13.1631 46.8857 13.0746 46.8857 12.9639V9.04439C46.8857 8.94807 46.8488 8.86215 46.7748 8.78665C46.7008 8.71115 46.6166 8.6734 46.5222 8.6734H37.5658C37.4714 8.6734 37.3872 8.71115 37.3132 8.78665C37.2392 8.86215 37.2022 8.94807 37.2022 9.04439V12.9639C37.2022 13.0746 37.2392 13.1631 37.3132 13.2321C37.3872 13.3011 37.4714 13.3349 37.5658 13.3349ZM46.5426 21.0307L42.0739 15.5843H45.2478L49.2712 20.4528V21.0307H46.5413H46.5426Z"
                    fill="#1A1C1F"
                  />
                  <path
                    d="M51.3748 7.6203V5.14441H53.7807V7.6203H51.3748ZM51.3748 21.0307V9.06522H53.7807V21.0307H51.3748Z"
                    fill="#1A1C1F"
                  />
                  <path
                    d="M57.1051 20.6494C56.6944 20.3942 56.364 20.0584 56.1152 19.6379C55.8652 19.2188 55.7415 18.7606 55.7415 18.2659V11.8288C55.7415 11.3342 55.8665 10.8773 56.1152 10.4568C56.3653 10.0377 56.6944 9.70051 57.1051 9.44537C57.5159 9.19153 57.9649 9.06396 58.4497 9.06396H67.6281V11.519H58.5313C58.4229 11.519 58.3323 11.5568 58.2583 11.6323C58.1843 11.7078 58.1474 11.8015 58.1474 11.9108V18.1826C58.1474 18.2932 58.1843 18.3857 58.2583 18.4612C58.3323 18.5367 58.4229 18.5744 58.5313 18.5744H67.6485V21.0295H58.4497C57.9649 21.0295 57.5159 20.9019 57.1051 20.6481V20.6494Z"
                    fill="#1A1C1F"
                  />
                  <path
                    d="M69.4075 21.0308V5.14575H71.8134V9.06526H78.6267C79.1114 9.06526 79.5592 9.19283 79.9712 9.44667C80.382 9.70181 80.7098 10.039 80.9522 10.4581C81.1946 10.8773 81.3158 11.3355 81.3158 11.8301V21.0308H78.9099V11.9121C78.9099 11.8028 78.8729 11.7091 78.7989 11.6336C78.7249 11.5581 78.6394 11.5203 78.5463 11.5203H72.1986C72.0915 11.5203 71.9996 11.5581 71.9256 11.6336C71.8516 11.7091 71.8146 11.8028 71.8146 11.9121V21.0308H69.4087H69.4075Z"
                    fill="#1A1C1F"
                  />
                  <path
                    d="M85.6825 21.0308C85.1837 21.0308 84.7258 20.9071 84.3086 20.6598C83.8902 20.4124 83.5598 20.0753 83.3174 19.6483C83.075 19.2227 82.9539 18.754 82.9539 18.2451V8.96112C82.9539 8.45214 83.075 7.98482 83.3174 7.55785C83.5598 7.13219 83.8902 6.79504 84.3086 6.54641C84.7258 6.29908 85.185 6.17542 85.6825 6.17542H97.4696V8.67213H86.1073C85.8917 8.67213 85.7157 8.73722 85.5817 8.86739C85.4465 8.99887 85.3789 9.1733 85.3789 9.39329V17.8103C85.3789 18.0303 85.4465 18.206 85.5817 18.3362C85.7157 18.4677 85.8917 18.5327 86.1073 18.5327H97.4696V21.0295H85.6825V21.0308Z"
                    fill="#1A1C1F"
                  />
                  <path
                    d="M99.5706 21.0307V6.19751H111.397C111.896 6.19751 112.35 6.32508 112.762 6.57892C113.173 6.83406 113.503 7.1699 113.752 7.59036C114.002 8.00952 114.126 8.47424 114.126 8.98321V13.068C114.126 13.5627 114.001 14.0235 113.752 14.4505C113.503 14.8774 113.173 15.2133 112.762 15.4619C112.351 15.7093 111.896 15.8329 111.397 15.8329L101.996 15.8537V21.032H99.5693L99.5706 21.0307ZM102.36 13.3349H111.317C111.411 13.3349 111.495 13.3011 111.569 13.2321C111.643 13.1631 111.68 13.0746 111.68 12.9639V9.04439C111.68 8.94807 111.643 8.86215 111.569 8.78665C111.495 8.71115 111.411 8.6734 111.317 8.6734H102.36C102.266 8.6734 102.182 8.71115 102.108 8.78665C102.034 8.86215 101.997 8.94807 101.997 9.04439V12.9639C101.997 13.0746 102.034 13.1631 102.108 13.2321C102.182 13.3011 102.266 13.3349 102.36 13.3349ZM111.337 21.0307L106.87 15.5843H110.044L114.067 20.4528V21.0307H111.337Z"
                    fill="#1A1C1F"
                  />
                  <path
                    d="M116.25 21.0307V6.1767H119.019L124.478 12.8194L129.916 6.1767H132.706V21.0307H130.259V9.6432L124.477 16.6778L118.675 9.66403V21.0307H116.249H116.25Z"
                    fill="#1A1C1F"
                  />
                  <path
                    d="M24.656 24C24.1866 21.2312 22.555 18.7215 20.056 17.2388C22.1608 15.4489 23.5041 12.757 23.5041 9.74866C23.5041 4.37251 19.2191 0 13.9519 0H0V23.9987H5.82978H24.656V24ZM1.68387 8.82183C6.50588 11.0152 12.1532 8.8036 14.3015 3.88697C12.1532 8.8036 14.318 14.5703 19.1375 16.7624C14.3193 14.5703 8.67068 16.7754 6.52246 21.6933C8.67068 16.7767 6.50715 11.0165 1.68515 8.82313L1.68387 8.82183Z"
                    fill="#1A1C1F"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2212_22903">
                    <rect width="132.706" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-start gap-2 self-stretch">
              <img src={IMAGES.R_Logo_Sm} className="grayscale"/>
            </div>
          )}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SideNav;
