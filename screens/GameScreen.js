import React from 'react';
import { StyleSheet, View, Text, Button, Alert } from 'react-native';

import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const GameScreen = (props) => {
  const [currentGuess, setCurrentGuess] = React.useState(
    generateRandomBetween(1, 100, props.userChoice)
  );
  const currentLow = React.useRef(1);
  const currenHigh = React.useRef(100);

  const nextGuessHandler = (direction) => {
    if (
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' }
      ]);
      return;
    }
    if (direction === 'lower') {
      currenHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomBetween(currentLow.current, currenHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
  };

  let confirmedOutput;
  if (props.userChoice === currentGuess) {
    confirmedOutput = (
      <Card style={styles.buttonContainer}>
        <Text>ТА ДАААА!!! Красава</Text>
      </Card>
    );
  }

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="МЕНЬШЕ" onPress={nextGuessHandler.bind(this, 'lower')} />
        <Button title="БОЛЬШЕ" onPress={nextGuessHandler.bind(this, 'greater')} />
      </Card>
      {confirmedOutput}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%'
  }
});

export default GameScreen;
