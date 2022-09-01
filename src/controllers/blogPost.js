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

async function getService(id) {
    return BlogPost.findOne({ where: { id },
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
}

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await getService(id);
        if (!post) return res.status(404).json({ message: 'Post does not exist' });
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updatePost = async (req, res) => {
    try {
        const email = req.payload;
        const { id } = req.params;
        const { title, content } = req.body;
        const post = await BlogPost.findOne({ where: { id } });
        // if (!post) return res.status(404).json({ message: 'Post does not exist' });
        const postOwner = post.userId;
        const postOwnerEmail = await User.findOne({ where: { id: postOwner } });
        if (postOwnerEmail.email !== email) {
            return res.status(401).json({ message: 'Unauthorized user' });
        }
       await BlogPost.update({ title, content }, { where: { id } });
       const returned = await getService(id);
        console.log(returned);
        return res.status(200).json(returned);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

const deletePost = async (req, res) => {
    try {
        const email = req.payload;
        const { id } = req.params;
        const post = await BlogPost.findOne({ where: { id } });
        if (!post) return res.status(404).json({ message: 'Post does not exist' });
        const postOwner = post.userId;
        const postOwnerEmail = await User.findOne({ where: { id: postOwner } });
        if (postOwnerEmail.email !== email) {
            return res.status(401).json({ message: 'Unauthorized user' });
        }
        await BlogPost.destroy({ where: { id } });
        return res.status(204).end();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

async function getqQery(q) {
    return BlogPost.findAll({
        where: {
            [Sequelize.Op.or]: [
                { title: { [Sequelize.Op.like]: `%${q}%` } },
                { content: { [Sequelize.Op.like]: `%${q}%` } },
            ],
        },
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
}
const searchPost = async (req, res) => {
    try {
        const { q } = req.query;
        const posts = await getqQery(q) || [];
        return res.status(200).json(posts);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

    module.exports = { create, getAll, getById, updatePost, deletePost, searchPost };