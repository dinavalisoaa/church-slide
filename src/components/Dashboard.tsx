import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Divider, Box } from '@mui/material';
import { mdiAccountMultiple, mdiCartOutline, mdiChartTimelineVariant, mdiMonitorCellphone, mdiReload, mdiGithub, mdiChartPie } from '@mdi/js';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type Transaction = {
  amount: string;
  date: string;
  business: string;
  type: string;
  name: string;
  account: string;
};

type Client = {
  id: number;
  name: string;
  login: string;
  created: string;
  progress: number;
};

const Dashboard: React.FC = () => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Sample chart data
  const fetchChartData = () => {
    setChartData([
      { name: 'Jan', value: 4000 },
      { name: 'Feb', value: 3000 },
      { name: 'Mar', value: 2000 },
      { name: 'Apr', value: 2780 },
      { name: 'May', value: 1890 },
    ]);
  };

  // Sample client data
  const fetchClientData = () => {
    setClients([
      { id: 1, name: 'John Doe', login: 'john.doe', created: '2021-08-10', progress: 75 },
      { id: 2, name: 'Jane Smith', login: 'jane.smith', created: '2021-07-22', progress: 55 },
      { id: 3, name: 'Jim Beam', login: 'jim.beam', created: '2021-06-15', progress: 40 },
      { id: 4, name: 'Jack Daniels', login: 'jack.daniels', created: '2021-05-02', progress: 90 },
    ]);
  };

  // Sample transaction data
  const fetchTransactionData = () => {
    setTransactions([
      { amount: '$500', date: '2024-10-05', business: 'Business A', type: 'Credit', name: 'Payment 1', account: 'Bank A' },
      { amount: '$250', date: '2024-10-06', business: 'Business B', type: 'Debit', name: 'Payment 2', account: 'Bank B' },
    ]);
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchChartData();
    fetchClientData();
    fetchTransactionData();
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      {/* Header Section */}
      <Typography variant="h4" gutterBottom>Overvieaw</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary">Clients</Typography>
              <Typography variant="h5">512</Typography>
              <Typography variant="body2" color="text.secondary">12% ↑</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary">Sales</Typography>
              <Typography variant="h5">$7770</Typography>
              <Typography variant="body2" color="text.secondary">12% ↓</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary">Performance</Typography>
              <Typography variant="h5">256%</Typography>
              <Typography variant="body2" color="text.secondary">Alert</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Transactions and Clients Section */}
      <Typography variant="h5" sx={{ marginTop: 4 }}>Recent Transactions</Typography>
      <Grid container spacing={3}>
        {transactions.map((transaction, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{transaction.name}</Typography>
                <Typography variant="body2">{transaction.date}</Typography>
                <Typography variant="body2">{transaction.business}</Typography>
                <Typography variant="body1">{transaction.amount}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ marginTop: 4 }} />

      <Typography variant="h5" sx={{ marginTop: 4 }}>Clients Overview</Typography>
      <Grid container spacing={3}>
        {clients.map((client) => (
          <Grid item xs={12} sm={6} key={client.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{client.name}</Typography>
                <Typography variant="body2">Login: {client.login}</Typography>
                <Typography variant="body2">Joined: {client.created}</Typography>
                <Typography variant="body2">Progress: {client.progress}%</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Trends Overview Section */}
      <Typography variant="h5" sx={{ marginTop: 6 }}>Trends Overview____</Typography>
      <Card sx={{ marginTop: 2 }}>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Divider sx={{ marginTop: 4 }} />

      {/* GitHub Banner Section */}
      <Box sx={{ marginTop: 4, textAlign: 'center' }}>
        {/* <Button
          href="https://github.com/justboil/admin-one-vue-tailwind"
          target="_blank"
          variant="contained"
          color="primary"
          startIcon={<mdiGithub />}
        >
          Star on GitHub
        </Button> */}
        <Button>
          UIUO
        </Button>
      </Box>
    </Box>
  );
};

export default Dashboard;
