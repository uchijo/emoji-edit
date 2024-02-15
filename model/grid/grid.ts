import { Emoji } from "../emoji/emoji";
import { GridRowModel } from "./gridRow";

export class GridModel {
    constructor(x: number, y: number) {
        const rows: GridRowModel[] = []
        for (let i = 0; i < y; i++) {
            rows.push(new GridRowModel(x))
        }
        this._rows = rows
    }
    private _rows: GridRowModel[]

    get sizeX(): number {
        return this._rows.length
    }

    get sizeY(): number {
        return this._rows[0].length
    }

    setAt(x: number, y: number, emoji: Emoji) {
        this._rows[y].setAt(x, emoji)
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
}