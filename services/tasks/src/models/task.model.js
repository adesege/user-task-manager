module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: 'Description is required',
      },
    },
    state: {
      type: DataTypes.ENUM('todo', 'done'),
      allowNull: false,
      defaultValue: 'todo',
      validate: {
        notNull: 'State must be one of "todo" or "done"',
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: 'Pass a valid user ID',
      },
    },
  }, {
    freezeTableName: true,
  });

  return Task;
};
