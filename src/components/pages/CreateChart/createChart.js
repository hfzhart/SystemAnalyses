import React, { useState } from 'react';
import {
  TextField, Button, Box, Typography, Container, AppBar, Toolbar, IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BarChartReg from '../../Lines/BarChartReg';
import PieChartReg from '../../Lines/PieChartReg';
import LineChartReg from '../../Lines/LineChartReg';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

import './createChart.css';

const CreateChart = () => {
  const [chartData, setChartData] = useState([
    { name: 'Data1', value: 20 },
    { name: 'Data2', value: 45 },
    { name: 'Data3', value: 60 },
    { name: 'Data4', value: 30 },
    { name: 'Data5', value: 80 },
  ]);

  const [dataPoint, setDataPoint] = useState('');
  const [dataName, setDataName] = useState('');
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedDataName, setEditedDataName] = useState('');
  const [editedDataValue, setEditedDataValue] = useState('');
  const [selectedDataIndex, setSelectedDataIndex] = useState(null);
  const [selectedChartType, setSelectedChartType] = useState('line');
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [chartName, setChartName] = useState('');

  // eslint-disable-next-line
  const [saveDate, setSaveDate] = useState(null);
  


  const handleAddData = () => {
    if (dataPoint && dataName) {
      setChartData([...chartData, { name: dataName, value: parseInt(dataPoint, 10) }]);
      setDataPoint('');
      setDataName('');
    }
  };

  const handleOpenMenu = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
  };

  const handleOpenEditDialog = (index) => {
    const selectedData = chartData[index];
    setEditedDataName(selectedData.name);
    setEditedDataValue(selectedData.value);
    setSelectedDataIndex(index);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleEditData = (index) => {
    handleOpenEditDialog(index);
  };

  const handleSaveEditDialog = () => {
    if (selectedDataIndex !== null) {
      const updatedChartData = [...chartData];
      updatedChartData[selectedDataIndex] = {
        name: editedDataName,
        value: parseInt(editedDataValue, 10),
      };
      setChartData(updatedChartData);
    }

    handleCloseEditDialog();
  };

  const handleDeleteData = (index) => {
    if (index !== null) {
      const updatedChartData = [...chartData];
      updatedChartData.splice(index, 1);
      setChartData(updatedChartData);
      setSelectedDataIndex(null);
      handleCloseEditDialog();
    }
  };

  const handleSaveChart = async () => {
    
    if (!chartName) {
      toast.error('Введіть назву графіка.');
      setOpenSaveDialog(true);
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem('user'));

      if (!user || !user.id) {
        toast.error('Не вдалося визначити користувача.');
        return;
      }
      const currentDate = new Date();
      
      const response = await axios.post('http://localhost:3001/charts', {
        userId: user.id,
        chartData,
        chartType: selectedChartType,
        chartName,
        saveDate: currentDate.toISOString(),
      });
      const savedChart = response.data;
      setSaveDate(new Date());
      toast.success('Графік успішно збережений!');
      console.log('Saved Chart:', savedChart);
      setOpenSaveDialog(false)
    } catch (error) {
      console.error('Error saving chart:', error);
      toast.error('Помилка при збереженні графіку.');
    }
  };
  

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            onClick={() => window.history.back()}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Створити графік
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleOpenMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem component={Link} to="/profile">Профіль користувача</MenuItem>
            <MenuItem onClick={handleCloseMenu}>Налаштування</MenuItem>
            <MenuItem onClick={handleCloseMenu}>Допомога</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Box mt={3}>
          
          <Typography variant="h4" gutterBottom>
            Додати дані до графіку
          </Typography>
          <Box display="flex" alignItems="center">
            <TextField
              label="Назва"
              variant="outlined"
              fullWidth
              value={dataName}
              onChange={(e) => setDataName(e.target.value)}
              sx={{ marginRight: '8px' }}
            />

            <TextField
              label="Data Point"
              variant="outlined"
              fullWidth
              value={dataPoint}
              onChange={(e) => setDataPoint(e.target.value)}
              sx={{ marginRight: '8px' }}
            />
            
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddData}
              startIcon={<AddIcon />}
              sx={{ width: '40%' }}
            >
              Додати дані
            </Button>
          </Box>
        </Box>
        <Box mt={3}>
          <Typography variant="h5" gutterBottom>
            Виберіть тип графіка
          </Typography>
          <ToggleButtonGroup
            value={selectedChartType}
            exclusive
            onChange={(event, newType) => newType && setSelectedChartType(newType)}
          >
            <ToggleButton value="line">Лінійний графік</ToggleButton>
            <ToggleButton value="bar">Стовпчатий графік</ToggleButton>
            <ToggleButton value="pie">Круговий графік</ToggleButton>
          </ToggleButtonGroup>
          {selectedChartType === 'bar' && (
          <Box mt={3} className="BarChart">
            <Typography variant="h5" gutterBottom>
              Попередній перегляд графіку (Bar Chart)
            </Typography>
            <BarChartReg data={chartData} />
          </Box>
        )}
        {selectedChartType === 'pie' && (
          <Box mt={3} className="PieChart">
            <Typography variant="h5" gutterBottom>
              Попередній перегляд графіку (Pie Chart)
            </Typography>
            <PieChartReg data={chartData} />
          </Box>
        )}
        {selectedChartType === 'line' && (
         <Box mt={3} className="Linehart">
          <Typography variant="h5" gutterBottom>
            Попередній перегляд графіку (Line Chart)
          </Typography>
          <LineChartReg data={chartData} handleEditData={handleEditData} />
        </Box>
        
        )}
      
       
      
      
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Редагувати дані
          </Typography>
          <Box sx={{ border: 'none' }}>
            <TextField
              select
              label="Виберіть змінну"
              variant="outlined"
              fullWidth
              value={selectedDataIndex !== null ? chartData[selectedDataIndex].name : ''}
              onChange={(e) => setSelectedDataIndex(chartData.findIndex((item) => item.name === e.target.value))}
            >
              {chartData.map((data, index) => (
                <MenuItem key={index} value={data.name}>
                  {data.name}
                </MenuItem>
              ))}
            </TextField>
            {selectedDataIndex !== null && (
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                mt={2}
                sx={{ border: 'none' }}
              >
                <Typography variant="body1" sx={{ marginRight: '8px' }}>
                  {chartData[selectedDataIndex].name}: {chartData[selectedDataIndex].value}
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleEditData(selectedDataIndex)}
                  startIcon={<EditIcon />}
                  sx={{ marginRight: '8px' }}
                >
                  Редагувати
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDeleteData(selectedDataIndex)}
                  startIcon={<DeleteIcon />}
                >
                  Видалити
                </Button>
              </Box>
              
            )}
          </Box>
        </Box>
        </Box>
       
        <Box mt={3} className="SaveButton" style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '-150px' }}>
  <Button
    variant="contained"
    color="primary"
    onClick={() => setOpenSaveDialog(true)}
    startIcon={<SaveIcon />}
  >
    Зберегти графік
  </Button>
