import {useState} from 'react';
import Weather from './components/Weather';
import Forecast from './components/Forecast';
import './App.css';

function App() {
  const[input, setInput] = useState('');
  const[city, setCity] = useState('f');

  const handleChange = (e) => setInput(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(input);
    setInput('');
  }

  return (
    <div className="App">
      <div className="search-engine">
        <form onSubmit={handleSubmit} >
          <input className='input'
                 type='text'
                 name='input'
                 placeholder='Search a city'
                 value={input}
                 onChange={handleChange} />
          <button type="submit" className='button' disabled={input === ''}>
            Search
          </button>
        </form>
      </div>

      <div className='weather'>
        <Weather city={city} />
      </div>
      <div className='weather'>
        <Forecast city={city} />
      </div>
    </div>
  );
}

export default App;

// <a href='#' target='_blank'>Coded by Caf</a>