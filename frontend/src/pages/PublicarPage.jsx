import { Barra } from "../components/ui/Barra";
import { BarraAbajo } from "../components/ui/BarraAbajo";
import { PublicacionCard } from "../components/publicar/PublicacionCard";
import { EspecificacionesCard } from "../components/publicar/EspecificacionesCard";
import { useEffect, useState } from "react";
import { UbicacionCard } from "../components/publicar/UbicacionCard";
import { PrecioCard } from "../components/publicar/PrecioCard";
import { URL_API } from '../utils/constants';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const PublicarPage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('authentication-token')) {
      navigate('/login');
    }
  }, []);


  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    foto: null,
    fotosCocina: [],
    fotosSala: [],
    fotosComedor: [],
    fotosPatio: [],
    fotosCochera: [],
    fotosRecamara: [],
    fotosBano: [],
    fotosMedioBano: [],
    numRecamaras: '',
    numBanosCompletos: '',
    numMediosBanos: '',
    numAutos: '',
    numPisos: '',
    superficieTotal: '',
    tamPatio: '',
    anosAntiguedad: '',
    precio: '',
    calle: '',
    colonia: '',
    codigoPostal: '',
    ciudad: '',
    estado: '',
    numExterior: '',
    numInterior: null,
    tipo: ''
  });

  const [pagina, setPagina] = useState(1);

  const publicarFotos = async () => {


    const fotos = [];

    let formFoto = new FormData();
    formFoto.append('foto', formData.foto);
    let response = await axios.post(URL_API + '/posts/foto', formFoto, {
      headers: {
        'authentication-token': localStorage.getItem('authentication-token'),
      }
    })
    fotos.push({
      fotoURL: response.data.url,
      lugar: 'principal'
    });

    let cnt = 1;
    for (const foto of formData.fotosRecamara) {
      formFoto = new FormData();
      formFoto.append('foto', foto);
      response = await axios.post(URL_API + '/posts/foto', formFoto, {
        headers: {
          'authentication-token': localStorage.getItem('authentication-token'),
          'Content-Type': 'multipart/form-data',
        }
      })
      fotos.push({
        fotoURL: response.data.url,
        lugar: 'recamara ' + cnt
      });
      cnt++;
    }

    cnt = 1;
    for (const foto of formData.fotosBano) {
      formFoto = new FormData();
      formFoto.append('foto', foto);
      response = await axios.post(URL_API + '/posts/foto', formFoto, {
        headers: {
          'authentication-token': localStorage.getItem('authentication-token'),
          'Content-Type': 'multipart/form-data',
        }
      })
      fotos.push({
        fotoURL: response.data.url,
        lugar: 'bano ' + cnt
      });
      cnt++;
    }

    cnt = 1;
    for (const foto of formData.fotosMedioBano) {
      formFoto = new FormData();
      formFoto.append('foto', foto);
      response = await axios.post(URL_API + '/posts/foto', formFoto, {
        headers: {
          'authentication-token': localStorage.getItem('authentication-token'),
          'Content-Type': 'multipart/form-data',
        }
      })
      fotos.push({
        fotoURL: response.data.url,
        lugar: 'medio bano ' + cnt
      });
      cnt++;
    }

    cnt = 1;
    for (const foto of formData.fotosCocina) {
      formFoto = new FormData();
      formFoto.append('foto', foto);
      response = await axios.post(URL_API + '/posts/foto', formFoto, {
        headers: {
          'authentication-token': localStorage.getItem('authentication-token'),
          'Content-Type': 'multipart/form-data',
        }
      })
      fotos.push({
        fotoURL: response.data.url,
        lugar: 'cocina ' + cnt
      });
      cnt++;
    }

    cnt = 1;
    for (const foto of formData.fotosSala) {
      formFoto = new FormData();
      formFoto.append('foto', foto);
      response = await axios.post(URL_API + '/posts/foto', formFoto, {
        headers: {
          'authentication-token': localStorage.getItem('authentication-token'),
          'Content-Type': 'multipart/form-data',
        }
      })
      fotos.push({
        fotoURL: response.data.url,
        lugar: 'sala ' + cnt
      });
      cnt++;
    }

    cnt = 1;
    for (const foto of formData.fotosComedor) {
      formFoto = new FormData();
      formFoto.append('foto', foto);
      response = await axios.post(URL_API + '/posts/foto', formFoto, {
        headers: {
          'authentication-token': localStorage.getItem('authentication-token'),
          'Content-Type': 'multipart/form-data',
        }
      })
      fotos.push({
        fotoURL: response.data.url,
        lugar: 'comedor ' + cnt
      });
      cnt++;
    }

    cnt = 1;
    for (const foto of formData.fotosPatio) {
      formFoto = new FormData();
      formFoto.append('foto', foto);
      response = await axios.post(URL_API + '/posts/foto', formFoto, {
        headers: {
          'authentication-token': localStorage.getItem('authentication-token'),
          'Content-Type': 'multipart/form-data',
        }
      })
      fotos.push({
        fotoURL: response.data.url,
        lugar: 'patio ' + cnt
      });
      cnt++;
    }

    cnt = 1;
    for (const foto of formData.fotosCochera) {
      formFoto = new FormData();
      formFoto.append('foto', foto);
      response = await axios.post(URL_API + '/posts/foto', formFoto, {
        headers: {
          'authentication-token': localStorage.getItem('authentication-token'),
          'Content-Type': 'multipart/form-data',
        }
      })
      fotos.push({
        fotoURL: response.data.url,
        lugar: 'cochera ' + cnt
      });
      cnt++;
    }

    return fotos;
  }


  const handlePublicar = async () => {

    const fotos = await publicarFotos();

    const subir = {
      calle: formData.calle,
      numeroExterior: formData.numExterior,
      numeroInterior: formData.numInterior,
      estado: formData.estado,
      ciudad: formData.ciudad,
      colonia: formData.colonia,
      codigoPostal: formData.codigoPostal,
      referencia: formData.referencias,
      titulo: formData.titulo,
      descripcion: formData.descripcion,
      numRecamaras: formData.numRecamaras,
      numBanosCompletos: formData.numBanosCompletos,
      numMediosBanos: formData.numMediosBanos,
      numAutos: formData.numAutos,
      numPisos: formData.numPisos,
      superficieTotal: formData.superficieTotal,
      tamPatio: formData.tamPatio,
      anosAntiguedad: formData.anosAntiguedad,
      precio: formData.precio,
      tipo: formData.tipo,
      fotos: fotos
    }

    axios.post(URL_API + '/posts/post', subir, {
      headers: {
        'authentication-token': localStorage.getItem('authentication-token')
      }
    }).then((response) => {
      console.log(response);
      alert('Propiedad publicada exitosamente');
      navigate('/perfil');
    }).catch((error) => {
      console.log(error);
    }
    );





  }

  return (
    <>
      <Barra />
      <div className="container mx-auto py-12 px-4 min-h-screen">
        <h2 className="text-xl font-bold mb-2">Publicar propiedad</h2>
        <p className="mb-10">Asegurate de documentar todos los datos de tu propiedad y verifica que sean correctos</p>

        <div className="flex gap-52">
          <ol className="hidden md:block list-decimal">
            <li>Publicación</li>
            <li>Especificaciones y fotos</li>
            <li>Ubicación</li>
            <li>Precio</li>
          </ol>

          <div className="grow md:pr-20">

            {
              pagina === 1 &&
              <PublicacionCard
                formData={formData}
                setFormData={setFormData}
                setPagina={setPagina}
              >
              </PublicacionCard>
            }

            {
              pagina === 2 &&
              <div>
                <EspecificacionesCard
                  formData={formData}
                  setFormData={setFormData}
                  setPagina={setPagina}
                >
                </EspecificacionesCard>
              </div>
            }

            {
              pagina === 3 &&
              <div>
                <UbicacionCard
                  formData={formData}
                  setFormData={setFormData}
                  setPagina={setPagina}
                >
                </UbicacionCard>
              </div>
            }

            {
              pagina === 4 &&
              <div>
                <PrecioCard
                  formData={formData}
                  setFormData={setFormData}
                  setPagina={setPagina}
                  handlePublicar={handlePublicar}
                >
                </PrecioCard>
              </div>
            }
          </div>

        </div>


      </div>
      <BarraAbajo />
    </>
  )
}