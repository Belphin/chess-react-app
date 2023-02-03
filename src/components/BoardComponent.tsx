import React, { FC, useState, useEffect } from "react";
import { Board } from "../models/Board";
import { Cell } from "../models/Cell";
import CellComponent from "./CellComponent";

interface BoardProps {
	board: Board;
	setBoard: (board: Board) => void;
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard }) => {
	const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

	function click(cell: Cell) {
		if (
			selectedCell &&
			selectedCell !== cell &&
			selectedCell.figure?.canMove(cell)
		) {
			selectedCell.moveFigure(cell);
			setSelectedCell(null);
		} else setSelectedCell(cell);
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
	);
};

export default BoardComponent;
