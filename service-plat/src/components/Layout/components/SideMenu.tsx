import { Avatar } from '@mui/material';
import { useUser } from '../../../contexts/userContext';
import MenuContent from './MenuContent';

export default function SideMenu() {
  const { user } = useUser();

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1">
            <MenuContent />
          </div>
            <div className="flex items-center p-4 border-t border-gray-200">
            <Avatar>
              {user?.username
              ? user.username
                .split(' ')
                .map((name) => name[0])
                .join('')
                .toUpperCase()
              : 'U'}
            </Avatar>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">{user?.username || "user email"}</p>
              <p>
              <button
                onClick={() => (window.location.href = '/')}
                className="text-sm text-blue-500 hover:underline"
              >
                Go to Home
              </button>
              </p>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
}
