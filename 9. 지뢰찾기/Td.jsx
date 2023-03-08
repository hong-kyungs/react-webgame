import React, { useCallback, useContext, memo } from 'react';
import { CODE, OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL, TableContext } from './MineSearch'; 

const getTdStyle = (code) => {
  switch(code) {
    case CODE.NORMAL:
    case CODE.MINE:
      return{
        background: '#888',
      }
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
      return code || '';
  }
};

const Td = memo(({rowIndex, cellIndex}) =>{
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

  console.log('td rendered');

  // return useMemo(() => (
  //   <td 
  //     style={getTdStyle(tableData[rowIndex][cellIndex])}
  //     onClick={onClickTd}
  //     onContextMenu={onRightClickTd}
  //   >{getTdText(tableData[rowIndex][cellIndex])}</td>
  // ), [tableData[rowIndex][cellIndex]])

  return < RealTd onClickTd={onClickTd} onRightClickTd={onRightClickTd} data={tableData[rowIndex][cellIndex]} />;

});

//context API 최적화를 위해서
//1. 리턴부분을 useMemo로 감싸거나,
//2. 컴포넌트를 따로 분리해서 memo로 감싼다.
const RealTd = memo(({onClickTd, onRightClickTd, data}) => {
  console.log('real Td rendered'); // 함수는 100번 호출되서 'td rendered'가 100번 찍히더라고, 실질적으로 렌더링은 1번만 되서 'real Td rendered'가 한번만 찍힌다.
  return(
    <td 
    style={getTdStyle(data)}
    onClick={onClickTd}
    onContextMenu={onRightClickTd}
    >{getTdText(data)}</td>
  )
});

export default Td;