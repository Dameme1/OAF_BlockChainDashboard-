import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "user",
  password: "password",
  database: "postgres",
  synchronize: false,
  logging: false,
  entities: ["src/data/*.ts"],
  subscribers: [],
  migrations: ["src/migrations/*.ts"],
});
