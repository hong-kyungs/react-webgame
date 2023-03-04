import React from 'react';
import Tr from './Tr';

const Table = ({ tableData, dispatch }) => {
  return(
    <table>
      {/* 요소가 3개일 배열을 만들기 */}
      {Array(tableData.length).fill().map((tr, i) => <Tr key={i} dispatch={dispatch} rowIndex={i} rowData={tableData[i]}/>)}
      {/* 몇번째 줄인지는 i가 나타내고 있다 */}
    </table>
  )
}

export default Table;