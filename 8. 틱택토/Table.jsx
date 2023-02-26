import React from 'react';
import Tr from './Tr';

const Table = ({ onClick, tableData }) => {
  return(
    <table onClick={onClick}>
      {/* 요소가 3개일 배열을 만들기 */}
      {Array(tableData.length).fill().map((tr, i) => <Tr rowData={tableData[i]}/>)} 
    </table>
  )
}

export default Table;