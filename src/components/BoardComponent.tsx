import React, { FC, useState, useEffect } from "react";
import { Board } from "../models/Board";
import { Cell } from "../models/Cell";
import { Colors } from "../models/Colors";
import { Player } from "../models/Player";
import CellComponent from "./CellComponent";
import Modal from "./Modal/Modal";

interface BoardProps {
	board: Board;
	restart: () => void;
	setBoard: (board: Board) => void;
	currentPlayer: Player | null;
	swapPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({
	board,
	setBoard,
	currentPlayer,
	swapPlayer,
	restart,
}) => {
	const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
	const [winner, setWinner] = useState<Colors | null>(null);

	function click(cell: Cell) {
		if (
			selectedCell &&
			selectedCell !== cell &&
			selectedCell.figure?.canMove(cell)
		) {
			selectedCell.moveFigure(cell);
			swapPlayer();
			setSelectedCell(null);
		} else {
			if (cell.figure?.color === currentPlayer?.color) setSelectedCell(cell);
		}
		if (cell.board.winner) setWinner(cell.board.winner);
	}

	useEffect(() => highLightCells(), [selectedCell]);

	function highLightCells() {
		board.highLightCells(selectedCell);
		updateBoard();
	}

	function updateBoard() {
		const newBoard = board.getCopyBoard();
		setBoard(newBoard);
	}

	return (
		<div>
			<h3>{currentPlayer?.color} move</h3>
			<div className="board">
				{board.cells.map((row, index) => (
					<React.Fragment key={index}>
						{row.map((cell) => (
							<CellComponent
								click={click}
								selected={
									cell.x === selectedCell?.x && cell.y === selectedCell?.y
								}
								cell={cell}
								key={cell.id}
							/>
						))}
					</React.Fragment>
				))}
			</div>

			{winner && (
				<Modal
					children={
						<form>
							<h1>{winner} won!</h1>
							<button onClick={restart}>Restart</button>
						</form>
					}
				/>
			)}
		</div>
	);
};

export default BoardComponent;
