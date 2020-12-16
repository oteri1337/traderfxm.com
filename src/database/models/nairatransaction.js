const moment = require("moment");

("use strict");
module.exports = (sequelize, DataTypes) => {
  const nairatransaction = sequelize.define(
    "nairatransaction",
    {
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      amount: {
        type: DataTypes.FLOAT(11, 2),
        defaultValue: 0,
      },
      address: {
        type: DataTypes.STRING,
      },
      bank_name: {
        type: DataTypes.STRING,
      },
      account_name: {
        type: DataTypes.STRING,
      },
      account_number: {
        type: DataTypes.STRING,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      cyptoId: {
        type: DataTypes.INTEGER,
      },
      type: {
        type: DataTypes.INTEGER,
      },
      reference: {
        type: DataTypes.STRING,
        unique: true,
      },
      rate: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      crypto_price: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      amount_in_usd: {
        type: DataTypes.FLOAT(11, 2),
        defaultValue: 0,
      },
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
  nairatransaction.associate = function (models) {
    // associations can be defined here
  };
  return nairatransaction;
};
