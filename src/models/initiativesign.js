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
  }, {
    validate: {
      userOrUserData() {
        if (!this.userId && (!this.name || !this.email)) {
          throw new Error('You need to specify a user or name/email for the signee');
        }
      },
    },
  });

  InitiativeSign.associate = function associate(models) {
    InitiativeSign.belongsTo(models.initiative);
    InitiativeSign.belongsTo(models.user);
  };

  return InitiativeSign;
};
