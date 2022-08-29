const jwt = require('jsonwebtoken');

const { User } = require('../database/models');

const segredo = process.env.JWT_SECRET;

const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
    };

async function encode(userfound, res) {
    const token = await jwt.sign({ data: userfound }, segredo, jwtConfig);
    res.status(201).json({ token });
}

async function save(req, res) {    
    const { email } = req.body;
    const userfound = await User.findOne({ where: { email } });
if (userfound) {
    return res.status(409).json({ message: 'User already registered' });
}
const insertUser = await User.create(req.body);
const { id, displayName, image } = insertUser;
encode({ id, displayName, email, image }, res);
}

module.exports = async (req, res) => {
    try {
     save(req, res);
   } catch (error) {
       res.status(500).json({ message: error.message });
   }
};