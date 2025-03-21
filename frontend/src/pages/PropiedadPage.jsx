import { useEffect, useState } from 'react';
import { PropiedadDetails } from "../components/propiedad/PropiedadDetails";
import { UbicacionMapa } from '../components/propiedad/UbicacionMapa';
import { PropiedadCard } from '../components/propiedad/PropiedadCard';
import { Barra } from '../components/ui/Barra';
import { BarraAbajo } from '../components/ui/BarraAbajo';
import { useParams } from 'react-router-dom';
import { URL_API } from '../utils/constants';
import axios from 'axios';
import { PropiedadImage } from '../components/propiedad/PropiedadImage';

export const PropiedadPage = () => {
    const { post_id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        axios.get(URL_API + `/posts/post/${post_id}`).then((response) => {
            setPost(response.data.post);
        });
    }, [post_id]);

    return (
        <>
            <div className="min-h-screen bg-gray-100">
                <Barra />
                {
                    !post ? <h2 className='text-center text-3xl font-bold mt-12'>No existe ese post</h2> : (

                        <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2">
                                <PropiedadImage post={post} />


                                {//<img src={post.fotoURL} alt="Property" className="w-full h-auto rounded-lg mb-4" />
                                }
                                <PropiedadCard post={post} />

                            </div>
                            <div className="md:col-span-1 space-y-6">
                                <PropiedadDetails post={post} />
                                <UbicacionMapa post={post} />

                            </div>
                        </div>


                    )
                }
            </div>

            <BarraAbajo />
        </>
    );
};
