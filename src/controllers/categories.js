const { Category } = require('../database/models');

const create = async (req, res) => {
    const { name } = req.body;
    const categoryFound = await Category.findOne({ where: { name } });
    if (categoryFound) {
        return res.status(409).json({ message: 'Category already registered' });
    }
    const insertCategory = await Category.create(req.body);
    res.status(201).json(insertCategory);
    };

    module.exports = { create };