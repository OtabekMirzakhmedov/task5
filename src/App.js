
import React, {useState} from 'react';
import Container from '@mui/material/Container';
import FakeData from './FakeData';
import Tools from './Tools'

function App() {
  const [country, setCountry] = useState('');
  const [seed, setSeed] = useState('');

  const handleGenerateTable = (selectedCountry, selectedSeed) => {
    setCountry(selectedCountry);
    setSeed(selectedSeed);
  }
  return (
    <Container>
      <Tools onGenerateTable={handleGenerateTable} />
      {country && seed && <FakeData country={country} seed={seed} />}
    </Container>
  );
}

export default App
