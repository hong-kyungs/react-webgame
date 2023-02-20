import React, { Component }from 'react';

//클래스의 경우 - component 라이프사이클
//constructor(state나 method) -> shouldComponentUpdate(true) -> render -> ref(ref가 있다면) -> componentDidMount
//-> (setState/props 바뀔 때) -> render -> componentDidUpdate ->
//부모가 나를 없앴을 떄 -> componentWillUnmount -> 소멸

const rspCoords = {
  바위: '0',
  가위: '-142px',
  보: '-284px',
}

const score = {
  가위: 1,
  바위: 0,
   보: -1,
}

class RSP extends Component {
  state = {
    result: '',
    imgCoord: '0',
    score: 0,
  }

  interval;

  componentDidMount() { // 컴포넌트가 첫 렌더링된 후, 여기에 비동기 요청 많이 한다
    this.interval = setInterval(() => {
      // 비동기함수는 바깥의 변수를 참조하면 클로저가 발생한다.
      const { imgCoord } = this.state; // 비동기함수는 변수를 절대 밖에 선언하지 말것. 
      if(imgCoord === rspCoords.바위) {
        this.setState({
          imgCoord: rspCoords.가위
        });
      } else if (imgCoord === rspCoords.가위) {
        this.setState({
          imgCoord: rspCoords.보 
        });
      } else if (imgCoord === rspCoords.보) {
        this.setState({
          imgCoord: rspCoords.바위
        });
      }
    }, 1000)
  }

  componentDidUpdate() { // 리렌더링 후 

  }

  componentWillUnmount() { // 컴포넌트가 제거되기 직전, 비동기 요청 정리를 많이 한다
    clearInterval(this.interval);
  }

  onClickBtn = () => {

  }

  render() {
    const { result, score, imgCoord } = this.state; 
    return(
      <>
        <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }}></div>
        <div>
          <button id="rock" className='btn' onClick={() => this.onClickBtn('바위')}>바위</button>
          <button id="scissor" className='btn' onClick={() => this.onClickBtn('가위')}>가위</button>
          <button id="paper" className='btn' onClick={() => this.onClickBtn('보')}>보</button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    )
  }
}

export default RSP;