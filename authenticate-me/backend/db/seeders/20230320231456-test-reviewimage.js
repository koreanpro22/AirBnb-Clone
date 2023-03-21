'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviewimgaes';
    await queryInterface.bulkInsert(options, [
      {
        reviewId: 3,
        url: 'https://www.reddit.com/r/ProgrammerHumor/',
      },
      {
        reviewId: 1,
        url: 'https://www.youtube.com/'
      },
      {
        reviewId: 4,
        url: 'https://www.google.com/'
      },
      {
        reviewId: 2,
        url: 'https://jwt.io/'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviewimages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2, 3, 4]}
    }, {});
  }
};
