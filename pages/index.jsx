import React, { useState } from "react";

import { Flex } from "theme-ui";

import { Header } from "../src/components/header";
import { Error } from "../src/components/error";
import { Loader } from "../src/components/loader";
import { Resultados } from "../src/components/table";
import { Footer } from "../src/components/footer";
import { Buscador } from "../src/components/buscador";

import { URL_API, generateTextRandom } from "../src/config/";

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [text, setText] = useState(generateTextRandom());
  const [isLoading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);

  const handleButton = (query, modo) => {
    setItems([]);
    setError(false);
    setLoading(true);
    setText(generateTextRandom());

    fetch(URL_API + modo + "/" + query.toLowerCase())
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
        <Loader showLoader={isLoading} text={text} />

        <Buscador showBuscador={!isLoading} handleButton={handleButton} />

        <Resultados items={items} showTable={items.length > 0} />
      </Flex>
      <Footer />
    </Flex>
  );
};

export default HomePage;
