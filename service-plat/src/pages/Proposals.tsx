import { DataGrid } from '@mui/x-data-grid';
import { useProposals } from '../contexts/DataContext';
import { useJobs } from '../contexts/DataContext';
import { useUser } from '../contexts/userContext';

const Proposals = () => {
  const { proposals } = useProposals();
  const { jobs } = useJobs();
  const { user } = useUser();

  // Filter proposals based on user role
  const userProposals = proposals.filter(proposal => {
    if (user?.role === 'freelancer') {
      return proposal.freelancerId === user.id;
    } else if (user?.role === 'client') {
      const job = jobs.find(j => j.id === proposal.jobId);
      return job?.clientId === user.id;
    }
    return false;
  });

  const getJobTitle = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    return job ? job.title : 'Unknown Job';
  };

  const rows = userProposals.map(proposal => ({
    id: proposal.id,
    job: getJobTitle(proposal.jobId),
    status: proposal.status,
    bid: proposal.bidAmount,
    createdAt: proposal.createdAt.toLocaleDateString()
  }));

  const columns = [
    { field: 'job', headerName: 'Job Title', width: 200 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'bid', headerName: 'Bid Amount ($)', width: 150 },
    { field: 'createdAt', headerName: 'Submitted', width: 150 }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Proposals</h2>
      <div className="bg-white shadow rounded-lg">
        <DataGrid 
          rows={rows} 
          columns={columns}
          className="min-h-[500px]"
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

export default Proposals;
