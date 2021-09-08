import "./App.css";
import Country from "./components/Country";
import { OlympicCountry } from "./utils/util";
import { useEffect, useState } from "react";
import { Fab, Grid, SvgIcon } from "@material-ui/core";
import { mdiPlus } from "@mdi/js";
import { makeStyles } from "@material-ui/core/styles";
import AddCountry from "./components/AddCountry";

const useStyles = makeStyles({
  fab: {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  },
});

function App() {
  const [countries, setCountries] = useState<OlympicCountry.CountryAward[]>([]);
  const classes = useStyles();
  const [addCountryVisible, setAddCountryVisible] = useState(false);

  const getAwards = async () => {
    await fetch(`http://localhost:3001/api/awards`)
      .then((res) => res.json())
      .then((res: any) => {
        return res.map((country: OlympicCountry.Country) => {
          return new OlympicCountry.CountryAward(country);
        });
      })
      .then((res) => {
        setCountries(res);
      });
  };

  useEffect(() => {
    getAwards();
  }, []);

  return (
    <div className="App">
      <AddCountry
        refresh={() => getAwards()}
        toggleVisibility={(visible) => {
          setAddCountryVisible(visible);
        }}
        visible={addCountryVisible}
      />
      Total Medals: {countries.reduce((acc, cv) => acc + cv.totalMedals(), 0)}
      <Grid container justifyContent="center">
        <Grid item container xs={8} justifyContent="center">
          {countries.map((country) => {
            return (
              <Grid item>
                <Country data={country} refresh={() => getAwards()} key={country.id} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <Fab color="primary" className={classes.fab} onClick={() => setAddCountryVisible(true)}>
        <SvgIcon>
          <path d={mdiPlus} />
        </SvgIcon>
      </Fab>
    </div>
  );
}

export default App;
