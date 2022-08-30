const jwt = require('jsonwebtoken');

const { User } = require('../models');

const segredo = process.env.JWT_SECRET;

const QUATROZEROUM = { message: 'Expired or invalid token' };

module.exports = async (req, res, next) => {
    const token = req.headers.authorization;
    try {
        if (!token) {
            return res.status(401).json({ message: 'Token not found' });
        }                                                                   
        const { email } = jwt.verify(token, segredo);
        console.log(email);
        const userfound = await User.findOne({ where: { email } });
        if (!userfound) {
            return res.status(401).json({ message: QUATROZEROUM });
        }
        req.email = email;

        next();
    } catch (error) {
        return res.status(401).json(QUATROZEROUM);
    }
};
