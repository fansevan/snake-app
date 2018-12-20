import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        background: {
            paper: "#ffd180",
            default: '#eee'
        }
    },
    typography: {
        useNextVariants: true
    }
});

export default theme;