import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code

  console.log(`question ${question.id} answered!`)


  useEffect(() => {
    // reset timeRemaining state to 10 for the next question
    if (timeRemaining === 0) {
      setTimeRemaining(10)
      onAnswered(false)
      return
    }
    // setup a countdown / timeout useEffect 1 second
    const timer = setTimeout(() => {
      setTimeRemaining((timeRemaining) => timeRemaining - 1)
    }, 1000)
    // cleanup function to end side effect useEffect
    return function cleanup(){
      clearTimeout(timer)
    }
  }, [onAnswered, timeRemaining])

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
