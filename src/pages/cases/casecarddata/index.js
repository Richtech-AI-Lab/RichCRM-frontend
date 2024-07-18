import React from "react";
import { SlArrowRight } from "react-icons/sl";
import { CaseDetailsCard, PageHeader } from "../../../components";

const CaseCardData = () => {
  return (
    <div>
      <PageHeader mainText="Cases" secondaryText="Fu - Skyline #5712">
        <SlArrowRight className="inline mr-10" />
      </PageHeader>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-4">
          <CaseDetailsCard
            title="Fu - Skyline #5712"
            clientName="Client Name"
            caseType="Purchase"
            createdOn="Month Day, Year"
            address="The Address"
          />
          <button className="bg-bg-pink rounded-full text-sm font-medium w-full py-3 px-3 mb-7">
            Case Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaseCardData;
