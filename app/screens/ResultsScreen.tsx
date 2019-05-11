import React, { Component, Fragment } from "react";
import { StyleSheet, Text, View } from "react-native";

class ResultsScreen extends Component {
  points: number;
  questionScores: Array<string>;
  questions: Array<string>;

  constructor(props) {
    super(props);
    const { getParam } = this.props.navigation;

    this.points = getParam("points");
    this.questionScores = getParam("questionScores");
    this.questions = getParam("questions");
  }

  printQuestionsScores = () => {
    return this.questions.map((question, i) => {
      return (
        <View style={styles.questions}>
          <Text style={{ fontWeight: "bold" }}>{this.questionScores[i]}</Text>
          <Text style={{ marginLeft: 5 }}>{question}</Text>
        </View>
      );
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.points}>You scored {this.points}/10</Text>
        {this.printQuestionsScores()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: 15
  },
  points: {
    marginHorizontal: 30,
    marginBottom: 15,
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold"
  },
  questions: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 10
  }
});

export default ResultsScreen;
