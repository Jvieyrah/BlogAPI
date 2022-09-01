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

const create = async (req, res) => {
    try {
     save(req, res);
   } catch (error) {
       res.status(500).json({ message: error.message });
   }
};

const getAll = async (req, res) => {
    try {
        const users = await User.findAll({ attributes: { exclude: ['password'] } });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
        if (!user) {
            return res.status(404).json({ message: 'User does not exist' });
        }
        res.status(200).json(user); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const userDelete = async (req, res) => {
    try {
        const email = req.payload;
        await User.destroy({ where: { email } });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { create, getAll, getById, userDelete };