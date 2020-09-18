import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import FlashcardList from "./components/FlashcardList";

function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS);

  useEffect(() => {
    axios.get("https://opentdb.com/api.php?amount=10").then((res) => {
      setFlashcards(
        res.data.results.map((questionItem, index) => {
          const answer = decodeString(questionItem.correct_answer);
          const options = [
            ...questionItem.incorrect_answers.map((a) => decodeString(a)),
            answer,
          ];
          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(questionItem.question),
            answer: answer,
            options: options.sort(() => Math.random - 0.5),
          };
        })
      );
    });
  }, []);

  function decodeString(str) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }

  return (
    <div className="container">
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
