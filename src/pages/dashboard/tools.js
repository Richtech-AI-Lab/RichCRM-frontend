import { API_ENDPOINTS } from "../../constants/api";
import { postRequest } from "../../../src/axios/interceptor";

import { z } from "zod";
import { tool } from "@langchain/core/tools";


// Response schema
const responseSchema = z.object({
    message: z.string(),
    status: z.string(),
    cases: z.array(
      z.object({
        caseId: z.string(),
        caseType: z.number(),
        premisesId: z.string(),
        stage: z.number(),
        closingDate: z.string(),
        clientId: z.string(),
        clientType: z.number(),
        clientName: z.string(),
      }),
    ).optional(),
});


// [Tool][Case] Update cases tool
const updateCaseSchemaZod = z.object({
  caseId: z.string().describe(`Case ID in UUID format`),
  // stage: z.number().optional()
  //   .describe(`Stage of the case (0-Case Setup, 1-Contract Preparing, 2-Contract Signing, 3-Mortgage, 4-Closing)`),
  closingDate: z.string()
    .optional()
    .describe(`Scheduled closing date of the case, must be in the future. Should be in a format like this: "2024-07-20T20:24:24.740Z", if user would like to unset it, it should be null.`),
  mortgageContingencyDate: z.string()
    .optional()
    .describe(`Scheduled mortgage contingency date of the case, must be in the future. Should be in a format like this: "2024-07-20T20:24:24.740Z", if user would like to unset it, it should be null.`),
  purchaserPrice: z.number()
    .optional()
    .describe(`Purchaser price of the case, should be a number.`),
  downPayment: z.number()
    .optional()
    .describe(`Down payment of the case, should be a number.`),
  mortgageAmount: z.number()
    .optional()
    .describe(`Mortgage amount of the case, should be a number.`),
  sellersConcession: z.number()
    .optional()
    .describe(`Seller's concession of the case, should be a number.`),
  bank: z.string()
    .optional()
    .describe(`Bank of the case, should be a string.`),
  personalNote: z.string()
    .optional()
    .describe(`Personal note of the case, noting any important information, should be a string.`),
});
const updateCasesTool = tool(
  async ({ caseId, stage, closingDate }) => {
    const inputObj = {
      caseId: caseId,
    }
    if (stage !== undefined && stage !== null && stage !== "") {
      inputObj.stage = stage;
    }
    if (closingDate !== undefined && closingDate !== null && closingDate !== "") {
      inputObj.closingDate = closingDate;
    }
    console.log("[langchain][updateCasesTool] inputObj: ", inputObj);
    const response = await postRequest(API_ENDPOINTS.UPDATE_CASE, inputObj);
    return JSON.stringify(response.data);
  },
  {
    name: "updateCases",
    description: `Call our API to update cases, and return the updated cases, requires a valid caseId in UUID format, any date should be in a format like this: "2024-07-20T20:24:24.740Z" or null if user would like to unset it.`,
    schema: updateCaseSchemaZod,
  }
);

// [Tool][Case] Get all cases by keyword (within ClientName and PremisesName) tool
const getCasesByKeywordSchemaZod = z.object({
  keyword: z.string(),
  closed: z.boolean().optional(),
});
const fetchCasesByKeywordTool = tool(
  async ({ keyword, closed }) => {
    console.log("[langchain][fetchCasesByKeywordTool] keyword: ", keyword);
    const response = await postRequest(API_ENDPOINTS.GET_CASES_BY_KEYWORD, {
      keyword: keyword || "",
      closed: closed || false,
    })
    console.log("[langchain][fetchCasesByKeywordTool] response: ", response.data);
    const data = response.data;
    if (data.status === "success") {
      return JSON.stringify(data.data);
    } else {
      return data.message;
    }
  },
  {
    name: "fetchCasesByKeyword",
    description: `Call our API to search all cases by keyword, requires a keyword string, return all cases in a JSON format`,
    schema: getCasesByKeywordSchemaZod,
  }
);

// [Tool][Case] Delete case tool
const deleteCaseSchemaZod = z.object({
  caseId: z.string().describe(`Case ID in UUID format`),
});
const deleteCaseTool = tool(
  async ({ caseId }) => {
    const response = await postRequest(API_ENDPOINTS.DELETE_CASE, { caseId: caseId })
    console.log("[langchain][deleteCaseTool] response: ", response.data);
    const data = response.data;
    if (data.status === "success") {
      return JSON.stringify(data.data);
    } else {
      return data.message;
    }
  },
  {
    name: "deleteCase",
    description: `Call our API to delete case, requires a valid caseId in UUID format`,
    schema: deleteCaseSchemaZod,
  }
);


// [Tool][Client] Update client tool
const updateClientSchemaZod = z.object({
  clientId: z.string().describe(`Client ID in UUID format`),
  cellNumber: z.number().optional().describe(`Cell number of the client`),
  workNumber: z.number().optional().describe(`Work number of the client`),
  email: z.string().optional().describe(`Email of the client`),
  wechatAccount: z.string().optional().describe(`Wechat account of the client`),
  ssn: z.string().optional().describe(`SSN of the client, must be in the format of "123-45-6789"`),
  dob: z.string().optional().describe(`Date of birth of the client, must be in the format of "2024-07-20T20:24:24.740Z"`),
  organizationId: z.string().optional().describe(`Organization ID in UUID format, if the client is associated with an organization, must be a valid organization id returned from organization query`),
});
const updateClientTool = tool(
  async ({ clientId, cellNumber, workNumber, email }) => {
    const inputObj = {
      clientId: clientId,
    }
    if (cellNumber !== undefined && cellNumber !== null && cellNumber !== "") {
      inputObj.cellNumber = cellNumber;
    }
    if (workNumber !== undefined && workNumber !== null && workNumber !== "") {
      inputObj.workNumber = workNumber;
    }
    if (email !== undefined && email !== null && email !== "") {
      inputObj.email = email;
    }
    const response = await postRequest(API_ENDPOINTS.UPDATE_CLIENT, inputObj)
    return JSON.stringify(response.data);
  },
  {
    name: "updateClient",
    description: `Call our API to update client, requires a valid clientId in UUID format`,
    schema: updateClientSchemaZod,
  }
);

