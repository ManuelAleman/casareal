import { useEffect, useState } from "react";
import { ComponenteMapa } from "../components/ComponenteMapa";
import { Barra } from "../components/ui/Barra";
import { BarraAbajo } from "../components/ui/BarraAbajo";
import axios from "axios";
import { URL_API } from "../utils/constants";

export const MapaPage = () => {
  const [addresses, setAddresses] = useState(null);

  useEffect(() => {
    axios.get(URL_API + "/posts/posts").then((response) => {
      const fetchedPosts = response.data.posts;
      const newAddresses = fetchedPosts.map((post) => {
        return {
          post: post,
          address: `${post.calle} ${post.numeroExterior}, ${post.colonia}, ${post.ciudad}, ${post.estado}, ${post.codigoPostal}`
        }
      });
      setAddresses(newAddresses);
    });
  }, []);

  return (
    <>
      <Barra />
      <div className="container mx-auto py-12 text-center px-4 min-h-screen">
        <h2 className="text-4xl font-bold mb-2">Mapa</h2>
        <p className="mb-5">Encuentra tu vivienda ideal</p>

        <ComponenteMapa
          addresses={addresses}
        />


      </div>
      <BarraAbajo />
    </>
  );
}