require("dotenv").config();
const mongoose = require("mongoose");
const XLSX = require("xlsx");
const path = require("path");

const Student = require("../models/student.model");

// Mongo connect
mongoose.connect("mongodb://localhost:27017/cpms");

async function importStudents() {
  try {
    const filePath = path.join(__dirname, "../PlacementPro_CS_MCA_200.xlsx");

    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];

    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    console.log("Rows found:", data.length);

    await Student.insertMany(data);

    console.log("Students imported successfully ✅");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

importStudents();