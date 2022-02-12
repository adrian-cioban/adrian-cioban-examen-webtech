module.exports = (sequelize, DataTypes) => {
  return sequelize.define("candidate", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nume: {
      type: DataTypes.STRING,
      validate: {
        len: [5, 255],
      },
    },
    cv: {
      type: DataTypes.STRING,
      validate: {
        len: [100, 255],
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
  });
};
