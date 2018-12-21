export interface ICell {
    x: number,
    y: number
}

export interface IStoreState {
    fieldHeight: number,
    fieldWidth: number,
    speed: number,
    gameStage: GameStage,
    snake: ICell[],
    apple?: ICell,
    isThroughWalls: boolean
}

export enum KeyCode {
    W = 87,
    A = 65,
    S = 83,
    D = 68,
    Up = 38,
    Left = 37,
    Down = 40,
    Right = 39,
}

export enum Direction {
    Up,
    Left,
    Down,
    Right,
}

export enum GameStage {
    Menu,
    Game,
    Win,
    Loose,
}