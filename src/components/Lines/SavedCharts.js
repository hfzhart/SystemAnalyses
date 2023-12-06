import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select, MenuItem, FormControl, InputLabel, Paper, TextField, IconButton,Dialog, DialogActions, DialogContent, DialogTitle, Typography, Button, DialogContentText, List, ListItem, ListItemText, ListItemSecondaryAction, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DatePicker from "react-datepicker";
import BarChartReg from './BarChartReg';
import PieChartReg from './PieChartReg';
import LineChartReg from './LineChartReg';
import EditChart from './EditChart';
import "react-datepicker/dist/react-datepicker.css";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const SavedCharts = ({ userId }) => {
  const [savedCharts, setSavedCharts] = useState([]);
  const [selectedChartType, setSelectedChartType] = useState('bar');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [editChartId, setEditChartId] = useState(null);
  const [editedChartData, setEditedChartData] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  useEffect(() => {
    const fetchSavedCharts = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/charts?userId=${userId}`);
        setSavedCharts(response.data);
      } catch (error) {
        console.error('Error fetching saved charts:', error);
      }
    };

    fetchSavedCharts();
  }, [userId]);

  const handleEditChart = (chart) => {
    setEditedChartData(chart.chartData);
    setEditChartId(chart.id);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditChartId(null);
    setEditedChartData([]);
  };

  const handleSaveEditDialog = async () => {
    try {
      await axios.put(`http://localhost:3001/charts/${editChartId}`, {
        chartData: editedChartData,
      });

      const updatedCharts = savedCharts.map((chart) =>
        chart.id === editChartId ? { ...chart, chartData: editedChartData } : chart
      );

      setSavedCharts(updatedCharts);
      handleCloseEditDialog();
      console.log('Chart edited successfully:', editChartId);
    } catch (error) {
      console.error('Error editing chart:', error);
    }
  };

  const handleDeleteChart = async (chartId) => {
    try {
      await axios.delete(`http://localhost:3001/charts/${chartId}`);
      const updatedCharts = savedCharts.filter((chart) => chart.id !== chartId);
      setSavedCharts(updatedCharts);
      console.log('Chart deleted successfully:', chartId);
    } catch (error) {
      console.error('Error deleting chart:', error);
    }
  };

  const handleDeleteData = (index) => {
    const updatedChartData = [...editedChartData];
    updatedChartData.splice(index, 1);
    setEditedChartData(updatedChartData);
  };

  const filteredCharts = savedCharts.filter((chart) => (
    chart.chartType === selectedChartType &&
    chart.chartName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!selectedDate || new Date(chart.saveDate).toDateString() === selectedDate.toDateString())
  ));

  return (
    <div>
      <h3>Збережені графіки</h3>
      <FormControl>
        <InputLabel>Тип графіка</InputLabel>
        <Select
          value={selectedChartType}
          label="Тип графіка"
          onChange={(e) => setSelectedChartType(e.target.value)}
        >
          <MenuItem value="bar">Стовпчатий</MenuItem>
          <MenuItem value="pie">Круговий</MenuItem>
          <MenuItem value="line">Лінійний</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Пошук за назвою"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          endAdornment: (
            <IconButton>
              <SearchIcon />
            </IconButton>
          ),
        }}
      />

      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        placeholderText="Оберіть дату"
        dateFormat="yyyy/MM/dd"
        isClearable
      />

      <Paper>
        <List>
          {filteredCharts.map((chart, index) => (
            <React.Fragment key={chart.id}>
              <ListItem>
                <ListItemText>
                  {chart.chartType === 'bar' && <BarChartReg data={chart.chartData} />}
                  {chart.chartType === 'pie' && <PieChartReg data={chart.chartData} />}
                  {chart.chartType === 'line' && <LineChartReg data={chart.chartData} />}
                  <Typography variant="h6" component="div">Назва графіку: {chart.chartName}</Typography>
                  <Typography color="textSecondary">Дата збеження графіку: {new Date(chart.saveDate).toLocaleString()}</Typography>
                </ListItemText>
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleEditChart(chart)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteChart(chart.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              {index < filteredCharts.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>

      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Редагувати графік</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <EditChart editedChartData={editedChartData} setEditedChartData={setEditedChartData} handleDeleteData={handleDeleteData} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Відміна
          </Button>
          <Button onClick={handleSaveEditDialog} color="primary">
            Зберегти
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SavedCharts;
