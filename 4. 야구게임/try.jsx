import React, { memo }from "react";

// const Try = (props.tryInfo) => {}로 해줘도 된다.
const Try = memo(( { tryInfo } ) => {
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  )
});
Try.displayName = 'Try';

export default Try;