// import { DataTypes } from "sequelize";
// import sequelize from "../utils/db.js";
// import User from "./user.model.js";

// const Room = sequelize.define("room", {
//   id:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
//   title:{type: DataTypes.STRING, allowNull:false},
//   description:{type: DataTypes.TEXT},
//   location:{type: DataTypes.STRING},
//   price:{type: DataTypes.FLOAT},
//   status:{type: DataTypes.ENUM("available","booked"), defaultValue:"available"}
// });

// Room.belongsTo(User,{as:"landlord"});
// export default Room;