</Box>
    </Container>
      <Dialog 
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Редагувати дані</DialogTitle>
       
        <DialogContent>
          <DialogContentText>
            Введіть нові значення для даних.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Data Name"
            type="text"
            fullWidth
            value={editedDataName}
            onChange={(e) => setEditedDataName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="value"
            label="Data Value"
            type="number"
            fullWidth
            value={editedDataValue}
            onChange={(e) => setEditedDataValue(e.target.value)}
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Відміна
          </Button>
          <Button onClick={handleSaveEditDialog} color="primary">
            Зберегти
          </Button>
          <Button onClick={() => handleDeleteData(selectedDataIndex)} color="secondary">
            Видалити
          </Button>
        </DialogActions>
      </Dialog>
    

 
      <Dialog open={openSaveDialog} onClose={() => setOpenSaveDialog(false)}maxWidth="md">
        <DialogTitle>Введіть назву графіка</DialogTitle>
        <DialogContent>
          <Box>
          <TextField
            autoFocus
            label="Назва графіка"
            variant="outlined"
            fullWidth
            value={chartName}
            onChange={(e) => setChartName(e.target.value)}
            sx={{ marginTop: '8px'}}
              
          />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSaveDialog(false)} color="primary">
            Відміна
          </Button>
          <Button onClick={handleSaveChart} color="primary">
            Зберегти
          </Button>
        </DialogActions>
      </Dialog>
    
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      
    </div>
  );
};

export default CreateChart;
