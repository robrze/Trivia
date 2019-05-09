/**
@format
**/

import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";

interface IState {
  questions: Array;
}

class QuizScreen extends Component {
  state = {
    questions: []
  };

  componentDidMount() {
    axios
      .get("https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean")
      .then(res => {
        console.log(res);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Entertainment: Video Games</Text>
        <Text style={styles.description}>
          Unturned originally started as a Roblox game.
        </Text>
        <Text style={styles.description}>1 of 10</Text>
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
