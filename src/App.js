import React from 'react';
import './App.css';
import { Router } from "@reach/router";
import Navigation from './components/Navigation';
import CreateTask from './components/CreateTask';
import ScoreTask from './components/ScoreTask'


function App() {
  return (
    <div className="App">
      <Navigation/>
      <Router>
        <CreateTask path='/'/>
        <ScoreTask path='/scoretask'/>

      </Router>
    </div>
  );
}

export default App;

