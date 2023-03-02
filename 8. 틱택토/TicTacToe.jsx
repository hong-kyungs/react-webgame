import React, { useState, useReducer, useCallback } from 'react';
import Table from './Table';

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['', '', ''], 
    ['', '', ''], 
    ['', '', '']
  ],
}

// export를 붙여서 모듈로 만들어준다. Td.jsx와 같은 곳에서 사용하게 하기 위해서..
export const SET_WINNER = 'SET_WINNER'; // action이름은 변수로 뺴두는 것이 좋다. (상수로) 액션이름은 대문자로(커뮤니티룰)
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';

const reducer = (state, action) =>{ //action을 dispatch할때마다 reducer부분을 실행된다.
  //state를 어떻게 바꿀것인지 적어준다.
  switch(action.type) {
    case SET_WINNER :
      //state.winner = action.winner; 이렇게 기존 state를 직접 바꾸면 안됨.
      return{ // 새로운 객체를 만들어서 바뀐 값만 바꿔줘야한다.
        ...state, //스프레드문법, 얕은 복사
        winner: action.winner, 
      }
    case CLICK_CELL:{  
      const tableData = [...state.tableData]; // 기존의 tableData를 얕은 복사 해주고,
      tableData[action.row] = [...tableData[action.row]]; // immer라는 라이브러리로 가독성 해결
      tableData[action.row][action.cell] = state.turn;
      return{
        ...state,
        tableData,
      }
    }
    case CHANGE_TURN : {
      return{
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O',
      }
    }
    }
  }
    
    
    
    const TicTacToe = () => {
      const [ state, dispatch ] = useReducer(reducer, initialState);
      // const [ winner, setWinner ] = useState('');
      // const [ turn, setTurn ] = useState('O');
      // const [ tableData, setTableData ] = useState([['', '', ''], ['', '', ''], ['', '', '']]);
      
      const onClickTable = useCallback(() =>{
        dispatch({ type: SET_WINNER, winner: 'O'}) //dispatch안에 action객체를 만들어준다. action.type / action.winner 가 된다.
      }, []);
      return(
        <>
      <Table onClick={onClickTable} tableData={state.tableData}  dispatch={dispatch}/>
      {state.winner && <div>{state.winner}님의 승리!</div>}
    </>
  )
}

export default TicTacToe;