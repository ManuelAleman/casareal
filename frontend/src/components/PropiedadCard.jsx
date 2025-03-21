import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBed, faExpandArrowsAlt, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { URL_API } from '../utils/constants';

export const PropiedadCard = ({ idPublicacion, fotoURL, titulo, ciudad, tipo, numRecamaras, superficieTotal, precio, estatus = null, perfil = false, vendedor = false }) => {


  const [styleEstatus, setStyleEstatus] = useState("bg-green-500 text-white py-2 px-4 rounded-lg");
  useEffect(() => {
    if (estatus === "Activa") {
      setStyleEstatus("bg-green-500 text-white py-2 px-4 rounded-lg")
    } else if (estatus === "En Autorizacion") {
      setStyleEstatus("bg-yellow-500 text-white py-2 px-4 rounded-lg")
    } else if (estatus === "Rechazada") {
      setStyleEstatus("bg-red-500 text-white py-2 px-4 rounded-lg")
    } else if (estatus === "Busca Vendedor") {
      setStyleEstatus("bg-blue-500 text-white py-2 px-4 rounded-lg")
    }
  }, [estatus]);

  const handleSolicitarVendedor = () => {
    axios.put(URL_API + "/posts/post/" + idPublicacion + "/solicitarVendedor", {}, {
      headers: {
        'authentication-token': localStorage.getItem('authentication-token')
      }
    }).then((res) => {
      alert("Solicitud enviada")
    }).catch((error) => {
      console.error(error);
    })
  }

  return (
    <div className="border rounded-lg shadow-lg overflow-hidden">
      <img src={fotoURL} alt={titulo} className="w-full h-48 object-cover" />
      <div className="p-4">
        <div className="flex justify-between">
          <h3 className="text-xl font-bold mb-2">{titulo}</h3>
          <span className="bg-blue-500 text-white px-2 pt-2 rounded-lg ml-2">{tipo.toUpperCase()}</span>
        </div>
        <p className="text-gray-700 mb-2">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" /> {ciudad}
        </p>
        <p className="text-gray-700 mb-2">
          <FontAwesomeIcon icon={faBed} className="mr-2" /> {numRecamaras} recámaras
        </p>
        <p className="text-gray-700 mb-2">
          <FontAwesomeIcon icon={faExpandArrowsAlt} className="mr-2" /> {superficieTotal} m2
        </p>
        <p className="text-gray-700 mb-2">
          <FontAwesomeIcon icon={faDollarSign} className="mr-2" /> {precio} pesos
        </p>

        {
          perfil && (
            <div className={styleEstatus}>
              <span className="font-bold">Estatus:</span> {estatus}
            </div>
          )
        }


        <Link to={"/post/" + idPublicacion}>
          <button className="mt-4 w-full bg-white text-black text-lg font-bold py-2 border-black border-2 hover:bg-black hover:text-white transition duration-300">
            Ver Más
          </button>
        </Link>
        {(perfil && vendedor && estatus !== "Rechazada" && estatus !== "Busca Vendedor" && estatus !== "En Autorizacion") ?
          <button onClick={() => handleSolicitarVendedor()} className="mt-4 w-full bg-white text-black text-lg font-bold py-2 border-black border-2 hover:bg-black hover:text-white transition duration-300">
            Solicitar vendedor
          </button>
          : null
        }

      </div>
    </div >
  );
};