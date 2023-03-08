import React, { useReducer, createContext, useMemo  } from 'react';
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
  halted: true,
  dispatch: () => {},
});

const initialState = {
  tableData: [],
  timer: 0,
  result: '',
  data: {
    row: 0,
    cell: 0,
    mine: 0,
  },
  halted: true,
  openedCount: 0, //칸을 몇개 열었는지 체크
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
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';

const reducer = (state, action) => {
  switch(action.type){
    case START_GAME:
      return {
        ...state,
        data: {
          row: action.row,
          cell: action.cell,
          mine: action.mine,
        },
        openedCount: 0,
        result: '',
        tableData: plantMine(action.row, action.cell, action.mine), //plantMine이라는 함수를 만들어서 지뢰를 심어 테이블 그리기
        halted: false,
      }
    case OPEN_CELL:{
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData.forEach((row, i) => { //불변성을 유지하기 위해 모든 칸을 새로운 객체로 만들어준다.
        tableData[i] = [...state.tableData[i]];
      })

      const checked =[]; // 무한반복을 피하기 위해 한번 검사한 칸은 다시 검사하지 않도록 배열을 만들어서 넣어준다.
      let openedCount = 0; // 
      const checkAround = (row, cell) => { //내 주변 지뢰개수 검사하는 함수
        if([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION, CODE.QUESTION_MINE].includes(tableData[row][cell])) { 
          return; // 닫힌칸이 아닌경우 걸러주기, 이미 열리거나, 깃발, 물음표가 있는 칸은 막아주기
        } 
        if(row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length) { // 상하좌우 칸이 없는 경우 필터링
          return;
        }
        if(checked.includes(row + ',' + cell)){ //이미 검사한 칸이면 무시
          return;
        } else {
          checked.push(row + ',' + cell);
        }
        if(tableData[row][cell] === CODE.NORMAL) {
          openedCount += 1; //칸이 하나씩 열릴때마다 openedCount를 1씩 올려준다
        }
        let around = [];
        if(tableData[row - 1]){//클릭한 칸에 윗줄이 있으면 아래처럼 세칸을 넣어준다
          around = around.concat(
            tableData[row - 1][cell - 1],
            tableData[row - 1][cell],
            tableData[row - 1][cell + 1],
          );
        }
        around = around.concat( //클릭한 칸의 오른쪽, 왼쪽칸(옆칸들)
          tableData[row][cell - 1],
          tableData[row][cell + 1],
        );
        if(tableData[row + 1]){//클릭한 칸에 아랫줄이 있으면 아래처럼 세칸을 넣어준다
          around = around.concat(
            tableData[row + 1][cell - 1],
            tableData[row + 1][cell],
            tableData[row + 1][cell + 1],
          );
        }
        const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length; 
        tableData[row][cell] = count;

        if(count === 0) { // 주변칸 오픈 (클릭한 칸이 0이면 주변 8칸을 열고 그 안에 0이 있으면 또 그 0의 주변 8칸을 연다.)
          if(row  > -1){
            const near = [];
            if(row - 1 > -1) { // 윗줄이 있으면
              near.push([row - 1, cell - 1 ]);
              near.push([row - 1, cell ]);
              near.push([row - 1, cell + 1 ]);
            }
            near.push([row , cell - 1 ]);
            near.push([row , cell + 1 ]);
            if(row + 1 < tableData.length){
              near.push([row + 1, cell - 1 ]);
              near.push([row + 1, cell ]);
              near.push([row + 1, cell + 1 ]);
            }
            near.forEach((n) => { // 주변칸 클릭 해주는 함수
              if (tableData[n[0]][n[1]] !== CODE.OPENED) {
                checkAround(n[0], n[1]);
              }
            })
          }
        }
      }
      checkAround(action.row, action.cell);
      let halted = false;
      let result = '';
      console.log(state.data.row * state.data.cell - state.data.mine, state.openedCount, openedCount)
      if(state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount) { //승리
        halted = true; // 승리하면 게임을 멈추고
        result = '승리하셨습니다!';
      }
      return{
        ...state,
        tableData,
        openedCount: state.openedCount + openedCount,
        halted,
        result,
      };
    }
    case CLICK_MINE:{
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.CLICKED_MINE;
      return{
        ...state,
        tableData,
        halted: true,
      };
    }
    case FLAG_CELL:{
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if(tableData[action.row][action.cell] === CODE.MINE){
        tableData[action.row][action.cell] = CODE.FLAG_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.FLAG;
      }
      return{
        ...state,
        tableData,
      };
    }
    case QUESTION_CELL:{
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if(tableData[action.row][action.cell] === CODE.FLAG_MINE){
        tableData[action.row][action.cell] = CODE.QUESTION_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.QUESTION;
      }
      return{
        ...state,
        tableData,
      };
    }
    case NORMALIZE_CELL:{
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if(tableData[action.row][action.cell] === CODE.QUESTION_MINE){
        tableData[action.row][action.cell] = CODE.MINE;
      } else {
        tableData[action.row][action.cell] = CODE.NORMAL;
      }
      return{
        ...state,
        tableData,
      };
    }
    default: 
      return state;
  }
};

const MineSearch = () =>{
  const[state, dispatch] = useReducer(reducer, initialState);
  const { tableData, halted, timer, result } = state;
  
  const value = useMemo(() => ({ tableData: tableData, halted: halted ,dispatch}), [tableData, halted]);

  return(
    //value에 값을 그냥 넣어주면 매번 새로운 객체가 생기고 리렌더링된다. 그래서 useMemo로 caching해서 성능최적화한다.
    <TableContext.Provider value={value}>
      <Form />
      <div>{timer}</div>
      <Table />
      <div>{result}</div>
    </TableContext.Provider>
  )
};

export default MineSearch;