require("dotenv").config();
const sql = require("mssql");
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3005;

app.use(express.json());
app.use(cors());

const sqlLocal = {
    server: "localhost",
    database: "pomodoroDB",
    user: "jack",
    password: "password",
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
};

sql.connect(sqlLocal, function (err) {
    if (err) console.log(err);
    else console.log("Connected!");
});

app.get("/gettasks/:googleid", async (req, res) => {
    const googleId = req.params.googleid;
    console.log("@/gettasks", googleId);
    try {
        let request = new sql.Request();
        request.input("googleid", sql.VarChar, googleId);
        const query =
            "select task_text from Users JOIN Tasks ON Tasks.google_id = Users.google_id WHERE Users.google_id = @googleid";
        const result = await request.query(query);
        console.log(result);
        res.json(result);
    } catch (err) {}
});

app.post("/newtask", async (req, res) => {
    console.log("@/newtask");
    //data to send to server
    console.log(req.body);
    const googleid = req.body.googleId;
    const taskText = req.body.tasktext;
    console.log("Values: ", googleid, taskText);
    //this needs to be hased before sent over server.
    try {
        let request = new sql.Request();
        request.input("googleid", sql.VarChar, googleid);
        request.input("tasktext", sql.VarChar, taskText);

        const query = "INSERT INTO Tasks values (@tasktext, @googleid)";
        const result = await request.query(query);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500);
    }
});

app.post("/newuser", async (req, res) => {
    console.log("@/newuser");
    //data to send to server
    console.log(req.body.googleId);
    const googleId = req.body.googleId.googleId;
    console.log(googleId);

    //this needs to be hased before sent over server.
    try {
        let request = new sql.Request();
        request.input("googleid", sql.VarChar, googleId);
        const query = "INSERT INTO Users values (@googleid)";
        const result = await request.query(query);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500);
    }
});

//Open a connection on port 3000
app.listen(PORT, () => {
    console.log(`SERVER STARTED ON PORT ${PORT}`);
});
