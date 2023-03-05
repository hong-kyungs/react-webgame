import React, { useReducer, createContext, useMemo } from 'react';
import Table from './Table';

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

const reducer = (state, action) => {
  switch(action.type){

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