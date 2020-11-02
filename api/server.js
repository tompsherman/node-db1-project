const express = require("express");

const db = require("../data/dbConfig.js");

const accountRouter =  require('../accounts/accountRouter.js')

const server = express();

server.use(express.json());

server.use("/api/accounts", accountRouter)

server.get("/test", (req,res)=>{ 
    res.status(200).json({message: "allo allo allo"})
 })

module.exports = server;
