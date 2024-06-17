Dynamic Forms Application
This project consists of a React-based client application and a Node.js-based server application. The client application allows users to fill out dynamic forms, validate input fields, and submit data to the server. 
The server handles form submissions and interacts with a database or performs other necessary backend operations.

Clone the repository:
git clone https://github.com/Atulraj0708/Dynamic-Forms.git
cd dynamic-forms-app

Client Installation
Follow these steps to install and run the client application:

Navigate to the client directory:
cd client
npm install

Set up environment variables:
Create a .env file in the root directory and add the following environment variables:
REACT_APP_SERVER_LINK=http://localhost:10000

How to Run the Client Application
Start the development server:
npm start
Open the application:
Navigate to http://localhost:3000 in your web browser.

Server Installation
Follow these steps to install and run the server application:

Navigate to the server directory:
cd server

Install dependencies:
npm install

Set up environment variables:
Create a .env file in the server directory and add any necessary environment variables for your server configuration (database connection strings, API keys, etc.).

How to Run the Server Application
Start the server:
npm start

Functionality Implemented
Client Application:

Users can choose between different form types (Form A, Form B).
Each form consists of fields for name, country code, and phone number.
Form validation ensures:
Name must contain only alphabetic characters and can include spaces.
Country code must be selected from a predefined list.
Phone number must be exactly 10 digits.
Real-time validation feedback is provided with error messages.

Server Application:

Receives form submissions from the client application via Axios POST requests (/submit endpoint).
Validates incoming data and handles storage or processing as per application requirements.
Provides responses to the client indicating the status of form submissions (success or failure).
