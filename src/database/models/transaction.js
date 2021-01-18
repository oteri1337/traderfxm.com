const moment = require("moment");

("use strict");
module.exports = (sequelize, DataTypes) => {
  const transaction = sequelize.define(
    "transaction",
    {
      cryptoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      path: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      reference: {
        type: DataTypes.STRING,
        unique: true,
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      amount_in_crypto: {
        type: DataTypes.FLOAT(11, 8),
        defaultValue: 0,
      },
      amount_in_ngn: {
        type: DataTypes.FLOAT(11, 2),
        defaultValue: 0,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bank_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      account_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      account_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      type: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
  transaction.associate = function (models) {
    // associations can be defined here
  };
  return transaction;
};
