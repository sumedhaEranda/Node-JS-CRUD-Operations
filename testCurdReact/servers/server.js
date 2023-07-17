const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');


// Configure MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'empmast'
});

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Establish MySQL connection
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ', err);
        process.exit(1); // Exit the server process if there's a connection error
    } else {
        console.log('Connected to the database');

        // Endpoint to handle the form submission
        app.post('/api', (req, res) => {
            const formData = req.body;
            console.log(formData);
            let setempcode=formData['empCode'];
            let setempnam=formData['empName'];
            let setempdob=formData['empDob'];
            let setempSal=formData['empSal'];
            let setempserv=formData['empServ'];
            let setempmof=formData['empMof'];
            // let setempsponam=formData['empSponam'];
            let setempcrk=formData['empCrk'];
            let setempfb=formData['empFb'];
            let setemptwn=formData['empTwn'];
            let setemprem=formData['empRem'];

            let query = `INSERT INTO empmast (empcode,empnam,empdob,empsal,empserv,empmof,empCrk,empFb,emptwn,emprem) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
            connection.query(query, [setempcode, setempnam, setempdob, setempSal, setempserv, setempmof, setempcrk, setempfb, setemptwn, setemprem], (err, result) => {
                if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ error: 'Duplicate entry for primary key' });
          } else {
            res.status(500).json({ error: 'An error occurred while saving the data' });
          }
        } else {
          res.json({ message: 'Data saved successfully' });
        }
            });
        });

        // Start the app
        const port = 5000;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
});
