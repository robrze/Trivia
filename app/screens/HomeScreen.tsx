/**
@format
**/

import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "../components";

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to the Trivia Challenge!</Text>
        <Text style={styles.description}>
          You will be presented with 10 True or False questions.
        </Text>
        <Text style={styles.description}>Can you score 100%?</Text>
        <Button
          text="BEGIN"
          onPress={() => this.props.navigation.navigate("Quiz")}
        />
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

export default HomeScreen;
