import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import blackLogo from "../../assets/black-king.png";
import whiteLogo from "../../assets/white-king.png";

export class King extends Figure {
	constructor(color: Colors, cell: Cell) {
		super(color, cell);
		this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
		this.name = FigureNames.KING;
	}

	canMove(target: Cell): boolean {
		if (
			target.figure?.color === this.color &&
			target.figure.name === FigureNames.ROOK &&
			this.cell.isEmptyToFigure(target) &&
			this.isFirstStep &&
			target.figure.isFirstStep
		) {
			return true;
		}
		if (!super.canMove(target)) return false;
		const dx = Math.abs(this.cell.x - target.x);
		const dy = Math.abs(this.cell.y - target.y);
		if (
			(dy === 1 && dx === 0) ||
			(dy === 0 && dx === 1) ||
			(dx === 1 && dy === 1)
		)
			return true;
		return false;
	}

	moveFigure(target: Cell) {
		super.moveFigure(target);
		this.isFirstStep = false;
	}

	castlingFigure(target: Cell) {
		this.isFirstStep = false;
		if (target.x === 0) {
			this.cell.board.getCell(2, this.cell.y).setFigure(this);
			if (target.figure)
				this.cell.board.getCell(3, this.cell.y).setFigure(target.figure);
		} else {
			this.cell.board.getCell(6, this.cell.y).setFigure(this);
			if (target.figure)
				this.cell.board.getCell(5, this.cell.y).setFigure(target.figure);
		}
		target.figure = null;
	}
}
