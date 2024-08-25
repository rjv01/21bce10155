import './App.css';
import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, MenuItem } from '@mui/material';

const currencies = [
  {
    value: 'Numbers',
    label: 'Numbers',
  },
  {
    value: 'Alphabets',
    label: 'Alphabets',
  },
  {
    value: 'HighestLowerCase',
    label: 'Highest Lower Case',
  },
];

function App() {
  const [data, setData] = useState("");
  const [filter, setFilter] = useState("Numbers");
  const [output, setOutput] = useState(null); // State to store the output

  const handleClick = () => {
    const parsedData = data.split(',').map(item => item.trim());
    let numbers = [];
    let alphabets = [];
    let highestLowerCaseAlphabet = [];

    parsedData.forEach(item => {
      if (!isNaN(item)) {
        numbers.push(item);
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item);
      }
    });

    if (alphabets.length > 0) {
      highestLowerCaseAlphabet.push(
        alphabets.filter(char => char === char.toLowerCase()).sort().pop() || ''
      );
    }

    const filteredOutput = {
      is_success: true,
      user_id: "rajshekhar1",
      email: "raj.shekhar_2021@vitstudent.ac.in",
      roll_number: "21BCE10155",
      numbers: filter === 'Numbers' || filter === 'HighestLowerCase' ? numbers : [],
      alphabets: filter === 'Alphabets' ? alphabets : [],
      highest_lowercase_alphabet: filter === 'HighestLowerCase' ? highestLowerCaseAlphabet : []
    };

    setOutput(filteredOutput); // Set the output to be displayed
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
      className="form-container"
    >
      <TextField 
        id="outlined-basic" 
        label="Input" 
        variant="outlined" 
        className="custom-textfield"
        onChange={(e) => setData(e.target.value)}
      />

      <Button onClick={handleClick} variant="contained" className="custom-button">
        Submit
      </Button>

      <TextField
        id="outlined-select-currency"
        select
        label="Filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="custom-textfield"
      >
        {currencies.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      {/* Display the output */}
      {output && (
        <Box mt={3}>
          <h3>Output:</h3>
          <pre>{JSON.stringify(output, null, 2)}</pre>
        </Box>
      )}
    </Box>
  );
}

export default App;