import React, {useState, useEffect} from 'react'
import '../covid.css';
import axios from "axios";

function Covid() {
   
    const [search, setsearch]= useState("India");
    const [res, setres] = useState(null)
   
      
    useEffect(() => {
      
        var options = {
            method: 'GET',
           
            url: 'https://covid-193.p.rapidapi.com/statistics',
            params: {country: search},
            headers: {
              'x-rapidapi-host': 'covid-193.p.rapidapi.com',
              'x-rapidapi-key': '1bde752bbbmshe397b34835a3682p106efajsn7056d3c6c4c7'
            }
          };
          
          axios.request(options).then(function (response) {
            setres(response.data)
            console.log(response.data)
          }).catch(function (error) {
            console.error(error);
          });
      } ,[search])
    
    return (
        <div className='mainContainer'> {res!=null? <>         
            <div className="custom_field"> 
                <input placeholder='Enter city, country name' onKeyPress={e=>{
                    if(e.key=='Enter')                    
                    setsearch(e.target.value)} 
                } id="search field" type="text"/>
           
            </div>         
            <div>
                <h3>{(res!=null)? res.parameters.country:"not found"}</h3>
                
                <span></span>
                
            </div>
            <div>
            <h3>Case Details</h3>
            <hr/>
                <h5>Total cases</h5>
                <span>{(res!=null)?res.response[0].cases.total:"Not loaded"}</span><br/>
               
            </div>
            <div>
            <h5>Deaths</h5>
               
                <span>{(res!=null)?res.response[0].deaths.total:"loading"}</span>
                
            </div>  
            <div>
            <h5>Recovered</h5>
               
                <span>{(res!=null)?res.response[0].cases.recovered:"Recovered not loaded"}</span>
                
            </div></>: "Loading" }
        </div>
    )
}

export default Covid
