import React, { useState, useEffect } from "react";
import axios from "axios";

function RatingReview({ roomId }) {
  const [reviews, setReviews] = useState([]);
  const [average, setAverage] = useState(0);
  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  // Fetch reviews
  const fetchReviews = async () => {
    const res = await axios.get(`http://localhost:5000/reviews/${roomId}`);
    setReviews(res.data);
    const avgRes = await axios.get(`http://localhost:5000/rating/${roomId}`);
    setAverage(avgRes.data.average_rating || 0);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Add review
  const submitReview = async () => {
    if (!userName || !rating) {
      alert("Enter name and rating");
      return;
    }
    await axios.post("http://localhost:5000/addReview", {
      room_id: roomId,
      user_name: userName,
      rating,
      review: reviewText
    });
    setUserName("");
    setRating(5);
    setReviewText("");
    fetchReviews();
  };

  return (
    <div style={{border: "1px solid #ccc", padding: "15px", width: "400px"}}>
      <h3>Average Rating: {average.toFixed(1)} / 5</h3>
      <h4>Add Review</h4>
      <input
        type="text"
        placeholder="Your Name"
        value={userName}
        onChange={e => setUserName(e.target.value)}
      /><br/>
      <select value={rating} onChange={e => setRating(Number(e.target.value))}>
        {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
      </select><br/>
      <textarea
        placeholder="Your Review"
        value={reviewText}
        onChange={e => setReviewText(e.target.value)}
      ></textarea><br/>
      <button onClick={submitReview}>Submit Review</button>

      <h4>All Reviews:</h4>
      {reviews.length === 0 ? <p>No reviews yet</p> : reviews.map(r => (
        <div key={r.id} style={{borderTop:"1px solid #ddd", marginTop:"5px", paddingTop:"5px"}}>
          <b>{r.user_name}</b> rated {r.rating}/5
          <p>{r.review}</p>
        </div>
      ))}
    </div>
  );
}

export default RatingReview;