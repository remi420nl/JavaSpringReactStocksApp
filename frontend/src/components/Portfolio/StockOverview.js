import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { fetchPortfoliosByUser, fetchUserDetails} from "../../api";
import {GetLatestPrice} from '../Stocks/GetLatestPrice'
import PositionOptions from "../position/PositionOptions";


class StockOverview extends Component {
  constructor(props) {
    super();
  }
  state = {
    portfolio: null,
    userdetails: null,
  };

  componentDidMount() {
    if (!this.props.loginStatus) {
      this.props.history.push("/login");
    } else {
      fetchPortfoliosByUser().then((response) => {
        this.setState({
          portfolio: response.data,
        });
      });
      fetchUserDetails().then((details) => {
      
        this.setState({
          userdetails: details.data,
        });
      });
   
    }
  }

  render() {
    const { portfolio, userdetails } = this.state;

    const options = [
      {
        id: 1,
        name: "delete",
      },
      {
        id: 2,
        name: "update",
      },
      {
        id: 3,
        name: "dummy",
      },
    ];


    if (portfolio && Array.isArray(portfolio.positions) && userdetails !== null) {

    return (
      <div className="portfolio">
        <div className="portfoliocontent">
      <h3>Portfolio van: {portfolio.owner}</h3>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Soort</TableCell>
            <TableCell align="right">Naam</TableCell>
            <TableCell align="right">Symbool</TableCell>
            <TableCell align="right">Aantal</TableCell>
            <TableCell align="right">Aanschaf Waarde</TableCell>
            <TableCell align="right">Huidige Waarde</TableCell>
            <TableCell align="right">Verschil</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {portfolio.positions.map((row,key) => (
            <Row key={key} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>


            <PositionOptions options={options} />
          </div>
        </div>
     
    );}else{
      return <div>loading..</div>;
    }
 
          }     
}

const TableCells = (symbol,amount,oldValue) => {

  const currentValue = getCurrentValue(symbol,amount);

  const difference =  parseFloat((currentValue - oldValue)/oldValue * 100).toFixed(2)


  return (<>
    <TableCell align="right">{currentValue}</TableCell>
        <TableCell align="right" style={{ color: difference > 0 ? "green" : "red"}}>{difference} %</TableCell>
        </>
  )
}

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const getCurrentValue  = (ticker,amount) => {
const price = GetLatestPrice(ticker);

return price * amount;
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          Aandeel
        </TableCell>
        <TableCell  align="left" style={{fontWeight:"bolder"}}>{row.stock.name}</TableCell>
        <TableCell align="right">{row.stock.symbol}</TableCell>
        <TableCell align="right">{row.amount}</TableCell>
        <TableCell align="right">{row.value}</TableCell>
        {TableCells(row.stock.symbol,row.amount,row.value)}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Geschiedenis
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Datum</TableCell>
                    <TableCell>Aantal</TableCell>
                    <TableCell align="right">Aanschafprijs</TableCell>
                    <TableCell align="right">Totaal In Euro</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {row.history.map((row,key) =>     <TableRow key={key}>
                      <TableCell component="th" scope="row">
                      {row.date}
                      </TableCell>
                      <TableCell>{row.amount}</TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                      <TableCell align="right">
                        {Math.round(row.amount*row.price)}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };


export default StockOverview;
