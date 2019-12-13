
module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.changeColumn('Task', 'userId', {
      type: Sequelize.UUID,
      references: {
        model: 'User',
        key: 'id',
      },
      onDelete: 'CASCADE',
    })
  ),
  down: (queryInterface) => (
    queryInterface.removeConstraint('Task', 'references')
  ),
};
