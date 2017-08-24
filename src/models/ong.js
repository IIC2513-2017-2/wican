module.exports = function defineOng(sequelize, DataTypes) {
  const Ong = sequelize.define('ong', {
    name: DataTypes.STRING,
    logo: DataTypes.STRING,
    email: DataTypes.STRING,
    description: DataTypes.TEXT,
    webpage: DataTypes.STRING,
  });
  Ong.associate = function associate(models) {
    // associations can be defined here
  };
  return Ong;
};
