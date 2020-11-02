const express = require("express");

const db = require("../data/dbConfig.js");

const accountRouter =  require('../accounts/accountRouter.js')

const server = express();

server.use(express.json());

const Accounts = {
    getAll() {
        return db('accounts')
    }
}
server.get("/test", (req,res)=>{ 
    res.status(200).json({message: "allo allo allo"})
 })

server.get("/", (req,res)=>{ 
    Accounts.getAll()
    .then(accounts => {
        res.status(200).json(accounts)
    })
    .catch(error => res.status(500).json({message: `${error.message}; ${error.stack}`}))
 })

module.exports = server;
