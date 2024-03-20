require("dotenv").config();
const sql = require("mssql");
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3001;

app.use(express.json());
app.use(cors());

const sqlLocal = {
    server: "localhost",
    database: "dbnamehere",
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

//Open a connection on port 3000
app.listen(PORT, () => {
    console.log(`SERVER STARTED ON PORT ${PORT}`);
});
