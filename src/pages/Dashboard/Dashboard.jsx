import { Outlet } from 'react-router-dom';
import s from './Dashboard.module.css';

import { LeftSideBar } from 'components/LeftSideBar';
import { RightSideBar } from 'components/RightSideBar';

const Dashboard = () => {
  return (
    <div className={s.container}>
      <LeftSideBar />
      <Outlet />
      <RightSideBar />
    </div>
  );
};

export default Dashboard;
