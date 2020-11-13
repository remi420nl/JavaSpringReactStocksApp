import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { getAllPortfolios } from "../../api/index";
import { GetCurrentValue } from "../Stocks/GetCurrentValue";
import { MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import StatisticsHeader from "./StatisticsHeader";

export default function Statistics() {
  const [portfolios, setPortfolios] = useState([]);
  const [totals, setTotals] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pricesUpToDate, setPricesUpToDate] = useState(false);

  //first it gets the portfolios, second useeffect is doest get triggered
  useEffect(() => {
    getPortfolios();
  }, []);

  //after the portfolios state has been altered it triggers the calculate values function
  useEffect(() => {
    calculateValues();
  }, [portfolios]);

  //getting al the portfolios from the API, which are public accessible, and filters the one that have the competition value as true
  function getPortfolios() {
    getAllPortfolios().then(({ data }) => {
      setPortfolios(data.filter((x) => x.competition));
    });
  }

  //for each portfolio it calculates the summary for all positions plus also checking the latest value from the Stock API
  function calculateValues() {
    if (portfolios) {
      portfolios.forEach((portfolio) => {
        //setting values for porfolios with no positions
        if (portfolio.positions.length < 1) {
          portfolio["oldvalue"] = 0;
          portfolio["currentvalue"] = 0;
        }
        if (portfolio.positions.length > 0) {
          let sum = 0;
          portfolio.positions.forEach((position) => (sum += position.value));

          portfolio["oldvalue"] = sum;
          portfolio["currentvalue"] = 0;

          calculateCurrentValue(portfolio, (value) => {
        
            portfolio["currentvalue"] = value;
          });
        }
      });
    }
    convertToTotal();
  }

  //getting and calculting the current position values
  function calculateCurrentValue(portfolio, callback) {
    const length = portfolio.positions.length;
    let count = 0;
    let sum = 0;
    let errors = 0;

    //passing a callback function to be able to get the proper value from the async function which otherwise would return undefined
    portfolio.positions.map((position) => {
      GetCurrentValue(position.stock, position.amount, (response) => {
        if(response){
          count++;
          sum += response;
        }else{
          errors++
        }
        //then passing the total sum to the callback in the calculateValues function
        if (length === count) {
          callback(sum);
          setPricesUpToDate(true)
        }
        if(errors > 0){
          callback(sum)
          setPricesUpToDate(false)
        }
        
      }
      );
      
    });
  }

  //converts everything so there is a array with all totals which will be used in the render function
  function convertToTotal() {
    let summarytotals = [];
    let summary = {};

    portfolios.map(
      (p) => (
        (summary = {}),
        (summary["name"] = p.owner),
        (summary["oldvalue"] = p.oldvalue),
        (summary["newvalue"] = p.currentvalue),
        (summary["difference"] = getDifference(summary["newvalue"],summary["oldvalue"]
        )),
        summarytotals.push(summary)
      )
    );

    //sorting so the portfolio with highest interest (positive difference) is on top
    summarytotals.sort((a, b) => b.difference - a.difference);

    setTotals(summarytotals);
    setIsLoaded(true);
  }

  const theme = createMuiTheme({
    typography: {
      fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
      fontSize: 18,
      fontWeight: 500,
    },
  });

  //getting the difference in % and 2 decimals
  const getDifference = (newValue, oldValue) => {
    const difference = parseFloat(
      ((newValue - oldValue) / oldValue) * 100
    ).toFixed(2);
    if (!isNaN(difference)) {
      return parseFloat(((newValue - oldValue) / oldValue) * 100).toFixed(2);
    } else return 0;
  };

  if (portfolios && portfolios.length > 0) {
    if (isLoaded) {
      return (
        <div className="statistics">
          <h2 className="pagetitle">Klassement</h2>
          <StatisticsHeader amount={portfolios.length} />
          <p>{!pricesUpToDate ? "Nog niet alle koersen bijgewerkt.." : ""}</p>
          <div className="statisticscontent">
            <MuiThemeProvider theme={theme}>
              <TableContainer
                component={Paper}
                classes={{ root: "table-container" }}
              >
                <Table>
                  <TableHead className="table-header">
                    <TableRow>
                      <TableCell>Plaats</TableCell>
                      <TableCell align="right">Naam</TableCell>
                      <TableCell align="right">Aanschaf Waarde</TableCell>
                      <TableCell align="right">Huidige Waarde</TableCell>
                      <TableCell align="right">Rendement</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {totals.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell align="center">{i + 1}</TableCell>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">
                          €{row.oldvalue.toFixed(2)}
                        </TableCell>
                        <TableCell align="right">
                          €{row.newvalue.toFixed(2)}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: row.difference >= 0 ? "green" : "crimson",
                            fontWeight: "700",
                            fontSize: "1.1em",
                          }}
                        >
                          {row.difference} %
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </MuiThemeProvider>
          </div>
        </div>
      );
    } else {
      return <div>Portfolios laden..</div>;
    }
  } else {
    return <div>Er zijn geen portfolios in ons systeem</div>;
  }
}
