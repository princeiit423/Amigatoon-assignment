const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
    
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization header missing or malformed' });
    }

    
    const token = authHeader.replace('Bearer ', '');

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

    
        req.user = decoded;
        next();
    });
};
