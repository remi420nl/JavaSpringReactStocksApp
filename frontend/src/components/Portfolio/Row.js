import React, {useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";



export default function Row(props) {
    const { row, selectedPositions, selectPosition } = props;
    const [open, setOpen] = useState(false);
    const [isLoaded, setIsloaded] = useState(false);
  
    useEffect(() => {}, [!isLoaded]);
  
    return (
      <React.Fragment>
        <TableRow
          className={
            selectedPositions.map((p) => p.id).indexOf(row.id) !== -1
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
          <TableCell align="right">
            <ArrowBackRoundedIcon
              onClick={() => selectPosition(row.id, row.stock.name,row.currentvalue)}
            />
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
  