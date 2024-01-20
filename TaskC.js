const findEmployeesWithLongShifts = (data) => {
  const result = [];

  for (let i = 0; i < data.length; i++) {
    const timeIn = new Date(data[i].dateIn + " " + data[i].timeIn);
    const timeOut = new Date(data[i].dateOut + " " + data[i].timeOut);

    // Calculate the shift duration in hours
    const shiftDurationHours = (timeOut - timeIn) / (1000 * 60 * 60);

    // Check if the shift duration is more than 14 hours
    if (shiftDurationHours > 14) {
      result.push(data[i]);
    }
  }

  return result;
};

// Import the processed data from extractData.js
const processedData = require("./extractData");

// Find employees with shifts more than 14 hours
const employeesWithLongShifts = findEmployeesWithLongShifts(processedData);

// Output the result
console.log(
  "Employees with shifts more than 14 hours:",
  employeesWithLongShifts
);
