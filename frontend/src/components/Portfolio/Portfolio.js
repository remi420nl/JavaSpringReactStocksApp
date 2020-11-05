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
import { createMuiTheme } from "@material-ui/core/styles";
import { fetchPortfoliosByUser, fetchUserDetails } from "../../api";
import { GetCurrentValue } from "../Stocks/GetCurrentValue";
import PositionOptions from "../position/PositionOptions";
import { MuiThemeProvider } from "@material-ui/core/styles";

class Portfolio extends Component {
  constructor(props) {
    super();
  }
  state = {
    portfolio: null,
    selectedPositions: [],
    currentvalue: {},
    difference: {},
    isLoaded: false,
    currentTotalValue: 0,
    oldTotalValue: 0,
    competition: null,
    sorting : {},
    columnName: null
  };

  componentDidMount() {
    if (!this.props.loginStatus) {
      this.props.history.push("/login");
    } else {
      this.updatePositions();
    }
  }

  ////Functions for sorting the colums
  //getPropValue is to get the property from the Stock object in the Position object, which is seperated by a "."
  getPropValue = (obj, col) => col.split('.').reduce((a, prop) => 
    a[prop], obj
  );

  //Functon for ascending 
  sortAscending = (a, b) => {
    const {columnName} = this.state
    const fieldA = this.getPropValue(a, columnName);
  
    //if its a string it needs different sorting
    return typeof fieldA === 'string'
    ? fieldA.localeCompare(this.getPropValue(b, columnName))
    : fieldA - this.getPropValue(b, columnName);
  };
  
  //Function for descending sorting
  sortDescending = (a, b) => {
    const {columnName} = this.state
    const fieldA = this.getPropValue(a, columnName);

    return typeof fieldA === 'string'
    ? this.getPropValue(b, columnName).localeCompare(fieldA)
    : this.getPropValue(b, columnName) - fieldA ;
  };

//Sort function gets called initialy on loading component and when column is clicked. Direction gets saved into state as well as the column (object property name)
  sortTable = (column) => {

    const { portfolio,sorting } = this.state;
    let positions = [...portfolio.positions]

    let direction = sorting[`${column}`] === "dsc" ? "asc" : "dsc"

    this.setState({
      sorting: {...sorting, [`${column}`] : direction},
      columnName : column
    }, ()=> {
      //callback after setstate, based on the previous state the right sorting direction gets called and the appropriate fucked gets passed into the Array.sort function
      direction === "asc" ?
      positions.sort(this.sortAscending) :
      positions.sort(this.sortDescending)
     
      //setting state by spreading the portfolio and overwriting the positions property
      this.setState({
        portfolio : {...portfolio, positions : positions}
      })
    })
  };

  updatePositions = () => {
    fetchPortfoliosByUser()
      .then(({ data }) => {
        this.setState({
          portfolio: data,
          selectedPositions: [],
          competition: data.competition,
        });
      })
      .then(() => {
        this.setCurrentPrice(() => {
          let old = 0;
          let current = 0;
          this.state.portfolio.positions.map((p) => {
            (old += p.value), (current += p.currentvalue);
          });
          this.setState({
            isLoaded: true,
            oldTotalValue: old,
            currentTotalValue: current,
          });
        });
        this.sortTable("stock.name");
      });
  };

  setCurrentPrice = async (callback) => {
    const {
      portfolio: { positions },
    } = this.state;
    //to continue when an empty portfolio is being passed
    if (positions.length < 1) {
      callback();
    }
    const length = positions.length;
    let count = 0;
    positions.map((p) => {
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
    const theme = createMuiTheme({
      typography: {
        fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
        fontSize: 18,
        fontWeight: 500,
      },
    });

    const { portfolio, isLoaded, currentTotalValue, oldTotalValue, selectedPositions} = this.state;

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

    if (isLoaded && Array.isArray(portfolio.positions)) {
      return (
        <div className="portfolio">
          <PortfolioHeader
            owner={portfolio.owner}
            id={portfolio.id}
            description={portfolio.description}
            currentTotalValue={currentTotalValue}
            oldTotalValue={oldTotalValue}
            competition={portfolio.competition}
            cash={portfolio.cash}
          />
          <div className="portfoliocontent">
            <MuiThemeProvider theme={theme}>
              <TableContainer
          
                component={Paper}
                classes={{ root: "table-container" }}
              >
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>Soort</TableCell>
                      <TableCell onClick={()=> this.sortTable("stock.name")} align="left">Naam</TableCell>
                      <TableCell onClick={()=> this.sortTable("stock.symbol")}  align="right">Symbool</TableCell>
                      <TableCell onClick={()=> this.sortTable("amount")}  align="right">Aantal</TableCell>
                      <TableCell onClick={()=> this.sortTable("value")}  align="right">Aanschaf Waarde</TableCell>
                      <TableCell onClick={()=> this.sortTable("currentvalue")}  align="right">Huidige Waarde</TableCell>
                      <TableCell onClick={()=> this.sortTable("difference")}  align="right" >
                        Rendement
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {portfolio.positions.map((row, key) => (
                      <Row
                        key={key}
                        row={row}
                        selectedPositions={selectedPositions}
                        selectPosition={selectPosition}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </MuiThemeProvider>
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
      return <div className="portfolio">Laden..</div>;
    }
  }
}

function Row(props) {
  const { row, selectedPositions, selectPosition } = props;
  const [open, setOpen] = useState(false);
  const [isLoaded, setIsloaded] = useState(false);

  useEffect(() => {}, [!isLoaded]);

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
          style={{ color: row.difference >= 0 ? "green" : "crimson" }}
        >
          {row.difference} %
        </TableCell>
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
