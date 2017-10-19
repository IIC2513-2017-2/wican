module.exports = function defineInitiativeSign(sequelize, DataTypes) {
  const InitiativeSign = sequelize.define('initiativeSign', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    initiativeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  InitiativeSign.associate = function associate(models) {
    InitiativeSign.belongsTo(models.initiative);
    InitiativeSign.belongsTo(models.user);
  };

  return InitiativeSign;
};
