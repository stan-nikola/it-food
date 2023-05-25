import { useState } from 'react';
import { Button } from '@mui/material';
import css from './App.module.scss';
import './light-theme.scss';
import './variables.scss';

export const App = () => {
  const [lightTheme, setLightTheme] = useState(false);

  return (
    <div className={css.container}>
      <div className={css.text}>React pet project template</div>
      <Button className={css.Button}>Contained</Button>
      <div id="example-app" className={lightTheme ? 'light' : 'dark'}>
        <h1>Hello World</h1>
        <p>This is an example of using themes with css variables</p>
        <button onClick={() => setLightTheme(s => !s)}>Toggle Theme</button>
      </div>
    </div>
  );
};
