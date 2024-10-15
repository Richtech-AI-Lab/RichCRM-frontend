// participant.js

import { CASETYPE, CONTACTTAG, ORGANIZATION_TYPE_VALUE } from "../constants/constants";
import { IMAGES } from "../constants/imagePath";
import states from "../constants/states.json"

export const contactItemFirst = [
    { label: "Position", name: "contactPosition", placeholder: "Enter position name" },
    { label: "Company", name: "contactCompany", placeholder: "Enter company name" },
]
export const contactItemSecond = [

    { label: "Email", name: "contactEmail", placeholder: "Enter a Email Address" },
    { label: "Cell Phone", name: "contactCellPhone", placeholder: "Enter a Cell Phone" },
    {
        show: false, optional: true, buttonText: "add Work Phone", icon: IMAGES.removeIcon, name: "contactWorkPhone", label: "Work Phone", placeholder: "Enter a work phone",
    },
    {
        show: false, optional: true, buttonText: "add We Chat", icon: IMAGES.removeIcon, name: "contactWeChat", label: "We Chat", placeholder: "Enter a we chat",
    },
    {
        show: false, optional: true, buttonText: "add WhatsApp", icon: IMAGES.removeIcon, name: "contactWhatsApp", label: "WhatsApp", placeholder: "Enter a whatsApp",
    },
    {
        show: false, optional: true, buttonText: "add Line", icon: IMAGES.removeIcon, name: "contactLine", label: "Line", placeholder: "Enter a Line",
    },
    {
        name: "contactAddress",
        label: "Address",
        placeholder: "Enter address",
    },
    {
        name: "contactAddress2",
        label: "Address Line 2",
        placeholder: "Enter address",
    },
    {
        name: "contactCity",
        label: "City",
        placeholder: "Enter city",
    },
    {
        name: "contactState",
        label: "State",
        type: "dropdown",
        dropDownOptions: states,
    },
    { label: "Zip Code", name: "contactZipcode", placeholder: "Enter a zip code" },
];

export const sellerItems = [
    { label: "Name", name: "firstName", placeholder: "Enter seller name" },
    { label: "SSN", name: "ssn", placeholder: "Enter a SSN" },
    { label: "Email", name: "email", placeholder: "Enter a Email Address" },
    { label: "Cell Phone", name: "cellNumber", placeholder: "Enter a Cell Phone" },
    {
        show: false, optional: true, buttonText: "add Work Phone", icon: IMAGES.removeIcon, name: "workNumber", label: "Work Phone", placeholder: "Enter a work phone",
    },
    {
        show: false, optional: true, buttonText: "add We Chat", icon: IMAGES.removeIcon, name: "wechatAccount", label: "We Chat", placeholder: "Enter a we chat",
    },
    {
        show: false, optional: true, buttonText: "add WhatsApp", icon: IMAGES.removeIcon, name: "whatsappNumber", label: "WhatsApp", placeholder: "Enter a whatsApp",
    },
    {
        show: false, optional: true, buttonText: "add Line", icon: IMAGES.removeIcon, name: "sellerLine", label: "Line", placeholder: "Enter a Line",
    },
    { label: "Mailing Address", name: "addressId", placeholder: "Enter Address" },
];

export const buyerItems = [
    { label: "Name", name: "firstName", placeholder: "Enter purchaser name" },
    { label: "SSN", name: "ssn", placeholder: "Enter a SSN" },
    { label: "Email", name: "email", placeholder: "Enter a Email Address" },
    { label: "Cell Phone", name: "cellNumber", placeholder: "Enter a Cell Phone" },
    {
        show: false, optional: true, buttonText: "add Work Phone", icon: IMAGES.removeIcon, name: "workNumber", label: "Work Phone", placeholder: "Enter a work phone",
    },
    {
        show: false, optional: true, buttonText: "add We Chat", icon: IMAGES.removeIcon, name: "wechatAccount", label: "We Chat", placeholder: "Enter a we chat",
    },
    {
        show: false, optional: true, buttonText: "add WhatsApp", icon: IMAGES.removeIcon, name: "whatsappNumber", label: "WhatsApp", placeholder: "Enter a whatsApp",
    },
    {
        show: false, optional: true, buttonText: "add Line", icon: IMAGES.removeIcon, name: "purchaserLine", label: "Line", placeholder: "Enter a Line",
    },
    {
        name: "addressLine1",
        label: "Address",
        placeholder: "Enter address",
    },
    {
        name: "addressLine2",
        label: "Address Line 2",
        placeholder: "Enter address",
    },
    {
        name: "city",
        label: "City",
        placeholder: "Enter city",
    },
    {
        name: "state",
        label: "State",
        type: "dropdown",
        dropDownOptions: states,
    },
    { label: "Zip Code", name: "zipCode", placeholder: "Enter a zip code" },
];

