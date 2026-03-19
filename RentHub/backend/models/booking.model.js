// import { DataTypes } from "sequelize";
// import sequelize from "../utils/db.js";
// import Room from "./room.model.js";
// import User from "./user.model.js";

// const Booking = sequelize.define("booking",{
//   id:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
//   status:{type: DataTypes.ENUM("pending","approved","rejected"), defaultValue:"pending"}
// });

// Booking.belongsTo(Room,{as:"room"});
// Booking.belongsTo(User,{as:"tenant"});
// export default Booking;