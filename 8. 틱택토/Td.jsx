import React, { useCallback } from 'react';
import { CHANGE_TURN, CLICK_CELL } from './TicTacToe'; // action을 불러온다

const Td = ({ rowIndex, cellIndex, dispatch, cellData }) => {
  const onClickTd = useCallback(() => {
    console.log(rowIndex, cellIndex);
    if(cellData) {
      return; // 한번 클릭한 셀은 바뀌지 않는다.
    }
    dispatch({ type : CLICK_CELL, row: rowIndex, cell: cellIndex }); // 칸을 클릭하는 액션을 만든 것
  }, [cellData]);

  return(
    <td onClick={onClickTd}>{cellData}</td>
  )
}

export default Td;