import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import { useState } from "react";

type Props = {
  toggleVisibility: (visible: boolean) => void;
  visible: boolean;
  refresh: () => void;
};

export default function AddCountry(props: Props) {
  const { refresh, toggleVisibility, visible } = props;
  const [countryName, setCountryName] = useState<String>("");

  function handleChange(event: any) {
    setCountryName(event.target.value);
  }

  async function addCountry() {
    await fetch(`http://localhost:3001/api/awards`, {
      body: JSON.stringify({ country: countryName }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      method: "Put",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        refresh();
      })
      .catch((err) => console.log(err));
    close();
  }

  function close() {
    setCountryName("");
    toggleVisibility(false);
  }

  return (
    <Dialog open={visible}>
      <DialogTitle>Add Country</DialogTitle>
      <DialogContent>
        <TextField helperText="countryName" value={countryName} onChange={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => addCountry()} color="primary" variant="contained">
          Add
        </Button>
        <Button onClick={close} color="secondary" variant="contained">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
