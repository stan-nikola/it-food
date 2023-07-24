import s from './NoContentHistory.module.css';

import background1 from '../../images/background/Background@1x.jpg';
import background2 from '../../images/background/Background@2x.jpg';
import background3 from '../../images/background/Background@3x.jpg';
import { useNavigate } from 'react-router-dom';

export const NoContentHistory = ({ textContent }) => {
  const navigate = useNavigate();
  return (
    <div className={s.container}>
      <img
        className={s.background}
        alt="background"
        src={background1}
        srcSet={`${background1} 1x, ${background2} 2x, ${background3} 3x `}
      />
      <div className={s.content}>
        <p className={s.title}>{textContent}</p>
        <button className={s.button} onClick={() => navigate('/home')}>
          Home
        </button>
      </div>
    </div>
  );
};
