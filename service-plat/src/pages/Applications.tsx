import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useProposals, useJobs } from '../contexts/DataContext';
import { useUser } from '../contexts/userContext';
import { users } from '../components/data/users';
import { profiles } from '../components/data/profiles';
import { Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArticleIcon from '@mui/icons-material/Article';

const Applications = () => {
  const { proposals } = useProposals();
  const { jobs } = useJobs();
  const { user } = useUser();

  // Get all jobs created by the current user
  const userJobs = jobs.filter(job => job.clientId === user?.id);

  // Get all proposals for the user's jobs
  const jobApplications = proposals.filter(proposal => {
    const job = jobs.find(j => j.id === proposal.jobId);
    return job?.clientId === user?.id;
  });

  const getApplicantDetails = (freelancerId: string) => {
    const user = users.find(u => u.id === freelancerId);
    const profile = profiles.find(p => p.userId === freelancerId);
    return {
      user,
      profile
    };
  };

  const rows = jobApplications.map(application => {
    const job = jobs.find(j => j.id === application.jobId);
    const { user: applicant, profile } = getApplicantDetails(application.freelancerId);
    
    return {
      id: application.id,
      jobTitle: job?.title || 'Unknown Job',
      applicantName: applicant?.email.split('@')[0] || 'Unknown',
      location: profile?.location || 'Not specified',
      verificationStatus: profile?.verificationStatus || 'pending',
      bidAmount: application.bidAmount,
      status: application.status,
      coverLetter: application.coverLetter,
      createdAt: application.createdAt.toLocaleDateString()
    };
  });

  const columns: GridColDef[] = [
    { field: 'jobTitle', headerName: 'Job Title', width: 200 },
    { field: 'applicantName', headerName: 'Applicant', width: 150 },
    { field: 'location', headerName: 'Location', width: 120 },
    { 
      field: 'verificationStatus', 
      headerName: 'Verified', 
      width: 120,
      renderCell: (params) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          params.value === 'verified' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {params.value}
        </span>
      )
    },
    { 
      field: 'bidAmount', 
      headerName: 'Bid Amount (FCFA)', 
      width: 150,
      renderCell: (params) => (
        <span className="font-medium">
          {params.value.toLocaleString()}
        </span>
      )
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 120,
      renderCell: (params) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          params.value === 'accepted' 
            ? 'bg-green-100 text-green-800'
            : params.value === 'rejected'
            ? 'bg-red-100 text-red-800'
            : 'bg-blue-100 text-blue-800'
        }`}>
          {params.value}
        </span>
      )
    },
    { field: 'createdAt', headerName: 'Applied On', width: 120 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <div className="flex gap-2">
          <Button
            startIcon={<ArticleIcon />}
            size="small"
            onClick={() => {
              // TODO: Implement cover letter view
              console.log('View cover letter:', params.row.coverLetter);
            }}
          >
            Cover Letter
          </Button>
          <Button
            startIcon={<VisibilityIcon />}
            size="small"
            onClick={() => {
              // TODO: Implement profile view
              console.log('View profile:', params.row.applicantName);
            }}
          >
            Profile
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Job Applications</h2>
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

export default Applications;
