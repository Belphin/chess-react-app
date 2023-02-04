import React, { FC, useState, useRef, useEffect } from "react";
import { Colors } from "../models/Colors";
import { Player } from "../models/Player";

interface TimerProps {
	curretPlayer: Player | null;
	restart: () => void;
}

const Timer: FC<TimerProps> = ({ curretPlayer, restart }) => {
	const [blackTime, setBlackTime] = useState(300);
	const [whiteTime, setWhiteTime] = useState(300);
	const timer = useRef<null | ReturnType<typeof setInterval>>(null);

	useEffect(() => {
		startTimer();
	}, [curretPlayer]);

	function startTimer() {
		if (timer.current) {
			clearInterval(timer.current);
		}
		const callback =
			curretPlayer?.color === Colors.WHITE
				? decrementWhiteTimer
				: decrementBlackTimer;
		timer.current = setInterval(callback, 1000);
	}

	function decrementBlackTimer() {
		setBlackTime((prev) => prev - 1);
	}
	function decrementWhiteTimer() {
		setWhiteTime((prev) => prev - 1);
	}

	const handleRestart = () => {
		setWhiteTime(300);
		setBlackTime(300);
		restart();
	};

	return (
		<div>
			<div>
				<button onClick={handleRestart}>Restart game</button>
			</div>
			<h2>Black - {blackTime}</h2>
			<h2>White - {whiteTime}</h2>
		</div>
	);
};

export default Timer;
