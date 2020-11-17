import React from "react";
import { Text, Flex, Radio, Label } from "theme-ui";

export const SelectModos = ({ setModo, modo }) => {
  return (
    <>
      <Text sx={{ padding: "10px 0", textAlign: "left" }}>Modos de busqueda:</Text>
      <Flex mb={3} sx={{ paddingTop: 10 }}>
        <Label>
          <Radio
            name="modo"
            defaultChecked={modo == "algunas_palabras"}
            value="algunas_palabras"
            onClick={(e) => setModo(e.target.value)}
          />
          Algunas palabras
        </Label>
        <Label>
          <Radio
            name="modo"
            value="todas_palabras"
            defaultChecked={modo == "todas_palabras"}
            onClick={(e) => setModo(e.target.value)}
          />
          Todas las palabras
        </Label>
        <Label>
          <Radio
            name="modo"
            value="exacta"
            defaultChecked={modo == "exacta"}
            onClick={(e) => setModo(e.target.value)}
          />
          Exactas
        </Label>
      </Flex>
    </>
  );
};
