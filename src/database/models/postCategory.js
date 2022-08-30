module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      allowNull: false,
      foreignKey: true,
      type: DataTypes.INTEGER,
    },
    categoryId: {
        allowNull: false,
        foreignKey: true,
        type: DataTypes.INTEGER,
    },
  }, {
    timestamps: false,
    tableName: 'PostCategories',
  });
  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
      as: 'categories',
    });
    models.Category.belongsToMany(models.BlogPost, {
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
      as: 'BlogPosts',
    });
    }
    return PostCategory;
};
