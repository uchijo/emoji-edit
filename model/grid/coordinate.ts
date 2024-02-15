export class Coordinate {
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    x: number;
    y: number;

    same(c: Coordinate): boolean {
        return c.x === this.x && c.y === this.y
    }
    sameFromCoord(x: number, y: number): boolean {
        return x === this.x && y === this.y
    }
}