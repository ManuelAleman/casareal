import { Link } from "react-router-dom"
import axios from "axios"
import { URL_API } from "../utils/constants"
import { useEffect, useState } from "react"

export const AutorizarCard = ({ post, getPosts, asignar = false }) => {

    const handleAutorizar = () => {
        axios.put(URL_API + "/posts/post/" + post.idPublicacion + "/autorizar", {}, {
            headers: {
                'authentication-token': localStorage.getItem('authentication-token'),
            }
        }).then((res) => {
            alert("Publicación autorizada");
            getPosts();
        })
    }

    const handleRechazar = () => {
        axios.put(URL_API + "/posts/post/" + post.idPublicacion + "/rechazar", {}, {
            headers: {
                'authentication-token': localStorage.getItem('authentication-token'),
            }
        }).then((res) => {
            alert("Publicación rechazada");
            getPosts();
        })
    }

    const [vendedores, setVendedores] = useState([]);

    useEffect(() => {
        if (!asignar) {
            return;
        }

        axios.get(URL_API + "/users/vendedores").then((res) => {
            setVendedores(res.data);
        });
    }, [])

    const handleAsignar = (e) => {
        e.preventDefault();
        const idVendedor = e.target.vendedores.value;
        if (idVendedor === "Vendedores") {
            alert("Selecciona un vendedor");
            return;
        }
        axios.put(URL_API + "/posts/post/" + post.idPublicacion + "/asignar", {
            vendedor: idVendedor
        }, {
            headers: {
                'authentication-token': localStorage.getItem('authentication-token'),
            }
        }).then((res) => {
            alert("Vendedor asignado");
            getPosts();
        })
    }

    return (
        <div className="border rounded-lg px-4 py-5 grid grid-cols-1 md:grid-cols-3 items-center gap-y-10">
            <img src={post.fotoURL} alt="" className="w-full h-48 object-cover" />
            <div className="flex flex-col text-center mx-auto">
                <h2 className="text-2xl font-bold">Publicador:
                    <span className="font-normal">
                        {" " + post.nombre}
                    </span>
                </h2>
                <Link to={"/post/" + post.idPublicacion}>
                    <button className="mt-4 w-full bg-white text-black text-lg font-bold py-2 border-black border-2 hover:bg-black hover:text-white transition duration-300">
                        Ver publicación
                    </button>
                </Link>
            </div>

            {
                asignar ? (
                    <div className="flex flex-col gap-4">
                        <form className="w-full md:w-1/2 md:mx-auto" noValidate onSubmit={handleAsignar} >
                            <label htmlFor="vendedores" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Selecciona el vendedor</label>
                            <select id="vendedores" className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value={"Vendedores"}>Vendedores</option>
                                {
                                    vendedores.map((vendedor) => {
                                        return (
                                            <option key={vendedor.idUsuario} value={vendedor.idUsuario}>{vendedor.nombre}</option>
                                        )
                                    })
                                }
                            </select>
                            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                                Asignar vendedor
                            </button>
                        </form>



                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        <button className="w-full md:w-1/2 md:mx-auto bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                            onClick={() => handleAutorizar()}>
                            Autorizar
                        </button>
                        <button className="w-full md:w-1/2 md:mx-auto bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                            onClick={() => handleRechazar()}>
                            Rechazar
                        </button>
                    </div >
                )
            }


        </div >
    )
}