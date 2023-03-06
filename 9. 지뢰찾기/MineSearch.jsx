import React, { useReducer, createContext, useMemo } from 'react';
import Table from './Table';
import Form from './Form';

export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0, //0이상 이면 다 opened
}

export const TableContext = createContext({
  //초기값을 넣어줘야 하는데 초기값이 별 의미가 없으므로, 배열, 함수로 모양한 맞춰줌
  tableData: [],
  dispatch: () => {},
});

const initialState = {
  tableData: [],
  timer: 0,
  result: '',
};

const plantMine = (row, cell, mine) => {
  console.log(row, cell, mine);
  const candidate = Array(row * cell).fill().map((arr, i) => {
    return i;
  })
  const shuffle = [];
  while(candidate.length > row * cell - mine){
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length) ,1)[0];
    shuffle.push(chosen);
  }
  const data = [];
  for(let i = 0; i < row; i++){
    const rowData = [];
    data.push(rowData);
    for(let j = 0; j < cell; j++){
      rowData.push(CODE.NORMAL);
    }
  }

  for(let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }

  console.log(data);
  return data;
}

export const START_GAME = 'START_GAME';

const reducer = (state, action) => {
  switch(action.type){
    case START_GAME:
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine), //plantMine이라는 함수를 만들어서 지뢰를 심어 테이블 그리기
      }
    default: 
      return state;
  }
};

const MineSearch = () =>{
  const[state, dispatch] = useReducer(reducer, initialState);
  
  const value = useMemo(() => ({ tableData: state.tableData, dispatch}), [state.tableData]);

  return(
    //value에 값을 그냥 넣어주면 매번 새로운 객체가 생기고 리렌더링된다. 그래서 useMemo로 caching해서 성능최적화한다.
    <TableContext.Provider value={value}>
      <Form />
      <div>{state.timer}</div>
      <Table />
      <div>{state.result}</div>
    </TableContext.Provider>
  )
};

export default MineSearch;