import React, {useState} from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';

const Tools = ({country, setCountry, seed, setSeed, error, setError }) => {


  const [sliderValue, setSliderValue] = useState(0);
  const [inputValue, setInputValue] = useState(0);

  const handleRandomSeed = () => {
    const randomSeed = Math.floor(Math.random() * 1000) + 1;
    setSeed(randomSeed);
  };

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
    setInputValue(newValue*100);
    setError(newValue);
  };

  const handleInputChange = (event) => {
    const value = Number(event.target.value);
    setInputValue(value);
    setError(value / 100);
    setSliderValue(value/100);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleSeedChange = (event) => {
    setSeed(event.target.value);
  };


  return (
    <Container sx={{ backgroundColor: 'white', marginTop: '20px' }}>
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          width: 'fit-content',
          alignItems: 'center'          
        }}
      >
        <Box sx={{ padding: '5px', margin: '0 auto'  }}>
          <FormControl sx={{ width: '150px' }}>
            <InputLabel>Select Country</InputLabel>
            <Select
              value={country}
              label="Select Country"
              onChange={handleCountryChange}
              size="small"
            >
              <MenuItem value={'spain'}>Spain</MenuItem>
              <MenuItem value={'poland'}>Poland</MenuItem>
              <MenuItem value={'germany'}>Germany</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ display: 'flex', alignContent: 'center',  padding: '5px', gap: '5px', alignItems: 'center', margin: '0 auto' }}>
          <TextField
            label="Seed Value"
            value={seed}
            onChange={handleSeedChange}
            size="small"
            sx={{ width: '150px' }}
          />
          <Button variant="outlined" size="small" onClick={handleRandomSeed}>
          Random seed
        </Button>
        </Box>
        <Box sx={{ padding: '10px' , display: 'flex', width:'600px', gap: '10px'}}>
          <Slider
            value={sliderValue}
            onChange={handleSliderChange}
            min={0}
            max={10}
            step={0.25}
            marks={[{ value: 0, label: '0' }, { value: 10, label: '10' }]}
            valueLabelDisplay="auto"
            size="medium"
          />
          <TextField
            label="Error"
            value={inputValue}
            onChange={handleInputChange}
            size="small"
          />
        </Box>
      </Box>

    

    </Container>
  )
}

export default Tools
