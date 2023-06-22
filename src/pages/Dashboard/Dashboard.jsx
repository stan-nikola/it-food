import { LeftSideBar } from 'components/LeftSideBar/LeftSideBar';
import s from './Dashboard.module.css';

import { RightSideBar } from 'components/RightSideBar/RightSideBar';
import { Outlet } from 'react-router-dom';

export const Dashboard = () => {
  return (
    <div className={s.container}>
      <LeftSideBar />
      <Outlet />
      <RightSideBar />
    </div>
  );
};
