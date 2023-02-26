import React, { useState, useReducer } from 'react';
import Table from './Table';

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [['', '', ''], ['', '', ''], ['', '', '']],
}

const reducer = (state, action) =>{
  //statd를 어떻게 바꿀것인지 적어준다.
}

const TicTacToe = () => {
  const [ state, dispatch ] = useReducer(reducer, initialState);
  // const [ winner, setWinner ] = useState('');
  // const [ turn, setTurn ] = useState('O');
  // const [ tableData, setTableData ] = useState([['', '', ''], ['', '', ''], ['', '', '']]);
  return(
    <>
      <Table />
      {state.winner && <div>{state.winner}님의 승리!</div>}
    </>
  )
}

export default TicTacToe;

