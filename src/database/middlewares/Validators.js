const inDisNam = '"displayName" length must be at least 8 characters long';
const inEmail = '"email" must be a valid email';
const inPass = '"password" length must be at least 6 characters long';
const emailchecker = /\S+@\S+\.\S+/;
const { Category } = require('../models');

function validate(req, res, next) {    
    const { displayName, email, password } = req.body;
    if (displayName.length < 8) return res.status(400).json({ message: inDisNam });
   
    if (!emailchecker.test(email)) return res.status(400).json({ message: inEmail });
    
    if (password.length < 6) return res.status(400).json({ message: inPass });
    next();
}

function validateCategory(req, res, next) {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: '"name" is required' });
    next();
}

const missing = 'Some required fields are missing';
function validatePostfields(req, res, next) {
    const { title, content, categoryIds } = req.body;
    if (!title || !content || !categoryIds) {
     return res.status(400)
    .json({ message: missing });
    }
    next();
}

const notFound = '"categoryIds" not found';
async function validatePostCategory(req, res, next) {
    const { categoryIds } = req.body;
    const { rows } = await Category.findAndCountAll({
        where: { id: categoryIds },
      });
    // const category = await Category.findAll();
    // const categoryIdsArray = category.map((cat) => cat.id);
    if (!rows.length){
        return res.status(400).json({ message: notFound });
    }
    next();
}

module.exports = { validate, validateCategory, validatePostfields, validatePostCategory };