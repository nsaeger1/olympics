import "./App.css";
import Country from "./components/Country";
import { OlympicCountry } from "./utils/util";
import { useEffect, useState } from "react";
import { Grid, Paper } from "@material-ui/core";

function App() {
  const [countries, setCountries] = useState<OlympicCountry.CountryAward[]>([]);

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
    <Paper className="App">
      Total Medals: {countries.reduce((acc, cv) => acc + cv.totalMedals(), 0)}
      <Grid container justifyContent="center">
        {countries.map((country) => {
          return (
            <Grid item>
              <Country data={country} refresh={() => getAwards()} key={country.id} />
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
}

export default App;
