import { LeftSideBar } from 'components/LeftSideBar/LeftSideBar';
import s from './Dashboard.module.css';
import { MainBlock } from 'components/MainBlock/MainBlock';
import { RightSideBar } from 'components/RightSideBar/RightSideBar';

export const Dashboard = () => {
  return (
    <div className={s.container}>
      <LeftSideBar />
      <MainBlock />
      <RightSideBar />
    </div>
  );
};
