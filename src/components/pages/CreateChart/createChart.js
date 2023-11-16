import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import './createChart.css';

const CreateChart = () => {
  const [chartData, setChartData] = useState([]);
  const [dataPoint, setDataPoint] = useState('');
  const [dataName, setDataName] = useState('');
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedDataName, setEditedDataName] = useState('');
  const [editedDataValue, setEditedDataValue] = useState('');

  const handleAddData = () => {
    if (dataPoint && dataName) {
      setChartData([...chartData, { name: dataName, value: parseInt(dataPoint) }]);
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

  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  return (
    <div className="create-chart-container">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => window.history.back()}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Create Chart
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
            <MenuItem onClick={handleCloseMenu}>Dashboard</MenuItem>
            <MenuItem onClick={handleCloseMenu}>Settings</MenuItem>
            <MenuItem onClick={handleCloseMenu}>Help</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Box mt={3}>
          <Typography variant="h4" gutterBottom>
            Add Data to Chart
          </Typography>
          <TextField
            label="Data Name"
            variant="outlined"
            fullWidth
            value={dataName}
            onChange={(e) => setDataName(e.target.value)}
          />
          <TextField
            label="Data Point"
            variant="outlined"
            fullWidth
            value={dataPoint}
            onChange={(e) => setDataPoint(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddData}
            sx={{ mt: 2 }}
          >
            Add Data
          </Button>
        </Box>
        <Box mt={3}>
          <Typography variant="h5" gutterBottom>
            Chart Preview
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                onClick={handleOpenEditDialog}
              />
            </LineChart>
          </ResponsiveContainer>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleOpenEditDialog}
            sx={{ mt: 2 }}
          >
            Изменить данные
          </Button>
          <Dialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Изменить данные</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Введите новые значения данных.
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
            Отмена
          </Button>
          <Button onClick={handleCloseEditDialog} color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
        </Box>
      </Container>
    </div>
  );
};

export default CreateChart;
