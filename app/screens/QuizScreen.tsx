/**
@format
**/

import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { number } from "prop-types";

interface IState {
  questions: Array<Object>;
  questionIndex: number;
  points: number;
}

class QuizScreen extends Component {
  state: IState = {
    points: 0,
    questions: [],
    questionIndex: 0
  };

  componentDidMount() {
    axios
      .get("https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean")
      .then(res => {
        this.setState({
          questions: res.data.results
        });
        console.log(this.state.questions);
      });
  }

  render() {
    const { container, welcome, description } = styles;
    const { questions, questionIndex } = this.state;
    if (questions.length === 0) return <View />;
    return (
      <View style={container}>
        <Text style={welcome}>{questions[questionIndex].category}</Text>
        <Text style={description}>
          {questions[questionIndex].question.replace(/(&quot\;)/g, '"')}
        </Text>
        <Text style={description}>1 of 10</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 60
  },
  welcome: {
    marginHorizontal: 30,
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold"
  },
  description: {
    fontSize: 25,
    textAlign: "center"
  }
});

export default QuizScreen;
