const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const { google } = require("googleapis");
const fs = require("fs");
const app = express();


const dotenv=require("dotenv");
dotenv.config();

const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.host,
  user: process.env.user, 
  password: process.env.password, 
  database: process.env.database,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to database.");
});

const credentials = JSON.parse(fs.readFileSync("credentials.json"));
const scopes = ["https://www.googleapis.com/auth/spreadsheets"];
const client = new google.auth.JWT(
  process.env.client_email,
  null,
  process.env.private_key,
  scopes
);

const sheets = google.sheets({ version: "v4", auth: client });
const spreadsheetId = process.env.spreadsheetid;

const checkHeaderExists = async () => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Sheet1!A1:D1",
    });

    return response.data.values && response.data.values.length > 0;
  } catch (error) {
    console.error("Error checking header row in Google Sheets:", error);
    throw error;
  }
};

const appendDataToSheet = async (rows) => {
  try {
    const headerExists = await checkHeaderExists();
    const dataToAppend = headerExists
      ? rows
      : [["Form Type", "Name", "Country Code", "Phone Number"], ...rows];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A1:D",
      valueInputOption: "RAW",
      requestBody: {
        values: dataToAppend,
      },
    });

    console.log("Data synced to Google Sheets successfully.");
  } catch (error) {
    console.error("Error syncing data to Google Sheets:", error);
    throw error;
  }
};

app.post("/sync-to-sheets", async (req, res) => {
  try {
    const query = "SELECT formType, name, countryCode, phoneNumber FROM forms";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching data from database:", err);
        res.status(500).send("Server error");
        return;
      }
      const rows = results.map((row) => [
        row.formType,
        row.name,
        row.countryCode,
        row.phoneNumber,
      ]);
      appendDataToSheet(rows);

      res.status(200).send("Data synced to Google Sheets");
    });
  } catch (error) {
    console.error("Error syncing data to Google Sheets:", error);
    res.status(500).send("Server error");
  }
});

app.post("/submit", (req, res) => {
  const { formType, name, countryCode, phoneNumber } = req.body;
  const query =
    "INSERT INTO forms (formType, name, countryCode, phoneNumber) VALUES (?, ?, ?, ?)";
  db.query(
    query,
    [formType, name, countryCode, phoneNumber],
    (err, results) => {
      if (err) {
        console.error("Error inserting data into database:", err);
        res.status(500).send("Server error");
      } else {
        res.status(200).send("Form data submitted successfully");
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