export const titleMortgageItems = [
    { label: "Other", name: "titleCompany", placeholder: "Enter a title company" },
    { label: "Company", name: "titleNumber", placeholder: "Enter a title number" },
    { label: "Trust", name: "titleMortgage", placeholder: "Enter a mortgage" },
];

// premises
export const lowerSectionItems = [
    {
        label: "Premises Type",
        type: "dropdown",
        name: "propertyType",
        dropDownOptions: [
            { id: 0, label: "House (Single-Family )" },
            { id: 1, label: "House (Multi-Family)" },
            { id: 2, label: "Condo" },
            { id: 3, label: "Commercial" },
            { id: 4, label: "Land" },
            { id: 5, label: "Co-op" },
            { id: 6, label: "Condo-op" },
        ],
    },
    {
        name: "addressLine1",
        label: "Address",
        placeholder: "Enter address",
    },
    {
        name: "addressLine2",
        label: "Address Line 2",
        placeholder: "Enter address",
    },
    {
        name: "city",
        label: "City",
        placeholder: "Enter city",
    },
    {
        name: "state",
        label: "State",
        type: "dropdown",
        dropDownOptions: states,
    },
    { label: "Zip Code", name: "zipCode", placeholder: "Enter a zip code" },
    { label: "Block", name: "block", placeholder: "Enter a block" },
    { label: "Lot", name: "lot", placeholder: "Enter a lot" },
    { label: "Section", name: "section", placeholder: "Enter a section" },
    {
        label: "Type",
        type: "dropdown",
        name: "type",
        dropDownOptions: [
            { id: 0, label: "Co-op", defaultChecked: true },
            { id: 1, label: "Townhouse", defaultChecked: true },
            { id: 2, label: "Condo", defaultChecked: true },
            { id: 3, label: "Vacant Land", defaultChecked: true },
        ],
    },
    {
        label: "vacant At Closing",
        type: "checkboxes",
        name: "vacantAtClosing",
        checkboxOptions: [
            { id: true, value:true, label: "Yes"},
            { id: false, value:false, label: "No"},
        ],
    },
    {
        label: "subject To Tenancy",
        type: "checkboxes",
        name: "subjectToTenancy",
        checkboxOptions: [
            { id: true, value:true, label: "Yes"},
            { id: false, value:false, label: "No"},
        ],
    },
    {
        label: "H.O.A",
        type: "checkboxes",
        name: "hoa",
        checkboxOptions: [
            { id: true, label: "Yes"},
            { id: false, label: "No"},
        ],
    },
    {
        label: "Parking Space",
        type: "dropdown",
        name: "parkingSpaces",
        dropDownOptions: [
            { id: "1", label: "1", defaultChecked: true },
            { id: "2", label: "2", defaultChecked: true },
        ],
    },
    {
        label: "Maintenance fee",
        name: "maintenanceFee",
        type: "inputdropdown",
        placeholder: "Enter an Amount",
        dropDownOptions: [
            { id: "1", label: "yearly", defaultChecked: true },
            { id: "2", label: "monthly", defaultChecked: true },
        ],
    },
    { label: "Assessments", name: "assessments", placeholder: "Enter an Amount" },
    { label: "Paid by", name: "assessmentsPaidById", placeholder: "Enter an Amount" },
    { label: "Managing Company", name: "managingCompany", placeholder: "Enter an Amount" },
];

export const premisesComposition = [
    {
        name: "premisesComposition",
        label: "Type",
        type: "dropdown",
        dropDownOptions: [
            { id: "newConstruction", label: "New Const.", defaultChecked: true },
            { id: "oneFamily", label: "1 Family", defaultChecked: true },
            { id: "twoFamily", label: "2 Family", defaultChecked: true },
        ],
    },
    { name: "premisesonetenant", label: "1F Tenant", placeholder: "Enter name" },
    { name: "premisesonerent", label: "1F Rent", placeholder: "Enter rent" },
    { name: "premisesonesec", label: "1F Sec.", placeholder: "Enter sec" },
    {
        name: "premisesonelease",
        label: "1F Lease",
        type: "checkboxes",
        checkboxOptions: [
            { id: "leaseYes1", label: "Yes", defaultChecked: true },
            { id: "leaseNo2", label: "No", defaultChecked: true },
        ],
    },
    { name: "premisestwotenant", label: "2F Tenant", placeholder: "Enter name" },
    { name: "premisestworent", label: "2F Rent", placeholder: "Enter rent" },
    { name: "premisestwosec", label: "2F Sec.", placeholder: "Enter sec" },
    {
        name: "premisestwolease",
        label: "2F Lease",
        type: "checkboxes",
        checkboxOptions: [
            { id: "leaseYes3", label: "Yes", defaultChecked: true },
            { id: "leaseNo4", label: "No", defaultChecked: true },
        ],
    },
];

