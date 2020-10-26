import React, { Component, useState, useEffect } from "react";
import { PortfolioHeader } from "./PortfolioHeader";
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

    currentvalue: {},
    difference: {},
    isLoaded: false,
    currentTotalValue: 0,
    oldTotalValue: 0,
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

  //getting the updated value which are being calculation in the Row function and being passed passed back
  // to this parent class

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
    fetchPortfoliosByUser()
      .then((response) => {
        this.setState({
          portfolio: response.data,
          selectedPositions: [],
        });
      })
      .then(() =>
        this.setCurrentPrice(() => {
          let old = 0;
          let current = 0;
          this.state.portfolio.positions.map((p) => {
            (old += p.value),
              (current += p.currentvalue),
              this.setState({
                isLoaded: true,
                oldTotalValue: old,
                currentTotalValue: current.toFixed(2),
              });
          });
        })
      );
  };

  setCurrentPrice = async (callback) => {
    const length = this.state.portfolio.positions.length;
    let count = 0;
    this.state.portfolio.positions.map((p) => {
      GetCurrentValue(p.stock, p.amount, (response) => {
        p["currentvalue"] = parseFloat(response);
        p["difference"] = parseFloat(
          ((response - p.value) / p.value) * 100
        ).toFixed(2);
        count++;
        if (length === count) {
          callback();
        }
      });
    });
  };

  render() {
    const { portfolio, userdetails, isLoaded } = this.state;

    const selectPosition = (id) => {
      const { selectedPositions } = this.state;

      const index = selectedPositions.indexOf(id);

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
      isLoaded &&
      Array.isArray(portfolio.positions) &&
      userdetails !== null
    ) {
      return (
        <div className="portfolio">
          <PortfolioHeader
            owner={portfolio.owner}
            description={portfolio.description}
            currentTotalValue={this.state.currentTotalValue}
            oldTotalValue={this.state.oldTotalValue}
          />

          <div className="portfoliocontent">
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
            <div className="optionsbutton">
              <PositionOptions
                selectedPositions={this.state.selectedPositions}
                updatePositions={this.updatePositions}
              />
            </div>
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
    //getDifference();
  }, [!isLoaded]);


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
        <TableCell align="right">€{row.currentvalue.toFixed(2)}</TableCell>
        <TableCell
          align="right"
          style={{ color: row.difference >= 0 ? "green" : "red" }}
        >
          {row.difference} %
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
              <Table size="small">
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
                      <TableCell align="right">
                        €{row.price.toFixed(2)}
                      </TableCell>
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
}

export default Portfolio;
