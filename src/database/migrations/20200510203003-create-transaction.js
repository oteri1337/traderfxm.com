"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("transactions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      reference: {
        type: Sequelize.STRING,
        unique: true,
      },
      cryptoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      path: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      amount_in_crypto: {
        defaultValue: 0,
        type: Sequelize.FLOAT(11, 8),
      },
      amount_in_ngn: {
        defaultValue: 0,
        type: Sequelize.FLOAT(11, 2),
      },

      bank_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      account_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      account_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      type: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      rate: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      crypto_price: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      amount_in_usd: {
        defaultValue: 0,
        type: Sequelize.FLOAT(11, 2),
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      month: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      day: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("transactions");
  },
};
