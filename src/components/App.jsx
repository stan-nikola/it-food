import s from './App.module.scss';
import { TopBar } from './TopBar/TopBar';
import { LeftSideBar } from './LeftSideBar/LeftSideBar';
import { RightSideBar } from './RightSideBar/RightSideBar';
import { MainBlock } from './MainBlock/MainBlock';

export const App = () => {
  return (
    <>
      <TopBar />
      <div className={s.container}>
        <LeftSideBar />
        <MainBlock />
        <RightSideBar />
      </div>
    </>
  );
};
