import * as React from 'react';
import {connect} from 'react-redux';
import {InitialSnake} from '../../reducers'
import {ICell} from '../../types'
import './GameOver.css';

interface IOwnProps {
    isWin: boolean
}

interface IStateProps {
    snake: ICell[],
}

type Props = IOwnProps & IStateProps;

function GameOver({snake, isWin}: Props) {
    const score = snake.length - InitialSnake.length;
    const label = isWin ? 'Congratulations :)' : 'Game Over :(';

    return (
        <div className="GameOver">
            <h1>{label}</h1>
            <div>Your score: {score}</div>
            <div className="GameOver-helper">(Press "Space" to back to menu)</div>
        </div>
    );
}

const mapStateToProps = ({snake}: IStateProps): IStateProps => ({snake});

export default connect(mapStateToProps)(GameOver);