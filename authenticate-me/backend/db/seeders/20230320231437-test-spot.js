'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkInsert(options, [
      {
        ownerId: 3,
        address: '123a',
        city: 'A',
        state: 'abc',
        country: 'xyz',
        lat: 1.2,
        lng: 1.3,
        name: 'house1',
        description: 'Amzazing apartment',
        price: 200.20
      },
      {
        ownerId: 1,
        address: '456b',
        city: 'B',
        state: 'abc',
        country: 'xyc',
        lat: 2.1,
        lng: 2.3,
        name: 'house2',
        description: 'Beautiful bouncy house',
        price: 100.10
      },
      {
        ownerId: 2,
        address: '789c',
        city: 'C',
        state: 'abc',
        country: 'xyc',
        lat: 3.1,
        lng: 3.2,
        name: 'house3',
        description: 'Cozy Cott',
        price: 300.30
      },
      {
        ownerId: 3,
        address: '910d',
        city: 'D',
        state: 'abc',
        country: 'xyc',
        lat: 4.1,
        lng: 4.2,
        name: 'house4',
        description: 'Damp Dump',
        price: 10
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};
