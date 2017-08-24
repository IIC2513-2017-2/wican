module.exports = function defineinitiative(sequelize, DataTypes) {
  const initiative = sequelize.define('initiative', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    hashtag: DataTypes.STRING,
  });
  initiative.associate = function associate(models) {
    initiative.belongsTo(models.ong);
  };
  return initiative;
};
