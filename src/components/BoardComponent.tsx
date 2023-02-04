import React, { FC, useState, useEffect } from "react";
import { Board } from "../models/Board";
import { Cell } from "../models/Cell";
import { Player } from "../models/Player";
import CellComponent from "./CellComponent";

interface BoardProps {
	board: Board;
	setBoard: (board: Board) => void;
	currentPlayer: Player | null;
	swapPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({
	board,
	setBoard,
	currentPlayer,
	swapPlayer,
}) => {
	const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

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
		</div>
	);
};

export default BoardComponent;
