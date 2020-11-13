import React, {useState,useEffect}from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { deletePosition } from "../../api/index";

//dialog for position sell
export default function PositionOptions(props) {
  const [open, setOpen] = useState(false);

  const { selectedPositions, updatePositions } = props;
  const [totalOrderAmount, setTotalorderAmount ] = useState(0);

useEffect(() => {
  let total = selectedPositions.reduce((sum, p) => sum + p.currentvalue,0);
  setTotalorderAmount(total)
},[selectedPositions])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //function to sell the selected positions
  const sell = () => {
    if (selectedPositions.length > 0) {
      const toBeDeleted = [...selectedPositions];

      toBeDeleted.forEach((position) => {
        deletePosition(position.id).then(() => updatePositions());
      });
    }
  };


  return (
    <div>
      <Button
      //if there is at least 1 position selected  the button gets activated
        disabled={selectedPositions < 1}
        variant="contained" color="secondary"
        onClick={handleClickOpen}
      >
        Verkopen
      </Button>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Positie(s) verkoop</DialogTitle>
        <DialogContent>
          <form className="selldialog">
            <div>
              {selectedPositions.map((p) => (
                <div key={p.id}>{p.name}</div>
              ))}
            </div>
            <div style={{ borderTop: "1px solid grey", marginTop: "5px"}}>Totaal Verkooporder: €{totalOrderAmount.toFixed(2)}</div>
            <div style={{ fontWeight: "bold", marginTop: "10px" }}>
              Weet u het zeker?
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuleer
          </Button>
          <Button onClick={sell} color="primary">
            Uitvoeren
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
