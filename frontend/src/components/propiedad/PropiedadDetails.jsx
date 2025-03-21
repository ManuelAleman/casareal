import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faCar, faRulerCombined, faCalendar, faStairs, faTree } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

import { CitaModal } from '../CitaModal';
import { useUser } from '../../utils/UserContext';

export const PropiedadDetails = ({ post }) => {

    const [bloquearCita, setBloquearCita] = useState(false);

    const { user, loading } = useUser();

    useEffect(() => {
        if (!localStorage.getItem('authentication-token')) {
            setBloquearCita(true);
        }

    }, []);

    useEffect(() => {
        if (!user) {
            return;
        }

        if (user.idUsuario == post.publicador) {
            setBloquearCita(true);
        }

        if (user.idUsuario == post.vendedor) {
            setBloquearCita(true);
        }
    }, [loading]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between">
                <h2 className="text-2xl font-bold mb-2">{post.titulo}</h2>
                <span className="bg-blue-500 text-white px-2 pt-2 rounded-lg ml-2">{post.tipo.toUpperCase()}</span>
            </div>

            <p className="text-gray-700 mb-4">{post.descripcion}</p>
            <hr className="my-4" />
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center">
                    <FontAwesomeIcon icon={faBed} className="mr-2" />
                    <span>{post.numRecamaras} recamaras</span>
                </div>
                <div className="flex items-center">
                    <FontAwesomeIcon icon={faBath} className="mr-2" />
                    <span>{post.numBanosCompletos} baños</span>
                </div>

                {
                    post.numMediosBanos > 0 && (
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faBath} className="mr-2" />
                            <span>{post.numMediosBanos} medios baños</span>
                        </div>
                    )
                }

                <div className="flex items-center">
                    <FontAwesomeIcon icon={faRulerCombined} className="mr-2" />
                    <span>{post.superficieTotal} m² de superficie</span>
                </div>

                <div className="flex items-center">
                    <FontAwesomeIcon icon={faStairs} className="mr-2" />
                    <span>{post.numPisos} pisos</span>
                </div>

                <div className="flex items-center">
                    <FontAwesomeIcon icon={faCar} className="mr-2" />
                    <span>{post.numAutos} vehículos</span>
                </div>

                {//Años de antiguedad
                }
                <div className="flex items-center">
                    <FontAwesomeIcon icon={faCalendar} className="mr-2" />
                    <span>{post.anosAntiguedad} años de antigüedad</span>
                </div>

                <div className="flex items-center">
                    <FontAwesomeIcon icon={faTree} className="mr-2" />
                    <span>{post.tamPatio} m² de patio</span>
                </div>


            </div>
            <button disabled={bloquearCita} className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={openModal}
            >
                {
                    post.vendedor === null ? "Contactar al dueño" : "Agendar una cita"
                }
            </button>

            <CitaModal vendedor={post.vendedor} publicator={post.publicador} idPublicacion={post.idPublicacion} isOpen={isModalOpen} onClose={closeModal} />


        </div>
    );
};
