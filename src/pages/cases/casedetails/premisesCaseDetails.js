import React, { useState } from "react";
import { CaseCardDetails } from "../../../components";


const PremisesCaseDetails = () => {
    const lowerSectionItems = [
        {
          label: "Premise Status",
          isDropdown: true,
          dropDownOptions: [
            { id: "soldYes", label: "Being sold", defaultChecked: true },
            { id: "boughtYes", label: "Being bought", defaultChecked: true },
          ],
        },
        {
          label: "Address",
          placeholder: "Enter address",
        },
        {
          label: "Address Line 2",
          placeholder: "Enter address",
        },
        {
          label: "City",
          placeholder: "Enter city",
        },
        {
          label: "State",
          isDropdown: true,
          dropDownOptions: [
            { id: "Newyork", label: "New York", defaultChecked: true },
            { id: "India", label: "India", defaultChecked: true },
          ],
        },
        { label: "Block", placeholder: "Enter a block" },
        { label: "Lot", placeholder: "Enter a lot" },
        { label: "Section", placeholder: "Enter a section" },
        {
          label: "Type",
          isDropdown: true,
          dropDownOptions: [
            { id: "coop", label: "Co-op", defaultChecked: true },
            { id: "townhouse", label: "Townhouse", defaultChecked: true },
            { id: "condo", label: "Condo", defaultChecked: true },
            { id: "vacantLand", label: "Vacant Land", defaultChecked: true },
          ],
        },
        {
          label: "Vacant at closing",
          isCheckbox: true,
          checkboxOptions: [
            { id: "vacantYes", label: "Yes", defaultChecked: true },
            { id: "vacantNo", label: "No", defaultChecked: true },
          ],
        },
        {
          label: "Subject to Tenancy",
          isCheckbox: true,
          checkboxOptions: [
            { id: "tenancyYes", label: "Yes", defaultChecked: true },
            { id: "tenancyNo", label: "No", defaultChecked: true },
          ],
        },
        {
          label: "H.O.A",
          isCheckbox: true,
          checkboxOptions: [
            { id: "hoaYes", label: "Yes", defaultChecked: true },
            { id: "hoaNo", label: "No", defaultChecked: true },
          ],
        },
        {
          label: "Parking Space",
          isDropdown: true,
          dropDownOptions: [
            { id: "1", label: "1", defaultChecked: true },
            { id: "2", label: "2", defaultChecked: true },
          ],
        },
        // { label: "Parking Space Number", placeholder:"Enter parking space no" },
        { label: "Maintenance fee", placeholder:"Enter an Amount"},
    
        { label: "Assessments", placeholder:"Enter an Amount" },
        { label: "Paid by", placeholder:"Enter an Amount" },
        { label: "Managing Company", placeholder:"Enter an Amount" },
     
      ];
      const premisesType=[
        {
          label: "Premises Type",
          isDropdown: true,
          dropDownOptions: [
            { id: "newConstruction", label: "New Const.", defaultChecked: true },
            { id: "oneFamily", label: "1 Family", defaultChecked: true },
            { id: "twoFamily", label: "2 Family", defaultChecked: true },
          ],
        },

        {
          label: "1F",
          floor:true,
          nestedItems: [
            { label: "1F Tenant", placeholder:"Enter name" },
            { label: "1F Rent",  placeholder:"Enter rent" },
            { label: "1F Sec.", placeholder:"Enter sec" },
            {
              label: "1F Lease",
              isCheckbox: true,
              checkboxOptions: [
                { id: "leaseYes1", label: "Yes", defaultChecked: true },
                { id: "leaseNo2", label: "No", defaultChecked: true },
              ],
            },
          ],
        },
        {
          label: "2F",
          floor:true,
          nestedItems: [
            { label: "2F Tenant", placeholder:"Enter name" },
            { label: "2F Rent", placeholder:"Enter rent" },
            { label: "2F Sec.", placeholder:"Enter sec"},
            {
              label: "2F Lease",
              isCheckbox: true,
              checkboxOptions: [
                { id: "leaseYes3", label: "Yes", defaultChecked: true },
                { id: "leaseNo4", label: "No", defaultChecked: true },
              ],
            },
          ],
        },
      ];
      const inspectionItems = [
        {
          label: "Engineer Inspection",
          isCheckbox: true,
          checkboxOptions: [
            { id: "accept4", defaultChecked: true, label: "Yes" },
            { id: "accept5", defaultChecked: true, label: "No" },
          ],
        },
        { label: "Scheduled Date", placeholder:"Month Day, Year" },
        { label: "Received Date",placeholder:"Month Day, Year" },
      ];
      const termitesInspectionItems = [
        {
          label: "Termites Inspection",
          isCheckbox: true,
          checkboxOptions: [
            { id: "accept6", defaultChecked: true, label: "Yes" },
            { id: "accept7", defaultChecked: true, label: "No" },
          ],
        },
      ];
    return (
        <div className="grid grid-cols-12 gap-6">
            <div className="col-span-6">
                <CaseCardDetails items={lowerSectionItems} />
            </div>
            <div className="col-span-6">
                <CaseCardDetails items={premisesType} />
                <CaseCardDetails items={inspectionItems} />
                <CaseCardDetails items={termitesInspectionItems} />
            </div>
        </div >
    );
};

export default PremisesCaseDetails;

