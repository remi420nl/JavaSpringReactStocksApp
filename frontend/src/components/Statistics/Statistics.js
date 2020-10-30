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
  const [isLoaded,setIsLoaded] = useState(false)

  useEffect(() => {
    getPortfolios();
  }, []);

  useEffect(() => {
   calculateValues()
  },[portfolios])


  function getPortfolios() {
    getAllPortfolios().then((p) => {
      setPortfolios(p.data);
    })
  }

  function calculateValues (){
    
    if(portfolios){

      portfolios.forEach((portfolio) => {

        let sum = 0;
        portfolio.positions.forEach(position => 
         sum += position.value)
        
         portfolio['oldvalue'] = sum;
         portfolio['currentvalue'] = 0
         calculateCurrentValue(portfolio, (value) => {
          portfolio['currentvalue'] = value
          convertToTotal()
         
          
         })
    

      })

    }

   

    
  }

   function calculateCurrentValue (portfolio,callback) {

    const length = portfolio.positions.length;
    let count = 0;
    let sum = 0;

    portfolio.positions.map(position => {
    GetCurrentValue(position.stock, position.amount, (response) => {
       sum += response;
       console.log("response ", response)
      count++;
      console.log(count, length)
        if (length === count) {
          callback(sum);
        }
      })
    })

    }
  


  function convertToTotal(){

  
    let summarytotals = [];
    let summary = {}

    portfolios.forEach(p => {
     
      summary = {},
      summary['name'] = p.owner,
      summary['oldvalue'] = p.oldvalue,
      summary['newvalue'] = p.currentvalue,
      summary['difference'] = getDifference(summary['newvalue'],  summary['oldvalue'])
      summarytotals.push(summary);

    }
      )

  //sorting so the portfolio with highest interest (positive difference) is on top
  summarytotals.sort((a,b) => b.difference - a.difference)
    
    setTotals(summarytotals);
    
    setIsLoaded(true)
   
    }

    const getDifference = (newValue, oldValue) => {
     
      const difference = parseFloat((newValue - oldValue)/oldValue * 100).toFixed(2)
      if(!isNaN(difference)){
      return  parseFloat((newValue - oldValue)/oldValue * 100).toFixed(2)
      }else return 0
  
    }

  if (portfolios && portfolios.length > 0) {
    if(isLoaded){
    return (
      <div className="statistics">
        <div className="statisticscontent">
        <TableContainer  component={Paper}    classes={{ root: 'table-container' }}>
          <div>Aantal Deelnemers: {portfolios.length}</div>
          <Table>
            <TableHead
              className='table-header' >
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
                  <TableCell align="right">€{row.oldvalue.toFixed(2)}</TableCell>
                  <TableCell align="right">€{row.newvalue.toFixed(2)}</TableCell>
                  <TableCell align="right" style={{ color: row.difference >= 0 ? "green" : "red"}}>{row.difference} %</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
      </div>
    );}else{
      return <div>Portfolios laden..</div>;
    }
  } else {
    return <div>Er zijn geen portfolios in ons systeem</div>;
  }
}
