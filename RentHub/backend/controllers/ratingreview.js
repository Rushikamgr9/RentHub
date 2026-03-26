const db = require("../config/db");

// Add Review
exports.addReview = (req,res)=>{

const {user_id,room_id,rating,review} = req.body;

const sql = "INSERT INTO reviews(user_id,room_id,rating,review) VALUES (?,?,?,?)";

db.query(sql,[user_id,room_id,rating,review],(err,result)=>{

if(err){
return res.status(500).json(err);
}

res.json("Review added successfully");

});

};


// Get Reviews by Room
exports.getReviews = (req,res)=>{

const room_id = req.params.room_id;

const sql = "SELECT * FROM reviews WHERE room_id=?";

db.query(sql,[room_id],(err,result)=>{

if(err){
return res.status(500).json(err);
}

res.json(result);

});

};