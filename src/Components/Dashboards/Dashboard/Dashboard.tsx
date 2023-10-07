import { useUserProvider } from '../../Providers/User.provider';
import { AdminDashboard } from '../AdminsDashboard/AdminsDashboard';
import { UserDashboard } from '../UserDashboard/UserDashboard';

const Dashboard = () => {
  const { admin } = useUserProvider();
  return <div>{admin ? <AdminDashboard /> : <UserDashboard />}</div>;
};

export default Dashboard;
