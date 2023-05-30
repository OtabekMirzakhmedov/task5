
import React, {useState} from 'react';
import Container from '@mui/material/Container';
import FakeData from './FakeData';
import Tools from './Tools'

function App() {
  const [country, setCountry] = useState('');
  const [seed, setSeed] = useState('');
  const [error, setError] = useState('');

  return (
    <Container>
      <Tools country={country}
        setCountry={setCountry}
        seed={seed}
        setSeed={setSeed}
        error={error}
        setError={setError} />
      {country && seed && <FakeData country={country} seed={seed} />}
    </Container>
  );
}

export default App
