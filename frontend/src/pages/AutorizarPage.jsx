import { useEffect, useState } from "react";
import { AutorizarCard } from "../components/AutorizarCard";
import { Barra } from "../components/ui/Barra";
import { BarraAbajo } from "../components/ui/BarraAbajo";
import axios from "axios";
import { URL_API } from "../utils/constants";
import { useNavigate } from "react-router-dom";



export const AutorizarPage = () => {

    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    const getPosts = () => {
        axios.get(URL_API + "/users", {
            headers: {
                'authentication-token': localStorage.getItem('authentication-token')
            }
        }).then((res) => {
            if (res.data.tipo !== 'admin') {
                navigate('/');
            } else {
                axios.get(URL_API + "/posts/admin/posts").then((res) => {
                    setPosts(res.data.publicaciones);
                });
            }

        });
    }

    useEffect(() => {

        if (!localStorage.getItem('authentication-token')) {
            navigate('/login');
        }


        getPosts();

    }, []);

    return (
        <>
            <div className="min-h-screen bg-gray-100">
                <Barra />


                <div className="container mx-auto mt-20">
                    <h2 className="text-3xl font-bold mb-10">Publicaciones pendientes por autorizar</h2>
                    {
                        posts.length === 0 && (
                            <p>No hay publicaciones pendientes por autorizar</p>
                        )
                    }
                    {
                        posts.map((post) => {
                            return (
                                <div key={post.idPublicacion} className="mb-10">
                                    <AutorizarCard post={post} getPosts={getPosts} />
                                </div>
                            )
                        })
                    }
                </div>

            </div>
            <BarraAbajo />
        </>
    );
}