// backend/src/drizzle.config.js
import { ENV } from "./src/config/env.js";
export default {
    schema: "./src/db/schema.js",//specifies the schema file
    out: "./src/db/migrations", //specifies the output directory
    dialect: "postgresql",
    dbCredentials: { url: ENV.DATABASE_URL },//specifies the database credentials
};