'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'users',
        'work_field_id',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        { transaction },
      );

      await queryInterface.addConstraint('users', {
        fields: ['work_field_id'],
        type: 'foreign key',
        references: {
          table: 'work_fields',
          field: 'id',
        },
        name: 'users_work_field_id_work_fields_fk',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        transaction,
      });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeConstraint(
        'users',
        'users_work_field_id_work_fields_fk',
        {
          transaction,
        },
      );

      await queryInterface.removeColumn('users', 'work_field_id', {
        transaction,
      });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
