import React from "react";

// const Try = (props.tryInfo) => {}로 해줘도 된다.
const Try = ( { tryInfo } ) => {
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  )
};

export default Try;