module.exports = {
    HOST: "postgres",
    USER: "docker",
    PASSWORD: "123456",
    DB: "micorservice_db",
    dialect: "postgres",
    port: 5432,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };

// local db testing
// module.exports = {
//   HOST: "localhost",
//   USER: "postgres",
//   PASSWORD: "sonu",
//   DB: "microServicesDB",
//   dialect: "postgres",
//   port: 5432,
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// };
