import React ,{useEffect, useState} from 'react'
import axios from "axios";
import './worldlist.css'
function WorldList() {
    const [allData, setAllData] = useState(null);
    const [sortBy, setSortBy]= useState('new');
     
    var options = {
        method: 'GET',
       
        url: 'https://covid-193.p.rapidapi.com/statistics',
       
        headers: {
          'x-rapidapi-host': 'covid-193.p.rapidapi.com',
          'x-rapidapi-key': '1bde752bbbmshe397b34835a3682p106efajsn7056d3c6c4c7'
        }
      };
      const getAllCountryData= ()=>{
            axios.request(options).then(function (r) {
                const res = r.data.response
                const sorted = sortBy==='new'? [...res].sort(function(a, b) {
                    var nameA = parseInt(a.cases.new)
                   
                    var nameB = parseInt(b.cases.new )
                    if(isNaN(nameA))
                    nameA=0;   
                    if(isNaN(nameB))
                    nameB=0;  
                    
                    if (nameA < nameB) {
                      return 1;
                    }
                    if (nameA > nameB) {
                      return -1;
                    } 
                    return 0;
                   
                  }):[...res].sort(function(a, b) {
                    return a.country.localeCompare(b.country)})
                setAllData(sorted)
                console.log(r.data.response)
            }).catch(function (error) {
                console.error(error);
            });
      }
     
  
    useEffect(() => {
        getAllCountryData();
        
    }, [sortBy])
    return (
        <>
         <div>
        
          
          <h3>Covid-19 Around World </h3>
          <span>By: Jay Prakash | 12/01/2022</span>
               
          <table id='table'>
                 <thead className='thead' >
                     <tr>
                         <th onClick={()=>setSortBy('country')} style={{cursor:'pointer'}}>Country/Continent</th>
                         <th>Total cases</th>
                         <th onClick={()=>setSortBy('new')} style={{cursor:'pointer'}}>New cases</th>
                         <th>Critical cases</th>
                         <th>Deaths</th>
                         <th>Active cases</th>
                         <th>Recovered cases</th>
                     </tr>
                 </thead>
                 <tbody>
                 
                 {
                    allData != null?                         
                         allData.map((e)=>{
                             return( 
                             <tr>
                                  <td>{e.country}</td>
                                  <td>{e.cases.total}</td>
                                  <td>{e.cases.new}</td>
                                  <td>{e.cases.critical}</td>
                                  <td>{e.cases.active}</td>
                                  <td>{e.deaths.total}</td>
                                  <td>{e.cases.recovered}</td>
                             </tr>)
                         }):null
                  }
                
                 </tbody>
          </table>
          
            </div>       

        </>
       
    )
}

export default WorldList
