import React, { useState } from "react";

function Questions(props) {
  const question = props.questions[props.currentQuestion].fields;
  const [answerStatus, setAnswerStatus] = useState(null);

  function handleRéponseClick(e) {
    props.handleRéponseClick(e);
  }

  return (
    <div className="question-container" id={`question_${question.id}`}>
      <h2 id="" className="question">
        {question.question}
      </h2>
      <button
        className="Réponse-button"
        data-Réponse-number="1"
        value={question.Réponse_1}
        onClick={handleRéponseClick}
        id="1"
      >
        {question.Réponse_1}
      </button>

      <button
        className="Réponse-button"
        data-Réponse-number="2"
        value={question.Réponse_2}
        onClick={handleRéponseClick}
        id="2"
      >
        {question.Réponse_2}
      </button>
      <button
        className="Réponse-button"
        data-Réponse-number="3"
        value={question.Réponse_3}
        onClick={handleRéponseClick}
        id="3"
      >
        {question.Réponse_3}
      </button>
      {answerStatus && (
        <div className={`answer-status ${answerStatus.toLowerCase()}`}>
          {answerStatus}
        </div>
      )}
    </div>
  );
}

export default Questions;
