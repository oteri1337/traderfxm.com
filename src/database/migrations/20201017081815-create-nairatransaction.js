"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("nairatransactions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      amount: {
        defaultValue: 0,
        type: Sequelize.FLOAT(11, 2),
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
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
      cyptoId: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.INTEGER,
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
      amount_in_crypto: {
        defaultValue: 0,
        allowNull: true,
        type: Sequelize.FLOAT(11, 8),
      },
      reference: {
        type: Sequelize.STRING,
        unique: true,
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("nairatransactions");
  },
};
