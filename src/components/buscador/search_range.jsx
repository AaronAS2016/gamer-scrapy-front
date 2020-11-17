import React, { useEffect, useState } from "react";
import { Flex, Slider, Label, Text } from "theme-ui";
import { PRECIO_MAXIMO } from "../../constant";

export const SlideRango = ({ precio, setPrecioMaximo }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (parseInt(precio) === PRECIO_MAXIMO) {
      setText("Cualquier precio");
    } else if (parseInt(precio) === 0) {
      setText("Gratis");
    } else {
      setText(`Hasta $${precio}`);
    }
  }, [precio]);

  return (
    <Flex sx={{ paddingTop: 10, flexDirection: "column" }}>
      <Label>Filtro por precio </Label>
      <Slider
        value={precio}
        step={5}
        max={PRECIO_MAXIMO}
        onChange={(e) => setPrecioMaximo(e.target.value)}
      />
      <Text sx={{ textAlign: "center", width: "100%" }}> {text} </Text>
    </Flex>
  );
};
