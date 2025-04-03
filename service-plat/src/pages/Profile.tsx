import { DataGrid } from '@mui/x-data-grid';

const Profile = () => {
  const rows = [
    { id: 1, field: 'Name', value: 'John Doe' },
    { id: 2, field: 'Email', value: 'john.doe@example.com' },
    { id: 3, field: 'Role', value: 'Freelancer' },
  ];

  const columns = [
    { field: 'field', headerName: 'Field', width: 200 },
    { field: 'value', headerName: 'Value', width: 300 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h2>Profile</h2>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
};

export default Profile;
