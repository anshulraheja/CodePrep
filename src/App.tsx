import React from 'react';
import './App.css';
import StarRatingComponent from './components/StarRatingComponent';
import MultiStepperComponent from './components/MultiStepperComponent';
import TabComponent from './components/TabComponent/TabComponent';
import PaginationComponent from './components/PaginationComponent/PaginationComponent';
import AutoCompleteComponent from './components/AutoCompleteComponent/AutoCompleteComponent';
import NestesedCheckboxComponent from './components/NestedCheckboxComponent/NestedCheckboxComponent';
import TodoComponent from './components/TodoComponent/TodoComponent';

function App() {
  return (
    <div className="App">
      {/* <StarRatingComponent /> */}
      {/* <MultiStepperComponent /> */}
      {/* <TabComponent /> */}
      {/* <PaginationComponent /> */}
      {/* <AutoCompleteComponent /> */}
      {/* <NestesedCheckboxComponent /> */}
      <TodoComponent />
    </div>
  );
}

export default App;
