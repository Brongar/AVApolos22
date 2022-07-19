require('dotenv').config();

const config = {
  instance: (process.env.INSTANCE) == "IES" ? "IES" : "POLO",
  replication: {
    main: process.env.REPLICATION_MAIN,
    sync: process.env.REPLICATION_SYNC,
  },
  minio: {
    host: process.env.MINIO_HOST,
    key: process.env.MINIO_ACCESS_KEY,
    secret: process.env.MINIO_ACCESS_KEY_SECRET,
    exportsBucket: 'exports',
    importsBucket: 'imports',
  },
  db: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
  },
  port: 3000
}

module.exports = config;
