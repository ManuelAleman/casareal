import { Barra } from "../components/ui/Barra";
import { BarraAbajo } from "../components/ui/BarraAbajo";
import { PropiedadCard } from "../components/PropiedadCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import axios from "axios";
import { URL_API } from "../utils/constants";
import { FiltrosModal } from "../components/FiltrosModal";

export const PropiedadesPage = () => {

  const [posts, setPosts] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const filtrarPosts = (filtros) => {
    axios.get(URL_API + '/posts/posts').then((response) => {
      const postsOriginales = response.data.posts;
      if (filtros.precioMin === '') filtros.precioMin = 0;
      if (filtros.precioMax === '') filtros.precioMax = 999999999;
      setPosts(postsOriginales.filter((post) => {
        return post.precio >= filtros.precioMin && post.precio <= filtros.precioMax &&
          (filtros.estado === '' || post.estado == filtros.estado) &&
          (filtros.ciudad === '' || post.ciudad == filtros.ciudad) &&
          (filtros.numPisos === '' || post.numPisos == filtros.numPisos) &&
          (filtros.numHabitaciones === '' || post.numRecamaras == filtros.numHabitaciones) &&
          (filtros.numBanos === '' || post.numBanos == filtros.numBanos) &&
          (filtros.tipo === '' || post.tipo == filtros.tipo);
      }));
    });

  }

  useEffect(() => {
    axios.get(URL_API + '/posts/posts').then((response) => {
      setPosts(response.data.posts);
    });
  }, []);

  return (
    <>
      <FiltrosModal filtrarPosts={filtrarPosts} isOpen={isModalOpen} onClose={closeModal} />
      <Barra />
      <div className="container mx-auto py-12 px-4 min-h-screen">
        <h2 className="text-4xl text-center font-bold mb-5">Propiedades Disponibles</h2>
        <button onClick={openModal} className="flex items-center border rounded-lg px-4 py-2 bg-white mb-5 hover:bg-gray-100">
          <FontAwesomeIcon icon={faFilter} className="mr-2" />
          Filtros
          <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {posts.map((post) => (
            <PropiedadCard
              key={post.idPublicacion}
              idPublicacion={post.idPublicacion}
              fotoURL={post.fotoURL}
              titulo={post.titulo}
              ciudad={post.ciudad}
              tipo={post.tipo}
              numRecamaras={post.numRecamaras}
              superficieTotal={post.superficieTotal}
              precio={post.precio}
            />
          ))
          }
        </div>
      </div>
      <BarraAbajo />
    </>
  );
}