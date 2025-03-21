import { useEffect, useState } from "react";
import { CitaCard } from "../components/CitaCard";
import { Barra } from "../components/ui/Barra";
import { BarraAbajo } from "../components/ui/BarraAbajo";
import axios from "axios";
import { URL_API } from "../utils/constants";
import { useUser } from "../utils/UserContext";
import { useNavigate } from "react-router-dom";


export const CitasPage = () => {

    const { user, loading } = useUser();
    const navigate = useNavigate();
    const [citas, setCitas] = useState([]);

    useEffect(() => {
        if (loading) return;
        if (user === null) {
            navigate('/login');
        }
        if (user.tipo == "vendedor") {
            axios.get(URL_API + '/citas/vendedor', {
                headers: {
                    'authentication-token': localStorage.getItem('authentication-token')
                }
            }).then((response) => {
                setCitas(response.data);
            }).catch((error) => {
                console.error(error);
            });
        } else {
            axios.get(URL_API + '/citas/comprador', {
                headers: {
                    'authentication-token': localStorage.getItem('authentication-token')
                }
            }).then((response) => {
                setCitas(response.data);
            }).catch((error) => {
                console.error(error);
            });
        }
    }, [loading]);

    return (
        <>
            <div className="min-h-screen bg-gray-100">
                <Barra />
                <div className="container mx-auto mt-20">
                    <h2 className="text-2xl font-bold mb-5">Citas proximas</h2>

                    {
                        citas.length === 0 && (
                            <p>No hay citas proximas</p>
                        )
                    }

                    <div className="flex flex-wrap gap-4">
                        {
                            citas.map((cita) => (
                                <CitaCard key={cita.idCita} cita={cita} />
                            ))
                        }
                    </div>

                    <h2 className="text-2xl font-bold mb-5 mt-5">Citas pasadas</h2>
                    {
                        citas.length === 0 && (
                            <p>No hay citas pasadas</p>
                        )
                    }
                    <div className="flex flex-wrap gap-4">
                        {
                            citas.map((cita) => (
                                <CitaCard key={cita.idCita} cita={cita} setCitas={setCitas} pasado={true} />
                            ))
                        }
                    </div>
                </div>

            </div>
            <BarraAbajo />
        </>
    );
}