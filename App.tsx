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
    Home: HomeScreen,
    Quiz: QuizScreen
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppNavigator);
