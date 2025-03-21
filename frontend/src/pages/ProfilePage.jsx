import { Barra } from "../components/ui/Barra";
import { BarraAbajo } from "../components/ui/BarraAbajo";
import perfilFoto from "../assets/perfil.png";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { PropiedadCard } from "../components/PropiedadCard";
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import axios from "axios";
import { URL_API } from "../utils/constants";


export const ProfilePage = () => {

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    centerPadding: "100px",
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nombre: '',
    correo: '',
    telefono: ''
  });

  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    // Obtener datos del usuario
    axios.get(URL_API + '/users', {
      headers: {
        'authentication-token': localStorage.getItem('authentication-token')
      }
    }).then((response) => {
      setUsuario(response.data);

      // Obtener publicaciones del usuario
      axios.get(URL_API + '/posts', {
        headers: {
          'authentication-token': localStorage.getItem('authentication-token')
        }
      }).then((response) => {
        setPublicaciones(response.data.posts);
      }).catch((error) => {
        console.error(error);
      });

    }).catch((error) => {
      localStorage.removeItem('authentication-token');
      navigate('/login');
    })
  });

  return (
    <>
      <Barra />
      <div className="container mx-auto py-12 text-center px-4 min-h-screen">
        <h2 className="text-4xl text-center font-bold mb-5">Mi perfil</h2>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="text-center">
            <img src={perfilFoto} alt="Perfil foto" className="w-2/4 mb-3 mx-auto" />
            <p className="text-2xl font-bold mb-2">
              {usuario.nombre}
            </p>
            <p className="text-lg mb-2">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              {usuario.correo}
            </p>
            <p className="text-lg mb-2">
              <FontAwesomeIcon icon={faPhone} className="mr-2" />
              {usuario.telefono}
            </p>
          </div>
          <div className="mt-10 md:mt-0">
            <h2 className="text-3xl text-center font-bold mb-5">Mis propiedades</h2>

            {
              publicaciones.length === 0 &&
              <p className="text-lg mb-5">No tienes propiedades publicadas</p>
            }

            <Slider {...settings}>
              {publicaciones.map((post) => (
                <div key={post.idPublicacion} className="p-2 text-left">
                  <PropiedadCard
                    key={post.idPublicacion}
                    idPublicacion={post.idPublicacion}
                    fotoURL={post.fotoURL}
                    titulo={post.titulo}
                    ciudad={post.ciudad}
                    numRecamaras={post.numRecamaras}
                    superficieTotal={post.superficieTotal}
                    precio={post.precio}
                    estatus={post.estatus}
                    tipo={post.tipo}
                    vendedor={post.vendedor == null ? true : false}
                    perfil={true}
                  />
                </div>
              ))
              }

            </Slider>

            <Link to={"/publicar"}>
              <button className="mt-10 w-1/2 bg-white text-black text-lg font-bold py-2 border-black border-2 hover:bg-black hover:text-white transition duration-300">
                Publicar propiedad
              </button>
            </Link>
          </div>
        </div>
      </div>
      <BarraAbajo />
    </>
  );
}