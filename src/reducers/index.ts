import {AnyAction} from 'redux';
import {IStoreState, GameStage} from '../types';
import {
    CHANGE_INPUT_VALUE,
    CHANGE_GAME_STAGE,
    RECONFIGURE_FIELD,
    CHANGE_THROUGH_WALLS_FLAG
} from '../actions';

export const InitialSnake = [{x: 1, y: 1}, {x: 2, y: 1}];

const initialState: IStoreState = {
    fieldHeight: 10,
    fieldWidth: 10,
    speed: 5,
    gameStage: GameStage.Menu,
    snake: InitialSnake,
    isThroughWalls: false
};

export default function reducer(state: IStoreState = initialState, action: AnyAction): IStoreState {
    const {type, payload} = action;

    switch (type) {
        case CHANGE_INPUT_VALUE: {
            const {name, value} = payload;
            return {
                ...state,
                [name]: value
            };
        }
        case CHANGE_GAME_STAGE: {
            return {
                ...state,
                gameStage: payload,
            };
        }
        case RECONFIGURE_FIELD: {
            const {snake, apple = state.apple} = payload;
            return {
                ...state,
                snake,
                apple
            };
        }
        case CHANGE_THROUGH_WALLS_FLAG: {
            return {
                ...state,
                isThroughWalls: payload
            };
        }
        default:
            return state;
    }
}
