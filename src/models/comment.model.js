import { sequelize } from "../db/connect.js";
import Sequelize from "sequelize";
import User from "./user.model.js";
const { DataTypes } = Sequelize;

const Comment = sequelize.define("Comment", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
export default Comment;