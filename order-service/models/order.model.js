module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;
  const Order = sequelize.define("order", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    item: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.STRING
    },
  });

  return Order;
};