import { Colors } from "../Colors";
import logo from "../../assets/black-king.png";
import { Cell } from "../Cell";

export enum FigureNames {
	FIGURE = "Фігура",
	KING = "Король",
	KNIGHT = "Кінь",
	PAWN = "Пішак",
	QUEEN = "Ферзь",
	ROOK = "Тура",
	BISHOP = "Слон",
}

export class Figure {
	color: Colors;
	logo: typeof logo | null;
	cell: Cell;
	name: FigureNames;
	id: number;
	isFirstStep: boolean;

	constructor(color: Colors, cell: Cell) {
		this.color = color;
		this.cell = cell;
		this.cell.figure = this;
		this.logo = null;
		this.name = FigureNames.FIGURE;
		this.id = Math.random();
		this.isFirstStep = true;
	}

	canMove(target: Cell): boolean {
		if (target.figure?.color === this.color) return false;
		return true;
	}
	moveFigure(target: Cell) {}

	castlingFigure(target: Cell) {}
}
