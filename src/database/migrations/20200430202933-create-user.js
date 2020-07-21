"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      verified: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      photo_profile: {
        type: Sequelize.STRING,
        defaultValue: "human.png",
      },
      account_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      password: Sequelize.STRING,
      pin: {
        type: Sequelize.INTEGER,
      },
      phrase: {
        type: Sequelize.STRING,
      },
      usdt_phrase: {
        type: Sequelize.STRING,
      },
      btc_xpub: {
        type: Sequelize.STRING,
      },
      eth_xpub: {
        type: Sequelize.STRING,
      },
      usdt_xpub: {
        type: Sequelize.STRING,
      },
      phone_number: Sequelize.STRING,
      account_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bank_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      push_subscription: {
        type: Sequelize.TEXT,
      },
      // btc_address: {
      //   type: Sequelize.STRING,
      // },
      // eth_address: {
      //   type: Sequelize.STRING,
      // },
      // usdt_address: {
      //   type: Sequelize.STRING,
      // },
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
    return queryInterface.dropTable("users");
  },
};
