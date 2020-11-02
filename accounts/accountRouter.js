const express = require('express')

const db = require('../data/dbConfig')

const router = express.Router()

// db helper:

const Accounts = {
    getAll() {
        return db('accounts')
    },
    getById(id) {
        return db('accounts')
        .where({id})
    },
    create(account) {
        return db('accounts').insert(account)
    }, 
    update(id, account) {
        return db('accounts')
        .where({id})
        .update(account)
    }, 
    delete(id) {
        return db('accounts')
        .where({id})
        .del()
    }
}

 // @desc		Get all accounts
 // @route		GET /
router.get("/", (req,res)=>{ 
    Accounts.getAll()
    .then(accounts => {
        res.status(200).json(accounts)
    })
    .catch(error => res.status(500).json({message: `${error.message}; ${error.stack}`}))
 })

 // @desc		Get a account by id
 // @route		GET /:id
 router.get('/:id', (req, res) => {
    Accounts.getById(req.params.id)
    .then(account => res.status(200).json(account))
    .catch(error => res.status(500).json({message: `${error.message}; ${error.stack}`}))
 })
 // @desc		Add a new account
 // @route		POST /
 router.post('/', (req, res) => {
    Accounts.create(req.body)
    .then(([id]) => {
        return Accounts.getById(id).first()
    })
    .then(account => res.status(202).json(account))
    .catch(error => res.status(500).json({message: `${error.message}; ${error.stack}`}))
 })
 // @desc		Update a account by id
 // @route		PUT /:id
 router.put('/:id', (req, res) => {
    Accounts.update(req.params.id, req.body)
    .then( account => res.status(204).json(account))
    .catch(error => res.status(500).json({message: `${error.message}; ${error.stack}`}))
 })
 // @desc		Remove a account by id
 // @route		DELETE /:id
 router.delete('/:id', (req, res) => {
    Accounts.delete(req.params.id)
    .then((data) => res.status(200).json({message: 'you successfully deleted that mamma jamma'}))
    .catch(error => res.status(500).json({message: `${error.message}; ${error.stack}`}))
 })

module.exports = router