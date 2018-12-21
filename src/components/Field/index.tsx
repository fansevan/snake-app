import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import './Field.css';
import * as actions from '../../actions';
import {ICell, KeyCode, Direction, GameStage} from '../../types';
import Cell from './Cell';
import {generateRandomApple, checkSnakeCell} from '../../common';


interface IStateProps {
    fieldWidth: number,
    fieldHeight: number,
    speed: number,
    isThroughWalls: number,
    snake: ICell[],
    apple: ICell,
}

interface IDispatchProps {
    changeGameStage: (gameStage: GameStage) => void,
    reconfigureField: (snake: ICell[], apple?: ICell) => void,
}

type Props = IStateProps & IDispatchProps;

const CELL_SIZE = 25;

class Field extends React.Component<Props> {
    timer: number;
    direction: number;

    constructor(props: Props) {
        super(props);
        this.direction = Direction.Down;
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown, false);
        this.startMoving();
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown, false);
        setTimeout(() => clearTimeout(this.timer), 0);
    }

    render() {
        const {fieldWidth, fieldHeight, snake, apple: {x: appleX, y: appleY}} = this.props;
        const cells = [];
        const {x: snakeHeadX, y: snakeHeadY} = snake[snake.length - 1];

        for (let i = 0; i < fieldHeight; i++) {
            for (let j = 0; j < fieldWidth; j++) {
                const isSnakeCell = checkSnakeCell(snake, {x: i, y: j});
                const isSnakeHead = snakeHeadX === i && snakeHeadY === j;
                const isApple = appleX === i && appleY === j;

                cells.push(
                    <Cell
                        key={`${i},${j}`}
                        size={CELL_SIZE}
                        isSnake={isSnakeCell}
                        isSnakeHead={isSnakeHead}
                        isApple={isApple}
                    />
                )
            }
        }

        const fieldStyle = {width: fieldWidth * CELL_SIZE, height: fieldHeight * CELL_SIZE};

        return (
            <div className="Field" style={fieldStyle}>
                {cells}
            </div>
        );
    }

    startMoving = () => {
        const delay = 1000 - (this.props.speed - 1) * 100;

        const self = this;
        this.timer = window.setTimeout(function run() {
            self.moveSnake();
            self.timer = window.setTimeout(run, delay);
        }, delay);
    };

    handleKeyDown = (e: KeyboardEvent) => {
        if (this.checkDirectionKey(e.keyCode)) {
            e.preventDefault();
            const snakeDirection = this.getSnakeDirection();
            const isUpOrDown = snakeDirection === Direction.Up || snakeDirection === Direction.Down;
            const isLeftOrRight = snakeDirection === Direction.Left || snakeDirection === Direction.Right;

            switch (e.keyCode) {
                case KeyCode.W:
                case KeyCode.Up:
                    if (isUpOrDown) return;
                    this.direction = Direction.Up;
                    break;
                case KeyCode.A:
                case KeyCode.Left:
                    if (isLeftOrRight) return;
                    this.direction = Direction.Left;
                    break;
                case KeyCode.S:
                case KeyCode.Down:
                    if (isUpOrDown) return;
                    this.direction = Direction.Down;
                    break;
                case KeyCode.D:
                case KeyCode.Right:
                    if (isLeftOrRight) return;
                    this.direction = Direction.Right;
                    break;
                default:
                    break;
            }
        }
    };

    checkDirectionKey = (keyCode: number): boolean => Object.values(KeyCode).includes(keyCode);

    getSnakeDirection = (): number => {
        const {snake} = this.props;
        const {x: headX, y: headY} = snake[snake.length - 1];
        const {x: neckX, y: neckY} = snake[snake.length - 2];

        if (headX > neckX) {
            return Direction.Up;
        } else if (headX < neckX) {
            return Direction.Down;
        } else if (headY > neckY) {
            return Direction.Right;
        } else {
            return Direction.Left;
        }
    };

    moveSnake = () => {
        const {
            snake,
            apple,
            reconfigureField,
            changeGameStage,
            fieldWidth,
            fieldHeight
        } = this.props;

        const newCell: ICell = this.getNextCell();

        if (this.checkMoveValid(newCell)) {
            let newApple: ICell | undefined;
            let newSnake: ICell[];
            const isAppleEaten = apple.x === newCell.x && apple.y === newCell.y;

            if (isAppleEaten) {
                if (snake.length === fieldWidth * fieldHeight - 1) {
                    changeGameStage(GameStage.Win);
                    return;
                }
                newApple = generateRandomApple(fieldWidth, fieldHeight, snake, apple);
            }

            newSnake = snake.slice(Number(!isAppleEaten)).concat(newCell);

            reconfigureField(newSnake, newApple);
        } else {
            changeGameStage(GameStage.Loose);
        }
    };

    getNextCell = (): ICell => {
        const {snake, isThroughWalls, fieldWidth, fieldHeight} = this.props;

        let {x, y} = snake[snake.length - 1];

        switch (this.direction) {
            case Direction.Up:
                x -= 1;
                break;
            case Direction.Left:
                y -= 1;
                break;
            case Direction.Down:
                x += 1;
                break;
            case Direction.Right:
                y += 1;
                break;
            default:
                break;
        }

        if (isThroughWalls) {
            if (x < 0) {
                x = fieldHeight - 1;
            } else if (x > fieldHeight - 1) {
                x = 0;
            }
            if (y < 0) {
                y = fieldWidth - 1;
            } else if (y > fieldWidth - 1) {
                y = 0;
            }
        }

        return {x, y};
    };

    checkMoveValid = ({x, y}: ICell): boolean => {
        const {fieldWidth, fieldHeight, snake, isThroughWalls} = this.props;
        const isOutOfField = !isThroughWalls && (x < 0 || y < 0 || x > fieldHeight - 1 || y > fieldWidth - 1);
        return !isOutOfField && !checkSnakeCell(snake, {x, y});
    };
}

const mapStateToProps = ({fieldWidth, fieldHeight, snake, apple, speed, isThroughWalls}: IStateProps): IStateProps =>
    ({fieldWidth, fieldHeight, snake, apple, speed, isThroughWalls});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => {
    const {changeGameStage, reconfigureField} = actions;
    return bindActionCreators({changeGameStage, reconfigureField}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Field);