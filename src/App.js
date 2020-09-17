import React, { useState } from "react";

import FlashcardList from "./components/FlashcardList";

function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS);
  return (
    <div className="App">
      <FlashcardList flashcards={flashcards} />
    </div>
  );
}

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: "Question 1?",
    answer: "1",
    options: ["answer 1", "answer 2", "answer 3", "answer 4"],
  },
  {
    id: 2,
    question: "Question 2?",
    answer: "2",
    options: ["answer 1", "answer 2", "answer 3", "answer 4"],
  },
];
export default App;
