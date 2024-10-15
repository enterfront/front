// Read already defined users (pseudo-DB)
const users = require('./auth/users.json');
const chats = require('./chat/chats.json');

const getUserFromDB = (userID) => {
    if (!userID) {return false;}

    // Accessing 'DB'
    const user = users.find((user) => user.id === userID);

    if (user) {
        return user;
    } else {
        return false;
    }
}

const deleteUserFromDB = (userID) => {
    const index = users.findIndex(item => item.id === userID);
    if (index !== -1) {
        users.splice(index, 1);
    }
}

const addUserToDB = (user) => {
    users.push(user);
}

const getChatFromDB = (firstID, secondID) => {
    if (!firstID || !secondID) {return false;}

    // Accessing 'DB'
    const chat = chats.find((item) =>
        (item.id1 === firstID && item.id2 === secondID) || (item.id1 === secondID && item.id2 === firstID));

    if (chat) {
        return chat;
    } else {
        return false;
    }
}

const getUsersChats = (userID) => {
    if (!userID) {return false;}

    const userChats = chats.filter((chat) => (chat.id1 === userID || chat.id2 === userID));

    if (userChats) {
        return userChats;
    } else {
        return false;
    }
}

const addMessageToChat = (chat, msg) => {
    chat.messages.push(msg);
}

const deleteChatFromDB = (firstID, secondID) => {
    const index = chats.findIndex(item =>
        (item.id1 === firstID && item.id2 === secondID) || (item.id1 === secondID && item.id2 === firstID));

    if (index !== -1) {
        chats.splice(index, 1);
    }
}

const addChatToDB = (chat) => {
    chats.push(chat);
}


module.exports = {users, chats, getUserFromDB, getChatFromDB, addUserToDB,
    deleteUserFromDB, addChatToDB, deleteChatFromDB, getUsersChats, addMessageToChat}
