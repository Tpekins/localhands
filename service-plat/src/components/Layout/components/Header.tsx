import { useLocation } from 'react-router-dom';
import { useUser } from '../../../contexts/userContext';

const menuContent: { [key: string]: string } = {
  "/": "Welcome",
  "/dashboard": "Dashboard",
  "/contracts": "Contracts",
  "/proposals": "Proposals",
  "/profile": "Profile",
};

export default function Header() {
  const location = useLocation();
  const pageTitle: string = menuContent[location.pathname] || "Dashboard";
  const { user } = useUser();

  return (
    <div className="flex justify-between items-center py-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{pageTitle}</h1>
        {user && (
          <p className="text-sm text-gray-600">
            Hello, {user.username} ({user.role})
          </p>
        )}
      </div>
      <div className="flex items-center space-x-4">
        <input
          type="search"
          placeholder="Search..."
          className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <button className="rounded-full p-2 hover:bg-gray-100">
          <span className="sr-only">Notifications</span>
          {/* Bell icon */}
        </button>
      </div>
    </div>
  );
}
