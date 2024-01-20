const findEmployeesForConsecutiveDays = (data) => {
  const result = [];
  let consecutiveDaysCount = 1;

  for (let i = 1; i < 2; i++) {
    const currentDate = new Date(data[i].dateIn);
    const prevDate = new Date(data[i - 1].dateIn);
    console.log(currentDate);
    console.log(prevDate);

    // Check if the current date is consecutive to the previous date
    if (currentDate.getTime() === prevDate.getTime() + 24 * 60 * 60 * 1000) {
      consecutiveDaysCount++;
    } else {
      consecutiveDaysCount = 1;
    }

    // If an employee worked for 7 consecutive days, add them to the result
    if (consecutiveDaysCount === 7) {
      result.push(data[i]);
    }
  }

  return result;
};

// Import the processed data from extractData.js
const processedData = require("./extractData");

// Find employees who worked for 7 consecutive days
const employeesForConsecutiveDays =
  findEmployeesForConsecutiveDays(processedData);

// Output the employees who worked for 7 consecutive days
console.log(
  "Employees who worked for 7 consecutive days:",
  employeesForConsecutiveDays
);
