const findEmployeesWithShortBreaks = (data) => {
  const result = [];

  for (let i = 1; i < data.length; i += 2) {
    const timeOutPrevious = new Date(
      data[i - 1].dateOut + " " + data[i - 1].timeOut
    );
    const timeInCurrent = new Date(data[i].dateIn + " " + data[i].timeIn);

    // Calculate the time difference in hours
    const timeDifferenceHours =
      (timeInCurrent - timeOutPrevious) / (1000 * 60 * 60);

    // Check if the break is less than 10 hours but greater than 1 hour
    if (timeDifferenceHours > 1 && timeDifferenceHours < 10) {
      result.push(data[i]);
    }
  }

  return result;
};

// Import the processed data from extractData.js
const processedData = require("./extractData");

// Find employees with breaks less than 10 hours but greater than 1 hour
const employeesWithShortBreaks = findEmployeesWithShortBreaks(processedData);

// Output the result
console.log(
  "Employees with breaks less than 10 hours but greater than 1 hour:",
  employeesWithShortBreaks
);
