import {Dispatch} from 'redux';
import {ICell, GameStage, IStoreState} from '../types';
import {InitialSnake} from '../reducers';
import {generateRandomApple} from '../common';

export const CHANGE_INPUT_VALUE = 'CHANGE_INPUT_VALUE';
export const CHANGE_GAME_STAGE = 'CHANGE_GAME_STAGE';
export const RECONFIGURE_FIELD = 'RECONFIGURE_FIELD';


export function changeInputValue(name: string, value: string) {
    return {
        type: CHANGE_INPUT_VALUE,
        payload: {name, value}
    };
}

export function changeGameStage(gameStage: GameStage) {
    return {
        type: CHANGE_GAME_STAGE,
        payload: gameStage
    };
}

export function reconfigureField(snake: ICell[], apple?: ICell) {
    return {
        type: RECONFIGURE_FIELD,
        payload: {snake, apple}
    };
}

export function startGame() {
    return (dispatch: Dispatch, getState: () => IStoreState) => {
        const {fieldWidth, fieldHeight, snake} = getState();
        const randomApple = generateRandomApple(fieldWidth, fieldHeight, snake);

        dispatch(reconfigureField(InitialSnake, randomApple));
        dispatch(changeGameStage(GameStage.Game));
    };
}