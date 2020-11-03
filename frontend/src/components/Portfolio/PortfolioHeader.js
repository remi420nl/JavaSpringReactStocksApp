import React, {useEffect,useState,useRef} from "react";
import Button from "@material-ui/core/Button";
import { setCompetitionValue } from "../../api/index";
import {  ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

export function PortfolioHeader(props) {
  const {
    owner,
    description,
    currentTotalValue,
    oldTotalValue,
    competition,
    id
  } = props;

const [joinCompetition,setJoinCompetition] = useState(competition)

const setCompetition = () => {
  setJoinCompetition(!joinCompetition);
}

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

const isInitialMount = useRef(true);

useEffect(() => {
  if (isInitialMount.current) {
     isInitialMount.current = false;
  } else {
   
   setCompetitionValue(id, joinCompetition)
  }
}), [setJoinCompetition];

  const difference = () => {
    if (oldTotalValue == 0) return 0;
    return parseFloat(
      ((currentTotalValue - oldTotalValue) / oldTotalValue) * 100
    ).toFixed(2);
  };

  const setCompetiton = () => {
    setCompetition(id,!competition);
    
  };
  return (
    <div className="portfolioheader">
      <div className="portfoliodetails">
        <div>
          Eigenaar
          <span>{owner}</span>
        </div>
        <div>
          Beschrijving
          <span>{description}</span>
        </div>
      </div>
      <div className="portfoliocompetition">
        Doet mee aan competitie:
        <span>{joinCompetition ? "Ja" : "Nee"}</span>
        <div>
          {joinCompetition ? <Button color="secondary" variant="contained" onClick={setCompetiton}>
            Verlaten
          </Button> :
             <ThemeProvider theme={theme}>
             <Button variant="contained" color="primary" onClick={setCompetiton}>
               Deelnemen
             </Button>
           </ThemeProvider>
          }
        </div>
      </div>
      <div className="portfoliodetails">
        <div>
          Vermogen
          <span>€{currentTotalValue.toFixed(2)}</span>
        </div>
        <div>
          Rendement
          <span
            style={{
              color: difference() >= 0 ? "green" : "crimson",
              fontSize: "2EM",
            }}
          >
            {difference()} %
          </span>
        </div>
      </div>
    </div>
  );
}
