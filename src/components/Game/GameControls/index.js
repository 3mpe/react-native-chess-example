import React from 'react';
import { useGame } from './../../../context/GameProvider';
import { View, Button, Typography } from '../../';
import { StyleSheet } from 'react-native';

const GameControls = () => {
  // Context'ten resetGame fonksiyonunu çek
  const { resetGame, undoMove } = useGame();

  return (
    <View marginLeft={20} marginRight={20}>
      <Button style={styles.button} onPress={resetGame}>
        <Typography style={styles.buttonText}>Yeni Oyun</Typography>
      </Button>

      <Button style={styles.button} onPress={undoMove}>
        <Typography style={styles.buttonText}>Hamleyi Geri Al</Typography>
      </Button>
      {/* Gelecekte 'Hamleyi Geri Al' gibi butonlar buraya eklenebilir */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Tahtaya veya diğer elementlere yapışmasın
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007AFF', // Güzel bir mavi
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
