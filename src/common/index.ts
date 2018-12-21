import {ICell} from '../types';

export function generateRandomApple(width: number, height: number, snake: ICell[], apple?: ICell): ICell {
    const randArray: number[][] = [];
    let arrayX = [];
    const sortedSnake = makeSortedSnake(snake);

    for (let i = 0; i < height; i++) {
        randArray[i] = [];
        arrayX.push(i);
        for (let j = 0; j < width; j++) {
            const isNotSnakeCell = !checkSnakeCell(sortedSnake, {x: i, y: j});
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
    let min = 0;
    let max = snake.length - 1;
    let guess: number;

    while(min <= max){
        guess = Math.floor((min + max) /2);

        const { x: snakeX, y: snakeY } = snake[guess];

        if (snakeX === x && snakeY === y) {
            return true;
        } else if ((snakeX < x) || (snakeX === x && snakeY < y)) {
            min = guess + 1;
        } else {
            max = guess - 1;
        }
    }

    return false;
}

export function makeSortedSnake(snake: ICell[]): ICell[] {
    return [...snake].sort((a, b) => {
        if (a.x > b.x) {
            return 1;
        } else if (a.x < b.x) {
            return -1;
        } else {
            return a.y - b.y;
        }
    });
}