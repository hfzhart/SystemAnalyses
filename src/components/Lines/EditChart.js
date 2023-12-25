import React, { useState } from 'react';
import { TextField, Box, Typography, Button, FormControlLabel, Checkbox} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const EditChart = ({ editedChartData, setEditedChartData, handleDeleteData }) => {
  const [sortByName, setSortByName] = useState(false);
  const [sortByValue, setSortByValue] = useState(false);

  const handleEditData = (index, field, value) => {
    const updatedChartData = [...editedChartData];
    updatedChartData[index][field] = value;
    setEditedChartData(updatedChartData);
  };

  const handleSortData = () => {
    const sortedData = [...editedChartData];

    if (sortByName) {
      sortedData.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortByValue) {
      sortedData.sort((a, b) => a.value - b.value);
    }

    setEditedChartData(sortedData);
  };

  return (
    <div>
      <Box>
        <FormControlLabel
          control={<Checkbox checked={sortByName} onChange={() => setSortByName(!sortByName)} />}
          label="Фільтр за назвою"
        />
      </Box>
      <Box>
        <FormControlLabel
          control={<Checkbox checked={sortByValue} onChange={() => setSortByValue(!sortByValue)} />}
          label="Фільтр за значенням"
        />
      </Box>
      <Button variant="outlined" onClick={handleSortData}>
        Сортувати
      </Button>
      {editedChartData.map((data, index) => (
        <Box key={index} mb={2}>
          <Typography variant="h6" gutterBottom>
            {data.name}
          </Typography>
          <TextField
            label="Data Value"
            type="number"
            fullWidth
            value={data.value}
            onChange={(e) => handleEditData(index, 'value', e.target.value)}
            variant="outlined"
            margin="dense"
            size="small"
          />
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleDeleteData(index)}
            startIcon={<DeleteIcon />}
          >
            Видалити
          </Button>
        </Box>
      ))}
      
    </div>
  );
};

export default EditChart;
