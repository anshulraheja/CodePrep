import React from 'react';
import './App.css';
import StarRatingComponent from './components/StarRatingComponent';
import MultiStepperComponent from './components/MultiStepperComponent';
import TabComponent from './components/TabComponent/TabComponent';
import PaginationComponent from './components/PaginationComponent/PaginationComponent';
import AutoCompleteComponent from './components/AutoCompleteComponent/AutoCompleteComponent';
import NestesedCheckboxComponent from './components/NestedCheckboxComponent/NestedCheckboxComponent';
import TodoComponent from './components/TodoComponent/TodoComponent';
import FetchingMultipleAPIs from './components/FetchingAPI/FetchingMultipleAPIs';
import Home from './components/Ecommerce/Home';
import { Outlet } from 'react-router-dom';
import ReactionComponent from './components/ReactionComponent/ReactionComponent';
import ThemeComponent from './components/Theme/ThemeComponent';

function App() {
  return (
    <div className="App">
      {/* <StarRatingComponent /> */}
      {/* <MultiStepperComponent /> */}
      {/* <TabComponent /> */}
      {/* <PaginationComponent /> */}
      {/* <AutoCompleteComponent /> */}
      {/* <NestesedCheckboxComponent /> */}
      {/* <TodoComponent /> */}
      {/* <FetchingMultipleAPIs /> */}
      {/* Layout: navbar, footer, etc. */}
      {/* <header>
        <h1>Ecommerce Demo</h1>
      </header> */}

      {/* This is where child routes will render */}
      {/* <Outlet /> */}
      {/* <ReactionComponent /> */}
      <ThemeComponent />
    </div>
  );
}

export default App;
