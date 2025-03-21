import { useState } from "react";

export const UbicacionCard = ({ formData, setFormData, setPagina }) => {

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };


  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};


    if (!formData.calle) {
      newErrors.calle = "La calle es obligatoria";
    }

    if (!formData.numExterior) {
      newErrors.numExterior = "El numero exterior es obligatorio";
    } else if (isNaN(formData.numExterior)) {
      newErrors.numExterior = "El numero exterior debe ser un numero";
    }

    if (!formData.estado) {
      newErrors.estado = "El estado es obligatorio";
    }


    if (!formData.ciudad) {
      newErrors.ciudad = "La ciudad es obligatoria";
    }

    if (!formData.codigoPostal) {
      newErrors.codigoPostal = "El codigo postal es obligatorio";
    } else if (formData.codigoPostal.length !== 5) {
      newErrors.codigoPostal = "El codigo postal debe tener 5 digitos";
    }

    if (!formData.colonia) {
      newErrors.colonia = "La colonia es obligatoria";
    }

    if (!formData.referencias) {
      newErrors.referencias = "Las referencias son obligatorias";
    }




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
    setPagina(4);
  }

  return (
    <>
      <h3 className="text-2xl font-bold mb-5">3. Ubicación</h3>


      {/* Calle */}
      <div className="mb-3">
        <h3 className={`text-lg font-semibold ${errors.calle ? "" : "mb-2"} `}>Calle</h3>
        <input
          id="calle"
          onChange={e => handleChange(e)}
          className={`w-full px-3 py-2 border ${errors.calle ? 'border-red-500' : 'mb-2'}`}
          placeholder="Calle"
          type="text" />
        {errors.calle && <p className="text-red-500 text-sm">{errors.calle}</p>}
      </div>


      {/* Numeros */}
      <div className="flex flex-col md:flex-row gap-x-10 mb-3">
        <div>
          <h3 className={`text-lg font-semibold ${errors.numExterior ? "" : "mb-2"} `}>Num. Exterior</h3>
          <input
            id="numExterior"
            onChange={e => handleChange(e)}
            className={`w-full px-3 py-2 border ${errors.numExterior ? 'border-red-500' : 'mb-2'}`}
            placeholder="Num. Exterior"
            type="number" />
          {errors.numExterior && <p className="text-red-500 text-sm">{errors.numExterior}</p>}
        </div>

        <div>
          <h3 className={`text-lg font-semibold ${errors.numInterior ? "" : "mb-2"} `}>Num. Interior</h3>
          {errors.numInterior && <p className="text-red-500 text-sm mb-2">{errors.numInterior}</p>}
          <input
            id="calle"
            onChange={e => handleChange(e)}
            className={`w-full px-3 py-2 border ${errors.numInterior ? 'border-red-500' : 'mb-2'}`}
            placeholder="Num. Interior"
            type="number" />
          {errors.numInterior && <p className="text-red-500 text-sm">{errors.numInterior}</p>}
        </div>
      </div>

      {/* Estado y ciudad */}
      <div className="flex flex-col md:flex-row gap-x-10 mb-3">
        <div className="grow">
          <h3 className={`text-lg font-semibold ${errors.estado ? "" : "mb-2"} `}>Estado</h3>
          <input
            id="estado"
            onChange={e => handleChange(e)}
            className={`w-full px-3 py-2 border ${errors.estado ? 'border-red-500' : 'mb-2'}`}
            placeholder="Estado"
            type="text" />
          {errors.estado && <p className="text-red-500 text-sm">{errors.estado}</p>}
        </div>

        <div className="grow">
          <h3 className={`text-lg font-semibold ${errors.ciudad ? "" : "mb-2"} `}>Ciudad</h3>
          <input
            id="ciudad"
            onChange={e => handleChange(e)}
            className={`w-full px-3 py-2 border ${errors.ciudad ? 'border-red-500' : 'mb-2'}`}
            placeholder="Ciudad"
            type="text" />
          {errors.ciudad && <p className="text-red-500 text-sm">{errors.ciudad}</p>}
        </div>
      </div>

      {/* CodigoPostal y colonia */}
      <div className="flex flex-col md:flex-row gap-x-10 mb-3">
        <div className="grow">
          <h3 className={`text-lg font-semibold ${errors.codigoPostal ? "" : "mb-2"} `}>Codigo Postal</h3>
          <input
            id="codigoPostal"
            onChange={e => handleChange(e)}
            className={`w-full px-3 py-2 border ${errors.codigoPostal ? 'border-red-500' : 'mb-2'}`}
            placeholder="Codigo Postal"
            type="number" />
          {errors.codigoPostal && <p className="text-red-500 text-sm">{errors.codigoPostal}</p>}
        </div>

        <div className="grow">
          <h3 className={`text-lg font-semibold ${errors.colonia ? "" : "mb-2"} `}>Colonia</h3>
          <input
            id="colonia"
            onChange={e => handleChange(e)}
            className={`w-full px-3 py-2 border ${errors.colonia ? 'border-red-500' : 'mb-2'}`}
            placeholder="Colonia"
            type="text" />
          {errors.colonia && <p className="text-red-500 text-sm">{errors.colonia}</p>}
        </div>
      </div>

      {/* Referencias */}
      <div className="mb-3">
        <h3 className={`text-lg font-semibold ${errors.referencias ? "" : "mb-2"} `}>Referencias</h3>
        <input
          id="referencias"
          onChange={e => handleChange(e)}
          className={`w-full px-3 py-2 border ${errors.referencias ? 'border-red-500' : 'mb-2'}`}
          placeholder="Referencias"
          type="text" />
        {errors.referencias && <p className="text-red-500 text-sm">{errors.referencias}</p>}
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