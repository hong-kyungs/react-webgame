import React, { useCallback, useContext } from 'react';
import { CODE, OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL, TableContext } from './MineSearch';

const getTdStyle = (code) => {
  switch(code) {
    case CODE.NORMAL:
    case CODE.MINE:
      return{
        background: '#888',
      };
    case CODE.OPENED:
    case CODE.CLICKED_MINE:
      return{
        background: 'white',
      };
    case CODE.QUESTION:
    case CODE.QUESTION_MINE:
      return {
        background: 'yellow',
      };     
    case CODE.FLAG:
    case CODE.FLAG_MINE:
      return {
        background: 'red',
      };
    default:
      return{
        background: 'white',
      };
  }
};

const getTdText = (code) => {
  switch(code) {
    case CODE.NORMAL:
      return '';
    case CODE.MINE:
      return 'X';
    case CODE.CLICKED_MINE:
      return '펑';
    case CODE.FLAG:
    case CODE.FLAG_MINE:
      return '!';
    case CODE.QUESTION:
    case CODE.QUESTION_MINE:
      return '?';
    default:
      return '';
  }
};

const Td = ({rowIndex, cellIndex}) =>{
  const { tableData, halted, dispatch } = useContext(TableContext);

  const onClickTd = useCallback(() => {
    if(halted){ // 게임이 멈추면 아무일도 일어나지 않게..
      return;
    }
    switch(tableData[rowIndex][cellIndex]){
      //클릭이 되지 않도록 만들어야 하는 칸들(한번 열린칸, 깃발이나 물음표가 찍혀있는 칸)
      case CODE.OPENED:
      case CODE.FLAG:
      case CODE.FLAG_MINE:
      case CODE.QUESTION:
      case CODE.QUESTION_MINE:
        return;
      case CODE.NORMAL:
        dispatch({type: OPEN_CELL, row: rowIndex, cell: cellIndex})
        return;
      case CODE.MINE:
        dispatch({type: CLICK_MINE, row: rowIndex, cell: cellIndex})
        return;
      default:
        return;
    }
    dispatch({type: OPEN_CELL, row: rowIndex, cell: cellIndex})
  }, [tableData[rowIndex][cellIndex], halted]); //data는 계속 바뀌므로 useCallback에 두번째인자로도 넣어준다

  const onRightClickTd = useCallback((e) => {
    e.preventDefault();
    if(halted){
      return;
    }
    switch(tableData[rowIndex][cellIndex]){
      case CODE.NORMAL:
      case CODE.MINE:
        dispatch({type: FLAG_CELL, row: rowIndex, cell: cellIndex});
        return;
      case CODE.FLAG:
      case CODE.FLAG_MINE:
        dispatch({type: QUESTION_CELL, row: rowIndex, cell: cellIndex});
        return;
      case CODE.QUESTION:
      case CODE.QUESTION_MINE:
        dispatch({type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex});
        return;
      default:
        return;
    }
  }, [tableData[rowIndex][cellIndex], halted])

  return(
    <td 
      style={getTdStyle(tableData[rowIndex][cellIndex])}
      onClick={onClickTd}
      onContextMenu={onRightClickTd}
    >{getTdText(tableData[rowIndex][cellIndex])}</td>
  )
};

export default Td;