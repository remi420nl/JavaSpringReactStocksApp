import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { deletePosition } from "../../api/index";

//dialog for position sell
export default function PositionOptions(props) {
  const [open, setOpen] = React.useState(false);

  const { selectedPositions, updatePositions } = props;

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
        disabled={selectedPositions < 1}
        variant="contained"
        color="secondary"
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
            Verkoop
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
