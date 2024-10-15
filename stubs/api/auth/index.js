const authRouter = require('express').Router();

// For creating tokens
const jwt = require('jsonwebtoken');

const { TOKEN_KEY } = require('../key')


module.exports = authRouter;

const { addUserToDB, getUserFromDB } = require('../db');


// Get a user by its id
authRouter.get('/:id', (req, res) => {
    const user = getUserFromDB(req.params.id);

    if (user) {
        res.status(200).send({user});
    } else {
        res.status(404).send({message: 'User was not found'});
    }
})

// For login (authorization)
authRouter.post('/login', (req, res) => {
    const { name, password } = req.body;

    const user = getUserFromDB(name);

    // Invalid identification
    if (!user) {
        res.status(401).send({message: 'Invalid credentials (id)'});
        return;
    }

    // Invalid authentication
    if (!password || password !== user.password) {
        res.status(401).send({message: 'Invalid credentials (password)'});
        return;
    }

    // Now, authorization
    const token = jwt.sign({id: name}, TOKEN_KEY, {
        expiresIn: '1h'
    })

    res.status(200).send({token});
})


authRouter.post('/reg', (req, res) => {
    const { name, password, nickname } = req.body;

    const user = getUserFromDB(name);

    // Invalid identification
    if (user) {
        res.status(409).send({message: 'Such id already exists'});
        return;
    }

    if (!name || !password || !nickname) {
        res.status(401).send({message: 'Empty or invalid fields'});
        return;
    }

    // Add to 'DB'
    const newUser = {id: name, password: password, nickname: nickname};
    addUserToDB(newUser)

    res.status(200).send({user: newUser});
})
