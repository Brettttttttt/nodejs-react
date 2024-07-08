const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.listen(3001, () => {
    console.log("Server is running on port 3001");
})

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "plantdb"
})

app.post('/register', (req, res) => {
    const sentEmail = req.body.Email;
    const sentUsername = req.body.Username;
    const sentPassword = req.body.Password;

    const SQL = "INSERT INTO users (Email, Username, Password) VALUES (?,?,?)";
    const Values = [sentEmail, sentUsername, sentPassword];

    db.query(SQL, Values, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("User Inserted Successfully!");
            res.send({message: "User Added!", result: result})
        }
    })
})

app.post('/login', (req, res) => {
    const sentLoginUserName = req.body.LoginUserName;
    const sentLoginPassword = req.body.LoginPassword;

    const SQL = "SELECT * FROM users WHERE username = ? && password = ?";
    const Values = [sentLoginUserName, sentLoginPassword];

    db.query(SQL, Values, (err, result) => {
        if (err) {
            res.send({error: err});
        }

        if (result.length > 0) {
            res.send(result[0]);
        }
        else{
            res.send({message: "Wrong username or password!"});
        }
    })
})

app.post('/save-draft', (req, res) => {
    const { username, about_me_draft } = req.body;

    const SQL = "UPDATE users SET about_me_draft = ? WHERE username = ?";
    const values = [about_me_draft, username];

    console.log('Received payload:', req.body); // Log the incoming request payload

    db.query(SQL, values, (err, result) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).send({ message: "An error occurred while saving the draft.", error: err });
        } else if (result.affectedRows === 0) {
            console.warn('No rows updated:', result);
            res.status(404).send({ message: "User not found or no change in draft content." });
        } else {
            console.log('Draft saved successfully:', result);
            res.send({ message: "Draft saved successfully!" });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


