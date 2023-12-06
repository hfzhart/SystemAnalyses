import React from 'react';
import SavedCharts from './SavedCharts';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Dashboard = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || !user.id) {
    return <div>Неможливо визначити користувача.</div>;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Дашборд
        </Typography>
        <IconButton
          style={{ marginLeft: 'auto' }}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <SavedCharts userId={user.id} />
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Dashboard;
