const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const Parse = require('parse/node');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


Parse.initialize('myAppId', '', 'myMasterKey');
Parse.serverURL = 'http://localhost:1337/parse';
app.listen(3001, () => {
    console.log("Server is running on port 3001");
})

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "plantdb"
})


async function run() {
    try {
        const user = new Parse.User();
        user.set("username", "myName");
    } catch (e) {
        console.log(e);
    }
}

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

app.post('/login', async (req, res) => {
    const sentLoginUserName = req.body.LoginUserName;
    const sentLoginPassword = req.body.LoginPassword;

    try {
        // Log in with Parse
        const user = await Parse.User.logIn(sentLoginUserName, sentLoginPassword);

        // If successful, proceed to query your database
        const SQL = "SELECT * FROM users WHERE username = ? AND password = ?";
        const Values = [sentLoginUserName, sentLoginPassword];

        db.query(SQL, Values, (err, result) => {
            if (err) {
                return res.status(500).send({ message: "Database error", error: err });
            }

            if (result.length > 0) {
                res.send({
                    message: "Login successful",
                    sessionToken: user.getSessionToken(),
                    username: user.getUsername()
                });
            } else {
                res.status(401).send({ message: "User not found in database" });
            }
        });
    } catch (error) {
        res.status(401).send({ message: "Wrong username or password!", error });
    }
});

const authenticateUser = async (req, res, next) => {
    const sessionToken = req.headers['x-parse-session-token'];

    if (!sessionToken) {
        return res.status(401).send({ message: "User is not authenticated. No session token provided." });
    }

    try {
        const currentUser = await Parse.User.become(sessionToken);
        req.currentUser = currentUser;
        next();
    } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(401).send({ message: "User authentication failed." });
    }
};

app.post('/save-draft', authenticateUser, (req, res) => {
    const sentUpdateAboutMe = req.body.AboutMe;
    const currentUser = req.currentUser;

    if (!currentUser) {
        return res.status(401).send({ message: "User is not authenticated." });
    }

    const username = currentUser.getUsername();
    console.log('Current username:', username);

    const SQL = "UPDATE users SET about_me_draft = ? WHERE username = ?";
    const values = [sentUpdateAboutMe, username];

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