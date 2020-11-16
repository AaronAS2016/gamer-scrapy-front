import { saveAs } from "file-saver";
import { pdf, Text, View } from "@react-pdf/renderer";

import { Document, Page } from "@react-pdf/renderer";
import {
  Table,
  TableCell,
  TableHeader,
  TableBody,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";



export const downloadFileJSON = async (myData) => {
  const fileName = "informe";
  const json = JSON.stringify(myData);
  const blob = new Blob([json], { type: "application/json" });
  const href = await URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = href;
  link.download = fileName + ".json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

function convertToCSV(objArray) {
  var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
  var str = "";

  for (var i = 0; i < array.length; i++) {
    var line = "";
    for (var index in array[i]) {
      if (line != "") line += ",";

      line += array[i][index];
    }

    str += line + "\r\n";
  }

  return str;
}

export function exportCSVFile(headers, itemsData, fileTitle) {
  let items = itemsData;

  if (headers) {
    items = [headers, ...itemsData];
  }

  // Convert Object to JSON
  var jsonObject = JSON.stringify(items);

  var csv = convertToCSV(jsonObject);

  var exportedFilenmae = fileTitle + ".csv" || "export.csv";

  var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, exportedFilenmae);
  } else {
    var link = document.createElement("a");
    if (link.download !== undefined) {
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", exportedFilenmae);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}



const TablaPrecios = ({ items }) => (
  <Document>
    <Page>
      <View>
        <Text> Resultados de la busqueda:  </Text>
        <Table data={items}>
          <TableHeader>
            <TableCell>Titulo</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell>Provider</TableCell>
            <TableCell>URL</TableCell>
          </TableHeader>
          <TableBody>
            <DataTableCell getContent={(r) => r.title} />
            <DataTableCell getContent={(r) => r.price} />
            <DataTableCell getContent={(r) => r.category} />
            <DataTableCell getContent={(r) => r.provider} />
            <DataTableCell getContent={(r) => r.url} />
          </TableBody>
        </Table>
      </View>
    </Page>
  </Document>
);

export const generatePdfDocument = async (documentData) => {
  const blob = await pdf(<TablaPrecios items={documentData} />).toBlob();
  saveAs(blob, "informe");
};
