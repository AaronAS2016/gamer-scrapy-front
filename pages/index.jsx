import React, { useState, useEffect, useCallback, useRef } from "react";
import styles from "../src/styles/homepage.module.css";

import {
  Input,
  Box,
  Flex,
  Grid,
  Text,
  Button,
  Image,
  IconButton,
  Divider,
  Donut,
} from "theme-ui";

import { Header } from "../src/components/header";

const URL_API = "http://localhost:8080/search/algunas_palabras/";

const textosCargando = [
  "Scrapeando... No vayas a demandarnos!",
  "Robando contraseñas",
  "Aguarde un segundo mientras preparamos nuestros servidores para minar bitcoins",
];

const generateTextRandom = () =>
  textosCargando[Math.floor(Math.random() * textosCargando.length)];

const HomePage = () => {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [text, setText] = useState(generateTextRandom());
  const [isLoading, setLoading] = useState(false);

  const handleButton = (query) => {
    setItems([]);
    setLoading(true);
    setText(generateTextRandom());

    fetch(URL_API + query.toLowerCase())
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((e) => console.error(e));
  };

  return (
    <Flex sx={{ flexDirection: "column", alignItems: "center" }}>
      <Header />
      <Box sx={{ padding: 100 }}>
        {isLoading && (
          <Flex
            sx={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              sx={{
                fontWeight: "bold",
                fontSize: "1.5em",
                textAlign: "center",
                padding: 10,
              }}
            >
              {text}
            </Text>
            <Donut
              sx={{ animation: "1s rotate linear infinite", width: "30%" }}
              value={1 / 2}
              size={75}
            />
          </Flex>
        )}

        {!isLoading && (
          <Box>
            <Box sx={{ padding: 50, fontSize: "2em", fontWeight: "bold" }}>
              <Text> Busca precios de todos los juegos que quieras! </Text>
            </Box>

            <Flex sx={{ width: "100%", justifyContent: "center" }}>
              <Flex
                sx={{
                  flexDirection: "column",
                  width: "100%",
                  maxWidth: "400px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Input
                  defaultValue="Ingrese palabras para buscar"
                  sx={{ marginBottom: 2 }}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleButton(query);
                    }
                  }}
                />

                <Button
                  sx={{ width: "100%" }}
                  onClick={() => handleButton(query)}
                >
                  Buscar
                </Button>
              </Flex>
            </Flex>
          </Box>
        )}

        {items.length > 0 && (
          <Box sx={{ paddingTop: 20 }}>
            <Flex
              sx={{
                borderColor: "primary",
                borderWidth: 1,
                borderStyle: "solid",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 20,
              }}
            >
              <Text sx={{ width: "50%" }}>Titulo</Text>
              <Text sx={{ width: "25%" }}>Precio</Text>
              <Text sx={{ width: "25%" }}>Proveedor</Text>
            </Flex>
            <Flex
              sx={{
                borderColor: "primary",
                flexDirection: "column",
                borderWidth: 1,
                borderStyle: "solid",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 20,
              }}
            >
              {items.map(({ title, price, provider }) => (
                <Flex
                  sx={{
                    width: "100%",
                    justifyContent: "space-between",
                    padding: 10,
                  }}
                >
                  <Text
                    sx={{
                      width: "50%",
                      padding: "0 15px",
                      boxSizing: "border-box",
                    }}
                  >
                    {title}
                  </Text>
                  <Text sx={{ width: "25%" }}>{price}</Text>
                  <Text sx={{ width: "25%" }}>{provider}</Text>
                </Flex>
              ))}
            </Flex>
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default HomePage;
