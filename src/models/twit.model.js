import { sequelize } from "../db/connect.js";
import Sequelize from "sequelize";
const { DataTypes } = Sequelize;

const Twit = sequelize.define("Twit", {
  twit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
});
export default Twit;
