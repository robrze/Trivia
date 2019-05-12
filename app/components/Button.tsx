import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface IProps {
  bgColor?: string;
  style?: object;
  onPress?: () => void;
  text?: string;
}

const Button = (props: IProps) => (
  <TouchableOpacity
    style={[styles.button, props.style, { backgroundColor: props.bgColor }]}
    onPress={props.onPress}
  >
    <Text style={styles.text}>{props.text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    justifyContent: "center",
    height: 45,
    margin: 3,
    paddingHorizontal: 25
  },
  text: {
    textAlign: "center",
    fontSize: 16
  }
});

export default Button;
