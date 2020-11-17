import React from "react";
import { Box, Flex, Text, Button } from "theme-ui";
import { getActualDate } from "../utils/actualDate";

import { downloadFileJSON, exportCSVFile, generatePdfDocument } from "../utils/downloads";


const headers = {
  title: "Titulo",
  price: "Precio",
  provider: "Provedor",
  category: "Categoria",
  url: "URL producto",
};

export const Resultados = ({ items, showTable, query }) =>
  showTable && (
    <>
      <Box sx={{ paddingTop: 20, paddingBottom: 60, width: "70%" }}>
        <Flex
          sx={{
            borderColor: "primary",
            borderWidth: 1,
            borderStyle: "solid",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 20,
            textAlign: "left",
          }}
        >
          <Text sx={{ width: "50%" }}>Titulo</Text>
          <Text sx={{ width: "16%" }}>Precio</Text>
          <Text sx={{ width: "16%" }}>Categoria</Text>
          <Text sx={{ width: "16%" }}>Proveedor</Text>
        </Flex>
        <Flex
          sx={{
            borderColor: "primary",
            flexDirection: "column",
            borderWidth: 1,
            borderStyle: "solid",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {items.map(({ title, price, provider, category }, index) => (
            <Flex
              sx={{
                width: "100%",
                justifyContent: "space-between",
                padding: 10,
                borderBottomWidth: 1,
                borderBottomStyle: "solid",
                borderBottomColor: "primary",
                textAlign: "left",
                backgroundColor: index % 2 === 0 && "secondary",
                color: index % 2 === 0 && "#fff",
              }}
              key={index}
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
              <Text sx={{ width: "16%" }}>
                {price === 0 ? "Gratis!" : `$${price}`}
              </Text>
              <Text sx={{ width: "16%" }}>{category}</Text>
              <Text sx={{ width: "16%" }}>{provider}</Text>
            </Flex>
          ))}
        </Flex>
      </Box>
      <Flex
        sx={{
          width: "70%",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: 10,
        }}
      >
        <Text
          sx={{
            fontSize: "2em",
            textTransform: "uppercase",
            padding: 20,
          }}
        >
          Descargas:
        </Text>
        <Flex
          sx={{
            width: "100%",
            padding: 20,
          }}
        >
          <Button
            sx={{
              width: "100%",
              margin: 10,
              cursor: "pointer",
              padding: 20,
            }}
            onClick={() => downloadFileJSON(items, `${query.toLowerCase().replace(" ", "_") + "_" + getActualDate()}`)}
          >
            JSON
          </Button>
          <Button
            sx={{
              width: "100%",
              margin: 10,
              cursor: "pointer",
              padding: 20,
            }}
            onClick={() => exportCSVFile(headers, items, `${query.toLowerCase().replace(" ", "_") + "_" + getActualDate()}`)}
          >
            CSV
          </Button>
          <Button
            sx={{
              width: "100%",
              margin: 10,
              cursor: "pointer",
              padding: 20,
            }}
            onClick={() => generatePdfDocument(items, query, `${query.toLowerCase().replace(" ", "_") + "_" + getActualDate()}`)}
          > 
          PDF 
          </Button>
        </Flex>
      </Flex>
    </>
  );
