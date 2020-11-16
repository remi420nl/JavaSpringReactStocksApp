import React, { Component} from "react";
import { PortfolioHeader } from "./PortfolioHeader";
import Row from "./Row";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { fetchPortfoliosByUser } from "../../api";
import { GetCurrentValue } from "../Stocks/GetCurrentValue";
import PositionOptions from "./PositionOptions";
import {
  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";


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
    sorting: {},
    columnName: null,
    sort: true,
    stillGettingUpdates: true,
  };

  //If user is not logged in user will be redirected to the login page, else the potions will be loaded from the api using the updatePosition function
  componentDidMount() {
    if (!this.props.loginStatus) {
      this.props.history.push("/login");
    } else {
      this.updatePositions();
    }
  }

  ////functions for sorting the colums
  //getPropValue is to get the value of the property and from the Stock object nested in the Position object, which is seperated by a "." eg. "stock.name"
  getPropValue = (obj, column) => column.split(".").reduce((a, prop) => a[prop], obj);

  //Functon for ascending
  sortAscending = (a, b) => {
    const { columnName } = this.state;
    const fieldA = this.getPropValue(a, columnName);

    //If its a string it needs different sorting
    return typeof fieldA === "string"
      ? fieldA.localeCompare(this.getPropValue(b, columnName))
      : fieldA - this.getPropValue(b, columnName);
  };

  //Function for descending sorting
  sortDescending = (a, b) => {
    const { columnName } = this.state;
    const fieldA = this.getPropValue(a, columnName);

    return typeof fieldA === "string"
      ? this.getPropValue(b, columnName).localeCompare(fieldA)
      : this.getPropValue(b, columnName) - fieldA;
  };

  //Sort function gets called initialy on loading component and when column is clicked.
  //Direction gets saved into state as well as the column (object property name)
  sortTable = (column) => {
    const { portfolio, sorting } = this.state;
    let positions = [...portfolio.positions];

    let direction = sorting[`${column}`] === "dsc" ? "asc" : "dsc";

    this.setState(
      {
        sorting: { ...sorting, [`${column}`]: direction },
        columnName: column,
      },
      () => {
        //callback after setstate, based on the previous state the right sorting direction gets called and the appropriate fucked gets passed into the Array.sort function
        direction === "asc"
          ? positions.sort(this.sortAscending)
          : positions.sort(this.sortDescending);

        //setting state by spreading the portfolio and overwriting the positions property
        this.setState({
          portfolio: { ...portfolio, positions: positions },
        });
      }
    );
  };

  //first setting state to false to make sure after an update like a stock sell only the updated positions are shown
  updatePositions = () => {
    this.setState({ isLoaded: false });

    fetchPortfoliosByUser()
      .then(({ data }) => {
        this.setState({
          portfolio: data,
          selectedPositions: [],
          competition: data.competition,
        });
      })
      //updating current price to show the most recent value
      .then(() => {
        this.setCurrentPrice(() => {
         
          let old = 0;
          let current = 0;
          this.state.portfolio.positions.map(p =>  (
            (old += p.value), (current += p.currentvalue)
            )
          );
          this.setState({
            isLoaded: true,
            oldTotalValue: old,
            currentTotalValue: current,
          });
        });
        //initialy it sort everything by name
        this.sortTable("stock.name");
      });
  };

  //Setting the current (most recent) price for each stock using an external function (since we need it also in the statistics page)
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

        //check if API returned a value (limit not reached) other wise skip
        let newvalue = 0
        let errors = 0;
        if(response){
          newvalue = response
        }else{
          errors++
        }

        //setting properties for each positions object
        p["currentvalue"] = parseFloat(newvalue);
        p["difference"] = parseFloat(
          ((newvalue - p.value) / p.value) * 100
        ).toFixed(2);
        count++;
    
        if (length  === count) {
          count = 0;
          callback();
          this.setState({
            stillGettingUpdates : errors > 0 ? true : false
          });
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

    const {
      portfolio,
      isLoaded,
      currentTotalValue,
      oldTotalValue,
      selectedPositions,
      columnName,
      stillGettingUpdates
    } = this.state;

    //selection a position (to sell or update), *update functionality not implemented
    const selectPosition = (id, name, currentvalue) => {
      const { selectedPositions } = this.state;

      let index = selectedPositions.map((p) => p.id).indexOf(id);

      //if the index of the item is not in the selected state array it gets added to the array
      if (index == -1) {
        this.setState((prevState) => ({
          selectedPositions: [
            ...prevState.selectedPositions,
            { id: id, name: name, currentvalue: currentvalue},
          ],
        }));
      } else {
        //else it gets removed from the array
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
           <p>{stillGettingUpdates ? "Nog niet alle koersen bijgewerkt.." : ""}</p>
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
                      <TableCell
                        classes={{
                          root:
                            columnName == "stock.name" ? "sortedcolumn" : "",
                        }}
                        onClick={() => this.sortTable("stock.name")}
                        align="left"
                      >
                        Naam
                      </TableCell>
                      <TableCell
                        className={
                          columnName == "stock.symbol" ? "sortedcolumn" : ""
                        }
                        onClick={() => this.sortTable("stock.symbol")}
                        align="right"
                      >
                        Symbool
                      </TableCell>
                      <TableCell
                        className={columnName == "amount" ? "sortedcolumn" : ""}
                        onClick={() => this.sortTable("amount")}
                        align="right"
                      >
                        Aantal
                      </TableCell>
                      <TableCell
                        className={columnName == "value" ? "sortedcolumn" : ""}
                        onClick={() => this.sortTable("value")}
                        align="right"
                      >
                        Aanschaf Waarde
                      </TableCell>
                      <TableCell
                        className={
                          columnName == "currentvalue" ? "sortedcolumn" : ""
                        }
                        onClick={() => this.sortTable("currentvalue")}
                        align="right"
                      >
                        Huidige Waarde
                      </TableCell>
                      <TableCell
                        className={
                          columnName == "difference" ? "sortedcolumn" : ""
                        }
                        onClick={() => this.sortTable("difference")}
                        align="right"
                      >
                        Rendement
                      </TableCell>
                      <TableCell align="right">Actie</TableCell>
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

//function to render each row
export default Portfolio;
