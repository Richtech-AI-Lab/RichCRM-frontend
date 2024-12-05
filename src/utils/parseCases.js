export const ParseCases = (dataString) =>{
  // const introText = dataString.split("\n").find(line => !line.includes("Case ID")).trim();

  // const cases = [];
  // const caseLines = dataString.split("\n").filter(line => line.includes("Case ID"));

  // caseLines.forEach(line => {
  //   // Match case details using regex
  //   const match = line.match(/Case ID: (.*?), Client: (.*?), Stage: (.*?), Closing Date: (.*)/);
  //   if (match) {
  //     const [_, caseId, client, stage, closingDate] = match;
  //     cases.push({ caseId, client, stage, closingDate });
  //   }
  // });
  try {
    const introJson = JSON.parse(dataString);
    const { message, status, cases, clients, organizations } = introJson;
    // console.log("[langchain][ParseCases] introJson: ", introJson);
    if (status === "success") {
      return { introText: message, cases, clients, organizations };
    } else if (status === "error") {
      return { introText: message };
    } else {
      return { introText: dataString };
    }
  } catch (error) {
    console.error("[langchain][ParseCases] error: ", error);
    return { introText: dataString };
  }
}