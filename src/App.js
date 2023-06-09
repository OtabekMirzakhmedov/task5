import React, { useState, useRef, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { faker } from "@faker-js/faker";

const App = () => {
  console.log("app rendered");
  const [country, setCountry] = useState("");
  const [seed, setSeed] = useState("");
  const [error, setError] = useState(0);
  const [data, setData] = useState([]);
  const [sliderValue, setSliderValue] = useState(0);
  const [inputValue, setInputValue] = useState(0);
  const [displayedRecords, setDisplayedRecords] = useState(20);
  const [scrollOffset, setScrollOffset] = useState(0);

  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight === scrollHeight) {
        setDisplayedRecords((prevCount) => prevCount + 10);
        setScrollOffset(scrollTop);
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleRandomSeed = () => {
    const randomSeed = Math.floor(Math.random() * 1000) + 1;
    setSeed(randomSeed);
    setSliderValue(0);
    setInputValue(0);
    setError(0);
  };

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
    setInputValue(newValue * 100);
    setError(newValue);
  };

  const handleInputChange = (event) => {
    const value = Number(event.target.value);
    setInputValue(value);
    setError(value / 100);
    setSliderValue(value / 100);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
    setSliderValue(0);
    setInputValue(0);
    setError(0);
  };

  const handleSeedChange = (event) => {
    setSeed(event.target.value);
    setError(0);
    setSliderValue(0);
    setInputValue(0);
    setError(0);
  };

  const generateData = (country, seed, numRecords) => {
    console.log("Generate data: ", seed);
    const generatedData = [];
    switch (country) {
      case "poland":
        faker.setLocale("pl");
        break;
      case "germany":
        faker.setLocale("de");
        break;
      case "spain":
        faker.setLocale("es");
        break;
      default:
        faker.setLocale("pl");
    }

    faker.seed(parseInt(seed));

    for (let i = 1; i <= numRecords; i++) {
      const record = {};
      record.index = i;
      record.identifier = faker.datatype.uuid();
      record.name = faker.name.fullName();
      record.address = faker.address.streetAddress();
      record.phone = faker.phone.number();
      generatedData.push(record);
    }

    return generatedData;
  };

  const applyErrorToData = (generatedData, error) => {
    console.log("error in apply error ", error);
    const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const errorTypes = ["delete", "add", "swap"];
    const fields = ["name", "address", "phone"];

    const numRecords = generatedData.length;
    const numErrorsPerRecord = Math.floor(error);
    const extraErrors = error % 1;

    console.log("numErrorsPerRecord ", numErrorsPerRecord);
    console.log("extraErrors: ", extraErrors);

    for (let i = 0; i < numRecords; i++) {
      const record = generatedData[i];
      let numErrors = numErrorsPerRecord;
      console.log("num errors ", numErrors);

      if (i < Math.floor(extraErrors * numRecords)) {
        numErrors++;
      }

      console.log("num errors ", numErrors);

      for (let j = 0; j < numErrors; j++) {
        const errorType =
          errorTypes[Math.floor(Math.random() * errorTypes.length)];

        const fieldIndex = Math.floor(Math.random() * fields.length);
        const field = fields[fieldIndex];

        switch (errorType) {
          case "delete":
            const deleteIndex = Math.floor(
              Math.random() * record[field].length
            );
            record[field] =
            record[field].slice(0, deleteIndex) +
            record[field].slice(deleteIndex + 1);
            break;
          case "add":
            const addIndex = Math.floor(
              Math.random() * (record[field].length + 1)
            );
            const randomChar = alphabet.charAt(
              Math.floor(Math.random() * alphabet.length)
            );
            record[field] =
              record[field].slice(0, addIndex) +
              randomChar +
              record[field].slice(addIndex);
            break;
          case "swap":
            const swapIndex = Math.floor(
              Math.random() * (record[field].length - 1)
            );
            record[field] =
              record[field].slice(0, swapIndex) +
              record[field].charAt(swapIndex + 1) +
              record[field].charAt(swapIndex) +
              record[field].slice(swapIndex + 2);
            break;
          default:
            break;
        }
      }
    }

    return generatedData;
  };

  useEffect(() => {
    if (!seed || !country) {
      setData([]);
      return;
    }

    const totalRecords = displayedRecords + scrollOffset;
    const generatedData = generateData(country, seed, totalRecords);
    const dataWithErrors = applyErrorToData(generatedData, error);
    setData(dataWithErrors);
  }, [country, seed, error, displayedRecords, scrollOffset]);

  return (
    <Container ref={containerRef}>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          width: "fit-content",
          alignItems: "center",
          marginTop: "20px",
          backgroundColor: "white",
        }}
      >
        <Box sx={{ padding: "5px", margin: "0 auto" }}>
          <FormControl sx={{ width: "150px" }}>
            <InputLabel>Select Country</InputLabel>
            <Select
              value={country}
              label="Select Country"
              onChange={handleCountryChange}
              size="small"
            >
              <MenuItem value={"spain"}>Spain</MenuItem>
              <MenuItem value={"poland"}>Poland</MenuItem>
              <MenuItem value={"germany"}>Germany</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignContent: "center",
            padding: "5px",
            gap: "5px",
            alignItems: "center",
            margin: "0 auto",
          }}
        >
          <TextField
            label="Seed Value"
            value={seed}
            onChange={handleSeedChange}
            size="small"
            sx={{ width: "150px" }}
          />
          <Button variant="outlined" size="small" onClick={handleRandomSeed}>
            Random seed
          </Button>
        </Box>
        <Box
          sx={{ padding: "10px", display: "flex", width: "600px", gap: "10px" }}
        >
          <Slider
            value={sliderValue}
            onChange={handleSliderChange}
            min={0}
            max={10}
            step={0.25}
            marks={[
              { value: 0, label: "0" },
              { value: 10, label: "10" },
            ]}
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
      <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="fake data table">
          <TableHead>
            <TableRow>
              <TableCell>Index</TableCell>
              <TableCell>Identifier</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((record) => (
              <TableRow key={record.identifier}>
                <TableCell>{record.index}</TableCell>
                <TableCell>{record.identifier}</TableCell>
                <TableCell>{record.name}</TableCell>
                <TableCell>{record.address}</TableCell>
                <TableCell>{record.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default App;
