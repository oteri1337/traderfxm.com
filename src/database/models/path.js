"use strict";
module.exports = (sequelize, DataTypes) => {
  const path = sequelize.define(
    "path",
    {
      cryptoId: DataTypes.INTEGER,
      last_path: DataTypes.INTEGER,
    },
    {}
  );
  path.associate = function (models) {
    // associations can be defined here
  };
  return path;
};
