import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { AuthContext } from '@/App';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const LogoutButton = () => {
const authContext = useContext(AuthContext);
  const { logout } = authContext || {};
  const { user, isAuthenticated } = useSelector((state) => state.user);

  if (!isAuthenticated || !user) {
    return null;
  }

const handleLogout = async () => {
    if (!authContext || !logout) {
      console.warn('AuthContext or logout method not available. Ensure AuthContext.Provider is properly configured.');
      return;
    }
    
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <div className="hidden md:flex flex-col text-right">
        <span className="text-sm font-medium text-gray-900">
          {user.firstName} {user.lastName}
        </span>
        <span className="text-xs text-gray-500">
          {user.emailAddress}
        </span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLogout}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
      >
        <ApperIcon name="LogOut" size={16} />
        <span className="hidden sm:inline">Logout</span>
      </Button>
    </div>
  );
};

export default LogoutButton;