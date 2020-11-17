export const textosCargando = [
    "Scrapeando... No vayas a demandarnos!",
    "Robando contraseñas",
    "Aguarde un segundo mientras preparamos nuestros servidores para minar bitcoins",
    "Mejores que Aperture Devs",
    "Scraping hecho con amor ♥",
    "No se experimentó con humanos en la realización de esta app",
    "Scrapeando por Fabian Lagorio",
    "Aviso: Cualquier parecido con otro proyecto es mera coincidencia.",
    "Fabian Lagorio approved",
    "MIAMEEEEE!",
    "El orgulloso producto del trabajo en cuarentena",
    "Las llamas en tu cpu no son parte del programa",
    "Disculpe, fuego tiene?",
    "Do you like scraping other videogames?"
  ];
  
  export const generateTextRandom = () =>
    textosCargando[Math.floor(Math.random() * textosCargando.length)];