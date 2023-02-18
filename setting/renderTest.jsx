import React, { PureComponent } from 'react';

class Test extends PureComponent {
  state = {
    counter: 0,
  }

  // shouldComponentUpdate(nextProps, nextState, nextContxt) {
  //   if(this.state.counter !== nextState.counter) {
  //     return true;
  //   }
  //   return false;
  // }

  onClick = () => {
    this.setState({}); // state에 바꿔준게 없어도 렌더링이 된다.
  }

  render() {
    console.log('렌더링', this.state);
    return(
      <div>
        <button onClick={this.onClick}>클릭</button>
      </div>
    )
  }
}

export default Test;