import React, { Component } from "react";
import { QuizData } from "./QuizData";
import "../styles.css";

export class Quiz extends Component {
  state = {
    userAnswer: null, //current users answer
    currentIndex: 0, //current questions index
    options: [], //the four options
    quizEnd: false, //determines if it's the last question
    score: 0, //holds the score
    disabled: true, // determines the status of the buttons
  };
  loadQuiz = () => {
    const { currentIndex } = this.state;
    this.setState(() => {
      return {
        question: QuizData[currentIndex].question,
        options: QuizData[currentIndex].options,
        answer: QuizData[currentIndex].answer,
      };
    });
  };
  nextQuestionHandler = () => {
    const { userAnswer, answer, score } = this.state;

    if (userAnswer === answer) {
      this.setState({
        score: score + 1,
      });
    }
    this.setState({
      currentIndex: this.state.currentIndex + 1,
      userAnswer: null,
    });
  };
  componentDidMount() {
    this.loadQuiz();
  }
  checkAnswer = (answer) => {
    this.setState({
      userAnswer: answer,
      disabled: false,
    });
  };
  componentDidUpdate(prevProps, prevState) {
    const { currentIndex } = this.state;
    if (this.state.currentIndex !== prevState.currentIndex) {
      this.setState(() => {
        return {
          question: QuizData[currentIndex].question,
          options: QuizData[currentIndex].options,
          answer: QuizData[currentIndex].answer,
        };
      });
    }
  }

  finishHandler = () => {
    const { userAnswer, answer, score } = this.state;
    if (userAnswer === answer) {
      this.setState({
        score: score + 1,
      });
    }
    if (this.state.currentIndex === QuizData.length - 1) {
      this.setState({
        quizEnd: true,
      });
    }
  };

  render() {
    const { question, options, currentIndex, userAnswer, quizEnd } = this.state; //get the current state

    if (quizEnd) {
      return (
        <div>
          <h1>Game Over. Final score is {this.state.score} points</h1>
          <p>The correct Answers for the quiz are</p>
          <ul>
            {QuizData.map((item, index) => (
              <li className="ui floating message options" key={index}>
                {item.answer}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return (
      <div>
        <h2>{question}</h2>
        <span>{`Question ${currentIndex + 1} of ${QuizData.length}`}</span>
        {options.map(
          (
            option //for each option, new paragraph
          ) => (
            <p
              key={option.id}
              className={` options
                ${userAnswer === option ? "selected" : null}
                `}
              onClick={() => this.checkAnswer(option)}
            >
              {option}
            </p>
          )
        )}
        {currentIndex < QuizData.length - 1 && (
          <button
            disabled={this.state.disabled}
            onClick={this.nextQuestionHandler}
          >
            Next Question
          </button>
        )}
        {currentIndex === QuizData.length - 1 && (
          <button disabled={this.state.disabled} onClick={this.finishHandler}>
            Finish
          </button>
        )}
      </div>
    );
  }
}

export default Quiz;
