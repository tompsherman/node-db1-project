const express = require('express')

const db = require('../data/dbConfig')

const router = express.Router()

// db helper:

const Accounts = {
    getAll() {
        return db('accounts')
    }
}


router.get("/", (req,res)=>{ 
    Accounts.getAll()
    .then(accounts => {
        res.status(200).json(accounts)
    })
    .catch(error => res.status(500).json({message: `${error.message}; ${error.stack}`}))
 })

module.exports = router