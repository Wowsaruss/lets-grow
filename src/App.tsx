import React, { useEffect, useState } from 'react';
import axios from 'axios'

import './App.css';

interface Category {
  id: number;
  title: string;
}
interface Trivia {
  id: number;
  question: string;
  category: Category;
  answer: string;
  showAnswer?: boolean;
}

function App() {
  const [triviaQs, setTrivia] = useState<Trivia[]>([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_TEST_API}/trivia`).then(res => {
      setTrivia(res.data)
 })
}, [setTrivia])

const questions = triviaQs?.map((t, i) => {
    return (
      <div key={i}>
        <h3>{t?.question}</h3>
        <h5>{t.answer}</h5>
        {/* {t.showAnswer ? <h3>{t.answer}</h3> : null} */}
        <button onClick={() => {
          t.showAnswer = true
          triviaQs.splice(i, 1, t)
          setTrivia(triviaQs)
        }}>See Answer</button>
      </div>
      )
})

  return (
    <div className="App" style={{display: "flex", flexDirection: "column"}}>
      {questions}
    </div>
  );
}

export default App;
