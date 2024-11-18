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


// [Tool] Update cases tool
const updateCaseSchemaZod = z.object({
  caseId: z.string().describe(`Case ID in UUID format`),
  stage: z.number().optional()
    .describe(`Stage of the case (0-Case Setup, 1-Contract Preparing, 2-Contract Signing, 3-Mortgage, 4-Closing)`),
  closingDate: z.string()
    .optional()
    .describe(`Closing date of the case, should be in a format like this: "2024-07-20T20:24:24.740Z"`),
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
    description: `Call our API to update cases, and return the updated cases, requires a valid caseId in UUID format, closingDate should be in a format like this: "2024-07-20T20:24:24.740Z"`,
    schema: updateCaseSchemaZod,
  }
);

// [Tool] Get all cases by keyword (within ClientName and PremisesName) tool
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

// [Tool] Update client tool
const updateClientSchemaZod = z.object({
  clientId: z.string().describe(`Client ID in UUID format`),
  cellNumber: z.number().optional().describe(`Cell number of the client`),
  workNumber: z.number().optional().describe(`Work number of the client`),
  email: z.string().optional().describe(`Email of the client`),
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


export { responseSchema, updateCasesTool, fetchCasesByKeywordTool, updateClientTool };