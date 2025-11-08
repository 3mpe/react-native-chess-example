import React from 'react';
import {
  ChessBoard,
  GameStatus,
  SafeAreaView,
  GameControls,
} from '../../components';

const Home = () => {
  return (
    <SafeAreaView>
      <ChessBoard />
      <GameStatus />
      <GameControls />
    </SafeAreaView>
  );
};

export default Home;
