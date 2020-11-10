import React, { useState, useEffect, useCallback, useRef } from "react";
import styles from "../src/styles/homepage.module.css";

import { Input, Box, Flex, Grid, Text, Button, Image, IconButton } from "theme-ui";

import { Header } from "../src/components/header"

const URL_API = "http://localhost:8080/search/algunas_palabras/";

const textosCargando = ["", "", ""];

const HomePage = () => {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);


  const handleButton = (query) => {
    console.log(query);
    fetch(URL_API + query.toLowerCase())
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((e) => console.error(e));
  };

  return (
    <Flex sx={{ flexDirection: "column", alignItems: "center" }}>
     
      <Header/>
      <Box sx={{paddingTop: 50}}>
        <Text> GameScrapy </Text>
      </Box>

      <div>
        <Input
          defaultValue="Ingrese palabras para buscar"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <Button onClick={() => handleButton(query)}>Buscar</Button>
      </div>

      {items.length > 0 && (
        <div className={styles.resultados}>
          {items.map(({ title, price, provider }) => (
            <div>
              <Text>{title}</Text>
              <Text>{price}</Text>
              <Text>{provider}</Text>
            </div>
          ))}
        </div>
      )}
    </Flex>
  );
};

export default HomePage;
