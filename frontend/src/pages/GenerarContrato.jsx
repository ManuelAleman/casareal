import { useEffect, useState } from 'react';
import { Barra } from '../components/ui/Barra';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { URL_API } from '../utils/constants';

export const GenerarContrato = () => {
    const [formData, setFormData] = useState({
        comprador: '',
        vendedor: '',
        propiedadID: '',
        precio: '',
        condiciones: '',
        detalles: ''
    });

    const [errores, setErrores] = useState([]);

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        axios.get(URL_API + "/citas/" + id).then((res) => {
            const cita = res.data;
            console.log(cita);
            setFormData({
                comprador: cita.nombreComprador,
                vendedor: cita.nombreVendedor,
                propiedadID: cita.publicacion,
            });
        });
    }, []);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const getErrores = () => {
        const errores = [];
        if (!formData.comprador) {
            errores.push('El nombre del comprador es requerido');
        }
        if (!formData.vendedor) {
            errores.push('El nombre del vendedor es requerido');
        }
        if (!formData.propiedadID) {
            errores.push('El ID de la propiedad es requerido');
        }
        if (!formData.precio) {
            errores.push('El precio es requerido');
        }

        if (isNaN(formData.precio)) {
            errores.push('El precio debe ser un número');
        }

        if (!formData.condiciones) {
            errores.push('Las condiciones de pago son requeridas');
        }
        return errores;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const errores = getErrores();
        if (errores.length > 0) {
            alert(errores.join('\n'));
            return;
        }
        axios.post(URL_API + "/citas/contrato", {
            detalles: formData.detalles,
            condicionPago: formData.condiciones,
            precioAcordado: formData.precio,
            cita: id,

        }, {
            headers: {
                'authentication-token': localStorage.getItem('authentication-token')
            }
        }).then((res) => {
            alert("Contrato generado");
            navigate('/citas');
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <>
            <Barra />
            <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
                <h2 className="text-2xl font-bold mb-6">Generar Contrato de Compra y Venta / Renta</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Nombre del Comprador / Arrendatario:</label>
                        <input
                            disabled
                            type="text"
                            name="comprador"
                            value={formData.comprador}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Nombre del Vendedor / Arrendador:</label>
                        <input
                            disabled
                            type="text"
                            name="vendedor"
                            value={formData.vendedor}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">ID de Propiedad</label>
                        <input
                            disabled
                            type="text"
                            name="propiedadID"
                            value={formData.propiedadID}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Precio acordado de la Venta / Renta:</label>
                        <input
                            type="text"
                            name="precio"
                            value={formData.precio}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Condiciones de Pago:</label>
                        <input
                            type="text"
                            name="condiciones"
                            value={formData.condiciones}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Detalles</label>
                        <textarea
                            name="detalles"
                            value={formData.detalles}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            rows="4"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
                    >
                        Generar Contrato
                    </button>
                </form>
            </div>
        </>
    );
};