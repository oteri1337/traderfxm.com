"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "paths",
      [
        {
          last_path: 1,
          cryptoId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          last_path: 1,
          cryptoId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          last_path: 1,
          cryptoId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("paths", null, {});
  },
};
