'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, { DataTypes }) => {
    await queryInterface.createTable('refreshtokens', {
      refreshToken: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique : true,
        allowNull : false
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull : false,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id'
        }
      },
    });
  },

  down: async (queryInterface, _) => {
    await queryInterface.dropTable('refreshtokens');
  }
};
