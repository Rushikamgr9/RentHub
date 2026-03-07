// src/App.js
import React from "react";
import RatingReview from "./components/RatingReview";

function App() {
  return (
    <div className="App">
      <h1>Room Reviews Demo</h1>
      <RatingReview roomId={1} />  {/* Replace 1 with your room ID */}
    </div>
  );
}

export default App;