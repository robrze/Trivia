/**
@format
**/

import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { Button } from "../components";

interface IState {
  questions: Array<Object>;
  questionIndex: number;
  questionScores: Array<string>;
  points: number;
}

class QuizScreen extends Component {
  state: IState = {
    points: 0,
    questions: [],
    questionIndex: 0,
    questionScores: ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"]
  };

  componentDidMount() {
    axios
      .get("https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean")
      .then(res => {
        this.setState({
          questions: this.fixQuestions(res.data.results)
        });
      });
  }

  fixQuestions = (QuestionsObject: object) => {
    // Wczytywane z API pytania mają np. &quot; zamiast cudzysłowów - tutaj to naprawiamy
    for (i = 0; i < QuestionsObject.length; i++) {
      QuestionsObject[i].question = QuestionsObject[i].question
        .replace(/(&quot\;)/g, '"')
        .replace(/(&#039\;)/g, "'");
    }
    return QuestionsObject;
  };

  changeQuestionScore = (index: number) => {
    const newScores = [...this.state.questionScores];
    newScores[index] = "+";
    this.setState({ questionScores: newScores });
  };

  checkIfFinished = () => {
    const { navigate } = this.props.navigation;
    const { points, questionIndex, questionScores, questions } = this.state;

    if (questionIndex == 10)
      navigate("Results", {
        points: points,
        questionScores: questionScores,
        questions: questions
      });
  };

  render() {
    this.checkIfFinished();
    const { buttonsContainer, container, category, question } = styles;
    const { questions, questionIndex } = this.state;

    this.checkIfFinished();

    const currentQuestion = questions[questionIndex];

    if (!currentQuestion) return <View />;
    return (
      <View style={container}>
        <Text style={category}>{currentQuestion.category}</Text>
        <Text style={question}>{currentQuestion.question}</Text>
        <View style={buttonsContainer}>
          <Button
            text="True"
            onPress={() => {
              if (currentQuestion.correct_answer === "True") {
                // console.log("zgadłeś!");
                this.setState(state => ({
                  points: state.points + 1
                }));
                this.changeQuestionScore(questionIndex);
              }
              this.setState(state => ({
                questionIndex: state.questionIndex + 1
              }));
            }}
          />
          <Button
            text="False"
            onPress={() => {
              if (currentQuestion.correct_answer === "False") {
                console.log("zgadłeś!");
                this.setState(state => ({
                  points: state.points + 1
                }));
                this.changeQuestionScore(questionIndex);
              }
              this.setState(state => ({
                questionIndex: state.questionIndex + 1
              }));
            }}
          />
        </View>
        <Text style={question}>points: {this.state.points}/10</Text>
        <Text style={question}>{this.state.questionIndex + 1} of 10</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 60
  },
  category: {
    marginHorizontal: 30,
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold"
  },
  question: {
    fontSize: 25,
    textAlign: "center"
  }
});

export default QuizScreen;
