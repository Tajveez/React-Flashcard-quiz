import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";

import FlashcardList from "./components/FlashcardList";

function App() {
  //States
  const [flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState([]);

  //Refs
  const categoryEl = useRef();
  const amountEl = useRef();

  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php").then((res) => {
      setCategories(res.data.trivia_categories);
    });
    getQuestions();
  }, []);

  function getQuestions(params = { amount: 10 }) {
    let url = "https://opentdb.com/api.php";
    axios
      .get(url, {
        params,
      })
      .then((res) => {
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
  }
  function decodeString(str) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }

  function handleSubmit(e) {
    e.preventDefault();
    getQuestions({
      category: categoryEl.current.value,
      amount: amountEl.current.value,
    });
  }

  return (
    <>
      <form className="header" onClick={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryEl}>
            {categories.map((category) => {
              return (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">No of questions</label>
          <input
            type="number"
            id="amount"
            min="1"
            step="1"
            defaultValue={10}
            ref={amountEl}
          />
        </div>
        <div className="form-group">
          <button className="btn">Generate</button>
        </div>
      </form>
      <div className="container">
        <FlashcardList flashcards={flashcards} />
      </div>
    </>
  );
}

// const SAMPLE_FLASHCARDS = [
//   {
//     id: 1,
//     question: "Question 1?",
//     answer: "1",
//     options: ["answer 1", "answer 2", "answer 3", "answer 4"],
//   },
//   {
//     id: 2,
//     question: "Question 2?",
//     answer: "2",
//     options: ["answer 1", "answer 2", "answer 3", "answer 4"],
//   },
// ];
export default App;
