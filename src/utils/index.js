export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
  return `${year}-${month}-${day}`;
};

export const countCasesByStage = (cases) => {
  const stageCount = {
    settingUp: 0,
    contractPreparing: 0,
    contractSigning: 0,
    mortgageTitle: 0,
    closing: 0,
    totalOpenCases: 0
  };

  cases?.forEach((caseItem) => {
    switch (caseItem.stage) {
      case 0:
        stageCount.settingUp++;
        break;
      case 1:
        stageCount.contractPreparing++;
        break;
      case 2:
        stageCount.contractSigning++;
        break;
      case 3:
        stageCount.mortgageTitle++;
        break;
      case 4:
        stageCount.closing++;
        break;
      default:
        // Handle any unexpected stage values here if necessary
        break;
    }
  });

  // Calculate total open cases (assuming all cases are open)
  stageCount.totalOpenCases = Object.values(stageCount).reduce((sum, count) => sum + count, 0);

  return stageCount;
};

export const getDateAfterDays =(days) =>{
  console.log(days)
  const today = new Date();
  today.setDate(today.getDate() + days); // Add the number of days
  return today;
}


export const daysLeft= (targetDateStr) =>{
  const targetDate = new Date(targetDateStr);
  
  const currentDate = new Date();
  
  const differenceInTime = targetDate - currentDate;
  
  const daysLeft = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
  
  return daysLeft;
}
