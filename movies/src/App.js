import "./App.css";
import Pelicula from "./Pelicula";
import PageWrapper from "./PageWrapper";
import peliculasJson from './peliculas.json';
import Paginacion from "./paginacion";
import { useState } from "react";

function App() {

  const [paginaActual, setPaginaActual] = useState(1);
  
  let peliculas = peliculasJson;
  const totalPorPagina = 7;

  const buscarPelicula = async () => {
    let url = 'https://lucasmoy-dev.github.io/data/react/peliculas.json';
    
    let respuesta = await fetch(url, {
      "method": "GET",
      "mode": "no-cors",
      "headers": {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    });
    let json = await respuesta.json()
    alert(json);

  }

  buscarPelicula();

  const cargarPeliculas = () => {
    peliculas = peliculas.slice((paginaActual - 1) * totalPorPagina, paginaActual * totalPorPagina + 5);
  }

  const getTotalPaginas = () => {
    let cantidadTotalDePeliculas = peliculasJson.length;
    return Math.ceil(cantidadTotalDePeliculas / totalPorPagina)
  }

  cargarPeliculas();

  return (
    <PageWrapper>
      {peliculas.map(pelicula => 
        <Pelicula
          titulo={pelicula.titulo}
          calificacion={pelicula.calificacion}
          director={pelicula.director}
          actores={pelicula.actores}
          fecha={pelicula.fecha}
          duracion={pelicula.duracion}
          img={pelicula.img}>
          {pelicula.descripcion}
        </Pelicula>
      )}
  <Paginacion pagina={paginaActual} total={getTotalPaginas()} onChange={(pagina)=>{
    setPaginaActual(pagina)
  }}/>

    </PageWrapper>
  );
}

export default App;
