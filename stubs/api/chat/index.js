const chatRouter = require('express').Router();

module.exports = chatRouter;

const { getChatFromDB, getUsersChats, addChatToDB, getUserFromDB,
    addMessageToChat} = require('../db');

chatRouter.get('/item/:id1/:id2', (req, res) => {
    const { id1, id2 } = req.params;

    if (id1 === id2) {
        res.status(400).send({message: 'Ids should be different'});
        return;
    }

    const chat = getChatFromDB(id1, id2);

    if (chat) {
        res.status(200).send({chat});
    } else {
        res.status(404).send({message: 'Chat was not found'});
    }
})

chatRouter.post('/item/:id1/:id2', (req, res) => {
    const { id1, id2 } = req.params;

    if (id1 === id2) {
        res.status(400).send({message: 'Ids should be different'});
        return;
    }

    const chat = getChatFromDB(id1, id2);

    if (chat) {
        // Chat already exists
        res.status(200).send({chat});
    } else {
        if (!getUserFromDB(id1) || !getUserFromDB(id2)) {
            res.status(404).send({message: 'Such interlocutor does not exist'});
        } else {
            // Creating new chat
            const newChat = {
                id1: id1,
                id2: id2,
                messages: []
            }

            addChatToDB(newChat);

            res.status(200).send({newChat});
        }
    }
})

chatRouter.get('/list/:id', (req, res) => {
    const { id } = req.params;

    const userChats = getUsersChats(id);

    if (!userChats) {
        res.status(404).send({message: 'Error with retrieving chats'});
    } else {
        res.status(200).send({chats: userChats});
    }
})

chatRouter.post('/message/:sender/:receiver', (req, res) => {
    const { sender, receiver } = req.params;
    const { message } = req.body;

    const chat = getChatFromDB(sender, receiver);

    if (!chat) {
        // Chat already exists
        res.status(400).send({message: "Such chat does not exist"});
    } else {
        if (!getUserFromDB(sender) || !getUserFromDB(receiver)) {
            res.status(404).send({message: 'Such people do not exist'});
        } else {
            // Add new message
            addMessageToChat(chat, message);
            res.status(200).send({});
        }
    }
})
