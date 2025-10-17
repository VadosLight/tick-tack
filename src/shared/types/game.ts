export type CellValue = 'X' | 'O' | null;

export type Position = {
  row: number;
  col: number;
};

export type GameBoard = CellValue[][];

