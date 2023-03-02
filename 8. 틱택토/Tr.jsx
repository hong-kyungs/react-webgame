import React from 'react';
import Td from './Td';

const Tr = ({ rowData, rowIndex, dispatch }) => {
  return(
    <tr>
      {Array(rowData.length).fill().map((td, i) => (<Td dispatch={dispatch} rowIndex={rowIndex} cellIndex = {i} cellData = {rowData[i]}>{''}</Td>))}
      {/* i가 몇번째 칸인지 나타내고 있다 */}
    </tr>
  )
}

export default Tr;