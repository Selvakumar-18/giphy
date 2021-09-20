import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Giphy.css";



const Giphy = () => {
  const [data, setData] = useState([]);

  const [search, setSearch] = useState("");
  
  const [isError, setIsError] = useState(false);

  

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      

      try {
        const results = await axios("https://api.giphy.com/v1/gifs/trending", {
          params: {
            api_key: "YnuSiVXQiR3KxW0jGftYgevdDDqLTyvG",
          
          }
        });

        console.log(results);
        setData(results.data.data);
      } catch (err) {
        setIsError(true);
        setTimeout(() => setIsError(false), 4000);
      }

      
    };

    fetchData();
  }, []);

  const renderGifs = () => {

    return data.map(el => {
      return (
        <div key={el.id} className="gif">
          <img src={el.images.fixed_height.url} />
        </div>
      );
    });
  };
  

  const handleSearchChange = event => {
    setSearch(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setIsError(false);
  

    try {
      const results = await axios("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: "YnuSiVXQiR3KxW0jGftYgevdDDqLTyvG",
          q: search,
          
        }
      });

      setData(results.data.data);

    } catch (err) 
    {
      setIsError(true);

    }    
  };


  return (
    <div className="m-2">
      
      <form className="form-inline justify-content-center m-2">
       
        <input
          value={search}
          onChange={handleSearchChange}
          type="text"
          placeholder="SearchGif"
          className="form-control" />
         
          <button
               onClick={handleSubmit}
               type="submit"
               className="btn btn-primary mx-2">Search</button>
      </form>
      
      <div className="container gifs">
        {renderGifs()}
      </div>

    </div>
  );
};

export default Giphy;