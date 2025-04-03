import { useState } from 'react';
import { DataGrid, GridRowId } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { jobs as dataJobs } from '../components/data/jobs';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { useJobs } from '../contexts/DataContext';
import dayjs from 'dayjs';
import { useUser } from '../contexts/userContext';

interface Job {
  id: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  status: string;
  numberOfSlots: number;
  acceptedSlots: number;
  createdAt: string;
}

const Offers = () => {
  const navigate = useNavigate();
  const { jobs, deleteJob } = useJobs();
  const { user } = useUser();

  // Filter jobs for current user
  const userJobs = jobs.filter(job => job.clientId === user?.id);

  const columns = [
    { field: 'title', headerName: 'Job Title', width: 200 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'budget', headerName: 'Budget (FCFA)', width: 120 },
    { field: 'status', headerName: 'Status', width: 120 },
    { 
      field: 'slots', 
      headerName: 'Slots', 
      width: 120,
      renderCell: (params: any) => `${params.row.acceptedSlots}/${params.row.numberOfSlots}`
    },
    { 
      field: 'createdAt', 
      headerName: 'Created', 
      width: 180,
      valueFormatter: (params: any) => dayjs(params.value).format('MM/DD/YYYY')
    }
  ];

  const handleDelete = (id: GridRowId) => {
    deleteJob(id.toString());
  };

  const handleEdit = (id: string) => {
    navigate(`/offers/edit/${id}`);
  };

  const handleView = (id: string) => {
    navigate(`/offers/${id}`);
  };

  const customActions = [
    {
      props: {
        icon: <VisibilityIcon />,
        label: 'View',
      },
      func: (id: any) => () => handleView(id)
    },
    {
      props: {
        icon: <EditIcon />,
        label: 'Edit',
      },
      func: (id: any) => () => handleEdit(id)
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">My Job Offers</h2>
        <button
          onClick={() => navigate('/dashboard/offers/create')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#155b33] hover:bg-[#498965] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-[#2a694f]"
        >
          Create New Job
        </button>
      </div>
      
      <div className="bg-white shadow rounded-lg">
        <DataGrid
          rows={userJobs}
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

export default Offers;
