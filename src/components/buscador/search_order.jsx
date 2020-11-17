import React from "react";
import { Select, Flex, Label } from "theme-ui";

export const SelectOrder = ({orden, setOrden}) => {
  return (
    <Flex sx={{ paddingTop: 10, flexDirection: "column" }}>
      <Label> Ordenar por: </Label>
      <Select value={orden} onChange={(e) => setOrden(e.target.value)} sx={{ width: "100%" }}>
        <option style={{ color: "#000" }} value="relevancia">
          Relevancia
        </option>
        <option style={{ color: "#000" }} value="precio_asc">
          Menor Precio
        </option>
        <option style={{ color: "#000" }} value="precio_desc">
          Mayor Precio
        </option>
        <option style={{ color: "#000" }} value="nombre_asc">
          A-Z
        </option>
        <option style={{ color: "#000" }} value="nombre_desc">
          Z-A
        </option>
      </Select>
    </Flex>
  );
};
