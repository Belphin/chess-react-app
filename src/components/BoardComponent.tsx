import React, { FC, useState } from "react";
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
		if (cell.figure) setSelectedCell(cell);
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
