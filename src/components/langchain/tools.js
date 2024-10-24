import { API_ENDPOINTS } from "../../constants/api";
import { postRequest } from "../../../src/axios/interceptor";

import { z } from "zod";
import { tool } from "@langchain/core/tools";


// Response schema
const responseSchema = z.object({
    status: z.string(),
    data: [
        z.object({
            caseId: z.ostring(),
            caseType: z.onumber(),
            premisesId: z.ostring(),
            stage: z.onumber(),
            closingDate: z.ostring(),
            clientId: z.ostring(),
            clientType: z.onumber(),
            clientName: z.ostring(),
        })
    ],
    message: z.string(),
});


// [Tool] Update cases tool
const updateCaseSchema = {
    type: 'object',
    properties: {
        caseId: { type: 'string' },
        stage: { type: 'number' },
        closingDate: { type: 'date' },
    },
    required: ['caseId'],
};
const updateCasesTool = tool(
  async (input) => {
    const response = await postRequest(API_ENDPOINTS.UPDATE_CASE, JSON.parse(input))
    return await response.json();
  },
  {
    name: "updateCases",
    description: `Call our API to update cases, and return the updated cases, requires a valid caseId in UUID format, closingDate should be in a format like this: "2024-07-20T20:24:24.740Z"`,
    // schema: updateCaseSchemaZod,
    parameters: updateCaseSchema,
  }
);

// [Tool] Get all cases by keyword (within ClientName and PremisesName) tool
const getCasesByKeywordSchemaZod = z.object({
  keyword: z.string(),
  closed: z.boolean().optional(),
});
const getCasesByKeywordTool = tool(
  async (input) => {
    const response = await postRequest(API_ENDPOINTS.GET_CASES_BY_KEYWORD, JSON.parse(input))
    return await response.json();
  },
  {
    name: "getCasesByKeyword",
    description: `Call our API to search all cases by keyword, requires a keyword string`,
    schema: getCasesByKeywordSchemaZod,
  }
);


export { responseSchema, updateCasesTool, getCasesByKeywordTool };