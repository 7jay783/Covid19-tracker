import React, {useEffect} from 'react';
import './App.css';
import DetailCard from './components/DetailCard'
import SearchBar from './components/SearchBar';
import {fetchData} from './api/index'

function App() {
  useEffect(() => {
    const data =  fetchData();
   console.log(data);
  })
  return (
    <div className="App">
      <SearchBar/>
     <DetailCard/> 
     <DetailCard/> 

    

    </div>
  );
}

export default App;
