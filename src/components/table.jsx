import React from "react";
import { Box, Flex, Text, Button } from "theme-ui"

export const Table = ({ items, showTable }) =>
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
                {parseInt(price) === 0 ? "Gratis!" : `$${price}`}
              </Text>
              <Text sx={{ width: "16%" }}>{category}</Text>
              <Text sx={{ width: "16%" }}>{provider}</Text>
            </Flex>
          ))}
        </Flex>
      </Box>
      <Flex
        sx={{
          width: "100%",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: 10,
        }}
      >
        <Text
          sx={{
            fontWeight: "bold",
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
            }}
          >
  
            JSON
          </Button>
          <Button
            sx={{
              width: "100%",
              margin: 10,
              cursor: "pointer",
            }}
          >
    
            CSV
          </Button>
          <Button
            sx={{
              width: "100%",
              margin: 10,
              cursor: "pointer",
            }}
          >
            HTML
          </Button>
        </Flex>
      </Flex>
    </>
  );
