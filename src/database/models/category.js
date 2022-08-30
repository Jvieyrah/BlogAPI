module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('Category', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
  }, {
    timestamps: false,
    tableName: 'Categories',
  });
  category.associate = (models) => {
    category.belongsToMany(models.BlogPost, {
      through: 'PostCategory',
      as: 'blogPosts',
      foreignKey: 'categoryId',
    });
  };
  return category;
}