import axios from "axios";
import { useEffect, useState } from "react";
import perfilFoto from "../../assets/perfil.png";
import { URL_API } from "../../utils/constants";

export const PropiedadCard = ({ post }) => {

    const [vendedor, setVendedor] = useState({});

    useEffect(() => {
        if (post.vendedor) {
            axios.get(URL_API + `/users/user/${post.vendedor}`).then((response) => {
                setVendedor(response.data);
            });
        }
    }, []);

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col md:flex-row md:justify-between gap-10">
            <div className="flex">
                <img src={perfilFoto} alt="fotovendedor" className="h-12 w-12 rounded-full mr-4" />
                <div>
                    <p className="text-gray-700">Vendedor asignado</p>
                    <p className="font-bold">{post.vendedor ? vendedor.nombre : "Sin asignar"}</p>
                </div>
            </div>

            <div className="text-left md:text-right">
                <p className="text-gray-700">Precio</p>
                <p className="font-bold text-xl">${post.precio} pesos</p>
            </div>
        </div>
    );
};
