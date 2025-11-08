import React from 'react';
import {
  ChessBoard,
  GameStatus,
  SafeAreaView,
  GameControls,
  Header,
} from '../../components';

const Home = () => {
  return (
    <SafeAreaView>
      <Header title="Chess Game" />
      <ChessBoard />
      <GameStatus />
      <GameControls />
    </SafeAreaView>
  );
};

export default Home;
