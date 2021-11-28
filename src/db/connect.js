import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const connect = async () => {
  try {
    sequelize.sync()
    await sequelize.authenticate();
    console.log("Connected to database");
  } catch (err) {
    console.log("DB CONNECTION ERR => ", err);
    process.exit(1);
  }
};

export { connect, sequelize };