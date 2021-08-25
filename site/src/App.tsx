import "./App.css";
import Country from "./components/Country";
import { CountryAward } from "./utils/util";
import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState<CountryAward[]>([]);

  const getAwards = async () => {
    await fetch(`http://localhost:3001/api/awards`)
      .then((res) => res.json())
      .then((res: any) => {
        return res.map((country: any) => {
          return new CountryAward(country);
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
      {countries.map((country) => {
        return <Country data={country} key={country.id} />;
      })}
    </div>
  );
}

export default App;
