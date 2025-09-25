import React from 'react';
import Home from './Home';
import { ThemeProvider } from './ThemeContext';
import './Theme.css';

const ThemeComponent = () => {
  return (
    <div>
      <ThemeProvider>
        <Home />
      </ThemeProvider>
    </div>
  );
};

export default ThemeComponent;
