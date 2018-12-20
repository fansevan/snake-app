import {ICell} from '../types';

export function generateRandomApple(width: number, height: number, snake: ICell[], apple?: ICell): ICell {
    const randArray: number[][] = [];
    let arrayX = [];

    for (let i = 0; i < height; i++) {
        randArray[i] = [];
        arrayX.push(i);
        for (let j = 0; j < width; j++) {
            const isNotSnakeCell = !checkSnakeCell(snake, {x: i, y: j});
            const isNotApple = apple ? !(apple.x === i && apple.y === j) : true;

            if (isNotSnakeCell && isNotApple) {
                randArray[i].push(j);
            }
        }
    }

    arrayX = arrayX.filter(el => randArray[el].length);

    const randX = rand(0, arrayX.length - 1);
    const newAppleX = arrayX[randX];
    const randY = rand(0, randArray[newAppleX].length - 1);
    const newAppleY = randArray[newAppleX][randY];

    return {x: newAppleX, y: newAppleY};
}

function rand(min: number, max: number): number {
    return min + Math.floor(Math.random() * (max + 1 - min));
}

export function checkSnakeCell(snake: ICell[], { x, y }: ICell): boolean {
    const { length } = snake;
    for (let i = 0; i < length; i++) {
        const {x: snakeCellX, y: snakeCellY} = snake[i];
        if (snakeCellX === x && snakeCellY === y) {
            return true;
        }
    }
    return false;
}