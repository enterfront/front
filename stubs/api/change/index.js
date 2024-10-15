const changeRouter = require('express').Router();

module.exports = changeRouter;

const { getUserFromDB, deleteUserFromDB, addUserToDB } = require('../db');


changeRouter.post('/nickname', (req, res) => {
    const { id, newNickname } = req.body;

    const user = getUserFromDB(id);

    // Invalid identification
    if (!user) {
        res.status(401).send({message: 'Invalid credentials (id)'});
        return;
    }

    const updatedUser = {
        "nickname": newNickname,
        "password": user.password,
        "id": user.id
    };

    // Delete the old one
    deleteUserFromDB(id)

    // Insert updated
    addUserToDB(updatedUser);

    res.status(200).send({});
});

changeRouter.post('/password', (req, res) => {
    const { id, newPassword } = req.body;

    const user = getUserFromDB(id);

    // Invalid identification
    if (!user) {
        res.status(401).send({message: 'Invalid credentials (id)'});
        return;
    }

    // Delete the old one
    deleteUserFromDB(id)

    // Insert updated
    const updatedUser = {
        "nickname": user.nickname,
        "password": newPassword,
        "id": user.id
    };
    addUserToDB(updatedUser);

    res.status(200).send({});
});

changeRouter.delete('/:id', (req, res) => {
    const { id } = req.params;

    deleteUserFromDB(id);
});

