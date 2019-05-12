/**
@format
**/

import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { HomeScreen, QuizScreen, ResultsScreen } from "./app/screens";

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen, navigationOptions: { header: null } },
    Quiz: {
      screen: QuizScreen,
      navigationOptions: {
        title: "Quiz",
        headerTitleStyle: {
          flex: 1,
          textAlign: "center",
          fontSize: 30,
          color: "gray"
        },
        headerLeft: null
      }
    },
    Results: {
      screen: ResultsScreen,
      navigationOptions: {
        title: "Score",
        headerTitleStyle: {
          flex: 1,
          textAlign: "center",
          fontSize: 30,
          color: "gray"
        },
        headerLeft: null
      }
    }
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppNavigator);
