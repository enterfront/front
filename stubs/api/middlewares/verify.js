const jwt = require('jsonwebtoken');

const { TOKEN_KEY } = require('../key')

function verifyToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).send({ message: 'No token provided' });
    }

    // Verify token
    jwt.verify(token, TOKEN_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized' });
        }

        next(); // Proceed to the next middleware or route
    });
}

module.exports = verifyToken;
