import React, {useState} from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Tools = ({onGenerateTable}) => {
    const [country, setCountry] = useState('');
  const [seed, setSeed] = useState('');

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleSeedChange = (event) => {
    setSeed(event.target.value);
  };
  const handleGenerateTable = () => {
    onGenerateTable(country, seed); // Emit the country and seed values
  };

  return (
    <Container sx={{backgroundColor: 'white', marginTop: '20px'}}>
         <Box sx={{
            display: 'flex',
            justifyItems: 'start',
            width: 'fit-content',
            margin: '0 auto',
            padding: '5px'
        }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Country</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={country}
          label="Age"
          onChange={handleCountryChange}
          sx={{width: '150px'}}
        >
          <MenuItem value={"Spain"}>Spain</MenuItem>
          <MenuItem value={"Poland"}>Poland</MenuItem>
          <MenuItem value={"Uzbekistan"}>Uzbekistan</MenuItem>
        </Select>
        
      </FormControl>
      <TextField
          label="Seed Value"
          value={seed}
          onChange={handleSeedChange}
        />
        <Button variant="outlined" >Random</Button>


    </Box>
    <Box>
    <Button variant="contained" onClick={handleGenerateTable}>Generate Table</Button>
    </Box>
    <p>{country}</p>
    <p>{seed}</p>

    

    </Container>
  )
}

export default Tools
