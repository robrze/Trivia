/**
@format
**/

import React, { Component } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { Avatar, Card, Title, Paragraph } from "react-native-paper";
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
        console.log(res.data.results.map(a => a.question));

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
        questions: questions.map(a => a.question)
      });
  };

  renderCard = () => {
    const { questions, questionIndex } = this.state;

    const currentQuestion = questions[questionIndex];

    return (
      <Card style={{ height: 250, width: 300 }}>
        <Card.Content>
          <Title style={{ textAlign: "center", color: "gray" }}>
            {currentQuestion.category}
          </Title>
          <Paragraph style={{ textAlign: "center", color: "gray" }}>
            {currentQuestion.question}
          </Paragraph>
        </Card.Content>
        <Card.Actions
          style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}
        >
          <Button
            style={{ width: 120 }}
            text="True"
            onPress={() => {
              if (currentQuestion.correct_answer === "True") {
                // console.log("zgadłeś!");
                this.setState(state => ({
                  points: state.points + 1
                }));
                this.changeQuestionScore(questionIndex);
              }
              currentQuestion.category;
              this.setState(state => ({
                questionIndex: state.questionIndex + 1
              }));
            }}
          />
          <Button
            style={{ width: 120 }}
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
        </Card.Actions>
      </Card>
    );
  };

  render() {
    const { container, question } = styles;
    const { questions, questionIndex } = this.state;

    this.checkIfFinished();

    const currentQuestion = questions[questionIndex];

    if (!currentQuestion)
      return (
        <ActivityIndicator
          style={{ marginTop: 20 }}
          size="large"
          color="gray"
        />
      );

    return (
      <View style={container}>
        {this.renderCard()}
        <Text style={question}>{this.state.questionIndex + 1} of 10</Text>
        <Text style={question}>points: {this.state.points}/10</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 60
  },
  category: {
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
