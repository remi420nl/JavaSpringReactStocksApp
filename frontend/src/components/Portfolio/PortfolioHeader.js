import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { setCompetitionValue } from "../../api/index";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import CountDown from "../common/CountDown";

export function PortfolioHeader(props) {
  const {
    owner,
    description,
    currentTotalValue,
    oldTotalValue,
    competition,
    cash,
    id,
  } = props;

  const [joinCompetition, setJoinCompetition] = useState(competition);

  const setCompetition = () => {
    setCompetitionValue(id, !joinCompetition).then(() => {
      setJoinCompetition(!joinCompetition);
    });
  };

  //Custom styling for the button
  const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });

  const difference = () => {
    if (oldTotalValue == 0) return 0;
    return parseFloat(
      ((currentTotalValue - oldTotalValue) / oldTotalValue) * 100
    ).toFixed(2);
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
      <div className="portfoliodetails">
        <div>
          Kas:
          <span>€{cash.toFixed(2)}</span>
        </div>
        <CountDown />
      </div>
      <div className="portfoliocompetition">
        Doet mee aan competitie:
        <span>{joinCompetition ? "Ja" : "Nee"}</span>
        <div>
          {joinCompetition ? (
            <Button
              color="secondary"
              variant="contained"
              onClick={setCompetition}
            >
              Verlaten
            </Button>
          ) : (
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                color="primary"
                onClick={setCompetition}
              >
                Deelnemen
              </Button>
            </ThemeProvider>
          )}
        </div>
      </div>
      <div className="portfoliodetails">
        <div>
          Waarde belegingen
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
