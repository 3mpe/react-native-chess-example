import React from 'react';
import { ChessBoard, GameStatus, SafeAreaView } from '../../components';

const Home = () => {
  return (
    <SafeAreaView>
      <ChessBoard />
      <GameStatus />
    </SafeAreaView>
  );
};

export default Home;
