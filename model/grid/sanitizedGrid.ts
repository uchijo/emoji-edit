import { GridModel } from "./grid";
import { GridCellModel } from "./gridCell";

export class SanitizedGrid {
    constructor(grid: GridCellModel[][]) {
        this.grid = grid
    }
    grid: GridCellModel[][]

    static fromGridModel(grid: GridModel): SanitizedGrid {
        const rows: GridCellModel[][] = []
        for (let row of grid.rows) {
            rows.push(row.clone().cells)
        }
        return new SanitizedGrid(rows)
    }
}