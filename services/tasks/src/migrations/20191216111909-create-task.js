
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Task', {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    state: {
      type: Sequelize.ENUM,
      values: ['todo', 'done'],
      allowNull: false,
    },
    userId: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('Task'),
};
