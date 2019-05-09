/**
@format
**/

import React, { Component } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import { createStackNavigator, createAppContainer } from "react-navigation";

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}

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
          title="BEGIN"
          onPress={() => this.props.navigation.navigate("Quiz")}
        />
      </View>
    );
  }
}

class QuizScreen extends Component {
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

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Quiz: QuizScreen
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppNavigator);

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
