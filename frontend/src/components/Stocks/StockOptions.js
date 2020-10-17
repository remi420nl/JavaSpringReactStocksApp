
import React, {useState}from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import {Button} from '@material-ui/core/';

export const StockOptions = (props) => {

    const [amount, setAmount] = useState();

    const useStyles = makeStyles((theme) => ({
        margin: {
          margin: theme.spacing(1),
        },
      }));

    const classes = useStyles();
  
    const { submitPosition } = props;
   

    const BootstrapInput = withStyles((theme) => ({
        root: {
          'label + &': {
            marginTop: theme.spacing(3),
          },
        },
        input: {
          borderRadius: 4,
          width: 25,
          position: 'relative',
          backgroundColor: theme.palette.background.paper,
          border: '1px solid #ced4da',
          fontSize: 16,
          padding: '10px 26px 10px 12px',
          transition: theme.transitions.create(['border-color', 'box-shadow']),
          // Use the system font instead of the default Roboto font.
          fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
          '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
          },
        },
      }))(InputBase);
      

      
return(
    <div className="stockoptions">
      <FormControl className={classes.margin}>
      <InputLabel htmlFor="demo-customized-textbox">Aantal</InputLabel>
      <BootstrapInput onChange={(e) => setAmount(e.target.value)} value={amount} id="demo-customized-textbox" />
    </FormControl>
    <Button
    disabled={!amount>0} 
    onClick={() => submitPosition(amount)}>Toevoegen</Button>
  </div>
)
}