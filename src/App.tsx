import React from 'react';
import './App.css';
import StarRatingComponent from './components/StarRatingComponent';
import MultiStepperComponent from './components/MultiStepperComponent';
import TabComponent from './components/TabComponent/TabComponent';
import PaginationComponent from './components/PaginationComponent/PaginationComponent';
import AutoCompleteComponent from './components/AutoCompleteComponent/AutoCompleteComponent';

function App() {
  return (
    <div className="App">
      {/* <StarRatingComponent /> */}
      {/* <MultiStepperComponent /> */}
      {/* <TabComponent /> */}
      {/* <PaginationComponent /> */}
      <AutoCompleteComponent />
    </div>
  );
}

export default App;
