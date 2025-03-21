import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../utils/UserContext";
import axios from 'axios';
import { URL_API } from "../utils/constants";

export const CitaCard = ({ cita, setCitas, pasado = false }) => {

    const navigate = useNavigate();
    const { user } = useUser();

    const [comprador, setComprador] = useState(null);
    const [vendedor, setVendedor] = useState(null);

    const [date, setDate] = useState(new Date());
    useEffect(() => {
        const dateObject = new Date(cita.fechaCita);
        setDate(new Date(dateObject.getTime() - (dateObject.getTimezoneOffset() * 60000)));
    }, []);

    useEffect(() => {
        axios.get(URL_API + "/users/user/" + cita.vendedor).then((res) => {
            setVendedor(res.data);
        });

    }, []);

    useEffect(() => {

        axios.get(URL_API + "/users/user/" + cita.comprador).then((res) => {
            setComprador(res.data);
        });
    }, []);

    const getHour = () => {
        if (date.getHours() < 10) {
            return "0" + (date.getHours());
        }
        return date.getHours();
    }

    const getMinutes = () => {
        if (date.getMinutes() < 10) {
            return "0" + (date.getMinutes());
        }
        return date.getMinutes();
    }

    const getDay = () => {
        if (date.getDate() < 10) {
            return "0" + (date.getDay());
        }
        return date.getDate();
    }

    const getMonth = () => {
        if (date.getMonth() + 1 < 10) {
            return "0" + (date.getMonth() + 1);
        }
        return date.getMonth() + 1;
    }

    const handleVerPublicacion = () => {
        navigate(`/post/${cita.publicacion}`);
    }

    if ((!pasado && date < new Date()) || (pasado && date > new Date()) || (pasado && cita.estatus == "En espera")) {
        return null;
    }


    const handleAceptarCita = () => {
        axios.put(URL_API + "/citas/aceptar/" + cita.idCita, {}, {
            headers: {
                'authentication-token': localStorage.getItem('authentication-token')
            }
        }).then((res) => {
            alert("Cita aceptada");
            setCitas(...citas, { ...cita, estatus: "Aceptada" })
        }).catch((error) => {
            console.error(error);
        });
    }

    const handleRechazarCita = () => {
        axios.put(URL_API + "/citas/rechazar/" + cita.idCita, {}, {
            headers: {
                'authentication-token': localStorage.getItem('authentication-token')
            }
        }).then((res) => {
            alert("Cita rechazada");
            setCitas(...citas, { ...cita, estatus: "Rechazada" })
        }).catch((error) => {
            console.error(error);
        });
    }

    const handleGenerarCita = () => {
        navigate(`/vendedor/contrato/${cita.idCita}`);
    }



    return (
        <div className={`border bg-white rounded-lg p-4 mb-4 w-64`}>
            <div className="mb-2">
                <h2 className="font-bold">Fecha</h2>
                <p>{getDay() + "/" + getMonth() + "/" + date.getFullYear()}</p>
            </div>
            <div className="mb-4">
                <h2 className="font-bold">Hora</h2>
                <p>{
                    getHour() + ":" + getMinutes()
                }</p>
            </div>

            <div className="mb-4">
                <h2 className="font-bold">Vendedor</h2>
                <p>{vendedor?.nombre}</p>
            </div>

            <div className="mb-4">
                <h2 className="font-bold">Comprador</h2>
                <p>{comprador?.nombre}</p>
            </div>

            <div className="mb-4">
                <h2 className="font-bold">Estatus</h2>
                <p>{cita.estatus}</p>
            </div>


            <button className="bg-black text-white w-full py-2 mb-2" onClick={handleVerPublicacion}>Ver publicación</button>

            {
                cita.estatus === "En espera" && user.tipo == "vendedor" && (
                    <>
                        <button className="border w-full py-2 bg-green-500 text-white hover:bg-green-600 mb-2" onClick={handleAceptarCita}>Aceptar cita</button>
                        <button className="border w-full py-2 bg-red-500 text-white hover:bg-red-600" onClick={handleRechazarCita}>Rechazar cita</button>

                    </>
                )

            }

            {
                pasado && user.tipo == "vendedor" && (
                    <button className="border border-orange-500 text-orange-500 w-full py-2 mb-2" onClick={handleGenerarCita}>Generar contrato</button>
                )
            }
        </div>
    );
}