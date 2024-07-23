import { Route, Routes } from "react-router-dom";
import Dashboard from "../dashboard";
import Cases from "../cases";
import CaseCardData from "../cases/casecarddata";
import CasesCategory from "../cases/casescategory";
import CaseDetails from "../cases/casedetails";
import NewCaseInfo from "../cases/newcaseinfo";

const Content = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/cases" element={<Cases />} />
      <Route path="/casescategory" element={<CasesCategory />} />
      <Route path="/casesdata" element={<CaseCardData />} />
      <Route path="/casedetails" element={<CaseDetails />} />
      <Route path="/newcaseinfo" element={<NewCaseInfo />} />

      <Route path="/*" element={404} />
    </Routes>
  );
};

export default Content;
