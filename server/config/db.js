const Sequelize = require("sequelize");

//pt local
const sequelize = new Sequelize({
  dialect: "sqlite",
  host: "./sqlite/examen_cioban_adrian.db",
  define: {
    timestamps: false,
  },
});

//pt Heroku
// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//     dialect: "postgres",
//     protocol: "postgres",
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,
//       },
//     },
//   });

module.exports = sequelize;
