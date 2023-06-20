import { useLocation } from 'react-router-dom';
import css from './DashboardTypeBar.module.css';

export const DashboardTypeBar = () => {
  const { pathname } = useLocation();
  return <p className={css.dashboardText}> Dashboard / {pathname.slice(1)}</p>;
};
