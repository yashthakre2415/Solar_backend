const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                message: 'Authorization token required',
                success: false
            });
        }
        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                message: 'Token not found',
                success: false
            });
        }
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (err) {

        console.log('Token verification failed', err);

        return res.status(401).json({
            message: 'Invalid or expired token',
            success: false
        });
    }
};

module.exports = authMiddleware;