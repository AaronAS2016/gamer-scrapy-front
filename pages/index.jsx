import React, { useState } from "react";

import { Flex } from "theme-ui";

import { Header } from "../src/components/header";
import { Error } from "../src/components/error";
import { Loader } from "../src/components/loader";
import { Resultados } from "../src/components/table";
import { Footer } from "../src/components/footer";
import { Buscador } from "../src/components/buscador";

import { URL_API } from "../src/config/";
import { buildParams } from "../src/utils/urlBuilder";
import { PRECIO_MAXIMO } from "../src/constant";



const HomePage = () => {
  const [items, setItems] = useState([]);

  const [isLoading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);
  const [query, setQuery] = useState("");

  const handleButton = (query, modo, sitioQueNoSeBusca, orden, rango) => {
    let queryParams = "?";
    if (sitioQueNoSeBusca.length > 0) {
      queryParams+= buildParams("filtro", sitioQueNoSeBusca);
    }

    const rangoMaximo = parseInt(rango) === PRECIO_MAXIMO ? -1 : parseInt(rango) 

    queryParams+= queryParams === "?" ? buildParams("rango", [0, rangoMaximo]) : "&" + buildParams("rango", [0, rangoMaximo]) 

    setItems([]);
    setError(false);
    setLoading(true);

    fetch(`${URL_API}${modo}/${orden}/${query.toLowerCase()}${queryParams}`)
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(true);
        setLoading(false);
        console.error(e);
      });
  };

  return (
    <Flex
      sx={{
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <Header />
      <Flex
        sx={{
          padding: 50,
          width: "100%",
          textAlign: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Error showError={hasError} />
        {isLoading && <Loader showLoader={isLoading} />}

        <Buscador showBuscador={!isLoading} handleButton={handleButton} query={query} setQuery={setQuery} />

        <Resultados items={items} showTable={items.length > 0} query={query} />
      </Flex>
      <Footer />
    </Flex>
  );
};

export default HomePage;
