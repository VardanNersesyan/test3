'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        'users',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          email: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          name: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          surname: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          type: {
            allowNull: false,
            type: Sequelize.ENUM('mentor', 'mentee'),
          },
          position: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          short_description: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          education: {
            allowNull: false,
            type: Sequelize.TEXT,
          },
          experience: {
            allowNull: false,
            type: Sequelize.TEXT,
          },
          about: {
            allowNull: false,
            type: Sequelize.TEXT,
          },
          password: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          refresh_token: {
            allowNull: true,
            type: Sequelize.STRING,
          },
          created_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
          },
          updated_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
          },
        },
        { transaction },
      );

      await queryInterface.addIndex('users', ['email'], {
        unique: true,
        transaction,
      });

      await queryInterface.addIndex('users', ['refresh_token'], {
        transaction,
      });

      await transaction.commit();
    } catch (err) {
      console.log(err);
      await transaction.rollback();
      throw err;
    }
  },

  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.dropTable('users', { transaction });

      await transaction.commit();
    } catch (err) {
      console.log(err);
      await transaction.rollback();
      throw err;
    }
  },
};
