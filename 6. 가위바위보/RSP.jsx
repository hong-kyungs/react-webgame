import React, { useState, useRef, useEffect }from 'react';

const rspCoords = {
  바위: '0',
  가위: '-142px',
  보: '-284px',
}

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
}

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find(function (v) {
    return v[1] === imgCoord;
  })[0];
};
;

const RSP = () =>{
  const [result, setResult] = useState('');
  const [imgCoord, setImgCoord ] = useState(rspCoords.바위);
  const [score , setScore ] = useState(0);
  const interval = useRef();

  //useEffect(첫번째인수-함수()=>{}, 두번째인수-배열)
  //두번째 인수로 넣은 imgCoord가 바뀔 때마다 첫번째 인수인 함수부분이 렌더링된다.
  useEffect(() => { //componentDidMount, componentDidUpdate 역할(1대1 대응 아님)
    interval.current = setInterval(changHand, 50);
    return () => { //componentWillUnmount 역할
      clearInterval(interval.current);
    } 
  }, [imgCoord])
  
  const changHand = () => {
      if(imgCoord === rspCoords.바위) {
        setImgCoord(rspCoords.가위)
      } else if (imgCoord === rspCoords.가위) {
        setImgCoord(rspCoords.보 )
      } else if (imgCoord === rspCoords.보) {
        setImgCoord(rspCoords.바위)
      }
  }

  const onClickBtn = (choice) => () => {
    clearInterval(interval.current);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if(diff === 0 ) {
      setResult("비겼습니다.")
    } else if([-1, 2].includes(diff)) {
      setResult("이겼습니다.");
      setScore((prevScore) => prevScore + 1);
    } else {
      setResult("졌습니다.");
      setScore((prevScore) => prevScore - 1);
    }
    setTimeout(() => {
      interval.current = setInterval(changHand, 50)
    }, 1000) // 1초동안 결과확인하는 시간
  }


  return(
    <>
      <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }}></div>
      <div>
        <button id="rock" className='btn' onClick={onClickBtn('바위')}>바위</button>
        <button id="scissor" className='btn' onClick={onClickBtn('가위')}>가위</button>
        <button id="paper" className='btn' onClick={onClickBtn('보')}>보</button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </>
  )
  
}

export default RSP;