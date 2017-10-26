module.exports = function defineinitiative(sequelize, DataTypes) {
  const initiative = sequelize.define('initiative', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    image: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    hashtag: DataTypes.STRING,
  });

  initiative.associate = function associate(models) {
    initiative.belongsTo(models.ong);
    initiative.hasMany(models.initiativeSign, { as: 'signs' });
  };

  initiative.prototype.sign = function sign(userOrData) {
    const { initiativeSign, user } = sequelize.models;
    const newInitiativeSign = initiativeSign.build();
    newInitiativeSign.setInitiative(this, { save: false });
    if (userOrData instanceof user) {
      newInitiativeSign.setUser(userOrData, { save: false });
    } else {
      newInitiativeSign.name = userOrData.name;
      newInitiativeSign.email = userOrData.email;
    }
    return newInitiativeSign.save();
  };

  return initiative;
};
