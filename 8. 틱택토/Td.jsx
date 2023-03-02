import React, { useCallback } from 'react';
import { CHANGE_TURN, CLICK_CELL } from './TicTacToe'; // action을 불러온다

const Td = ({ rowIndex, cellIndex, dispatch, cellData }) => {
  const onClickTd = useCallback(() => {
    console.log(rowIndex, cellIndex);
    dispatch({ type : CLICK_CELL, row: rowIndex, cell: cellIndex }); // 칸을 클릭하는 액션을 만든 것
    dispatch({ type : CHANGE_TURN}); //
  }, []);

  return(
    <td onClick={onClickTd}>{cellData}</td>
  )
}

export default Td;