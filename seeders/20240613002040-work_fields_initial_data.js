'use strict';

module.exports = {
  async up(queryInterface) {
    const workFields = [
      { title: 'IT' },
      { title: 'Consulting' },
      { title: 'Finance' },
      { title: 'Healthcare' },
      { title: 'Education' },
      { title: 'Marketing' },
      { title: 'Engineering' },
      { title: 'Retail' },
      { title: 'Hospitality' },
      { title: 'Automotive' },
      { title: 'Media' },
      { title: 'Real Estate' },
      { title: 'Legal' },
      { title: 'Fashion' },
      { title: 'Telecommunications' },
      { title: 'Government' },
      { title: 'Non-Profit' },
      { title: 'Agriculture' },
      { title: 'Sports' },
      { title: 'Entertainment' },
    ];

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkInsert(
        'work_fields',
        workFields.map((field) => ({
          title: field.title,
          created_at: new Date(),
          updated_at: new Date(),
        })),
        { transaction },
      );

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
      await queryInterface.bulkDelete('work_fields', null, { transaction });

      await transaction.commit();
    } catch (err) {
      console.log(err);
      await transaction.rollback();
      throw err;
    }
  },
};
