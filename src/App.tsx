import './App.css';
import Country from './components/Country';

function App() {
  const countries = ["USA", "Canada", "Greece"]
  return (
    <div className="App">
      {countries.map((name) => {
        return(
        <Country name={name}/>
        )
      })}
      
    </div>
  );
}

export default App;
