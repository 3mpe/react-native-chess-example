import React from 'react';
import { useGame } from './../../../context/GameProvider';
import { View, Button, Typography } from '../../';
import { StyleSheet } from 'react-native';

const GameControls = () => {
  const { resetGame, undoMove, userColor, isAiThinking } = useGame();

  return (
    <View marginLeft={20} marginRight={20}>
      <Typography variant="h6" bold>
        Seçimin: {userColor === 'w' ? '⚪ Beyaz' : '⚫ Siyah'}
      </Typography>

      {isAiThinking && <Typography>🤖 AI Hamle Yapıyor...</Typography>}

      <Button style={styles.button} onPress={resetGame}>
        <Typography style={styles.buttonText}>Yeni Oyun</Typography>
      </Button>

      <Button style={styles.button} onPress={undoMove}>
        <Typography style={styles.buttonText}>Hamleyi Geri Al</Typography>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GameControls;
