import { useEffect, useState } from "react";
import Slider from 'react-slick';
import axios from "axios";
import { URL_API } from "../../utils/constants";

export const PropiedadImage = ({ post }) => {

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const [fotos, setFotos] = useState([]);

    useEffect(() => {
        axios.get(URL_API + '/posts/fotos/' + post.propiedad, {
            headers: {
                'authentication-token': localStorage.getItem('authentication-token')
            }
        }).then((response) => {
            //poner la principal al inicio y las demas ordenarlas
            response.data.sort((a, b) => {
                if (a.lugar === 'principal') {
                    return -1;
                }
                if (b.lugar === 'principal') {
                    return 1;
                }
                return a.lugar < b.lugar ? -1 : 1;
            });


            setFotos(response.data);
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    return (


        <Slider {...settings}>
            {fotos.map((foto, index) => (
                <div key={index}>
                    <img src={foto.fotoURL
                        ? foto.fotoURL
                        : 'https://via.placeholder.com/150'} alt={foto.lugar}
                        className='w-full h-56 md:h-[36rem] border-red-500 rounded-lg mb-4' />
                </div>
            ))}
        </Slider>
    );
}