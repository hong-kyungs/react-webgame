import React, { useEffect , useReducer, useCallback } from 'react';
import Table from './Table';

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['', '', ''], 
    ['', '', ''], 
    ['', '', '']
  ],
  recentCell: [-1, -1], //최근 눌렀던 칸을 기억하게 하는 것, 없는 칸으로 초기값 만들어주기
}

// export를 붙여서 모듈로 만들어준다. Td.jsx와 같은 곳에서 사용하게 하기 위해서..
export const SET_WINNER = 'SET_WINNER'; // action이름은 변수로 뺴두는 것이 좋다. (상수로) 액션이름은 대문자로(커뮤니티룰)
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

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
        recentCell: [action.row, action.cell],
      }
    }
    case CHANGE_TURN : {
      return{
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O',
      }
    }
    case RESET_GAME : {
      return{
        ...state,
        turn: 'O',
        tableData: [
          ['', '', ''], 
          ['', '', ''], 
          ['', '', '']
        ],
        recentCell: [-1, -1],
      }
    }
    default :
      return state;
  }
}
    
    
    
    const TicTacToe = () => {
      const [ state, dispatch ] = useReducer(reducer, initialState);
      const { tableData, turn, winner, recentCell } = state;
      // const [ winner, setWinner ] = useState('');
      // const [ turn, setTurn ] = useState('O');
      // const [ tableData, setTableData ] = useState([['', '', ''], ['', '', ''], ['', '', '']]);
      
      const onClickTable = useCallback(() =>{
        dispatch({ type: SET_WINNER, winner: 'O'}) //dispatch안에 action객체를 만들어준다. action.type / action.winner 가 된다.
      }, []);

      useEffect(() => {
        const [row, cell] = recentCell;
        if(row < 0) {
          return;
        }
        let win = false;
        if(tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn){
          win = true;
        } 
        if(tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
          win = true;
        }
        if(tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
          win = true;
        }
        if(tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
          win = true;
        }
        if(win) { //승리시
          dispatch({ type: SET_WINNER, winner: turn});
          dispatch({ type: RESET_GAME});
        } else { 
          // 무승부검사
          // 칸이 다 차있다고 간주하고, 빈칸이 있으면 false로
          let all = true; // all이 true면(칸이 다 차면), 무승부라는 뜻
          tableData.forEach((row) => {
            row.forEach((cell) => {
              if(!cell){ // 하나라도 안 찬 칸이 있으면 무승부가 아니다
                all = false;
              }
            })
          })
          if(all){
            dispatch({ type: RESET_GAME});
            dispatch({ type: SET_WINNER, winner: ''})
          } else {
            dispatch({ type: CHANGE_TURN }); // 승리검사 후 이긴게 아니면 다음차례(CHANGE_TURN)로 넘겨준다
          }
        }
      }, [recentCell])

      return(
        <>
      <Table onClick={onClickTable} tableData={tableData}  dispatch={dispatch}/>
      {winner && <div>{winner}님의 승리!</div>}
    </>
  )
}

export default TicTacToe;