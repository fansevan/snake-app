import * as React from 'react';
import cs from 'classnames'
import './Cell.css';

interface IOwnProps {
    size: number,
    isSnake: boolean,
    isSnakeHead: boolean,
    isApple: boolean
}

function Cell({size, isSnake, isSnakeHead, isApple}: IOwnProps) {
    const cellStyle = {width: size, height: size};
    const classNames = cs('Cell', {
        'Cell-snake': isSnake,
        'Cell-snakeHead': isSnakeHead,
        'Cell-apple': isApple
    });

    return (
        <div className={classNames} style={cellStyle}/>
    );
}

export default React.memo(Cell);