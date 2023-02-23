// 'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
     await queryInterface.bulkInsert('users', [
      {
        name: 'Thiago Mamede',
        role: 'admin',
        email: 'contato@thiagomamede.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
        // secretAdmin
      },
      {
        name: 'Fulano Funcionário',
        role: 'editor',
        email: 'edicao@thiagomamede.com',
        password: '633079e0c1759ed44925eaf51cf05fb7',
        //  secretUser
      },
    ], {});
  },

  async down(queryInterface, _Sequelize) {
     await queryInterface.bulkDelete('users', null, {});
  },
};
