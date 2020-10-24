import React, { Component, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import { fetchPortfoliosByUser, fetchUserDetails } from "../../api";
import { GetCurrentValue } from "../Stocks/GetCurrentValue";
import PositionOptions from "../position/PositionOptions";

class Portfolio extends Component {
  constructor(props) {
    super();
  }
  state = {
    portfolio: null,
    userdetails: null,
    selectedPositions: [],
    positionsUpdated: false,
    currentvalue: {},
    difference: {},
    isLoaded: false,
  };

  componentDidMount() {
    if (!this.props.loginStatus) {
      this.props.history.push("/login");
    } else {
      this.updatePositions();

      fetchUserDetails().then((details) => {
        this.setState({
          userdetails: details.data,
        });
      });
    }
  }

  updatePositions = () => {
    //if argument is passed it means this index needs to be removed from the selected array since it has been removed
    // if(index){
    //   const updated = [...this.state.selectedPositions]
    //   console.log("updatedarray...... ", updated)
    //   updated.splice(index,1);
    //   this.setState({
    //     selectedPositions: updated
    //   })
    // }
    fetchPortfoliosByUser().then((response) => {
      console.log("fetching portfolio");
      this.setState({
        portfolio: response.data,
        selectedPositions: [],
      });
    });
  };

  render() {
    const { portfolio, userdetails } = this.state;

    const options = [
      {
        id: 1,
        name: "delete",
      },
      {
        id: 2,
        name: "update *not working yet",
      },
    ];

    const selectPosition = (id) => {
      const index = this.state.selectedPositions.indexOf(id);

      if (index == -1) {
        this.setState((prevState) => ({
          selectedPositions: [...prevState.selectedPositions, id],
        }));
      } else {
        const newarray = [...this.state.selectedPositions];
        newarray.splice(index, 1);

        this.setState({
          selectedPositions: newarray,
        });
      }
    };

    if (
      portfolio &&
      Array.isArray(portfolio.positions) &&
      userdetails !== null
    ) {
      return (
        <div className="portfolio">
          <div className="portfoliocontent">
            <h3>Portfolio van: {portfolio.owner}</h3>
            <h4>{portfolio.description}</h4>

            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Soort</TableCell>
                    <TableCell align="left">Naam</TableCell>
                    <TableCell align="right">Symbool</TableCell>
                    <TableCell align="right">Aantal</TableCell>
                    <TableCell align="right">Aanschaf Waarde</TableCell>
                    <TableCell align="right">Huidige Waarde</TableCell>
                    <TableCell align="right">Rendement</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {portfolio.positions.map((row, key) => (
                    <Row
                      key={key}
                      row={row}
                      selectedPositions={this.state.selectedPositions}
                      selectPosition={selectPosition}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <PositionOptions
              selectedPositions={this.state.selectedPositions}
              options={options}
              updatePositions={this.updatePositions}
            />
          </div>
        </div>
      );
    } else {
      return <div>loading..</div>;
    }
  }
}

//helper function to return the 2 last cells. To obtain cleaner code
//stock, amount, oldValue

function Row(props) {
  const { row, selectedPositions, selectPosition } = props;
  const [open, setOpen] = useState(false);
  const [isLoaded, setIsloaded] = useState(false);
  const [currentValue, setCurrentValue] = useState();
  const [difference, setDifference] = useState();
  // const classes = useRowStyles();

  useEffect(() => {
    getDifference(row.stock, row.amount, row.value);
  });

  const getDifference = async (stock, amount, oldValue) => {
    await GetCurrentValue(stock, amount, (response) => {
      setCurrentValue(response.toFixed(2));
      setDifference(
        parseFloat(((response - oldValue) / oldValue) * 100).toFixed(2)
      );
    }).then(() => setIsloaded(true));
  };

  if (isLoaded) {
    return (
      <React.Fragment>
        <TableRow
          onClick={() => selectPosition(row.id)}
          className={
            selectedPositions.indexOf(row.id) !== -1
              ? "selectedPosition"
              : "unselectedPosition"
          }
        >
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            Aandeel
          </TableCell>
          <TableCell align="left" style={{ fontWeight: "bolder" }}>
            {row.stock.name}
          </TableCell>
          <TableCell align="right">{row.stock.symbol}</TableCell>
          <TableCell align="right">{row.amount}</TableCell>
          <TableCell align="right">€{row.value.toFixed(2)}</TableCell>
          <TableCell align="right">€{currentValue}</TableCell>
          <TableCell
            align="right"
            style={{ color: difference > 0 ? "green" : "red" }}
          >
            {difference} %
          </TableCell>
          {/* <TableCell
          align="right"
          style={{ color: this.state.difference[row.id] > 0 ? "green" : "red" }}
        >
          {this.state.difference[row.id].toFixed(2)} %
        </TableCell> */}
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Transactie Geschiedenis
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
                    {row.history.map((row, key) => (
                      <TableRow key={key}>
                        <TableCell component="th" scope="row">
                          {row.date}
                        </TableCell>
                        <TableCell>{row.amount}</TableCell>
                        <TableCell align="right">€{row.price.toFixed(2)}</TableCell>
                        <TableCell align="right">
                          €{(row.amount * row.price).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  } else {
    return <>gegevens ophalen..</>;
  }
}

export default Portfolio;