export const inspectionItems = [
    {
        name: "premisesinspection",
        label: "Engineer Inspection",
        type: "checkboxes",
        checkboxOptions: [
            { id: "accept4", defaultChecked: true, label: "Yes" },
            { id: "accept5", defaultChecked: true, label: "No" },
        ],
    },
    { type: "datepicker", name: "scheduleDate", label: "Scheduled Date", placeholder: "Month Day, Year" },
    { type: "datepicker", name: "receivedDate", label: "Received Date", placeholder: "Month Day, Year" },
];

export const termitesInspectionItems = [
    {
        name: "premisesTermites",
        label: "Termites Inspection",
        type: "checkboxes",
        checkboxOptions: [
            { id: "accept6", defaultChecked: true, label: "Yes" },
            { id: "accept7", defaultChecked: true, label: "No" },
        ],
    },
];

// other
export const financialItems = [
    { name: "purchasePrice", label: "Purchase Price", placeholder: "Enter an Amount" },
    { name: "downPayment", label: "Down Payment", placeholder: "Enter an Amount" },
    { name: "mortgageAmount", label: "Mortgage Amount", placeholder: "Enter an Amount" },
    { name: "annualPropertyTax", label: "Annual Property Tax", placeholder: "Enter an Amount" },
    { name: "sellerConcession", label: "Seller’s Concession", placeholder: "Enter an Amount" },
];

export const brokersItems = [
    { name: "brokerSale", label: "Brokers Sale", placeholder: "Enter an Amount" },
    { name: "brokerListing", label: "Brokers Listing", placeholder: "Enter an Amount" },
    // { label: "Referred by", placeholder: "Add a referral" },
    // { label: "Bank (L/O)", placeholder: "Add content" },
    // { label: "Personal Property", placeholder: "Add content" },
    // { label: "Excluded Property", placeholder: "Add content" },
];

export const closingDateItems = [
    {
        name: "schedule",
        label: "Schedule",
        type: "dropdown",
        dropDownOptions: [
            { id: "accept1", defaultChecked: true, label: "on/about" },
            { id: "accept2", defaultChecked: true, label: "Before" },
            { id: "accept3", defaultChecked: true, label: "T.O.E." },
            { id: "accept4", defaultChecked: true, label: "June 05,2024" },
        ],
    },
    { name: "closingDate", type: "datepicker", label: "Closing date", placeholder: "Month Day, Year" },
];

export const otherItems = [
    {
        name: "referred", show: false, optional: true, icon: IMAGES.removeIcon, buttonText: "Add A Referred", label: "Referred", placeholder: "Enter a referred",
    },
    {
        name: "bank", show: false, optional: true, icon: IMAGES.removeIcon, buttonText: "Add A Bank (L/O)", label: "Bank", placeholder: "Enter a bank",
    },
    {
        name: "personalNotes", show: false, optional: true, icon: IMAGES.removeIcon, buttonText: "Add Notes as Personal Property", label: "Personal Property Notes", placeholder: "Enter notes",
    },
    {
        name: "excludedNotes", show: false, optional: true, icon: IMAGES.removeIcon, buttonText: "Add Notes as Excluded Property", label: "Excluded Property Notes", placeholder: "Enter notes",
    }
];

export const caseTypeOptions = [
    { value: CASETYPE.PURCHASING, label: "Purchasing" },
    { value: CASETYPE.SELLING, label: "Selling" },
];

export const contactTagIndividualOption = [
    { value: CONTACTTAG.REALTORS, label: "Realtor" },
    { value: CONTACTTAG.ATTORNEY, label: "Attorney" },
    { value: CONTACTTAG.TITLE, label: "Title" },
    { value: CONTACTTAG.LENDER, label: "Lender" },
];

export const contactTagOrganizationOption = [
    { value: ORGANIZATION_TYPE_VALUE.OTHER, label: "Real Estate" },
    { value: ORGANIZATION_TYPE_VALUE.COMPANY, label: "Company" },
    { value: ORGANIZATION_TYPE_VALUE.TRUST, label: "Trust" }
];

// utils/stageUtils.js
export const stageTypes = [
    { value: 0, label: "Setting up" },
    { value: 1, label: "Contract Reviewing" },
    { value: 2, label: "Contract Signing" },
    { value: 3, label: "Mortgage & Title" },
    { value: 4, label: "Closing" },
];

export const premisesTypes = [
    { value: 0, label: "House (Single-Family )" },
    { value: 1, label: "House (Multi-Family)" },
    { value: 2, label: "Condo" },
    { value: 3, label: "Commercial" },
    { value: 4, label: "Land" },
    { value: 5, label: "Co-op" },
    { value: 6, label: "Condo-op" },
];
