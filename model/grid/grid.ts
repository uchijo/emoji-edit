import { Emoji } from "../emoji/emoji";
import { GridCellModel } from "./gridCell";
import { GridRowModel } from "./gridRow";

export class GridModel {
    private constructor(rows: GridRowModel[]) {
        this._rows = rows
    }

    static fromSize(x: number, y: number): GridModel {
        const rows: GridRowModel[] = []
        for (let i = 0; i < y; i++) {
            rows.push(new GridRowModel(x))
        }
        return new GridModel(rows)
    }

    private _rows: GridRowModel[]

    get sizeX(): number {
        return this._rows.length
    }

    get sizeY(): number {
        return this._rows[0].length
    }

    get rows(): GridRowModel[] {
        return this._rows
    }

    rowAt(index: number): GridRowModel {
        return this._rows[index]
    }

    setAt(x: number, y: number, emoji: Emoji): GridModel {
        this._rows[y].setAt(x, emoji)
        return new GridModel(this._rows)
    }

    unsetAt(x: number, y: number) {
        this._rows[y].unsetAt(x)
    }

    addRow(index: number) {
        const newRows = [
            ...this._rows.slice(0, index),
            new GridRowModel(this.sizeX),
            ...this._rows.slice(index),
        ]
        this._rows = newRows
    }

    removeRow(index: number) {
        const newRows = [...this._rows.slice(0, index), ...this._rows.slice(index + 1)]
        this._rows = newRows
    }

    addColumn(index: number) {
        for (let i = 0; i < this.sizeY; i++) {
            this._rows[i].addAt(index)
        }
    }

    removeColumn(index: number) {
        for (let i = 0; i < this.sizeY; i++) {
            this._rows[i].removeAt(index)
        }
    }

    cellAt(x: number, y: number): GridCellModel {
        return this._rows[y].emojiAt(x)
    }
}