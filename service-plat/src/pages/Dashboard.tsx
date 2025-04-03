import { DataGrid } from '@mui/x-data-grid';
import { useUser } from '../contexts/userContext';
import { useJobs, useProposals, useContracts } from '../contexts/DataContext';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import DescriptionIcon from '@mui/icons-material/Description';
import HandshakeIcon from '@mui/icons-material/Handshake';

const Dashboard = () => {
  const { user } = useUser();
  const { jobs } = useJobs();
  const { proposals } = useProposals();
  const { contracts } = useContracts();

  // Filter data based on user role
  const userJobs = jobs.filter(job => job.clientId === user?.id);
  const userProposals = proposals.filter(prop => 
    user?.role === 'freelancer' 
      ? prop.freelancerId === user?.id 
      : jobs.find(j => j.id === prop.jobId)?.clientId === user?.id
  );
  const userContracts = contracts.filter(contract => {
    const proposal = proposals.find(p => p.id === contract.proposalId);
    return user?.role === 'freelancer'
      ? proposal?.freelancerId === user?.id
      : jobs.find(j => j.id === proposal?.jobId)?.clientId === user?.id;
  });

  // Summary Cards Data
  const summaryCards = [
    {
      title: user?.role === 'client' ? 'Jobs Posted' : 'Jobs Applied',
      value: user?.role === 'client' ? userJobs.length : userProposals.length,
      icon: <WorkIcon sx={{ fontSize: 40, color: '#155b33' }} />,
      color: '#e6f4ea'
    },
    {
      title: 'Active Proposals',
      value: userProposals.filter(p => p.status === 'pending').length,
      icon: <DescriptionIcon sx={{ fontSize: 40, color: '#1967d2' }} />,
      color: '#e8f0fe'
    },
    {
      title: 'Active Contracts',
      value: userContracts.filter(c => c.status === 'active').length,
      icon: <HandshakeIcon sx={{ fontSize: 40, color: '#c0731c' }} />,
      color: '#fef7e0'
    },
  ];

  // Recent Activities Table Data
  const recentActivities = user?.role === 'client' 
    ? userJobs.slice(0, 5).map(job => ({
        id: job.id,
        title: job.title,
        status: job.status,
        date: job.createdAt.toLocaleDateString(),
        type: 'Job Post'
      }))
    : userProposals.slice(0, 5).map(prop => {
        const job = jobs.find(j => j.id === prop.jobId);
        return {
          id: prop.id,
          title: job?.title || 'Unknown Job',
          status: prop.status,
          date: prop.createdAt.toLocaleDateString(),
          type: 'Application'
        };
      });

  const recentColumns = [
    { field: 'title', headerName: 'Title', width: 250 },
    { field: 'type', headerName: 'Type', width: 120 },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 120,
      renderCell: (params: any) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          params.value === 'active' || params.value === 'accepted'
            ? 'bg-green-100 text-green-800'
            : params.value === 'pending'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {params.value}
        </span>
      )
    },
    { field: 'date', headerName: 'Date', width: 120 },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <Grid container spacing={3}>
        {summaryCards.map((card, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ bgcolor: card.color }}>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <Typography color="textSecondary" gutterBottom>
                      {card.title}
                    </Typography>
                    <Typography variant="h4" component="div">
                      {card.value}
                    </Typography>
                  </div>
                  {card.icon}
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow p-6">
        <Typography variant="h6" className="mb-4">
          Recent Activities
        </Typography>
        <DataGrid
          rows={recentActivities}
          columns={recentColumns}
          autoHeight
          hideFooter
          disableRowSelectionOnClick
          sx={{
            border: 'none',
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #f3f4f6',
            }
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
