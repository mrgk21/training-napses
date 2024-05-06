import "dotenv/config";

interface DbConfig {
    username: string;
    password: string | undefined;
    database: string;
    host: string;
    dialect: Dialect
}

const config: {[k:string]: any} = {
    development: {
        username: process.env.POSTGRES_USER!,
        password: process.env.POSTGRES_PASSWORD!,
        database: process.env.POSTGRES_DB!,
        host: process.env.POSTGRES_HOST!,
        dialect: "postgres",
      },
      test: {
        username: "root",
        password: undefined,
        database: "database_test",
        host: "127.0.0.1",
        dialect: "mysql"
      },
      production: {
        username: "root",
        password: undefined,
        database: "database_production",
        host: "127.0.0.1",
    dialect: "mysql"
      }
}

export default config[process.env.NODE_ENV ?? "development"];


const connection = new Sequelize(config);
export { connection };

