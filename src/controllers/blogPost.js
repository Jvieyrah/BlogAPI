const Sequelize = require('sequelize');
const config = require('../database/config/config');

const { Category, PostCategory, User, BlogPost } = require('../database/models');

const sequelize = new Sequelize(config.development);

const create = async (req, res) => {
    const t = await sequelize.transaction();
    try {
    const { title, content, categoryIds } = req.body;
    const email = req.payload;
    const userId = await User.findOne({ where: { email } });   
    const postConstructor = await BlogPost
    .create({ title, content, userId: userId.dataValues.id }, { transaction: t });
    const categoryInsert = categoryIds.map((categoryId) => ({
    postId: postConstructor.dataValues.id, categoryId }));
    await PostCategory.bulkCreate(categoryInsert, { transaction: t }); 
    await t.commit();
    return res.status(201).json(postConstructor.dataValues);   
    } catch (error) {
        console.log(error);
    await t.rollback();
    return res.status(500).json({ message: error.message });
    }
};

const getAll = async (_req, res) => {
    try {
        const posts = await BlogPost.findAll({
            include: [{
                model: User,
                as: 'user',
                attributes: {
                  exclude: ['password'],
                },
              }, {
                model: Category,
                as: 'categories',
    }],
        });
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await BlogPost.findOne({ where: { id },
            include: [{
            model: User,
            as: 'user',
            attributes: {
                exclude: ['password'],
            },
        }, {
            model: Category,
            as: 'categories',
        }] });
        if (!post) return res.status(404).json({ message: 'Post does not exist' });
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};   

    module.exports = { create, getAll, getById };