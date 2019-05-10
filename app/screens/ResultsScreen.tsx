import React, { Component } from "react";
import { StyleSheet, Text } from "react-native";

class ResultsScreen extends Component {
  points: number = this.props.navigation.getParam("points");

  render() {
    return <Text style={styles.score}>You scored {this.points}/10</Text>;
  }
}

const styles = StyleSheet.create({
  score: {
    marginHorizontal: 30,
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold"
  }
});

export default ResultsScreen;
