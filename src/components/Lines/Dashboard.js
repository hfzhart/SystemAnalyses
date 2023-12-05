import React from 'react';
import SavedCharts from './SavedCharts';

const Dashboard = () => {
 
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || !user.id) {

    return <div>Неможливо визначити користувача.</div>;
  }

  return (
    <div>
      <SavedCharts userId={user.id} />
    </div>
  );
};

export default Dashboard;
