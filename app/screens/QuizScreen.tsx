/**
@format
**/

import React, { Component } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { Card, Title, Paragraph } from "react-native-paper";
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

  renderButtons() {
    const { questions, questionIndex } = this.state;
    const currentQuestion = questions[questionIndex];

    return (
      <View style={{ flexDirection: "row" }}>
        <Button
          style={{ width: 120 }}
          text="True"
          onPress={() => {
            if (currentQuestion.correct_answer === "True") {
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
    );
  }

  renderCard() {
    const { questions, questionIndex } = this.state;
    const currentQuestion = questions[questionIndex];
    return (
      <Card
        style={{
          height: 250,
          width: 300,
          borderWidth: 1,
          borderColor: "gray"
        }}
      >
        <Card.Content style={{ top: 0 }}>
          <Title style={{ textAlign: "center", color: "gray" }}>
            {currentQuestion.category}
          </Title>
          <Paragraph style={{ textAlign: "center", color: "gray" }}>
            {currentQuestion.question}
          </Paragraph>
        </Card.Content>
        <Card.Actions
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-end"
          }}
        >
          {this.renderButtons()}
        </Card.Actions>
      </Card>
    );
  }

  render() {
    const { container, stats } = styles;
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
        <Text style={stats}>{this.state.questionIndex + 1} of 10</Text>
        <Text style={stats}>points: {this.state.points}/10</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  category: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold"
  },
  stats: {
    marginTop: 50,
    fontSize: 25,
    textAlign: "center"
  }
});

export default QuizScreen;
