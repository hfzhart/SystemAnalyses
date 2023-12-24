import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, IconButton, Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css'; // Import the styles for react-resizable

const styles = {
  container: {
    marginTop: '20px',
    position: 'relative',
  },
  paper: {
    marginBottom: '20px',
    position: 'static',
    zIndex: 'auto',
  },
  menuTextField: {
    marginBottom: '15px',
  },
};

const ResizableCell = ({ width, onResize, children, ...restProps }) => (
  <Resizable width={width} height={0} onResize={onResize}>
    <TableCell {...restProps}>
      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {children}
      </div>
    </TableCell>
  </Resizable>
);

const TableCreate = () => {
  const [tables, setTables] = useState([]);
  const [tableName, setTableName] = useState('');
  const [numColumns, setNumColumns] = useState(3);
  const [numRows, setNumRows] = useState(3);
  const [editIndex, setEditIndex] = useState(null);

  const handleCreateTable = () => {
    const newTable = {
      name: tableName,
      data: Array.from({ length: numRows }, () => Array.from({ length: numColumns }, () => '')),
    };

    if (editIndex !== null) {
      const updatedTables = [...tables];
      updatedTables[editIndex] = newTable;
      setTables(updatedTables);
    } else {
      setTables([...tables, newTable]);
    }

    setTableName('');
    setNumColumns(3);
    setNumRows(3);
    setEditIndex(null);
  };

  const handleEditTable = (index) => {
    const tableToEdit = tables[index];
    setTableName(tableToEdit.name);
    setNumColumns(tableToEdit.data[0].length);
    setNumRows(tableToEdit.data.length);
    setEditIndex(index);
  };

  const handleDeleteTable = (index) => {
    const updatedTables = [...tables];
    updatedTables.splice(index, 1);
    setTables(updatedTables);
  };

  const handleDragStart = (index) => {
    setEditIndex(index);
  };

  const handleDragOver = (index) => {
    if (editIndex !== null && editIndex !== index) {
      const updatedTables = [...tables];
      [updatedTables[editIndex], updatedTables[index]] = [updatedTables[index], updatedTables[editIndex]];
      setTables(updatedTables);
      setEditIndex(index);
    }
  };

  const handleDragEnd = () => {
    setEditIndex(null);
  };

  const handleResize = (newWidth, tableIndex, columnIndex) => {
    const updatedTables = [...tables];
    updatedTables[tableIndex].data.forEach((row) => {
      row[columnIndex] = ''; // Reset cell content on resize for simplicity
    });
    setTables(updatedTables);
  };

  const handleCellChange = (tableIndex, rowIndex, columnIndex, value) => {
    const updatedTables = [...tables];
    updatedTables[tableIndex].data[rowIndex][columnIndex] = value;
    setTables(updatedTables);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Панель керування</Typography>
        </Toolbar>
      </AppBar>
      <Container style={styles.container}>
        <Grid container spacing={3}>
          {tables.map((table, tableIndex) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={tableIndex}
              draggable
              onDragStart={() => handleDragStart(tableIndex)}
              onDragOver={() => handleDragOver(tableIndex)}
              onDragEnd={handleDragEnd}
            >
              <Paper>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {table.data[0].map((_, columnIndex) => (
                          <ResizableCell
                            key={columnIndex}
                            width={100} // Initial width, adjust as needed
                            onResize={(e, { size }) => handleResize(size.width, tableIndex, columnIndex)}
                          >
                            <Typography>{`Column ${columnIndex + 1}`}</Typography>
                          </ResizableCell>
                        ))}
                        <TableCell>
                          <IconButton onClick={() => handleEditTable(tableIndex)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDeleteTable(tableIndex)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {table.data.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                          {row.map((cell, columnIndex) => (
                            <ResizableCell
                              key={columnIndex}
                              width={100} // Initial width, adjust as needed
                              onResize={(e, { size }) => handleResize(size.width, tableIndex, columnIndex)}
                            >
                              <TextField
                                value={cell}
                                onChange={(e) => handleCellChange(tableIndex, rowIndex, columnIndex, e.target.value)}
                              />
                            </ResizableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={4}>
            <Paper style={styles.paper}>
              <TextField
                label="Назва таблиці"
                value={tableName}
                onChange={(e) => setTableName(e.target.value)}
                fullWidth
                style={styles.menuTextField}
              />
              <TextField
                type="number"
                label="Кількість стовпців"
                value={numColumns}
                onChange={(e) => setNumColumns(e.target.value)}
                fullWidth
                style={styles.menuTextField}
              />
              <TextField
                type="number"
                label="Кількість рядків"
                value={numRows}
                onChange={(e) => setNumRows(e.target.value)}
                fullWidth
                style={styles.menuTextField}
              />
              <Button onClick={handleCreateTable}>
                {editIndex !== null ? 'Оновити таблицю' : 'Створити таблицю'}
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default TableCreate;