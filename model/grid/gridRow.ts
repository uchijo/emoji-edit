import { Emoji } from "../emoji/emoji";
import { GridCellModel } from "./gridCell";

export class GridRowModel {
    constructor(size: number) {
        const cells = []
        for (let i = 0; i < size; i++) {
            cells.push(new GridCellModel())
        }
        this._cells = cells
    }
    private _cells: GridCellModel[]

    get length(): number {
        return this._cells.length
    }

    // cells = [e, e, e, e, e]とする
    // index=0の場合, cells = [n, e, e, e, e, e]
    // index=5の場合, cells = [e, e, e, e, e, n] となる
    addAt(index: number) {
        const newCells = [...this._cells.slice(0, index), new GridCellModel(), ...this._cells.slice(index)]
        this._cells = newCells
    }

    removeAt(index: number) {
        const newCells = [...this._cells.slice(0, index), ...this._cells.slice(index + 1)]
        this._cells = newCells
    }

    emojiAt(index: number) {
        return this._cells[index]
    }

    setAt(index: number, emoji: Emoji) {
        this._cells[index].setEmoji(emoji)
    }

    unsetAt(index: number) {
        this._cells[index].unsetEmoji()
    }
}
