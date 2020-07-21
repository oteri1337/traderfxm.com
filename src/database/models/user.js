"use strict";
module.exports = (sequelize, DataTypes) => {
  const get = () => {
    return "";
  };

  const user = sequelize.define(
    "user",
    {
      user_id: DataTypes.INTEGER,
      verified: DataTypes.INTEGER,
      photo_profile: DataTypes.STRING,
      account_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: DataTypes.STRING,
      pin: {
        type: DataTypes.STRING,
        get,
      },
      phrase: {
        type: DataTypes.STRING,
        get,
      },
      usdt_phrase: {
        type: DataTypes.STRING,
        get,
      },
      password: {
        type: DataTypes.STRING,
        get,
      },
      phone_number: DataTypes.STRING,
      btc_xpub: DataTypes.STRING,
      eth_xpub: DataTypes.STRING,
      usdt_xpub: DataTypes.STRING,
      account_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bank_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      push_subscription: DataTypes.STRING,
    },
    {}
  );
  user.associate = function (models) {
    user.hasMany(models.order, {
      foreignKey: "user_id",
    });
    user.hasMany(models.referral, {
      foreignKey: "user_id",
    });
    user.hasMany(models.transaction, {
      foreignKey: "user_id",
    });
    user.hasMany(models.wallet, {
      foreignKey: "user_id",
    });
    user.hasMany(models.wallet, {
      foreignKey: "user_id",
      as: "btc_wallets",
      where: {
        type: 1,
      },
      required: false,
    });
    user.hasMany(models.wallet, {
      foreignKey: "user_id",
      as: "eth_wallets",
      where: {
        type: 2,
      },
      required: false,
    });
    user.hasMany(models.wallet, {
      foreignKey: "user_id",
      as: "usdt_wallets",
      where: {
        type: 3,
      },
      required: false,
    });
  };
  return user;
};
