import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {Paper, CssBaseline} from '@material-ui/core';
import * as actions from '../../actions';
import './App.css';
import {GameStage} from '../../types';
import Field from '../Field';
import Settings from '../Settings';
import GameOver from '../GameOver';

const SpaceKeyCode = 32;

interface IStateProps {
    gameStage: GameStage,
}

interface IDispatchProps {
    changeGameStage: (gameStage: GameStage) => void
    startGame: () => void
}

type Props = IStateProps & IDispatchProps;

class App extends React.Component<Props> {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown, false);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown, false);
    }

    render() {
        return (
            <Paper className="App">
                <CssBaseline/>

                {this.getContent()}
            </Paper>
        );
    }

    getContent = (): JSX.Element => {
        const {gameStage} = this.props;

        switch (gameStage) {
            case GameStage.Menu:
                return <Settings/>;
            case GameStage.Game:
                return <Field/>;
            case GameStage.Win:
            case GameStage.Loose:
                return <GameOver isWin={gameStage === GameStage.Win}/>;
        }
    };

    handleKeyDown = (e: KeyboardEvent) => {
        if (e.keyCode === SpaceKeyCode) {
            const {gameStage, startGame, changeGameStage} = this.props;

            switch (gameStage) {
                case GameStage.Menu:
                    startGame();
                    break;
                case GameStage.Win:
                case GameStage.Loose:
                    changeGameStage(GameStage.Menu);
                    break;
            }
        }
    }
}

const mapStateToProps = ({gameStage}: IStateProps): IStateProps => ({gameStage});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => {
    const {changeGameStage, startGame} = actions;
    return bindActionCreators({changeGameStage, startGame}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);