// [Tool][Client] Get all clients by keyword tool
const getClientsByKeywordSchemaZod = z.object({
  keyword: z.string(),
});
const fetchClientsByKeywordTool = tool(
  async ({ keyword }) => {
    const response = await postRequest(API_ENDPOINTS.FETCH_CLIENT_BY_QUERY, { keyword: keyword || "" })
    console.log("[langchain][fetchClientsByKeywordTool] response: ", response.data);
    const data = response.data;
    if (data.status === "success") {
      return JSON.stringify(data.data);
    } else {
      return data.message;
    }
  },
  {
    name: "fetchClientsByKeyword",
    description: `Call our API to search all clients by keyword, requires a keyword string (if multiple keyword is taking into consideration, split them by coma). return all clients in a JSON format`,
    schema: getClientsByKeywordSchemaZod,
  }
);

// [Tool][Client] Delete client tool
const deleteClientSchemaZod = z.object({
  clientId: z.string().describe(`Client ID in UUID format`),
});
const deleteClientTool = tool(
  async ({ clientId }) => {
    const response = await postRequest(API_ENDPOINTS.DELETE_CLIENT, { clientId: clientId })
    console.log("[langchain][deleteClientTool] response: ", response.data);
    const data = response.data;
    if (data.status === "success") {
      return JSON.stringify(data.data);
    } else {
      return data.message;
    }
  },
  {
    name: "deleteClient",
    description: `Call our API to delete client, requires a valid clientId in UUID format`,
    schema: deleteClientSchemaZod,
  }
);



// [Tool][Organization] Get all organizations by keyword tool
const getOrganizationsByKeywordSchemaZod = z.object({
  keyword: z.string(),
});
const fetchOrganizationsByKeywordTool = tool(
  async ({ keyword }) => {
    const response = await postRequest(API_ENDPOINTS.FETCH_ORGANIZATION_BY_QUERY, { keyword: keyword || "" })
    console.log("[langchain][fetchOrganizationsByKeywordTool] response: ", response.data);
    const data = response.data;
    if (data.status === "success") {
      return JSON.stringify(data.data);
    } else {
      return data.message;
    }
  },
  {
    name: "fetchOrganizationsByKeyword",
    description: `Call our API to search all organizations by keyword, requires a keyword string, return all organizations in a JSON format`,
    schema: getOrganizationsByKeywordSchemaZod,
  }
);

// [Tool][Organization] Update organization tool
const updateOrganizationSchemaZod = z.object({
  organizationId: z.string().describe(`Organization ID in UUID format`),
  cellNumber: z.number().optional().describe(`Cell number of the organization`),
  workNumber: z.number().optional().describe(`Work number of the organization`),
  email: z.string().optional().describe(`Email of the organization`),
  website: z.string().optional().describe(`Website of the organization`),
});
const updateOrganizationTool = tool(
  async ({ organizationId, cellNumber, workNumber, email }) => {
    const inputObj = {
      organizationId: organizationId,
    }
    if (cellNumber !== undefined && cellNumber !== null && cellNumber !== "") {
      inputObj.cellNumber = cellNumber;
    }
    if (workNumber !== undefined && workNumber !== null && workNumber !== "") {
      inputObj.workNumber = workNumber;
    }
    if (email !== undefined && email !== null && email !== "") {
      inputObj.email = email;
    }
    const response = await postRequest(API_ENDPOINTS.UPDATE_ORGANIZATION, inputObj)
    return JSON.stringify(response.data);
  },
  {
    name: "updateOrganization",
    description: `Call our API to update organization, requires a valid organizationId in UUID format`,
    schema: updateOrganizationSchemaZod,
  }
);

// [Tool][Organization] Delete organization tool
const deleteOrganizationSchemaZod = z.object({
  organizationId: z.string().describe(`Organization ID in UUID format`),
});
const deleteOrganizationTool = tool(
  async ({ organizationId }) => {
    const response = await postRequest(API_ENDPOINTS.DELETE_ORGANIZATION, { organizationId: organizationId })
    console.log("[langchain][deleteOrganizationTool] response: ", response.data);
    const data = response.data;
    if (data.status === "success") {
      return JSON.stringify(data.data);
    } else {
      return data.message;
    }
  },
  {
    name: "deleteOrganization",
    description: `Call our API to delete organization, requires a valid organizationId in UUID format`,
    schema: deleteOrganizationSchemaZod,
  }
);




export { responseSchema, updateCasesTool, fetchCasesByKeywordTool, deleteCaseTool, updateClientTool, fetchClientsByKeywordTool, deleteClientTool, fetchOrganizationsByKeywordTool, updateOrganizationTool, deleteOrganizationTool };