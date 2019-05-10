/**
@format
**/

import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { HomeScreen, QuizScreen } from "./app/screens";

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
        headerTitleStyle: {
          flex: 1,
          textAlign: "center",
          fontSize: 30,
          marginRight: "20%",
          color: "gray"
        },
        title: "Quiz"
      }
    }
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppNavigator);
