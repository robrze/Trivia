/**
@format
**/

import { StyleSheet, Text, View } from "react-native";
import { Button } from "../components";
import React from "react";

interface Props {
  navigation: any;
}

export const HomeScreen = ({ navigation }: Props) => {
  const { container, welcome, description } = styles;

  return (
    <View style={container}>
      <Text style={welcome}>Welcome to the Trivia Challenge!</Text>
      <Text style={description}>
        You will be presented with 10 True or False questions.
      </Text>
      <Text style={description}>Can you score 100%?</Text>
      <Button text="BEGIN" onPress={() => navigation.navigate("Quiz")} />
    </View>
  );
};

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
