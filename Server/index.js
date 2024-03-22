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

app.post("/newuser", async (req, res) => {
    console.log("@/newtask");
    //data to send to server
    console.log(typeof req.body.googleId);
    const googleId = toString(req.body.googleId);

    //this needs to be hased before sent over server.
    try {
        let request = new sql.Request();
        request.input("googlid", sql.VarChar, googleId);
        const query = "INSERT INTO Users values (@googlid)";
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
