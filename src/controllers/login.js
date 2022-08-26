const jwt = require('jsonwebtoken');
// const express = require('express');

const { User } = require('../database/models');

const segredo = process.env.JWT_SECRET;

const jwtConfig = {
   expiresIn: '7d',
   algorithm: 'HS256',
 };

 async function encode(userfound, res) {
   const token = await jwt.sign({ data: userfound }, segredo, jwtConfig);
   res.status(200).json({ token });
 }

 async function validate(req, res) {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
}

const userfound = await User.findOne({ where: { email } });
if (!userfound || userfound.password !== password) {
return res.status(400).json({ message: 'Invalid fields' });
}
encode(userfound, res);
}

module.exports = async (req, res) => {
     try {
      validate(req, res);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};