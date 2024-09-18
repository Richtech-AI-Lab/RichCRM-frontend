import { Route, Routes } from "react-router-dom";
import Dashboard from "../dashboard";
import Cases from "../cases";
import CaseCardData from "../cases/casecarddata";
import CasesCategory from "../cases/casescategory";
import CaseDetails from "../cases/casedetails";
import NewCaseInfo from "../cases/newcaseinfo";
import Contacts from "../contacts";
import ContactPartner from "../contacts/contactPartner";
import CalendarPage from "../calender";
import Setting from "../settings";


const Content = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/cases" element={<Cases />} />
      <Route path="/casescategory" element={<CasesCategory />} />
      <Route path="/casesdata" element={<CaseCardData />} />
      <Route path="/casedetails" element={<CaseDetails />} />
      <Route path="/newcaseinfo" element={<NewCaseInfo />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/contactpartner" element={<ContactPartner />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/settings" element={<Setting />} />
    </Routes>
  );
};

export default Content;
