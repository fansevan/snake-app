import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {Button, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import * as actions from '../../actions';
import './Settings.css';

const styles = () => ({
    button: {
        display: 'flex',
        marginTop: 60
    },
    formControl: {
        minWidth: 80,
    }
});

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 240
        }
    }
};

const Width = {Min: 5, Max: 30};
const Height = {Min: 5, Max: 24};
const Speed = {Min: 1, Max: 10};

interface IOwnProps {
    classes: any
}

interface IStateProps {
    fieldWidth: number,
    fieldHeight: number,
    speed: number,
}

interface IDispatchProps {
    changeInputValue: (a: string, b: string) => void,
    startGame: () => void,
}

type Props = IOwnProps & IStateProps & IDispatchProps;

class Settings extends React.Component<Props> {
    render() {
        const {fieldWidth, fieldHeight, speed, classes, startGame} = this.props;

        return (
            <div className="Settings">
                <h1 className="Settings-header">SSSNAKE</h1>
                <div className="Settings-controls">
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="fieldWidth-id">Width</InputLabel>
                        <Select
                            value={fieldWidth}
                            onChange={this.handleChange}
                            inputProps={{name: 'fieldWidth', id: 'fieldWidth-id'}}
                            MenuProps={MenuProps}
                        >
                            {this.getMenuItems(Width.Min, Width.Max)}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="fieldHeight-id">Height</InputLabel>
                        <Select
                            value={fieldHeight}
                            onChange={this.handleChange}
                            inputProps={{name: 'fieldHeight', id: 'fieldHeight-id'}}
                            MenuProps={MenuProps}
                        >
                            {this.getMenuItems(Height.Min, Height.Max)}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="speed-id">Speed</InputLabel>
                        <Select
                            value={speed}
                            onChange={this.handleChange}
                            inputProps={{name: 'speed', id: 'speed-id'}}
                            MenuProps={MenuProps}
                        >
                            {this.getMenuItems(Speed.Min, Speed.Max)}
                        </Select>
                    </FormControl>
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={startGame}
                    className={classes.button}
                >
                    Start
                </Button>
                <div className="Settings-helper">Press "Space"</div>
            </div>
        );
    }

    getMenuItems = (min: number, max: number): JSX.Element[] => {
        const menuItems = [];
        for (let i = min; i <= max; i++) {
            menuItems.push(<MenuItem key={i} value={i}>{i}</MenuItem>)
        }
        return menuItems;
    };

    handleChange = (e: React.ChangeEvent) => {
        const {name, value}: any = e.target;
        this.props.changeInputValue(name, value);
    };
}

const mapStateToProps = ({fieldWidth, fieldHeight, speed}: IStateProps): IStateProps =>
    ({fieldWidth, fieldHeight, speed});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => {
    const {changeInputValue, startGame} = actions;
    return bindActionCreators({changeInputValue, startGame}, dispatch);
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Settings));