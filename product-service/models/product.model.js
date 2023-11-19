module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;
  const Product = sequelize.define("product", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    item: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Product;
};