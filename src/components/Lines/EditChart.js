import React from 'react';
import { TextField, Box, Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
const EditChart = ({ editedChartData, setEditedChartData, handleDeleteData }) => {
  const handleEditData = (index, field, value) => {
    const updatedChartData = [...editedChartData];
    updatedChartData[index][field] = value;
    setEditedChartData(updatedChartData);
  };

  return (
    <div>
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
