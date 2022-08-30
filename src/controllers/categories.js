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

const getAll = async (_req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

    module.exports = { create, getAll };