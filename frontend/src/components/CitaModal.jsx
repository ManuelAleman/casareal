import Modal from 'react-modal';
import { URL_API } from '../utils/constants';
import axios from 'axios';
import { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { useEffect } from 'react';

Modal.setAppElement('#root');

export const CitaModal = ({ isOpen, onClose, vendedor, idPublicacion, publicator }) => {

    const [date, setDate] = useState(new Date());
    const [publicador, setPublicador] = useState(null);

    const handleSolicitarCita = () => {

        if (!date) {
            alert("Debe seleccionar una fecha");
            return;
        }

        if (date < new Date()) {
            alert("Debe seleccionar una fecha futura");
            return;
        }

        axios.post(URL_API + "/citas", {
            publicacion: idPublicacion,
            fecha: date.toISOString().slice(0, 19).replace('T', ' '),
            vendedor: vendedor
        }, {
            headers: {
                'authentication-token': localStorage.getItem('authentication-token')
            }
        }).then((res) => {
            alert("Cita agendada");
            setDate(new Date());
            onClose();
        }).catch((error) => {
            console.error(error);
            setDate(new Date());
        })
    }

    useEffect(() => {
        if (!vendedor) {
            axios.get(URL_API + "/users/user/" + publicator).then((res) => {
                setPublicador(res.data);
            });
        }
    }, [])

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} className="modal" overlayClassName="overlay">
            <div className="p-4">

                {
                    vendedor ? (
                        <>
                            <h3 className="text-xl font-bold">
                                Agendar una cita
                            </h3>
                            <p className='mt-5 text-lg font-bold'>Elegir fecha</p>
                            <Calendar value={date} onChange={(e) => setDate(e.value)} inline showTime hourFormat="24" />



                            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button type="button" className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto" onClick={handleSolicitarCita}>Agendar Cita</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h3 className="text-xl font-bold">
                                Contactar con el dueño
                            </h3>
                            <p className='mt-5 text-lg'>Nombre: {publicador?.nombre}</p>
                            <p className='mt-5 text-lg'>Correo: {publicador?.correo}</p>
                            <p className='mt-5 text-lg'>Telefono: {publicador?.telefono}</p>

                            <button type="button" className=" rounded-md mt-5 bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 " onClick={onClose}>Cerrar</button>
                        </>
                    )
                }


            </div>
        </Modal>
    );
};