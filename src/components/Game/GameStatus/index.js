import { StyleSheet } from 'react-native';
import Typography from '../../Typography';
import View from '../../View';
import { useGame } from '../../../context/GameProvider';

const GameStatus = () => {
  const { turn, isCheckmate, isDraw, isGameOver } = useGame();
  let statusText = `Sıradaki: ${turn === 'w' ? 'Beyaz' : 'Siyah'}`;
  if (isCheckmate) {
    statusText = `ŞAH MAT! Kazanan: ${turn === 'w' ? 'Siyah' : 'Beyaz'}`;
  } else if (isDraw) {
    statusText = 'Oyun Berabere (Pat veya yetersiz materyal)';
  } else if (isGameOver) {
    statusText = 'Oyun Bitti';
  }
  return (
    <View style={styles.statusContainer}>
      <Typography variant="p2" style={styles.statusText}>
        {statusText}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  statusContainer: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GameStatus;
