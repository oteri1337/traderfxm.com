const { getBtcTestAddress } = require("../models/library/Bitcoin");
("use strict");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [];

    for (let i = 0; i < 5; i++) {
      //      const crypto = Math.random();

      data[i] = {
        cryptoId: 1,
        amount: 0.01 + i,
        address: getBtcTestAddress(i + 1),
        exchange_rate_usd: (i + 1) * 5408.64,
        expected_cash_usd: (i + 1) * 5408.64,
        exchange_rate_ngn: 352,
        expected_cash_ngn: (i + 1) * 1901729.28,
        bank_name: "Gurranty Trust Bank",
        account_name: "Oteri Avwunudiogba",
        account_number: "0226380792",
        email: "oteri4u@gmail.com",
        phone_number: "07012413480",
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }

    return queryInterface.bulkInsert("sales", data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("sales", null, {});
  },
};
