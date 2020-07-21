"use strict";
const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define(
    "order",
    {
      user_id: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      total_in_ngn: DataTypes.FLOAT,
      reference: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      full_name: DataTypes.STRING,
      email: DataTypes.STRING,
      delivery_address: DataTypes.STRING,
      month: {
        type: DataTypes.STRING,
        get() {
          return moment(this.getDataValue("createdAt"))
            .format("MMM")
            .toUpperCase();
        },
      },
      day: {
        type: DataTypes.STRING,
        get() {
          return moment(this.getDataValue("createdAt")).format("DD");
        },
      },
    },
    {}
  );
  order.associate = function (models) {
    order.belongsToMany(models.product, {
      through: models.order_product,
    });
  };
  return order;
};
