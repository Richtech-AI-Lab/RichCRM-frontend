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
  const today = new Date();
  today.setDate(today.getDate() + days); // Add the number of days
  return today;
}

export const makeDate =(d, mon, yr) =>{
const day = parseInt(d, 10);
const month = parseInt(mon, 10) - 1; // Month is zero-based (0-11)
const year = parseInt(yr, 10);
// Create a new Date object
const date = new Date(year, month, day);
return date;

}

export function isValidDate(day, month, year) {
  // JavaScript months are zero-based (0-11), so subtract 1 from month
  const date = new Date(year, month - 1, day);
  
  // Check if the date components match the input
  return date.getFullYear() === year && 
         date.getMonth() === month - 1 && 
         date.getDate() === day;
}

export const daysLeft= (targetDateStr) =>{
  const targetDate = new Date(targetDateStr);
  
  const currentDate = new Date();
  
  const differenceInTime = targetDate - currentDate;
  
  const daysLeft = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
  
  return daysLeft;
}

export const generateRandomFiveDigit =  () => {
  return Math.floor(10000 + Math.random() * 90000);
}

export const formatDateToCustomString =  (dateString) => {
  const date = new Date(dateString);
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-US', options).replace(',', '');
}