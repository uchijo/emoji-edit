import { Emoji } from "../emoji/emoji";
import { SanitizedGrid } from "./sanitizedGrid";
import { Coordinate } from "./coordinate";
import { GridCellModel } from "./gridCell";
import { GridRowModel } from "./gridRow";

export class GridModel {
    private constructor(rows: GridRowModel[]) {
        this._rows = rows
    }

    static fromSize(x: number, y: number): GridModel {
        const rows: GridRowModel[] = []
        for (let i = 0; i < y; i++) {
            rows.push(GridRowModel.fromSize(x))
        }
        return new GridModel(rows)
    }

    private _rows: GridRowModel[]
    currentFocus?: Coordinate

    get sizeX(): number {
        if (this._rows.length <= 0) {
            return 0
        }
        return this._rows[0].length
    }

    get sizeY(): number {
        return this._rows.length
    }

    get rows(): GridRowModel[] {
        return this._rows
    }

    clone(): GridModel {
        const rows: GridRowModel[] = []
        for (let item of this._rows) {
            rows.push(item.clone())
        }
        return new GridModel(rows)
    }

    toSanitizedGrid(): SanitizedGrid | undefined {
        let tmp = this.clone()

        // 上側の空白列を消す
        for (; ;) {
            // 全部消えた場合は空のグリッドになる
            if (tmp.sizeY <= 0) {
                return undefined
            }
            if (tmp.rowAt(0).isEmptyRow) {
                tmp = tmp.removeRow(0)
            } else {
                break
            }
        }

        // 下側の空白列を消す
        for (; ;) {
            if (tmp.sizeY <= 0) {
                // 全部消えた場合は空のグリッドになる
                return undefined
            }
            if (tmp.rowAt(tmp.sizeY - 1).isEmptyRow) {
                tmp = tmp.removeRow(tmp.sizeY - 1)
            } else {
                break
            }
        }

        // 左側の空白行を消す
        for (; ;) {
            if (tmp.isEmptyColumn(0)) {
                tmp = tmp.removeColumn(0)
            } else {
                break
            }
        }
        // 右側
        for (; ;) {
            if (tmp.isEmptyColumn(tmp.sizeX - 1)) {
                tmp = tmp.removeColumn(tmp.sizeX - 1)
            } else {
                break
            }
        }

        const sanitized = SanitizedGrid.fromGridModel(tmp)

        // 右側の必要ない空白を消す
        for (let i = 0; i < sanitized.grid.length; i++) {
            for (let ii = sanitized.grid[i].length - 1; !sanitized.grid[i][ii].hasEmoji; ii--) {
                sanitized.grid[i].length -= 1
                console.log(`hoge: ${ii}`)
                if (ii == 0) {
                    break;
                }
            }
        }

        return sanitized;
    }

    isEmptyColumn(index: number): boolean {
        return this._rows.every((elem) => !elem.cells[index].hasEmoji)
    }

    setFocus(x: number, y: number): GridModel {
        const newGrid = new GridModel(this._rows)
        const coordinate = new Coordinate(x, y)
        newGrid.currentFocus = coordinate
        return newGrid
    }

    rowAt(index: number): GridRowModel {
        return this._rows[index]
    }

    setAt(x: number, y: number, emoji: Emoji): GridModel {
        this._rows[y].setAt(x, emoji)
        return new GridModel(this._rows)
    }

    unsetAt(x: number, y: number): GridModel {
        this._rows[y].unsetAt(x)
        return new GridModel(this._rows)
    }

    addRow(index: number): GridModel {
        const newRows = [
            ...this._rows.slice(0, index),
            GridRowModel.fromSize(this.sizeX),
            ...this._rows.slice(index),
        ]
        return new GridModel(newRows)
    }

    removeRow(index: number): GridModel {
        const newRows = [...this._rows.slice(0, index), ...this._rows.slice(index + 1)]
        return new GridModel(newRows)
    }

    addColumn(index: number): GridModel {
        for (let i = 0; i < this.sizeY; i++) {
            this._rows[i].addAt(index)
        }
        return new GridModel(this._rows)
    }

    removeColumn(index: number): GridModel {
        for (let i = 0; i < this.sizeY; i++) {
            this._rows[i].removeAt(index)
        }
        return new GridModel(this._rows)
    }

    cellAt(x: number, y: number): GridCellModel {
        return this._rows[y].emojiAt(x)
    }
}