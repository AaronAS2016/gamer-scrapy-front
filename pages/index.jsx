import React, { useState } from "react";
import styles from "../src/styles/homepage.module.css";

const URL_API = "http://localhost:8080/search/algunas_palabras/";


const HomePage = () => {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([])

  const handleButton = (query) => {
    console.log(query);
    fetch(URL_API + query.toLowerCase())
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((e) => console.error(e));
  };
  

  return (
    <div className={styles.wrapper}>
        <input className={styles.input} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ingrese palabras para buscar"/>
        <button className={styles.btn} onClick={ () => handleButton(query) }>Buscar</button>


        {items.length > 0 &&
        
          <div className={styles.resultados}>
              {
                items.map(({title, price, count}) => (
                  <div key={count}>
                    {title}
                    {price}
                  </div>
                ))
              }
          </div>
        
        }
    </div>
  );
};

export default HomePage;
