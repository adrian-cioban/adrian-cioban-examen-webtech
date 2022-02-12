module.exports = (sequelize, DataTypes) => {
  return sequelize.define("jobPosting", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descriere: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 255],
      },
    },
    deadline: DataTypes.DATE,
  });
};
