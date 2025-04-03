import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useLocation, useNavigate } from 'react-router-dom';

const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon />, path: "/dashboard"},
  {text: 'Offers', icon: <CategoryIcon />, path: "/dashboard/offers"},
  {text: 'Applications', icon: <AssignmentIcon />, path: "/dashboard/applications"},
  {text: 'Proposals', icon: <InventoryIcon />, path: "/dashboard/proposals"},
  {text: 'Contracts', icon: <ReceiptLongIcon />, path: "/dashboard/contracts"},
  { text: 'Profile', icon: <PeopleRoundedIcon />, path: "/dashboard/profile" },
];

export default function MenuContent() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="mt-5 flex-1 px-2 space-y-1">
      {mainListItems.map((item, index) => (
        <button
          key={index}
          onClick={() => navigate(item.path)}
          className={`${
            location.pathname === item.path
              ? 'bg-primary-50 text-primary-600'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full`}
        >
          <span className="mr-3 h-6 w-6">{item.icon}</span>
          {item.text}
        </button>
      ))}
    </nav>
  );
}
