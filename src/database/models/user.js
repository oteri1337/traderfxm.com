"use strict";
module.exports = (sequelize, DataTypes) => {
  const get = () => {
    return "";
  };

  const user = sequelize.define(
    "user",
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      verified: DataTypes.INTEGER,
      photo_profile: DataTypes.STRING,
      naira_balance: {
        defaultValue: 0,
        type: DataTypes.FLOAT(11, 2),
      },
      account_name: {
        type: DataTypes.STRING,
        allowNull: true,
        get() {
          const an = this.getDataValue("account_name");

          if (!an) {
            const fn = this.getDataValue("first_name");
            const ln = this.getDataValue("last_name");

            return `${fn} ${ln}`;
          }

          return an;
        },
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
      btc_xpub: DataTypes.STRING,
      eth_xpub: DataTypes.STRING,
      usdt_xpub: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      bvn_verified: DataTypes.INTEGER,
      phone_verified: DataTypes.INTEGER,
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
    user.hasMany(models.account, {
      foreignKey: "user_id",
    });
    user.hasMany(models.order, {
      foreignKey: "user_id",
    });
    user.hasMany(models.referral, {
      foreignKey: "user_id",
    });
    user.hasMany(models.transaction, {
      foreignKey: "user_id",
    });
    user.hasMany(models.nairatransaction, {
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
