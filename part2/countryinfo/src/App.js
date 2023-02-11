import { useEffect, useState } from "react";
import { useDebounce } from 'use-debounce'
import axios from 'axios'
import Countries from "./components/Countries";

const baseURL = 'https://restcountries.com/v3.1';

const App = () => {
  const [keyword, setKeyword] = useState('');
  const [country] = useDebounce(keyword, 500)
  const [countryList, setCountryList] = useState([]);

  const handleChange = (e) => {
    setKeyword(e.target.value);
  }

  useEffect(() => {
    if(country) {
      axios.get(`${baseURL}/name/${country}/`)
        .then(res => {
          setCountryList(res.data);
        })
    }
  }, [country])

  return (
    <>
      Find countries <input type='text' value={keyword} onChange={handleChange} />
      <Countries data={countryList} />
    </>
  );
}

export default App;
