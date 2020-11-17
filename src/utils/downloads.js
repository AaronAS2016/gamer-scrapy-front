import { saveAs } from "file-saver";
import { pdf, Text, View, Link } from "@react-pdf/renderer";

import { Document, Page, StyleSheet } from "@react-pdf/renderer";
import {
  Table,
  TableCell,
  TableHeader,
  TableBody,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";



export const downloadFileJSON = async (myData, filename) => {
  const json = JSON.stringify(myData);
  const blob = new Blob([json], { type: "application/json" });
  const href = await URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = href;
  link.download = filename + ".json";
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

const styles = StyleSheet.create({
  title: { padding: 10 },
  tabla: { fontSize: ".5em", margin: 10},
});

const TablaPrecios = ({ items, query }) => (
  <Document>
    <Page>
      <View>
        <Text style={styles.title}> Resultados de la busqueda: {query} </Text>
        <View style={styles.tabla}>
          <Table data={items}>
            <TableHeader>
              <TableCell>Titulo</TableCell>
              <TableCell weighting={0.3}>Precio</TableCell>
              <TableCell weighting={0.3}>Categoria</TableCell>
              <TableCell weighting={0.3} >Provider</TableCell>
            </TableHeader>
            <TableBody>
              <DataTableCell getContent={(r) => <Link href={r.url}>{r.title}</Link>} />
              <DataTableCell weighting={0.3}  getContent={(r) => `$${r.price}`} />
              <DataTableCell weighting={0.3}  getContent={(r) => r.category} />
              <DataTableCell weighting={0.3}  getContent={(r) => r.provider} />
            </TableBody>
          </Table>
        </View>
      </View>
    </Page>
  </Document>
);

export const generatePdfDocument = async (documentData, query, filename) => {

  const blob = await pdf(<TablaPrecios items={documentData} query={query} />).toBlob();
  saveAs(blob, filename + ".pdf");
};
