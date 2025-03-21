import { useState } from "react";

export const EspecificacionesCard = ({ formData, setFormData, setPagina }) => {

  const [recamaras, setRecamaras] = useState([]);
  const [idRecamara, setIdRecamara] = useState(2);
  const [banos, setBanos] = useState([]);
  const [idBanos, setIdBanos] = useState(2);
  const [mediosBanos, setMediosBanos] = useState([]);
  const [idMediosBanos, setIdMediosBanos] = useState(2);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleAddField = (setState, state, index, setIndex) => {
    const newField = { id: index + 1, num: state.length + 1, foto1: null, foto2: null };
    setIndex(index + 1);
    setState([...state, newField]);
  };

  const handleRemoveField = (setState, state, id) => {
    const updatedFields = state.filter(field => field.id !== id);
    updatedFields.forEach((field, index) => {
      field.num = index + 1;
    });
    setState(updatedFields);
  };

  const handleFileChange = (e, id, setState, state) => {
    const updatedFields = state.map(field => {
      if (field.id === id) {
        return { ...field, foto1: e.target.files[0], foto2: e.target.files[1] };
      }
      return field;
    });
    setState(updatedFields);
  };

  const handleFileChange2 = (e) => {
    const { id } = e.target;
    if (e.target.files.length !== 2) return;

    setFormData({
      ...formData,
      [id]: [e.target.files[0], e.target.files[1]]
    });
  }

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.superficieTotal) newErrors.superficieTotal = 'La superficie del terreno es requerida';
    if (formData.superficieTotal < 0) newErrors.superficieTotal = 'La superficie del terreno debe ser mayor a 0';
    if (!formData.numPisos) newErrors.numPisos = 'El numero de pisos es requerido';
    if (formData.numPisos < 0) newErrors.numPisos = 'El numero de pisos debe ser mayor a 0';
    if (!formData.numAutos) newErrors.numAutos = 'El numero de estacionamientos es requerido';
    if (formData.numAutos < 0) newErrors.numAutos = 'El numero de estacionamientos debe ser mayor a 0';
    if (!formData.tamPatio) newErrors.tamPatio = 'El tamaño del patio es requerido';
    if (formData.tamPatio < 0) newErrors.tamPatio = 'El tamaño del patio debe ser mayor a 0';
    if (!formData.anosAntiguedad) newErrors.anosAntiguedad = 'Los años de antiguedad son requeridos';
    if (formData.anosAntiguedad < 0) newErrors.anosAntiguedad = 'Los años de antiguedad deben ser mayor a 0';
    if (recamaras.length === 0) newErrors.recamaras = 'Debes agregar al menos una recamara';
    if (banos.length === 0) newErrors.banos = 'Debes agregar al menos un baño';

    if (recamaras.length > 0) {
      recamaras.forEach(({ foto1, foto2 }) => {
        if (!foto1 || !foto2) newErrors.recamaras = 'Debes agregar dos fotos por recamara';
      });
    }

    if (banos.length > 0) {
      banos.forEach(({ foto1, foto2 }) => {
        if (!foto1 || !foto2) newErrors.banos = 'Debes agregar dos fotos por baño';
      });
    }

    if (mediosBanos.length > 0) {
      mediosBanos.forEach(({ foto1, foto2 }) => {
        if (!foto1 || !foto2) newErrors.mediosBanos = 'Debes agregar dos fotos por medio baño';
      });
    }

    console.log(formData.fotosCocina.length)
    if (formData.fotosCocina.length != 2) newErrors.fotosCocina = 'Debes agregar dos fotos de la cocina';
    if (formData.fotosSala.length !== 2) newErrors.fotosSala = 'Debes agregar dos fotos de la sala';
    if (formData.fotosComedor.length !== 2) newErrors.fotosComedor = 'Debes agregar dos fotos del comedor';
    if (formData.fotosPatio.length != 0 && formData.fotosPatio.length !== 2) newErrors.fotosPatio = 'Debes agregar dos fotos del patio';
    if (formData.fotosCochera != 0 && formData.fotosCochera.length !== 2) newErrors.fotosCochera = 'Debes agregar dos fotos de la cochera';


    return newErrors;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    formData.fotosRecamara = [];
    recamaras.forEach(({ foto1, foto2 }) => {
      formData.fotosRecamara.push(foto1);
      formData.fotosRecamara.push(foto2);
    });

    formData.fotosBano = [];
    banos.forEach(({ foto1, foto2 }) => {
      formData.fotosBano.push(foto1);
      formData.fotosBano.push(foto2);
    });

    formData.fotosMedioBano = [];
    mediosBanos.forEach(({ foto1, foto2 }) => {
      formData.fotosMedioBano.push(foto1);
      formData.fotosMedioBano.push(foto2);
    });


    formData.numRecamaras = recamaras.length;
    formData.numBanosCompletos = banos.length;
    formData.numMediosBanos = mediosBanos.length;



    setPagina(3);
  }

  return (
    <>
      <h3 className="text-2xl font-bold mb-5">2. Especificaciones - Caracteristicas y fotos</h3>

      <div className="mb-6 md:w-1/2">
        <h3 className="text-lg font-semibold mb-2">Superficie del terreno</h3>
        <input
          id="superficieTotal"
          value={formData.superficieTotal}
          type="number"
          onChange={e => handleChange(e)}
          placeholder="Superficie del terreno"
          className={`w-full px-3 py-2 border ${errors.superficieTotal ? 'border-red-500' : 'mb-2'}`}
        />
        {errors.superficieTotal && <p className="text-red-500 text-sm">{errors.superficieTotal}</p>}
      </div>

      <div className="mb-6 md:w-1/2">
        <h3 className="text-lg font-semibold mb-2">Numero de pisos</h3>
        <input
          id="numPisos"
          value={formData.numPisos}
          type="number"
          onChange={e => handleChange(e)}
          placeholder="Numero de pisos"
          className={`w-full px-3 py-2 border ${errors.numPisos ? 'border-red-500' : 'mb-2'}`}
        />
        {errors.numPisos && <p className="text-red-500 text-sm">{errors.numPisos}</p>}
      </div>

      <div className="mb-6 md:w-1/2">
        <h3 className="text-lg font-semibold mb-2">Numero de estacionamientos</h3>
        <input
          id="numAutos"
          value={formData.numAutos}
          type="number"
          onChange={e => handleChange(e)}
          placeholder="Numero de estacionamientos"
          className={`w-full px-3 py-2 border ${errors.numAutos ? 'border-red-500' : 'mb-2'}`}
        />
        {errors.numAutos && <p className="text-red-500 text-sm">{errors.numAutos}</p>}
      </div>

      <div className="mb-6 md:w-1/2">
        <h3 className="text-lg font-semibold mb-2">Tamaño del patio</h3>
        <input
          id="tamPatio"
          value={formData.tamPatio}
          type="number"
          onChange={e => handleChange(e)}
          placeholder="Tamaño del patio"
          className={`w-full px-3 py-2 border ${errors.superficieConstruida ? 'border-red-500' : 'mb-2'}`}
        />
        {errors.tamPatio && <p className="text-red-500 text-sm">{errors.tamPatio}</p>}
      </div>

      <div className="mb-6 md:w-1/2">
        <h3 className="text-lg font-semibold mb-2">Años de antiguedad</h3>
        <input
          id="anosAntiguedad"
          value={formData.anosAntiguedad}
          type="number"
          onChange={e => handleChange(e)}
          placeholder="Años de antiguedad"
          className={`w-full px-3 py-2 border ${errors.anosAntiguedad ? 'border-red-500' : 'mb-2'}`}
        />
        {errors.anosAntiguedad && <p className="text-red-500 text-sm">{errors.anosAntiguedad}</p>}
      </div>

      <div className="mb-6">
        <h3 className="text-3xl font-semibold">Fotos</h3>
        <span className="text-gray-500">Ingresa 2 fotos por cada habitacion</span>
      </div>

      {/* Numero de recamaras */}
      <div className="mb-6">
        <div className="flex">
          <h3 className="text-lg font-semibold mb-2">Recámaras</h3>
          <button
            type="button"
            className="ml-2 text-green-100 bg-green-500 rounded-lg px-3 pb-1"
            onClick={() => handleAddField(setRecamaras, recamaras, idRecamara, setIdRecamara)}
          >
            +
          </button>
        </div>
        {errors.recamaras && <p className="text-red-500 text-sm mb-2">{errors.recamaras}</p>}

        {recamaras.map(({ id, num }) => (
          <div key={id} className="mb-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="multiple_files">Recamara {num}</label>
            <div className="flex">
              <input
                onChange={(e) => handleFileChange(e, id, setRecamaras, recamaras)}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" type="file" multiple />


              <button
                type="button"
                className="ml-2 text-red-100 bg-red-500 rounded-lg px-3 py-2"
                onClick={() => handleRemoveField(setRecamaras, recamaras, id)}
              >
                -
              </button>
            </div>

          </div>
        ))}
      </div>


      {/* Numero de banos */}
      <div className="mb-6">
        <div className="flex">
          <h3 className="text-lg font-semibold mb-2">Baños</h3>
          <button
            type="button"
            className="ml-2 text-green-100 bg-green-500 rounded-lg px-3 pb-1"
            onClick={() => handleAddField(setBanos, banos, idBanos, setIdBanos)}
          >
            +
          </button>

        </div>
        {errors.banos && <p className="text-red-500 text-sm mb-2">{errors.banos}</p>}

        {banos.map(({ id, num }) => (
          <div key={id} className="mb-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="multiple_files">Baño {num}</label>
            <div className="flex">
              <input
                onChange={(e) => handleFileChange(e, id, setBanos, banos)}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" type="file" multiple />


              <button
                type="button"
                className="ml-2 text-red-100 bg-red-500 rounded-lg px-3 py-2"
                onClick={() => handleRemoveField(setBanos, banos, id)}
              >
                -
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Numero de medios banos */}
      <div className="mb-6">
        <div className="flex">
          <h3 className="text-lg font-semibold mb-2">Medios Baños</h3>
          <button
            type="button"
            className="ml-2 text-green-100 bg-green-500 rounded-lg px-3 pb-1"
            onClick={() => handleAddField(setMediosBanos, mediosBanos, idMediosBanos, setIdMediosBanos)}
          >
            +
          </button>
        </div>
        {errors.mediosBanos && <p className="text-red-500 text-sm mb-2">{errors.mediosBanos}</p>}

        {mediosBanos.map(({ id, num }) => (
          <div key={id} className="mb-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="multiple_files">Medio Baño {num}</label>
            <div className="flex">
              <input
                onChange={(e) => handleFileChange(e, id, setMediosBanos, mediosBanos)}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" type="file" multiple />


              <button
                type="button"
                className="ml-2 text-red-100 bg-red-500 rounded-lg px-3 py-2"
                onClick={() => handleRemoveField(setMediosBanos, mediosBanos, id)}
              >
                -
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Cocina */}
      <div className="mb-6">
        <h3 className={`text-lg font-semibold ${errors.fotosCocina ? "" : "mb-2"} `}>Cocina</h3>
        {errors.fotosCocina && <p className="text-red-500 text-sm mb-2">{errors.fotosCocina}</p>}
        <input
          id="fotosCocina"
          onChange={(e) => handleFileChange2(e)}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" multiple />
      </div>

      {/* Sala */}
      <div className="mb-6">
        <h3 className={`text-lg font-semibold ${errors.fotosSala ? "" : "mb-2"} `}>Sala</h3>
        {errors.fotosSala && <p className="text-red-500 text-sm mb-2">{errors.fotosSala}</p>}
        <input
          id="fotosSala"
          onChange={(e) => handleFileChange2(e)}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" multiple />
      </div>

      {/* Comedor */}
      <div className="mb-6">
        <h3 className={`text-lg font-semibold ${errors.fotosComedor ? "" : "mb-2"} `}>Comedor</h3>
        {errors.fotosComedor && <p className="text-red-500 text-sm mb-2">{errors.fotosComedor}</p>}
        <input
          id="fotosComedor"
          onChange={(e) => handleFileChange2(e)}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" multiple />
      </div>

      {/* Patio */}
      <div className="mb-6">
        <h3 className={`text-lg font-semibold ${errors.fotosPatio ? "" : "mb-2"} `}>Patio (opcional)</h3>
        {errors.fotosPatio && <p className="text-red-500 text-sm mb-2">{errors.fotosPatio}</p>}
        <input
          id="fotosPatio"
          onChange={(e) => handleFileChange2(e)}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" multiple />
      </div>

      {/* Cochera */}
      <div className="mb-6">
        <h3 className={`text-lg font-semibold ${errors.fotosCochera ? "" : "mb-2"} `}>Cochera (opcional)</h3>
        {errors.fotosCochera && <p className="text-red-500 text-sm mb-2">{errors.fotosCochera}</p>}
        <input
          id="fotosCochera"
          onChange={(e) => handleFileChange2(e)}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" multiple />
      </div>





      {/*Continuar */}
      <div className="flex justify-end">
        <button onClick={handleSubmit} className=" bg-blue-500 hover:bg-blue-700 text-right text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Continuar
        </button>
      </div>
    </>
  );
}