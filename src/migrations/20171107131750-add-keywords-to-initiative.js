module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'initiatives',
      'keywords',
      {
        type: Sequelize.STRING,
        allowNull: true,
      },
    );
  },

  down(queryInterface) {
    return queryInterface.removeColumn('initiatives', 'keywords');
  },
};
