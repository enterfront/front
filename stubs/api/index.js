const changeRouter = require("./change");
const authRouter = require("./auth");
const chatRouter = require("./chat");

const router = require('express').Router();

const delay = require('./middlewares/delay');
const verify = require('./middlewares/verify');

module.exports = router;

// router.use(delay(300));
// router.use('/books', delay, booksRouter);

router.use('/auth', authRouter);
router.use('/change', verify, changeRouter);
router.use('/chat', verify, chatRouter)
