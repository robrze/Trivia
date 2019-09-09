import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import { Button } from "../components";

interface Props {
  questions: Array<Object>;
  questionIndex: number;
  questionScores: Array<string>;
  points: number;
}

interface Question {
  correct_answer: string;
  category: string;
  question: string;
}

const [questionIndex, setQuestionIndex] = useState(0);
const [points, setPoints] = useState(0);
const [questions, setQuestions] = useState([]);
const [questionScores, setQuestionScores] = useState([
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-"
]);

const fixQuestions = (QuestionsObject: object) => {
  // Wczytywane z API pytania mają np. &quot; zamiast cudzysłowów - tutaj to naprawiamy
  for (i = 0; i < QuestionsObject.length; i++) {
    QuestionsObject[i].question = QuestionsObject[i].question
      .replace(/(&quot\;)/g, '"')
      .replace(/(&#039\;)/g, "'");
  }
  return QuestionsObject;

  // QuestionsObject.forEach((questionObject, index) => {
  //   QuestionsObject[index]
  // })
};

const changeQuestionScore = (index: number) => {
  const newScores = [...questionScores];
  newScores[index] = "+";
  setQuestionScores(newScores);
};

const RenderButtons = () => {
  const currentQuestion: Question = questions[questionIndex];

  return (
    <View style={{ flexDirection: "row" }}>
      <Button
        style={{ width: 120 }}
        text="True"
        onPress={() => {
          currentQuestion.correct_answer === "True"
            ? (setPoints(points + 1), changeQuestionScore(questionIndex))
            : setQuestionIndex(questionIndex + 1);
        }}
      />
      <Button
        style={{ width: 120 }}
        text="False"
        onPress={() => {
          currentQuestion.correct_answer === "False"
            ? (setPoints(points + 1), changeQuestionScore(questionIndex))
            : setQuestionIndex(questionIndex + 1);
        }}
      />
    </View>
  );
};

const RenderCard = () => {
  const { card } = styles;
  const currentQuestion: Question = questions[questionIndex];
  return (
    <Card style={card}>
      <Card.Content>
        <Title style={{ textAlign: "center", color: "gray" }}>
          {currentQuestion.category}
        </Title>
        <Paragraph style={{ textAlign: "center", color: "gray" }}>
          {currentQuestion.question}
        </Paragraph>
      </Card.Content>
      <Card.Actions
        style={{
          flex: 1,
          alignItems: "flex-end",
          justifyContent: "center"
        }}
      >
        <RenderButtons />
      </Card.Actions>
    </Card>
  );
};

export const FuncQuizScreen = () => {
  const { container, stats } = styles;
  return (
    <View style={container}>
      <RenderCard />
      <Text style={stats}>{questionIndex + 1} of 10</Text>
      <Text style={stats}>points: {points}/10</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  category: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold"
  },
  card: {
    height: 250,
    width: 300,
    borderWidth: 1,
    borderColor: "gray"
  },
  stats: {
    marginTop: 50,
    fontSize: 25,
    textAlign: "center"
  }
});

export default FuncQuizScreen;
