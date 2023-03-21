'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spotimages';
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://www.youtube.com/',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://www.reddit.com/r/ProgrammerHumor/',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://jwt.io/',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://www.google.com/',
        preview: true
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spotimages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4]}
    }, {});
  }
};
