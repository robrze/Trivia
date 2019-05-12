/**
@format
**/

import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationActions } from "react-navigation";
import { AndroidBackHandler } from "react-navigation-backhandler";
import { Button } from "../components";

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

  onBackButtonPressAndroid = () => {
    // Dzięki temu hardware'owy back button będzie zablokowany
    return true;
  };

  renderQuestionsScores = () => {
    return this.questions.map((question, i) => {
      return (
        <View key={question} style={styles.questions}>
          <Text style={{ fontWeight: "bold" }}>{this.questionScores[i]}</Text>
          <Text style={{ marginLeft: 5 }}>{question}</Text>
        </View>
      );
    });
  };

  render() {
    return (
      <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
        <View style={styles.container}>
          <Text style={styles.points}>You scored {this.points}/10</Text>
          {this.renderQuestionsScores()}
          <Button
            style={{ alignSelf: "center" }}
            text="PLAY AGAIN?"
            onPress={() =>
              this.props.navigation.reset([
                NavigationActions.navigate({ routeName: "Quiz" })
              ])
            }
          />
        </View>
      </AndroidBackHandler>
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
