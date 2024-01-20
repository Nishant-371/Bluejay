const XLSX = require("xlsx");

// Assuming you have an input file input.xlsx
const inputFile = "Assignment_Timecard.xlsx";

// Read the XLSX file
const workbook = XLSX.readFile(inputFile);

// Get the first sheet
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Function to extract dates, times, and employee names from a sheet
function extractDataFromSheet(sheet) {
  const extractedData = [];

  for (const cell in sheet) {
    if (cell[0] === "!" || !sheet.hasOwnProperty(cell)) continue; // Skip non-cell properties

    const cellData = sheet[cell];

    if (cellData.w && cellData.w.includes("/") && cellData.w.includes(":")) {
      const dateTime = new Date(cellData.w);

      // Extract date and time separately
      const date = dateTime.toISOString().split("T")[0];
      const time = dateTime.toTimeString().split(" ")[0];

      // Extract employee name from the 8th column
      const rowNumber = parseInt(cell.match(/\d+/)[0]); // Extract the row number from the cell reference
      const employeeNameCell = "H" + rowNumber; // Assuming "H" is the 8th column
      const employeeColumn = sheet[employeeNameCell];
      const employeeName = employeeColumn ? employeeColumn.w : null;

      // Store date, time, and employee name in the extracted data array
      extractedData.push({ date, time, employeeName });
    }
  }

  return extractedData;
}

// Extract dates, times, and employee names from the sheet
const rawData = extractDataFromSheet(sheet);

// Process the raw data to create a new array with "time in", "date in", "time out", and "date out" information
const processedData = [];
for (let i = 0; i < rawData.length - 1; i += 2) {
  const timeIn = rawData[i];
  const timeOut = rawData[i + 1];

  processedData.push({
    timeIn: timeIn.time,
    dateIn: timeIn.date,
    timeOut: timeOut.time,
    dateOut: timeOut.date,
    employeeName: timeIn.employeeName,
  });
}

// Output the processed data
// console.log("Processed Data:", processedData);

module.exports = processedData;
