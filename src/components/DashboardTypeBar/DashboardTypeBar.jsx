import { useParams } from 'react-router-dom';
import css from './DashboardTypeBar.module.css';

export const DashboardTypeBar = () => {
  const { category } = useParams();
  return <p className={css.dashboardText}> Dashboard / {category}</p>;
};
