import React from "react";
import { Text, Flex, Label, Checkbox } from "theme-ui";

export const SelectSitios = ({ sitioQueNoSeBusca, agregarSitioBan }) => {
  const handleCheckboxChange = (event) => {
    let nuevoSitioABannear = event.target.value
    let sitioFiltrado = [...sitioQueNoSeBusca, nuevoSitioABannear ];
    if (sitioQueNoSeBusca.includes(nuevoSitioABannear)) {
      sitioFiltrado = sitioFiltrado.filter((sitio) => sitio !== nuevoSitioABannear);
    }
    agregarSitioBan(sitioFiltrado);
  };
  return (
    <>
      <Text sx={{ padding: "10px 0", textAlign: "left" }}>
        Sitios a buscar:
      </Text>
      <Flex mb={3} sx={{ paddingTop: 10 }}>
        <Label>
          <Checkbox
            defaultChecked={!sitioQueNoSeBusca.includes("steampowered")}
            value="steampowered"
            onClick={(e) => handleCheckboxChange(e)}
          />
          Steam
        </Label>
        <Label>
          <Checkbox
            value="gog"
            defaultChecked={!sitioQueNoSeBusca.includes("gog")}
            onClick={(e) => handleCheckboxChange(e)}
          />
          GOG
        </Label>
        <Label>
          <Checkbox
            value="gamesplanet"
            defaultChecked={!sitioQueNoSeBusca.includes("gamesplanet")}
            onClick={(e) => handleCheckboxChange(e)}
          />
          Gamesplanet
        </Label>
        <Label>
          <Checkbox
            value="nuuvem"
            defaultChecked={!sitioQueNoSeBusca.includes("nuuvem")}
            onClick={(e) => handleCheckboxChange(e)}
          />
          Nuuvem
        </Label>
      </Flex>
    </>
  );
};
