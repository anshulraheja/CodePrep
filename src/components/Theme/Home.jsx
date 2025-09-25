import React from 'react';
import { useTheme } from './ThemeContext';

const Home = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Themed App</h1>
      <p>This text and background respond to the theme.</p>
      <button onClick={toggleTheme}>Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme</button>
    </div>
  );
};

export default Home;
