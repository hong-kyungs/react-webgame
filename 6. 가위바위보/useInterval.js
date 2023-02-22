import { useRef, useEffect } from 'react';

//useInterval이라는 hook을 창조하는 것.
//isRunning이 true면 delay가 1000이고 1초마다 콘솔로그가 찍히고,   setIsRunning이 false가 되면 delay가 null이고 멈춘다.
//const [ isRunning, setIsRunning ] = useState(true);
//useInterval(() = >{
//  console.log('hello');
//}, isRunning ? 1000 : null)
function useInterval(callback, delay) {
	const savedCallback = useRef();

	useEffect(() => {
		savedCallback.current = callback;
	});

	useEffect(() => {
		function tick() {
			savedCallback.current();
		}

		if (delay !== null) {
			let id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);

	return savedCallback.current;
}

export default useInterval;
