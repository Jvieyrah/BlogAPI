module.exports = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPost', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.STRING,
    },
    userId: { 
      type: DataTypes.STRING,
      foreignKey: true,
      allowNull: false,
     }
  }, {
    createdAt: 'published',
    updatedAt: 'updated',
    tableName: 'BlogPosts',
  });
  blogPost.associate = (models) => {
    blogPost.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    
  };
  return blogPost;
}
