import { emptyTag, emptyUrl } from "@/utils/const";
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

    removeEmptyToRight() {
        for (let i = 0; i < this.grid.length; i++) {
            for (let ii = this.grid[i].length - 1; !this.grid[i][ii].hasEmoji; ii--) {
                this.grid[i].length -= 1
            }
        }
    }

    toShortCode(): string {
        let retval = ""
        for (const row of this.grid) {
            for (const cell of row) {
                retval += cell.toShortCode()
            }
            retval += "\n"
        }
        return retval
    }

    toTags(): string[][] {
        const seenAlready = new Set<String>()
        const retval: string[][] = []
        for (const row of this.grid) {
            for (const cell of row) {
                const tag = cell.extractTagWithoutDuplicate(seenAlready)
                if (tag) {
                    retval.push(tag)
                    seenAlready.add(cell.toShortCode())
                }
            }
        }
        retval.push(emptyTag)
        return retval
    }

    toUrls(): string[][] {
        const retval: string[][] = []
        for (const row of this.grid) {
            const tmpRow: string[] = []
            for (const cell of row) {
                tmpRow.push(cell.currentEmoji?.url ?? emptyUrl)
            }
            retval.push(tmpRow)
        }
        return retval
    }
}