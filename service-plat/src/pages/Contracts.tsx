import { DataGrid } from '@mui/x-data-grid';
import { useContracts, useProposals, useJobs } from '../contexts/DataContext';
import { useUser } from '../contexts/userContext';

const Contracts = () => {
  const { contracts } = useContracts();
  const { proposals } = useProposals();
  const { jobs } = useJobs();
  const { user } = useUser();

  // Filter contracts based on user role
  const userContracts = contracts.filter(contract => {
    const proposal = proposals.find(p => p.id === contract.proposalId);
    if (!proposal) return false;

    if (user?.role === 'freelancer') {
      return proposal.freelancerId === user.id;
    } else if (user?.role === 'client') {
      const job = jobs.find(j => j.id === proposal.jobId);
      return job?.clientId === user.id;
    }
    return false;
  });

  const getJobDetails = (proposalId: string) => {
    const proposal = proposals.find(p => p.id === proposalId);
    if (proposal) {
      const job = jobs.find(j => j.id === proposal.jobId);
      return job ? {
        title: job.title,
        amount: proposal.bidAmount
      } : null;
    }
    return null;
  };

  const rows = userContracts.map(contract => {
    const jobDetails = getJobDetails(contract.proposalId);
    return {
      id: contract.id,
      title: jobDetails?.title || 'Unknown Contract',
      status: contract.status,
      amount: contract.escrowAmount,
      createdAt: contract.createdAt.toLocaleDateString()
    };
  });

  const columns = [
    { field: 'title', headerName: 'Contract Title', width: 200 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'amount', headerName: 'Amount ($)', width: 150 },
    { field: 'createdAt', headerName: 'Created', width: 150 }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Contracts</h2>
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

export default Contracts;
