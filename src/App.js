import "./App.css";
import { AirtableConnect } from "@theo-dev/airtable-connect";
import { useEffect, useState } from "react";
import Questions from "./Pages/Questions";
import FormulairePage from "./Pages/FormulairePage";
import Echouey from "./Pages/Echouey";

function App() {
  const { AirtableData } = AirtableConnect;
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userRéponses, setUserRéponses] = useState([]);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [quizPassed, setQuizPassed] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
  });

  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const { nom, prenom, email } = formData;

    airtableInstance.create(
      {
        nom,
        prenom,
        email,
      },
      (record) => {
        console.log("Record created:", record);
        setQuizPassed(true);
      }
    );
  };

  const airtableInstance = new AirtableData("QUESTIONS");

  const readAirtable = () => {
    airtableInstance.read((dataset) => {
      setQuestions(dataset);
    });
  };

  useEffect(() => {
    readAirtable();
  }, []);

  useEffect(() => {
    if (questions.length) {
      console.log(questions);
    }
  }, [questions]);

  const handleRéponseClick = (event) => {
    const currentQuestionData = questions[currentQuestion]?.fields;
    const isRéponseCorrect =
      currentQuestionData.good_response == event.nativeEvent.target.id;

    if (isRéponseCorrect) {
      event.target.classList.add("correct");
    } else {
      event.target.classList.add("incorrect");
    }

    setAnswerStatus(isRéponseCorrect ? "Correct" : "Incorrect");

    setUserRéponses([
      ...userRéponses,
      {
        [`Réponse_${currentQuestionData.id}`]: event.nativeEvent.target.id,
      },
    ]);

    const delay = 800;
    setTimeout(() => {
      setAnswerStatus(null);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        const score = userRéponses.filter((Réponse, index) => {
          const currentQuestionData = questions[index]?.fields;
          const good_response = currentQuestionData?.good_response;
          return Réponse[`Réponse_${currentQuestionData.id}`] === good_response;
        }).length;

        if (score >= 2) {
          setQuizPassed(true);
        }

        alert(`Votre score est ${score} sur ${questions.length}`);
        setCurrentQuestion(0);
        setUserRéponses([]);
      }
    }, delay);
  };

  return (
    <div>
      {quizPassed ? (
        <FormulairePage
          handleFormChange={handleFormChange}
          handleFormSubmit={handleFormSubmit}
          formData={formData}
        />
      ) : userRéponses.length === questions.length ? (
        <Echouey />
      ) : (
        <Questions
          questions={questions}
          currentQuestion={currentQuestion}
          handleRéponseClick={handleRéponseClick}
          answerStatus={answerStatus}
        />
      )}
    </div>
  );
}

export default App;
