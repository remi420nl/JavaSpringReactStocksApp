import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { getAllPortfolios } from "../../api/index";
import { GetCurrentValue } from "../Stocks/GetCurrentValue";

// https://material-ui.com/components/tables/
const useStyles = makeStyles({
  table: {
    maxWidth: 600,
  },
});


export default function Statistics() {
  const classes = useStyles();
  const [portfolios, setPortfolios] = useState([]);
  const [totals,setTotals] = useState([])

  useEffect(() => {
    getPortfolios();
  }, []);

  useEffect(() => {
    convertToTotal()
  },[portfolios])


  function getPortfolios() {
    getAllPortfolios().then((p) => {
      setPortfolios(p.data);
    });
  }

  function calculateOldValue (positions){
    let sum = 0;

   positions.forEach(p => sum += p.value);

   return sum;

  }

  function calculateCurrentValue(positions){

    let sum = 0;

    positions.forEach(p =>{
    sum += GetCurrentValue(p.stock, p.amount)
 
    })
    console.log("end of loop", sum)
    return sum;

  }


  function convertToTotal(){
    console.log(portfolios);
    let summarytotals = [];
    let summary = {}

    portfolios.forEach(p => {
      summary = {},
      summary['name'] = p.owner,
      summary['oldvalue'] = calculateOldValue(p.positions),
      summary['newvalue'] = calculateCurrentValue(p.positions) 
      summary['interest'] = getDifference(summary['newvalue'],  summary['oldvalue'])
      summarytotals.push(summary);
    }
      )

  //sorting so the portfolio with highest interest (positive difference) is on top
  summarytotals.sort((a,b) => b.interest - a.interest)
    
    setTotals(summarytotals);
    }

    const getDifference = (newValue, oldValue) => {
     
      const difference = parseFloat((newValue - oldValue)/oldValue * 100).toFixed(2)
      if(!isNaN(difference)){
      return  parseFloat((newValue - oldValue)/oldValue * 100).toFixed(2)
      }else return 0
  
    }

  if (portfolios.length > 0) {
    return (
      <div className="statistics">
        <TableContainer className={classes.table} component={Paper}>
          <div>Aantal Deelnemers: {portfolios.length}</div>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Plaats</TableCell>
                <TableCell align="right">Naam</TableCell>
                <TableCell align="right">Aanschaf Waarde</TableCell>
                <TableCell align="right">Huidige Waarde</TableCell>
                <TableCell align="right">Rendement</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {totals.map((row,i) => (
                <TableRow key={i}>
                  <TableCell>{i+1}</TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.oldvalue}</TableCell>
                  <TableCell align="right">{row.newvalue}</TableCell>
                  <TableCell align="right" style={{ color: row.interest > 0 ? "green" : "red"}}>{row.interest} %</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  } else {
    return <div>Er zijn geen portfolios in ons systeem</div>;
  }
}
