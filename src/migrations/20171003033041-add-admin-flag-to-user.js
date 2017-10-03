module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'users',
      'isAdmin',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    );
  },

  down(queryInterface) {
    return queryInterface.removeColumn('users', 'isAdmin');
  },
};
