"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.bulkInsert("rates", [
      {
        type: 2,
        cryptoId: 1,
        lower_limit: 1,
        rate: 350,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    return queryInterface.bulkInsert(
      "rates",
      [
        {
          type: 1,
          cryptoId: 1,
          lower_limit: 1,
          upper_limit: 100,
          rate: 342,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 1,
          cryptoId: 1,
          lower_limit: 101,
          upper_limit: 4999,
          rate: 350,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 1,
          cryptoId: 1,
          lower_limit: 5000,
          rate: 352,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("rates", null, {});
  },
};
